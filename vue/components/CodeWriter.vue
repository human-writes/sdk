<template>
    <div ref="root" class="code-snippet">
        <div class="to-be-placed">
            <pre
                :class="placeholderId"
                class="to-place"
            ><code :class="codeId"></code></pre>
        </div>
        <div class="to-be-written">
            <pre
                :class="paperId"
                class="to-write"
            ><code :class="codeId"></code></pre>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { Writer } from "../../core/writer.js";

const props = defineProps({
    source: {
        default: ""
    },
    speed: {
        default: "60"
    },
    dependsOnSelector: {
        default: ""
    },
    makeTypos: {
        default: false
    },
    styles: {
        default: ""
    },
    classes: {
        default: ""
    },
    finished: {
        default: false
    },
    restart: {
        default: false
    },
    useHighlightJs: {
        default: false
    },
    theme: {
        default: ""
    },
    language: {
        default: "html"
    },
    desktopWidth: {
        default: "100%"
    },
    mobileWidth: {
        default: "100%"
    }
});

const root = ref(null);
const mainId = ref("");
const placeholderId = ref("");
const paperId = ref("");
const codeId = ref("");

const desktopWidth = ref(props.desktopWidth);
const mobileWidth = ref(props.mobileWidth);

mainId.value = Writer.makeId();
placeholderId.value = "to-place-" + mainId.value;
paperId.value = "to-write-" + mainId.value;
codeId.value = "to-code-" + mainId.value;

watch(desktopWidth, (value) => {
    const doc = root.value.ownerDocument;
    const cssRoot = doc.querySelector(":root");
    cssRoot.style.setProperty("--desktop-width", value);

    console.log(`x is ${value}`);
});

watch(mobileWidth, (value) => {
    const doc = root.value.ownerDocument;
    const cssRoot = doc.querySelector(":root");
    cssRoot.style.setProperty("--mobile-width", value);

    console.log(`x is ${value}`);
});

onMounted(async () => {
    const doc = root.value.ownerDocument;
    if (props.useHighlightJs && window.hljs === undefined) {
        const $language = props.language ?? "html";

        const script = doc.createElement("script");
        script.src =
            "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js";
        doc.head.appendChild(script);

        const $styleList = [];
        $styleList.push(
            "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/default.min.css"
        );

        if (props.theme !== "") {
            $styleList.push(
                `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/${props.theme}.css`
            );
        }

        $styleList.forEach(($item) => {
            const style = doc.createElement("style");
            style.innerHTML = `@import "${$item}"`;

            doc.head.appendChild(style);
        });

        const $parentDiv = doc.querySelectorAll("." + codeId.value);
        for (const node of $parentDiv) {
            node.setAttribute("class", `code-snippet language-${$language}`);
        }
    }
    /**
     * The magic starts here
     */
    if (props.styles !== "" && props.classes !== "") {
        const $styleList = props.styles.split(",");

        $styleList.forEach(($item) => {
            const style = doc.createElement("style");
            style.innerHTML = `@import "${$item}"`;

            doc.head.appendChild(style);
        });

        const parentDiv = $doc.querySelector("." + paperId.value);
        parentDiv.setAttribute("class", props.classes);
    }

    if (props.dependsOnSelector !== "") {
        const component = doc.querySelector(props.dependsOnSelector);
        if (component !== null) {
            // Options for the observer (which mutations to observe)
            const config = { attributes: true };

            // Callback function to execute when mutations are observed
            // Create an observer instance linked to the callback function
            const observer = new MutationObserver(
                async (mutationList, observer) => {
                    for (const mutation of mutationList) {
                        if (
                            mutation.type === "attributes" &&
                            mutation.attributeName === "finished"
                        ) {
                            const attr = component.getAttribute("finished");

                            if (attr === "true") {
                                observer.disconnect();
                                await writeLikeAHuman();
                            }
                        }
                    }
                }
            );

            // Start observing the target node for configured mutations
            observer.observe(component, config);
        }
    } else {
        await writeLikeAHuman();
    }
});

const onFinishedWriting = function (html) {
    // Raise an event outside the shadow DOM
    // when all is done and ready
    const finishedEvent = new CustomEvent("finishedWriting", {
        bubbles: true,
        cancellable: true,
        detail: {
            content: html
        }
    });
    root.value.dispatchEvent(finishedEvent);
    root.value.setAttribute("finished", "true");
};

const writeLikeAHuman = async () => {
    const doc = root.value.ownerDocument;

    const tw = new Writer(
        doc,
        props.source,
        props.speed,
        props.makeTypos,
        onFinishedWriting
    );
    await tw.writeLikeAHuman(
        `pre.to-write.${paperId.value} code`,
        `pre.to-place.${placeholderId.value} code`
    );
};
</script>
<script>
import { defineComponent } from "vue";
import "../../assets/style.css";

export default defineComponent({
    name: "CodeWriter"
});
</script>
// watches
<!-- static get observeAttributes() {
//         /**
//          * Attributes passed inline to the component
//          */
//         return [
//             "source",
//             "speed",
//             "depends-on-selector",
//             "make-mistakes",
//             "styles",
//             "classes",
//             "finished"
//         ];
//     } -->

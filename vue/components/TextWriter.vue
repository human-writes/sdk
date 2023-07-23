<template>
    <div ref="root" class="text-snippet">
        <div class="to-be-written">
            <div class="to-write" :class="paperId">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { Writer } from "../../core/writer.js";

const root = ref(null);
const mainId = ref("");
const paperId = ref("");
const source = ref("");

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
    }
});

mainId.value = Writer.makeId();
paperId.value = "paper-" + mainId.value;

onMounted(async () => {
    const $doc = root.value.ownerDocument;

    const $slotTag = $doc.querySelector("div.to-write." + paperId.value);
    // TODO: catch the code
    console.log({ slot: $slotTag.innerHTML, cl: ".me ." + paperId.value });
    source.value = props.source === "" ? "#!text#" + $slotTag.innerHTML : props.source;
    $slotTag.innerText = ''

    /**
     * The magic starts here
     */
    if (props.styles !== "" && props.classes !== "") {
        const $styleList = props.styles.split(",");

        $styleList.forEach(($item) => {
            const style = $doc.createElement("style");
            style.innerHTML = `@import "${$item}"`;

            $doc.head.appendChild(style);
        });

        const parentDiv = $doc.querySelector("." + paperId.value);
        parentDiv.setAttribute("class", props.classes);
    }

    if (props.dependsOnSelector !== "") {
        const component = $doc.querySelector(props.dependsOnSelector);
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
        source.value,
        props.speed,
        props.makeTypos,
        onFinishedWriting
    );
    await tw.writeLikeAHuman(`div.to-write.${paperId.value}`);
};
</script>

<script>
import { defineComponent } from "vue";

export default defineComponent({
    name: "TextWriter"
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

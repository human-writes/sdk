import CodeWriter from "./code-writer.class.mjs";

export default class CodeWriterComponent extends HTMLElement {
    constructor() {
        super();

        this.source;
        this.useHighlightJs;
        this.theme;
        this.language;

        this.attachShadow({
            mode: "open",
        });
        this.shadowRoot.innerHTML = `
<style>

#to-copy {
    display: block;
    position: relative;
    float: left;
    width: 33vw;
}

#to-write {
    width: 33vw;
}

.to-be-copied {
    display: block;
    position: relative;
    float: left;
}

.to-be-written {
    display: flex;
    position: absolute;
    width: 33vw;
}

.code-snippet {
    display: flex;
    font-size: medium;
}

div,
p,
span,
textarea {
    -tab-size: 4;
    -o-tab-size: 4;
    -moz-tab-size: 4;
}

</style>

<div class="code-snippet">
    <div class="to-be-copied">
        <pre id="to-copy"><code></code></pre>
    </div>
    <div class="to-be-written">
        <pre id="to-write"><code></code></pre>
    </div>
</div>
`;
    }

    static get observeAttributes() {
        /**
         * Attributes passed inline to the component
         */
        return ["source", "speed", "depends-on-selector", "make-mistakes", "use-highlight-js", "theme", "language"];
    }

    get source() {
        return this.getAttribute("source") ?? null;
    }

    get speed() {
        return this.getAttribute("speed") ?? null;
    }

    get dependsOnSelector() {
        return this.getAttribute("depends-on-selector") ?? null;
    }

    get makeMistakes() {
        const result = this.getAttribute("make-mistakes") ?? "";
        return result.toLowerCase() === "true";
    }

    get useHighlightJs() {
        const result = this.getAttribute("use-highlight-js") ?? "";
        return result.toLowerCase() === "true";
    }

    get theme() {
        return this.getAttribute("theme") ?? null;
    }

    get language() {
        return this.getAttribute("language") ?? null;
    }

    get finished() {
        return this.getAttribute("finished") ?? null;
    }

    get restart() {
        return this.getAttribute("restart") ?? null;
    }

    async connectedCallback() {
        /**
         * Integrate styles and apply classes
         */

        if (this.useHighlightJs) {
            const $theme = this.theme ?? "base16/monokai";
            const $language = this.language ?? "html";

            const script = document.createElement("script");
            script.src =
                "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js";
            this.shadowRoot.appendChild(script);

            const $styleList = [];
            $styleList.push(
                "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/default.min.css"
            );
            $styleList.push(
                `https://highlightjs.org/static/demo/styles/${$theme}.css`
            );

            $styleList.forEach(($item) => {
                const style = document.createElement("style");
                style.innerHTML = `@import "${$item}"`;

                this.shadowRoot.appendChild(style);
            });

            const $parentDiv = this.shadowRoot.querySelectorAll("code");
            for (const node of $parentDiv) {
                node.setAttribute("class", `language-${$language}`);
            }
        }

        /**
         * The magic starts here
         */
        if(this.dependsOnSelector !== null) {
            const component = document.querySelector(this.dependsOnSelector)
            if(component !== undefined && (component.tagName === "TEXT-WRITER" || component.tagName === "CODE-WRITER")) {

                // this.addEventListener("finishedWriting", (e) => {
                //     const cw = new CodeWriter(this);
                //     cw.writeLikeAHuman("to-copy", "to-write");
                // })

                // Options for the observer (which mutations to observe)
                const config = { attributes: true };

                // Callback function to execute when mutations are observed
                const callback = (mutationList, observer) => {
                    for (const mutation of mutationList) {
                        if (mutation.type === "attributes" && mutation.attributeName === "finished") {
                            // console.log(`The ${mutation.attributeName} attribute was modified.`);

                            if(component.finished) {
                                // Later, you can stop observing
                                observer.disconnect();

                                const cw = new CodeWriter(this);
                                cw.writeLikeAHuman("to-copy", "to-write");
                            }
                        }
                    }
                };

                // Create an observer instance linked to the callback function
                const observer = new MutationObserver(callback);

                // Start observing the target node for configured mutations
                observer.observe(component, config);
    
            }
        } else {
            const cw = new CodeWriter(this);
            cw.writeLikeAHuman("to-copy", "to-write");
        }
    }
}

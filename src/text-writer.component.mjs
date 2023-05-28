/* eslint-disable import/extensions */
import TextWriter from "./text-writer.class.mjs";

export default class TextWriterComponent extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
<div class="text-snippet">
    <div class="to-be-written">
        <div id="to-write"></div>
    </div>
</div>
`;
    }

    static get observeAttributes() {
        /**
         * Attributes passed inline to the component
         */
        return ["text", "speed", "depends-on-selector", "make-mistakes", "styles", "classes", "finished"];
    }

    get text() {
        return this.getAttribute("text") ?? null;
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

    get styles() {
        return this.getAttribute("styles") ?? null;
    }

    get classes() {
        return this.getAttribute("classes") ?? null;
    }

    get finished() {
        return this.getAttribute("finished") ?? null;
    }

    get restart() {
        return this.getAttribute("restart") ?? null;
    }

    async connectedCallback() {
        /**
         * The magic starts here
         */
        if (this.styles !== null && this.classes !== null) {
            const $styleList = this.styles.split(",");

            $styleList.forEach(($item) => {
                const style = document.createElement("style");
                style.innerHTML = `@import "${$item}"`;

                this.shadowRoot.appendChild(style);
            });

            const parentDiv = this.shadowRoot.getElementById("to-write");
            parentDiv.setAttribute("class", this.classes);
        }

        if(this.dependsOnSelector !== null) {
            const component = document.querySelector(this.dependsOnSelector)
            if(component !== undefined && (component.tagName === "TEXT-WRITER" || component.tagName === "CODE-WRITER")) {
                // this.addEventListener("finishedWriting", (e) => {
                //     const base = new TextWriter(this);
                //     base.writeLikeAHuman("to-write");
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

                                const base = new TextWriter(this);
                                base.writeLikeAHuman("to-write");
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
            const base = new TextWriter(this);
            base.writeLikeAHuman("to-write");
        }
    }
}

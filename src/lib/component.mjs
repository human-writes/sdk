export default class WriterComponent extends HTMLElement {
    constructor() {
        super();
    }

    static get observeAttributes() {
        /**
         * Attributes passed inline to the component
         */
        return [
            "source",
            "speed",
            "depends-on-selector",
            "make-mistakes",
            "styles",
            "classes",
            "finished"
        ];
    }

    get source() {
        return this.getAttribute("source") ?? null;
    }

    get speed() {
        return this.getAttribute("speed") ?? 60;
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

        if (this.dependsOnSelector !== null) {
            const component = document.querySelector(this.dependsOnSelector);
            if (
                component !== undefined &&
                (component.tagName === "TEXT-WRITER" ||
                    component.tagName === "CODE-WRITER")
            ) {
                // Options for the observer (which mutations to observe)
                const config = { attributes: true };

                // Callback function to execute when mutations are observed
                // Create an observer instance linked to the callback function
                const observer = new MutationObserver(
                    (mutationList, observer) => {
                        for (const mutation of mutationList) {
                            if (
                                mutation.type === "attributes" &&
                                mutation.attributeName === "finished"
                            ) {
                                if (component.finished) {
                                    observer.disconnect();
                                    this.writeLikeAHuman();
                                }
                            }
                        }
                    }
                );

                // Start observing the target node for configured mutations
                observer.observe(component, config);
            }
        } else {
            this.writeLikeAHuman();
        }
    }

    writeLikeAHuman() {}
}

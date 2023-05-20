import TextWriter from "./text-writer.class.mjs"

export default class TextWriterComponent extends HTMLElement {

    constructor() {
        super();

        this.text
        this.attachShadow({mode: 'open'})
        this.shadowRoot.innerHTML = `
<div class="text-snippet">
    <div class="to-be-written">
        <div id="to-write"></div>
    </div>
</div>
`

        const slots = this.shadowRoot.querySelectorAll('slot')
        if (slots.length) {
            slots[0].addEventListener('slotchange', event => {
                console.dir(slots[0].assignedNodes())
            })
        }

    }

    static get observeAttributes() {
        /**
         * Attributes passed inline to the component
         */
        return ['text']
    }

    get text() {
        return this.getAttribute('text') ?? null
    }

    get styles() {
        return this.getAttribute('styles') ?? null
    }

    get classes() {
        return this.getAttribute('classes') ?? null
    }

    async connectedCallback() {
        /**
         * The magic starts here
         */
        if (this.styles !== null && this.classes !== null) {
            const $styleList = this.styles.split(',')

            $styleList.forEach($item => {
                const style = document.createElement('style')
                style.innerHTML = `@import "${$item}"`

                this.shadowRoot.appendChild(style)
            })

            const parentDiv = this.shadowRoot.getElementById('to-write')
            parentDiv.setAttribute('class', this.classes)
        }

        const base = new TextWriter(this)
        base.writeLikeAHuman('to-write')

    }
}

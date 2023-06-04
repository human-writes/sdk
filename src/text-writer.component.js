import Writer from "./lib/writer.js";
import WriterComponent from "./lib/component.js";

export default class TextWriterComponent extends WriterComponent {
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

    writeLikeAHuman() {
        const base = new Writer(this);
        base.writeLikeAHuman("to-write");
    }
}

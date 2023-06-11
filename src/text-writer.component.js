import { Writer } from "./lib/writer.js";
import WriterComponent from "./writer-component.js";

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

  onFinishedWriting(html) {

    // Raise an event outside the shadow DOM
    // when all is done and ready
    const finishedEvent = new CustomEvent("finishedWriting", {
      bubbles: true,
      composed: true,
      detail: {
        content: html
      }
    });
    this.dispatchEvent(finishedEvent);
    this.setAttribute("finished", "true");
  }

  async writeLikeAHuman() {
    const onFinished = this.onFinishedWriting.bind(this)
    const tw = new Writer(this.shadowRoot, this.source, this.speed, this.makeTypos, onFinished);
    await tw.writeLikeAHuman("to-write");
  }
}

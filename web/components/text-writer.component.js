import {Writer} from "../../core/writer.js";
import WriterComponent from "./writer-component.js";

export default class TextWriterComponent extends WriterComponent {
  constructor() {
    super();

    this.attachShadow({mode: "open"});
    this.shadowRoot.innerHTML = `
<style>
.text-snippet {
    display: flex;
    font-size: small;
    width: ${this.mobileWidth};
}

.text-snippet .to-be-written {
    display: flex;
    position: absolute;
    width: inherit;
}

.text-snippet .to-write {
    width: fit-content;
}

.text-snippet div, p, span, textarea {
    -tab-size: 4;
    -o-tab-size: 4;
    -moz-tab-size: 4;
}

@media (min-width: 1024px) {
    .text-snippet {
        width: ${this.desktopWidth};
    }
}
</style>

<div class="text-snippet">
    <div class="to-be-written">
        <div class="to-write"></div>
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
    const onFinished = this.onFinishedWriting.bind(this);
    const tw = new Writer(
      this.shadowRoot,
      this.source,
      this.speed,
      this.makeTypos,
      onFinished
    );
    await tw.writeLikeAHuman("div.to-write");
  }
}

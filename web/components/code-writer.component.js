import {Writer} from "../../core/writer.js";
import WriterComponent from "./writer-component.js";

export default class CodeWriterComponent extends WriterComponent {
  constructor() {
    super();

    this.attachShadow({
      mode: "open"
    });
    this.shadowRoot.innerHTML = `
<style>
.code-snippet {
    display: flex;
    font-size: small;
    width: ${this.mobileWidth};
}

.code-snippet .to-be-placed {
    display: block;
    position: relative;
    float: left;
    width: inherit;
}

.code-snippet .to-place {
    display: block;
    position: relative;
    float: left;
    width: inherit;
}

.code-snippet .to-be-written {
    display: flex;
    position: absolute;
    width: inherit;
}

.code-snippet .to-write {
    width: inherit;
}

.code-snippet div, p, span, textarea {
    -tab-size: 4;
    -o-tab-size: 4;
    -moz-tab-size: 4;
}

@media (min-width: 1024px) {
    .code-snippet {
        width: ${this.desktopWidth};
    }
}
</style>

<div class="code-snippet">
    <div class="to-be-placed">
        <pre class="to-place"><code></code></pre>
    </div>
    <div class="to-be-written">
        <pre class="to-write"><code></code></pre>
    </div>
</div>
`;
  }

  static get observeAttributes() {
    /**
     * Attributes passed inline to the component
     */
    const parentAttributes = super.observeAttributes();

    return Array.prototype.concat(parentAttributes, [
      "use-highlight-js",
      "theme",
      "language",
      "snippet-width"
    ]);
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

  async connectedCallback() {
    /**
     * Integrate highlightJs
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
        `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/${$theme}.css`
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

    await super.connectedCallback();
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
    const cw = new Writer(
      this.shadowRoot,
      this.source,
      this.speed,
      this.makeTypos,
      onFinished
    );
    await cw.writeLikeAHuman("pre.to-write code", "pre.to-place code");
  }
}

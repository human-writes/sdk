/* eslint-disable import/extensions */
import CodeWriterComponent from "./src/code-writer.component.mjs";
import TextWriterComponent from "./src/text-writer.component.mjs";

export default function index() {
  class F {
    constructor() {
      customElements.define("code-writer", CodeWriterComponent);
      customElements.define("text-writer", TextWriterComponent);
    }
  }

  return new F();
}

index();

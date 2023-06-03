import CodeWriterComponent from "./src/code-writer.component.mjs";
import TextWriterComponent from "./src/text-writer.component.mjs";

export default function index() {
  customElements.define("code-writer", CodeWriterComponent);
  customElements.define("text-writer", TextWriterComponent);
}

index();

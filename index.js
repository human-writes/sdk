import CodeWriterComponent from "./src/code-writer.component.js";
import TextWriterComponent from "./src/text-writer.component.js";

export default function index() {
  customElements.define("code-writer", CodeWriterComponent);
  customElements.define("text-writer", TextWriterComponent);
}

index();

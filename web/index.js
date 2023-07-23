import CodeWriterComponent from "./components/code-writer.component.js";
import TextWriterComponent from "./components/text-writer.component.js";

export default function index() {
    customElements.define("code-writer", CodeWriterComponent);
    customElements.define("text-writer", TextWriterComponent);
}

index();

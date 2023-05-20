import CodeWriterComponent from "./src/code-writer.component.mjs"
import TextWriterComponent from "./src/text-writer.component.mjs"

export default function index() {
    const F = function() {

    } 
    F.prototype.declare = function() {
        customElements.define('code-writer', CodeWriterComponent);
        customElements.define('text-writer', TextWriterComponent);
    }

    return new F()
}

index().declare()

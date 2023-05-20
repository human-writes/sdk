import CodeWriterComponent from "./src/code-writer.component.mjs"

export default function index() {
    const F = function() {

    } 
    F.prototype.declare = function() {
        customElements.define('code-writer', CodeWriterComponent);
    }

    return new F()
}

index().declare()

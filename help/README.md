# Help

## Troubleshooting Q&A

### Chaining the components

**Q**: I've chained two components but none is starting, what happens?

**A**: Either the components reference each other or one is referencing an element selector that doesn't exist in the
rendered DOM.

### Using highlight.JS

**Q**: I've set several **CodeWriter**.components in the same view. If I set different themes, why the last one applies
to
all components?

**A**: It's a known issue, and it may not be fixed soon since it's highly relying on how highlight.JS works.

### Setting the source property

**Q**: I've set a code snippet as source of **TextWriter**. Why doesn't it display the text as expected?

**A**: It's really not recommended to set a code snippet as source of  **TextWriter** since it writes real HTML tags to
benefit from the styles. The code between the tags can produce an unexpected result especially if you have the
**&lt;script&gt;** tag inside. However, pure HTML works fine. In a future version,  **TextWriter** will raise an
error if it encounters the **&lt;script&gt;** tag.

At the opposite, you can set a text as source of **CodeWriter**, but note that the tags won't be translated and the text
will be written inside a **&lt;code&gt;** tag.

[Back to main README](../README.md)

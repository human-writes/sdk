![human-writes](assets/human-writes-logo_128px.png)

# HumanWrites

## What is it?

This package is a set of two components **TextWriter** and **CodeWriter** which imitate the human writing style on a
keyboard.

They are available as web components and as a Vue3 plugin.

![3rd party logos](assets/human-writes_3rdparty_small.png)

## Use cases

### TextWriter

You have a text block to describe the features of a project, to promote a product or to introduce a longer text.
TextWriter can help you to catch the attention of the visitor on this part of your site.

### CodeWriter

You have an IT oriented technical documentation, and you want to share code snippets.

## Installation and usage

[Web components](web/README.md)

[Vue3 plugin](vue/README.md)

## How does it work?

### TextWriter

The component writes raw and HTML text. When an HTML tag is found the style of this tag is applied to the text.

### CodeWriter

CodeWriter does almost the same job as TextWriter except it follows code syntax workflow by opening and closing brackets
before
it writes code in between.

The component writes HTML text inside a _pre_ tag embedding a _code_ tag for the decoration. When a tag is found it is
written as is and not interpreted.

CodeWriter manages the opening and closing of:

- tags,
- parenthesis,
- brackets,
- curly brackets,
- single quotes,
- double quotes.

It also works for tags within quotes, for instance when a component attribute holds a bit of code.

CodeWriter supports code highlighting thanks to HighlightJS library integration.

### Common features and properties

Both components also propose to:

- make typos :angry:
- correct typos right away :smile:
- chain two components, or more, together: For instance, with 2 components, if the second
  references the first it starts when the first finishes.
- write at random speed: The speed is computed from 25% faster to 75% slower than the given speed parameter.

The writing speed depends on the delay between two charaters plus the process time to determine the character to
display. The delay is 60 milliseconds by default.

You can access these features via the following properties:

- source: _**string**_, URI of the text to write,
- make-typos: _**boolean**_, enable typos if *true*, defaults to *false*,
- depends-on-selector: _**string**_, DOM query selector to chain components together,
- speed: _**number**_ between 0 and 80, delay in milliseconds between each written character,
- styles:  _**string**_, comma separated list of relative URI of CSS files to import,
- classes: _**string**_, comma separated list of CSS classes imported by styles,

```html

<text-writer
        name="hello"
        source="/texts/introduction.html"
        speed="20"
        make-typos="true"
        styles="/css/index.css,/css/app.css"
        classes="App-content"
>
</text-writer>
```

### CodeWriter reserved features and properties

Only CodeWriter can benefit of syntax coloration. It works with these properties:

- use-highlight-js: _**boolean**_, enable syntax coloration if *true*, defaults to *false*,
- language: _**string**_, apply a highlightJS language style, only if *use-highlight-js* is *true*, defaults to *HTML*
- theme: _**string**_, apply a highlightJS theme style, only if *use-highlight-js* is *true*, defaults to *none*

```html

<code-writer
        depends-on-selector="text-writer[name='hello']"
        source="/my-block-of-code.html"
        use-highlight-js="true"
        theme="base16/monokai"
        language="php"
>
</code-writer>
```

### Nota bene

The above documentation is shared among web components and Vue3 plugin since the code base of the components is the
same, but both solutions differ on implementation and how they render in the DOM. See the specific README for more info.

## Appendix

[Q & A](help/README.md)

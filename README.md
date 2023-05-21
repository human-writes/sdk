# Human Writes

## What does it do?

HumanWrites is a package embedding 2 webcomponents TextWriter and CodeWriter which imitate the human writing style on a keyboard.

### Features

TextWriter writes raw and HTML text, when an HTML is found the style of this tag is applied to the text.

CodeWriter writer HTML text inside a _pre_ tag embedding a _code_ for the decoration. When a tag is found it's written as is and not interpreted.

CodeWriter supports code highlighting thanks to HighlightJS library integration.

Both component also propose to:
- make mistakes :angry:
- correct mistakes right away :smile:

## Insstallation

### As a module

These components are designed for use with browser only. However, if you have a NodeJS based project you can get the module:

```bash
npm install human-writes
```

or 

```bash
yarn add human-writes
```

The module is built with webpack so you can find the actual script in _node_modules/human-writes/dist/bundle.js_.

### As a script in a page

You can also find the script on the official site https://human-writes/latest/human-writes.js.

```html
<script src="https://human-writes/latest/human-writes.js"></script>
```

## Use cases

### TextWriter

Imagine you have a block of text to describe the features of a project, to promote a product or to introduce a longer text. TextWriter can help to get the attention of the visitor on this part of your site.

#### Implementation

Store your block of text in a place accessible by URL and declare it as a source of the webcomponent.

```html
<text-writer source="/my-block-of-text.html"><text-writer>
```

### CodeWriter

You have an IT oriented technical documentation and you want to share code snipptes. This is a quite common use-case nowadays.

CodeWriter does the same job as TextWriter except it follows code syntax workflow by opening and closing brackets before it actually writes code in between. It also implement code highlighting. All resources of the HighlightJS library are requested inside the webcomponent, so you don't have to worry about them.

#### Implementation

Store your block of code in a place accessible by URL and declare it as a source of the webcomponent.

```html
<code-writer 
    source="/my-block-of-code.html"
    use-highlight-js="true"
    theme="base16/monokai"
    language="php"
    >
<code-writer>
```

The use of HighlightJS library is disabled by default so you have to declare it to _true_ to use it. Once enabled, you can pass the _theme_ and the _language_ parameters. Default values are respectively **"base16/monokai"** and **"html"**.


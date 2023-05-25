# Human Writes

## What does it do?

HumanWrites is a package embedding 2 webcomponents TextWriter and CodeWriter which imitate the human writing style on a keyboard.

### Features

TextWriter writes raw and HTML text, when an HTML tag is found the style of this tag is applied to the text.

CodeWriter writes HTML text inside a _pre_ tag embedding a _code_ tag for the decoration. When a tag is found it is written as is and not interpreted.

CodeWriter supports code highlighting thanks to HighlightJS library integration. All resources of the HighlightJS library are requested inside the webcomponent, so you do not have to worry about them.

Both components also propose to:
- make mistakes :angry:
- correct mistakes right away :smile:

## Live demo

Go to https://human-writes.io/ to see how they work. Look at the page source to see the implementations.

## Installation

### As a script in a page

You can also find the script here https://www.human-writes.io/js/human-writes/latest/human-writes.min.js.

Add this line in the head section of your page:

```html
<script src="https://www.human-writes.io/js/human-writes/latest/human-writes.min.js"></script>
```

### As a module

These components are designed for use with browser only. However, if you have a NodeJS based project you can get the module:

```bash
npm i human-writes
```

or 

```bash
yarn add human-writes
```

The module is built with webpack so you can find the actual script in _node_modules/human-writes/dist/human-writes.min.js_.


## Use cases

### TextWriter

Imagine you have a block of text to describe the features of a project, to promote a product or to introduce a longer text. TextWriter can help you to catch the attention of the visitor on this part of your site.

#### Implementation

Store your block of text in a place accessible by URL and declare it as a source of the webcomponent.

```html
<text-writer 
    source="/my-block-of-text.html" 
    speed="20"
    make-mistakes="true" 
    styles="/css/index.css,/css/app.css" 
    classes="App-content" 
>
</text-writer>

```

### CodeWriter

You have an IT oriented technical documentation, and you want to share code snippets. This is a quite common use-case nowadays.

CodeWriter does the same job as TextWriter except it follows code syntax workflow by opening and closing brackets before it writes code in between.

#### Implementation

Store your block of code in a place accessible by URL and declare it as a source of the webcomponent.

```html
<code-writer 
    source="/my-block-of-code.html"
    use-highlight-js="true"
    theme="base16/monokai"
    language="php"
>
</code-writer>
```

The use of HighlightJS library is disabled by default so you must declare it to _true_ to use it. Once enabled, you can pass the _theme_ and the _language_ as parameters. Default values are respectively **"base16/monokai"** and **"html"**. Find more themes and languages on https://highlightjs.org.

## State of the project

Feel free to send me feedback of your experience to _ohmyinbox99_at_gmail_dot_com_ (yes that's it).

## Changelog

v0.5.47 - Update this README with the demo site.
v0.5.46 - Fix a bug that prevented CodeWriter from working in some cases.

## Roadmap

New features to come:

- add events to interact between two components,
- raise an event when a specific word is found,
- can write at random speed.
- and more...

## License

HumanWrites is under General Public License version 3.

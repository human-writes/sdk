![human-writes](assets/human-writes-logo_128px.png)

# HumanWrites

## What is it?

This package is a set of two components TextWriter and CodeWriter which imitate the human writing style on a keyboard.

They are available as web components and as a Vue3 plugin.

![3rd party logos](assets/human-writes_3rdparty_small.png)

## Use cases

### TextWriter

You have a text block to describe the features of a project, to promote a product or to introduce a longer text.
TextWriter can help you to catch the attention of the visitor on this part of your site.

### CodeWriter

You have an IT oriented technical documentation, and you want to share code snippets. This is a quite common use-case
nowadays.

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

CodeWriter supports code highlighting thanks to HighlightJS library integration. All resources of the HighlightJS
library are requested inside the web component, so you do not have to worry about them.

### Common features

The writing speed depends on the delay between two charaters plus the process time to determine the character to
display. The delay is 60 milliseconds by default.

Both components also propose to:

- make typos :angry:
- correct typos right away :smile:
- chain two components with the parameter _depends-on-selector_: For instance, with 2 components, if the second
  references the
  first it starts when the first finishes.
- write at random speed: The speed is computed from 25% faster to 75% slower than the given speed parameter.

### What will never work

You cannot set a code snippet as source of TextWriter, it will not write what you expect and won't raise an error for
it.

You can set a text as source of CodeWriter, but it will not be as readable as expected and won't raise an error for it.

## Help

[Help](help/README.md)

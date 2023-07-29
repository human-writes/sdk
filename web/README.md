![Web components](../assets/webcomponents_128px.png)

# The web components

The web component solution is mostly preferable for backend oriented applications that don't share a setup with NodeJS
or that generate fully static HTML sites.

## Installation

You can find the script here https://www.human-writes.io/js/human-writes/latest/human-writes.min.js.

Add this line in the head section of your page:

```html

<script src="https://www.human-writes.io/js/human-writes/latest/human-writes.min.js"></script>
```

## Implementation

Let's say you have a PHP project tree looking like this:

```text
/app/
|── components/
|   └── My.phtml    
└── App.phtml
/public/
|── css/
|   └── index.css
|   └── app.css
|── snippets/
|   └── code.html
|── texts/
|   └── introduction.html
|── bootstrap.php    
└── index.php    
/vendor/
composer.json
```

### TextWriter

Example of **TextWriter** web component.

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

As opposed to the **Vue3** plugin, **TextWriter** web component cannot handle the text as a innerHTML content.

### CodeWriter

Example of **CodeWriter** web component.

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

### Chaining the components

As you can note in CodeWrite sample, we use

    depends-on-selector="text-writer[name='hello']"

This directive will tell the component to wait for the component of type **text-writer** with name "hello" to finish
writing the text. **TextWriter** can wait for **CodeWriter** and vice versa. Two components waiting for the same
component will start at once.

## Live demo

Go to https://human-writes.io/ to see how they work. Look at the page source to see the implementations.

[Back to main README](../README.md)

![Vue3 plugin](../assets/vue-logo_128px.png)

# The Vue3 plugin

If you have a Vue3 based project you will surely prefer to use the Vue3 plugin.

## Installation

```bash
npm install human-writes
```

or

```bash
yarn add human-writes
```

## Application setup

In your main.js or main.ts add:

```javascript
import {VueWriterPlugin} from 'human-writes/vue'

const app = createApp(App)
app.use(VueWriterPlugin, {speed: 40, makeTypos: false})
```

You can then place both TextWriter and CodeWriter anywhere in the application without declaring them.
Example of Vue3 component with TextWriter only:

```html

<template>
    <div>
        <text-writer>
            <h1 class="green">Hello World!</h1>
        </text-writer>
    </div>
</template>
```

## Implementation

Let's say you have a Vue3 project tree looking like this:

```text
/public/
|── snippets/
|   └── code.html
└── texts/
    └── introduction.html
/src/
|── components/
|   └── My.vue    
|── App.vue
└── main.js
index.html
```

### Using TextWriter

Where _My.vue_ could implement a TextWriter component like this:

```html

<template>
    <div>
        <text-writer
                id="hello"
                source="/texts/introduction.html"
        >
        </text-writer>
    </div>
</template>
```

If the text is simple, you can just set it within the component as follows:

```html

<template>
    <div>
        <text-writer id="hello">
            <h1>Hello world!</h1>
        </text-writer>
    </div>
</template>
```

### Using CodeWriter

As opposed to TextWriter component, CodeWriter cannot handle code snippets as innerHTML content, the remote resource URL
is mandatory.

```html

<code-writer
        depends-on-selector="#hello"
        source="/snippets/code.html"
        use-highlight-js="true"
        theme="base16/monokai"
        language="php"
>
</code-writer>
```

Note that when using the Vue3 plugin, as opposed to web components, you cannot point the component by its tag name since
Vue3 only renders the content
of the component. The attributes of the Vue3 plugin are transferred to the first child of the plugin content which is a
div.

### Chaining the components

As you can note in CodeWrite sample, we use

    depends-on-selector="#hello"

This directive will tell the component to wait for the component with id "Hello" to finish writing the text. TextWriter
can wait for CodeWriter and vice versa.

## Playing the demo

Download the zip archive:

```sh
wget https://github.com/ephect-io/human-writes/archive/refs/heads/main.zip
unzip main.zip
cd human-writes-main
```

or clone the repo as anonymous:

```sh
git clone https://github.com/ephect-io/human-writes.git
cd human-writes
```

install the modules and launch the demo app

```sh
npm install
npm run demo
```

You can now start discovering all the features by changing the code.

[Back to main README](../README.md)

<template>
  <div class="human-writes">
    <div>
      <text-writer
        id="hello-text"
        :make-typos="true"
        :speed="40"
        classes="App-content"
        name="text-intro"
        source="/texts/ad.html"
        styles="/css/main.css,/css/media/desktop.css,/css/media/other.css"
      >
      </text-writer>
    </div>
    <div>
      <code-writer
        :make-typos="true"
        :speed="80"
        :use-highlight-js="true"
        depends-on-selector="#text-intro"
        language="php"
        source="/snippets/hello-world.vue"
        styles="https://code.cdn.mozilla.net/fonts/fira.css"
      >
      </code-writer>
    </div>
  </div>
</template>
<script lang="ts" setup>
import 'human-writes/style.css'
</script>

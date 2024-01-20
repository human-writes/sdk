<template>
  <div class="human-writes">
    <div class="div1">
      <text-writer
          name="text-intro"
          source="/texts/ad.html"
          speed="40"
          classes="App-content"
      />
    </div>
    <div class="div2">
      <code-writer
          depends-on-selector="div[name='text-intro']"
          language="javascript"
          source="/snippets/hello-world.vue"
          speed="50"
          :use-highlight-js="true"
          styles="https://code.cdn.mozilla.net/fonts/fira.css"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import 'human-writes/style.css'
</script>

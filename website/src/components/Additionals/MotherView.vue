<template>
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <title><slot name="title"> Mother! </slot></title>
      <link href="https://code.cdn.mozilla.net/fonts/fira.css" rel="stylesheet" />
      <link href="https://fonts.googleapis.com" rel="preconnect" />
      <link crossorigin href="https://fonts.gstatic.com" rel="preconnect" />
      <link href="https://fonts.googleapis.com/css2?family=Amita" rel="stylesheet" />
      <link
        href="https://fonts.googleapis.com/css2?family=Pathway+Extreme:wght@100;200;400;700;900"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Orbitron:wght@100;200;400;700;900"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@100;200;400;700;900"
        rel="stylesheet"
      />
      <slot name="stylesheets"></slot>
    </head>

    <body>
      <div class="container">
        <HeaderAndFooter>
          <slot></slot>
        </HeaderAndFooter>
      </div>
      <slot name="javascripts"></slot>
    </body>
  </html>
</template>
<script lang="ts" setup>
import HeaderAndFooter from '@/components/Additionals/HeaderAndFooter.vue'
</script>

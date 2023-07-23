<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="greetings">
    <text-writer id="text-you-did" speed="40">
      <h1 class="green">{{ msg }}</h1>
    </text-writer>

    <text-writer depends-on-selector="#text-you-did" name="text-world" speed="40">
      <h3>You’ve successfully created</h3>
      <h3>a project with <span class="green">VueWriterPlugin</span></h3>
    </text-writer>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>

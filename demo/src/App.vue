<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div class="mother">
    <header>
      <img alt="Vue logo" class="logo" height="125" src="@/assets/logo.svg" width="125" />

      <div class="wrapper">
        <HelloWorld msg="You did it!" />
      </div>
    </header>

    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.mother {
  display: flex;
  align-items: stretch;
  flex-direction: column;
  width: 100%;
  padding: 32px;
}

header {
  display: flex;
  line-height: 1.5;
  max-height: 100vh;
  place-items: center;
  flex-direction: column;
}

main {
  display: flex;
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  .mother {
    display: flex;
    align-items: stretch;
    flex-direction: row;
  }

  header {
    display: flex;
    place-items: center;
    flex-direction: row;
    width: 50%;
  }

  main {
    display: flex;
    line-height: 1.5;
    max-height: 100vh;
    width: 50%;
  }

  .logo {
    margin: 0 2rem 0 2rem;
  }

  header .wrapper {
    flex-wrap: wrap;
  }
}
</style>

<template>
  <MotherView>
    <template #title>Ephect in action !</template>
    <template #stylesheets>
      <link href="/css/style.css" rel="stylesheet" />
    </template>

    <div class="content">
      <div class="workspace">
        <Title />
      </div>

      <div class="header-space"></div>
    </div>

    <div class="content2">
      <div></div>
      <HelloWorld />
    </div>
  </MotherView>
</template>
<script lang="ts" setup>
import MotherView from '@/components/Additionals/MotherView.vue'
import HelloWorld from '@/components/TutorialOne/HelloWorld.vue'
import Title from '@/components/Additionals/Title.vue'
</script>

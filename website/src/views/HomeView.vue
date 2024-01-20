<template>
  <MotherView>
    <div class="content">
      <div class="workspace">
        <div class="logo"></div>
        <Title />
      </div>

      <div class="header-space"></div>
    </div>

    <div class="content2">
      <HelloWorld />
    </div>
  </MotherView>
</template>
<script lang="ts" setup>
import '../assets/media/desktop.css'
import '../assets/media/other.css'
import '../assets/svg/root.css'
import '../assets/svg/logo.css'

import MotherView from '@/components/Additionals/MotherView.vue'
import HelloWorld from '@/components/TutorialOne/HelloWorld.vue'
import Title from '@/components/Additionals/Title.vue'
</script>

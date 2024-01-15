<template>
  <HeaderView />
  <slot></slot>
  <FooterView />
</template>
<script lang="ts" setup>
import HeaderView from '@/components/Additionals/HeaderView.vue'
import FooterView from '@/components/Additionals/FooterView.vue'
</script>

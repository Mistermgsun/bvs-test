<script setup>
import { RouterView } from 'vue-router'
import HeaderComponent from './components/HeaderComponent.vue'
import OffCanvasComponent from './components/OffCanvasComponent.vue'
import FooterComponent from './components/FooterComponent.vue'
</script>

<template>
  <HeaderComponent />
  <OffCanvasComponent />
  <RouterView />
  <FooterComponent />
</template>

<style scoped></style>

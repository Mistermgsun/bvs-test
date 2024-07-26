<script setup>
import { ref, watch } from 'vue'
import { isOpen } from '../eventBus'

const offcanvasMenu = ref(null)

watch(isOpen, (newVal) => {
  if (offcanvasMenu.value) {
    if (newVal) {
      offcanvasMenu.value.classList.remove('close')
      offcanvasMenu.value.classList.add('open')
    } else {
      offcanvasMenu.value.classList.remove('open')
      offcanvasMenu.value.classList.add('close')
    }
  }
})
</script>

<template>
  <div ref="offcanvasMenu" class="offcanvas-menu"></div>
</template>

<style scoped lang="scss">
.offcanvas-menu {
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: var(--fifth-color);
  z-index: 998;
  visibility: hidden;
  transition: visibility 0.6s step-end; /* Transizione per visibilità */
  animation: swipeOut 0.6s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;

  &.open {
    visibility: visible;
    transition: visibility 0s step-start; /* Transizione per visibilità */
    animation: swipeIn 0.6s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
  }

  &.close {
    visibility: hidden;
    transition: visibility 0.6s step-end; /* Transizione per visibilità */
    animation: swipeOut 0.6s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
  }
}

@keyframes swipeIn {
  0% {
    -webkit-clip-path: polygon(101% 0, 100% 0, 101% 100%, 116% 100%);
    clip-path: polygon(101% 0, 100% 0, 101% 100%, 116% 100%);
  }

  100% {
    -webkit-clip-path: polygon(0 0, 101% 0, 101% 101%, 0 101%);
    clip-path: polygon(0 0, 101% 0, 101% 101%, 0 101%);
  }
}

@keyframes swipeOut {
  0% {
    -webkit-clip-path: polygon(0 0, 101% 0, 101% 101%, 0 101%);
    clip-path: polygon(0 0, 101% 0, 101% 101%, 0 101%);
  }

  100% {
    -webkit-clip-path: polygon(101% 0, 100% 0, 101% 100%, 116% 100%);
    clip-path: polygon(101% 0, 100% 0, 101% 100%, 116% 100%);
  }
}
</style>

<script setup>
import { isOpen, toggleMenu } from '../eventBus'

const handleClick = () => {
  toggleMenu()
}
</script>

<template>
  <div class="hamburger-box" @click="handleClick" :class="{ open: isOpen }">
    <div class="hamburger-box__line"></div>
  </div>
</template>

<style scoped lang="scss">
@import '../assets/functions.scss';

.hamburger-box {
  width: 40px;
  height: 24px;
  transition-duration: 0.4s;
  opacity: 0;
  display: none;
  position: relative;
  scale: 0.8;

  &__line,
  &::before,
  &::after {
    content: '';
    height: 2px;
    background-color: var(--primary-color);
    width: 100%;
    transition-duration: 400ms;
    transition-property: all;
    position: absolute;
    will-change: transform;
    transition-timing-function: ease;
    border-radius: 4px;
    top: 0;
  }

  &::before {
    top: 10px;
  }

  &::after {
    top: 20px;
  }

  &.open {
    .hamburger-box__line {
      transform: translate3d(0, 10px, 0) rotate(-45deg);
    }

    &::before {
      opacity: 0;
    }

    &::after {
      transform: translate3d(0, -10px, 0) rotate(45deg);
    }
  }
}

@media screen and (max-width: 992px) {
  .hamburger-box {
    opacity: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>

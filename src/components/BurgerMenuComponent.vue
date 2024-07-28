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
  width: var(--burder-width);
  height: var(--burger-height);
  transition-duration: 0.4s;
  opacity: 0;
  display: none;
  position: relative;

  &__line,
  &::before,
  &::after {
    content: '';
    height: var(--burger-line-height);
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
    top: calc(100% / 2);
  }

  &::after {
    top: 100%;
  }

  &.open {
    .hamburger-box__line {
      transform: translate3d(0, calc(var(--burger-height) / 2), 0) rotate(-45deg);
    }

    &::before {
      opacity: 0;
    }

    &::after {
      transform: translate3d(0, calc(-1 * (var(--burger-height) / 2)), 0) rotate(45deg);
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

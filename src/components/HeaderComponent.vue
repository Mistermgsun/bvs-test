<script>
import BurgerMenuComponent from './BurgerMenuComponent.vue'

export default {
  data() {
    return {
      menuItems: [
        { label: 'Home', url: '/' },
        { label: 'Chi siamo', url: '/chi-siamo' },
        { label: 'Eventi', url: '/eventi' },
        { label: 'Prenota', url: '/prenota' },
        { label: 'Contatti', url: '/contatti' }
      ],
      currentPage: '',
      isMenuOpen: false
    }
  },
  components: {
    BurgerMenuComponent
  },
  created() {
    this.updateCurrentPage()
  },
  methods: {
    handleToggle(isOpen) {
      this.isMenuOpen = isOpen
    },
    updateCurrentPage() {
      const currentRoute = this.$route.path
      const currentItem = this.menuItems.find((item) => item.url === currentRoute)
      this.currentPage = currentItem ? currentItem.label : ''
    }
  },
  watch: {
    $route() {
      this.updateCurrentPage()
    }
  }
}
</script>

<template>
  <div class="header">
    <div class="header__content">
      <div class="header__content__right">
        <RouterLink to="/"> </RouterLink>
      </div>
      <div class="header__content__center">
        <ul class="header__menu hide-custom-cursor">
          <li
            v-for="(menuItem, index) in menuItems"
            :key="index"
            :class="{ 'current-item': menuItem.label === currentPage }"
          >
            <RouterLink :to="menuItem.url">{{ menuItem.label }}</RouterLink>
          </li>
        </ul>
      </div>
      <div class="header__content__left">
        <BurgerMenuComponent @toggle="handleToggle" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '../assets/functions.scss';

.header {
  background-color: var(--fifth-color);
  height: responsive-size(8, 6);
  position: relative;
  z-index: 999;

  .header__content {
    width: 100%;
    max-width: var(--page-width);
    display: flex;
    align-items: center;
    padding-left: var(--padding-horizontal);
    padding-right: var(--padding-horizontal);

    &__right {
      justify-content: flex-start;
      display: flex;
    }

    &__center {
      display: flex;
      justify-content: center;
      flex: 1;

      .header__menu {
        display: flex;
        gap: 3rem;

        li {
          list-style: none;
          position: relative;

          &::after {
            width: 0%;
            height: 1px;
            background-color: var(--primary-color);
            opacity: 0;
            transition-duration: 0.4s;
            position: absolute;
            left: 0px;
            bottom: -5px;
            content: '';
          }

          &:hover::after {
            width: 100%;
            opacity: 1;
          }

          a {
            text-decoration: none;
            color: var(--primary-color);
            text-transform: uppercase;
            font-size: 1.5rem;
          }
        }

        li.current-item {
          &::after {
            width: 100%;
            opacity: 1;
          }
        }
      }
    }

    &__left {
      display: flex;
      justify-content: flex-end;
    }
  }
}

@media screen and (max-width: 992px) {
  .header__menu,
  .header__action {
    display: none !important;
  }
}
</style>

<script>
import BookingComponent from '@/components/BookingComponent.vue'

export default {
  components: {
    BookingComponent
  }
}
</script>

<template>
  <section>
    <div class="inner-content">
      <BookingComponent />
    </div>
  </section>
</template>

<style scoped lang="scss">
.inner-content {
  align-items: center;
}
</style>

import { ref } from 'vue'

export const isOpen = ref(false)
export const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

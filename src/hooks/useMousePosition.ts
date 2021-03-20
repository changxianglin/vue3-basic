import {ref, onMounted, onUnmounted } from 'vue'

function useMousePosition() {
  const x = ref(0)
  const y = ref(0)
  const updatedMouse = (e: MouseEvent) => {
    x.value = e.pageX
    y.value = e.pageY
  }
  onMounted(() => {
    document.addEventListener('click', updatedMouse)
  })
  onUnmounted(() => {
    document.removeEventListener('click', updatedMouse)
  })

  return {x, y}
}

export default useMousePosition
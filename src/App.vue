<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <h1>{{count}}</h1>
  <h1>{{double}}</h1>
  <ul>
    <li v-for="number in numbers" :key="number">
      <h1>{{number}}</h1>
    </li>
  </ul>
  <h1>{{person.name}}</h1>
  <h1>{{greetings}}</h1>
  <h1 v-if="loading">Loading!......</h1>
  <img v-if="loaded" :src="result[0].url" >
  <h1>X: {{x}}, Y: {{y}}</h1>
  <modal />
  <button @click="increase">+1</button>
  <button @click="updateGreeting">Update Title</button>
</template>

<script lang="ts">
import { 
  ref, computed, reactive, 
  toRefs, onMounted, onUpdated, 
  onRenderTriggered, onUnmounted, watch } from 'vue'
import { w, mount } from './utils'
import useMousePostion from './hooks/useMousePosition'
import useURLLoader from './hooks/useURLoader'
import modal from './components/Modal.vue'
interface DataProps {
  count: number;
  double: number;
  increase: () => void;
  numbers: number[];
  person: {name?: string};
}
interface DogResult {
  message: string;
  status: string;
}
interface CatResult {
  id: string;
  url: string;
  width: number;
  height: number;
}
export default {
  name: 'App',
  components: {
    modal,
  },
  setup() {
    // const count = ref(0)
    // const double = computed(() => {
    //   return count.value * 2
    // })
    // const increase = () => {
    //   count.value++
    // }
    mount(() => {
      console.log('mounted')
    })
    onUpdated(() => {
      console.log('updated')
    })
    onRenderTriggered((event) => {
      console.log(event)
    })
    const data: DataProps = reactive({
      count: 0,
      increase: () => { data.count++ },
      double: computed(() => data.count * 2),
      numbers: [0, 1, 2],
      person: {},
    })
    const { x, y } = useMousePostion()
    const { result, loading, loaded } = useURLLoader<CatResult[]>('https://api.thecatapi.com/v1/images/search?limit=1 ')
    watch(result, () => {
      if(result.value) {
        console.log(result.value[0].url)
      }
    })
    const greetings = ref('')
    const updateGreeting = () => {
      greetings.value += 'Hello !'
    }
    w([greetings, data], () => {
      document.title = 'updated' + greetings.value + data.count
    })
    const refData = toRefs(data)
    return {
      ...refData,
      greetings,
      updateGreeting,
      x, 
      y,
      result,
      loading,
      loaded,
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

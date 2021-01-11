<template>
  <div id="app">
    <h1>Random site Generator</h1>
    <Randomsite/>
  </div>
</template>

<script>
import Randomsite from './components/Randomsite.vue'

export default {
  name: 'App',
  components: {
    Randomsite
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

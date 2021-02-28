<template>
  <div class="home">
    <Randomsite/>
  </div>
</template>

<script>
// @ is an alias to /src
import Randomsite from '@/components/Randomsite.vue'

export default {
  name: 'Home',
  components: {
    Randomsite
  },
  head: {
    title: function () {
      return {
        inner: "Croween",
        separator: ' ',
        complement: ' ',
      }
    }
  }
}
</script>

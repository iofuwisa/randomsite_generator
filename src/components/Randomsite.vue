<template>
  <div>
    <v-card-text style="font-size: 50px; line-height: 70px">Random site Generator</v-card-text>
    <v-card-text style="font-size: 20px;"><a :href="url">{{url}}</a></v-card-text>
    <v-btn fab v-on:click="setUrl" style="width: 300px; height: 300px;"><v-icon size="100">mdi-reload</v-icon></v-btn>
  </div>
</template>

<script>
export default {
  name: 'Randomsite',
  data: () => ({
    url: "",
    processing: true,
  }),

  methods: {
    setUrl: function () {
      if(this.processing == false) {
        this.processing == true
        const axiosBase = require('axios')
        const axios = axiosBase.create({
          baseURL: 'https://8s01jod446.execute-api.ap-northeast-1.amazonaws.com/site_crawler_api_stage',
          headers: {
            'Content-Type': 'application/json'
          },
          responseType: 'json'  
        });

        axios.get('/').then(response => {
          console.log(response.data.body['url'])
          this.url = response.data.body['url']
        })
        .catch(response => console.log(response))
        this.processing == false
      }
    }
  },

  mounted: function(){
    this.processing = false
    this.setUrl()
  } 
}
</script>

<style scoped>
a {
  color: #42b983;
}
</style>

<template>
  <div class="hello">
    <a :href="url">{{url}}</a>
  </div>
</template>

<script>
export default {
  name: 'Randomsite',
  data: () => ({
    url: ""
  }),

  mounted: function(){
    const axiosBase = require('axios')
    const axios = axiosBase.create({
        baseURL: 'https://8s01jod446.execute-api.ap-northeast-1.amazonaws.com/site_crawler_api_stage',
        headers: {
          'Content-Type': 'application/json'
        },
        responseType: 'json'  
    });

    axios.get('/')
      .then(response => {
        console.log(response.data.body['url'])
        this.url = response.data.body['url']
      })
      .catch(response => console.log(response))

  } 
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

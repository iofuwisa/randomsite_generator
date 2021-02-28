<template>
  <div class="randomsite">
    <p class="title">{{pageTitle}}</p>

    <div v-if="!processing" id="content">
      <button v-on:click="setUrl" class="reload"><v-icon size="50px">mdi-reload</v-icon></button>

      <div v-if="unSafe" class="warning">
        <v-card-text style="font-size: 30px; line-height: 20px">Warning</v-card-text>
        <v-card-text style="font-size: 20px; line-height: 0px">There is a risk of unsafe site.</v-card-text>
      </div>

      <Ogp style="margin: 0 auto; margin-top: 20px;" :url="url"/>

    </div>
    <div v-if="processing" id="content">
      <loading textColor="#eeeeee" size="15px" />
    </div>
    <div class="bglink">
      image from
      <a href="https://pixabay.com/ja/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=5854210">Pixabay</a>
      by
      <a href="https://pixabay.com/ja/users/sonyuser-11407366/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=5854210">Jörg Vieli</a>
    </div>
  </div>
</template>

<script>
import Ogp from "@/components/Ogp.vue"
import Loading from "@/components/Loading.vue"
import axios from "axios"
import safeUrl from "@/SafeBrowsing.js";
import {
  SITE_CRAWLER_API_URL,
  SITE_CRAWLER_API_KEY
} from "@/secrets.js";

export default {
  name: 'Randomsite',
  components: {
    Ogp,
    Loading,
  },
  data: () => ({
    pageTitle: "Croween",
    url: "",
    processing: false,
    unSafe: false,
  }),

  methods: {
    /**
     * Set url and ogp.
     * @async
     * @function setUrl
     */
    setUrl: async function () {
      if(this.processing)
        return;

      this.processing = true;
      await this.$nextTick();
      const url = await this.getUrl();

      this.url = url;
      this.unSafe = !(await safeUrl(url));

      this.processing = false;
    },

    /**
     * Get random url.
     * @async
     * @function getUrl
     * @returns {Promise<string>} url
     */
    getUrl: async function () {
      const axiosBase = axios.create({
        baseURL: SITE_CRAWLER_API_URL,
        headers: {
          'X-Api-Key': SITE_CRAWLER_API_KEY,
        },
        responseType: 'json'  
      })
      const response = await axiosBase.get("/")

      return response.data.body['url']
    },
  },

  mounted: function(){
    console.log("env")
    console.log(process.env.SITE_CRAWLER_API_URL)
    this.setUrl();
  } 
}
</script>

<style scoped>
.warning {
  margin: 0 auto;
  margin-top: 20px;
  width: 360px;
  background-color: red;
  color: white;
}
.randomsite {
  padding: 30px 0px 30px 0px;
  min-height: 100vh;
  width: 100%;
}
.randomsite:before{
  content:"";
  display:block;
  position:fixed;
  top:0;
  left:0;
  z-index:-1;
  width:100%;
  height:100vh;
  background:url(../assets/backimage.jpg) center no-repeat;
  background-size:cover;
}
.title {
  font-size: 80px;
  color: #eeeeee;
}
.reload {
  width: 100px;
  height: 100px;
  background-color: #eeeeee;
  border-radius: 50px 50px 50px 50px;
  outline: none;
}
.reload:hover, .reload:focus {
  background-color: #cccccc;
}
.bglink {
  content:"";
  display:block;
  position: sticky;
  margin-top: 50px;
  margin-left: 5px;
  width: 270px;
  padding: 2px 5px 2px 5px;

  top: 90vh;
  left:0;
  background-color: white;
  opacity: 0.5;
  border-radius: 15px 15px 15px 15px;
  color: #666666;
}
.bglink a {
  color: black;
}
</style>

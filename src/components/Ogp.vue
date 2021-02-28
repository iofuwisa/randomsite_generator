<template>
  <div class="ogp">
    <a :href="url">
      <p>{{url}}</p>
      <Loading  v-if="loading" textColor="black" size="5px" />
      <span v-if="!loading">
        <img class="img" v-if="image" :src="image"/>
        <v-card-title v-if="title">{{title}}</v-card-title>
        <v-divider v-if="title && description" class="mx-3" />
        <v-card-subtitle v-if="description">{{description}}</v-card-subtitle>
      </span>
    </a>
  </div>
</template>

<script>
import axios from "axios";
import Loading from "@/components/Loading.vue";
import {
  LINK_PROXY_API_URL,
  LINK_PROXY_API_KEY
} from "@/secrets.js";

export default {
  name: 'Ogp',
  components: {
    Loading
  },
  props: {
    url: String
  },
  data: () => ({
    loading: true,
    title: "",
    description: "",
    image: ""
  }),
  methods: {
    /**
     * Get ogp from url.
     * @async
     * @function getOgp
     * @param url Target url
     * @returns {Promise<dictionary>} ogp
     */
    // Get ogp from url.
    setOgp: async function () {
      this.loading = true;

      let ogp = {};
      ogp["title"] = "";
      ogp["description"] = "";
      ogp["image"] = "";

      // Call url from proxy api.
      const axiosBase = axios.create({
        baseURL: LINK_PROXY_API_URL,
        headers: {
          'x-api-key': LINK_PROXY_API_KEY,
        },
        responseType: 'json'  
      });
      const response = await axiosBase.get('/?target=' + this.url);

      // Parse and Get ogp properties.
      const parser = new DOMParser();
      const doc = parser.parseFromString(response.data.body, "text/html");

      if(doc.querySelector('meta[property="og:title"]'))
        ogp["title"] = doc.querySelector('meta[property="og:title"]').getAttribute('content');
      
      if(doc.querySelector('meta[property="og:description"]'))
        ogp["description"] = doc.querySelector('meta[property="og:description"]').getAttribute('content');

      if(doc.querySelector('meta[property="og:image"]'))
        ogp["image"] = doc.querySelector('meta[property="og:image"]').getAttribute('content');

      if(!ogp["title"] && !ogp["description"] && !ogp["image"])
        ogp["title"] = "No site data.";
      
      this.title = ogp["title"];
      this.description = ogp["description"];
      this.image = ogp["image"];

      this.loading = false;
    },
  },
  mounted: function(){
    this.setOgp();
  },
}
</script>

<style scoped>
a {
  color: black;
  text-decoration: none;
}
.ogp {
  overflow: hidden;
  box-shadow: 10px 15px 30px -10px rgba(0,0,0,.15), 0 0 5px rgba(0,0,0,.1);
  width: 360px;
  background-color: whitesmoke;
  border-radius: 50px 50px 50px 50px;
}
.img {
  height: 202px;
  width: 360px;
}
</style>

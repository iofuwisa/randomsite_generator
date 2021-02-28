import axios from "axios";
import {
  GOOGLE_CLOUD_KEY
} from "@/secrets.js";

export default  async function safeUrl(url) {
    const axiosBase = axios.create({
      baseURL: 'https://safebrowsing.googleapis.com/v4/threatMatches:find',
      headers: {
        'Content-Type': 'application/json'
      },
      responseType: 'json'  
    });
    const body = {
      "client": {
        "clientId":"otsukajapan",
        "clientVersion": "1.0.0"
      },
      "threatInfo": {
        "threatTypes": ["MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE", "POTENTIALLY_HARMFUL_APPLICATION"],
        "platformTypes": ["ANY_PLATFORM"],
        "threatEntryTypes": ["URL"],
        "threatEntries": [
          {"url": url},
        ]
      }
    };
    const response = await axiosBase.post('?key=' + GOOGLE_CLOUD_KEY, body);
    console.log(response.data);

    let isSafe = true;
    if(Object.keys(response.data).length > 0)
        isSafe =  false;
    return isSafe;
}
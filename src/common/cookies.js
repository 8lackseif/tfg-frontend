import Vue from "vue"
import VueCookie from "vue-cookie"
const cookies = {
      init(){
      Vue.use(VueCookie)
      },
      setJWTToken(token) {
        VueCookie.set("token", token,{expires:"8h"});
      },
      getJWTToken() {
        return VueCookie.get("token");
      }
}

export default cookies;
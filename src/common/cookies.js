import Vue from "vue"
import VueCookie from "vue-cookie"
const cookies = {
      init(){
      Vue.use(VueCookie)
      },
      setUserLogged(userLogged) {
        VueCookie.set("userLogged", userLogged,{expires:"3h"});
      },
      getUserLogged() {
        return VueCookie.get("userLogged");
      }
}

export default cookies;
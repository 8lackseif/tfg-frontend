(function(){"use strict";var t={8216:function(t,e,n){var s=n(2856),r=function(){var t=this,e=t._self._c;return e("main",{attrs:{id:"app"}},[e("router-view")],1)},a=[],o={name:"App",data(){return{colors:{baseColor:"#CBE1EE",highlightColor:"#A3C4D9",accentColor:"#D9E6F2",neutralDark:"#748A9D",neutralLight:"#F2F7FA"}}}},i=o,u=n(1656),c=(0,u.A)(i,r,a,!1,null,null,null),l=c.exports,d=n(1594),p=function(){var t=this,e=t._self._c;return e("div",[e("form",{staticClass:"loginPage"},[e("div",{staticClass:"logoContainer"},[e("img",{attrs:{src:t.logoPath}})]),e("div",{staticClass:"container"},[e("span",{staticClass:"item"},[t._v("Username: ")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.username,expression:"username"}],staticClass:"item",attrs:{type:"text"},domProps:{value:t.username},on:{input:function(e){e.target.composing||(t.username=e.target.value)}}}),e("span",{staticClass:"item"},[t._v("Password: ")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.pwd,expression:"pwd"}],staticClass:"item",attrs:{type:"password"},domProps:{value:t.pwd},on:{input:function(e){e.target.composing||(t.pwd=e.target.value)}}}),e("button",{staticClass:"loginButton",attrs:{type:"button"},on:{click:t.login}},[t._v("Log in")]),e("b-alert",{staticClass:"item text-center",attrs:{variant:"danger"},model:{value:t.error,callback:function(e){t.error=e},expression:"error"}},[t._v(t._s(t.message))])],1),e("div",{staticClass:"container"})])])},h=[],m=(n(4114),{name:"Login_page",data(){return{username:"",pwd:"",logoPath:n(3153),error:!1,message:""}},created(){this.init()},methods:{init:async function(){const t=await this.$store.dispatch("getToken");null!==t&&this.$router.push("/home")},login:async function(){const t=await this.$store.dispatch("login",{username:this.username,pwd:this.pwd});200!=t.status?(this.error=!0,this.message=t.data):this.$router.push("/home")}}}),g=m,f=(0,u.A)(g,p,h,!1,null,null,null),v=f.exports,_=function(){var t=this,e=t._self._c;return e("div",[e("form",{staticClass:"registerPage"},[e("div",{staticClass:"container"},[e("span",{staticClass:"item"},[t._v("Username: ")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.username,expression:"username"}],staticClass:"item",attrs:{type:"text"},domProps:{value:t.username},on:{input:function(e){e.target.composing||(t.username=e.target.value)}}}),e("span",{staticClass:"item"},[t._v("Password: ")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.pwd,expression:"pwd"}],staticClass:"item",attrs:{type:"password"},domProps:{value:t.pwd},on:{input:function(e){e.target.composing||(t.pwd=e.target.value)}}}),e("span",{staticClass:"item"},[t._v("Repeat password: ")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.pwd2,expression:"pwd2"}],staticClass:"item",attrs:{type:"password"},domProps:{value:t.pwd2},on:{input:function(e){e.target.composing||(t.pwd2=e.target.value)}}}),e("button",{staticClass:"registerButton",attrs:{type:"button"},on:{click:t.register}},[t._v("Register")])])])])},w=[],y={name:"Register_page",data(){return{username:"",pwd:"",pwd2:""}},created(){this.init()},methods:{init:async function(){const t=await this.$store.dispatch("getClaims");0!="administrator".localeCompare(t.role)&&this.$router.push("/home")},register:async function(){await this.$store.dispatch("register",{username:this.username,pwd:this.pwd}),this.$router.push("/")}}},T=y,C=(0,u.A)(T,_,w,!1,null,null,null),b=C.exports,x=function(){var t=this,e=t._self._c;return e("div",[e("TheHeader"),e("div",{staticClass:"HomePage"},[e("ProductsTable")],1),e("TheFooter")],1)},P=[],k=function(){var t=this,e=t._self._c;return e("header",[e("div",{staticClass:"header-left"},[e("img",{attrs:{src:t.logoPath},on:{click:t.goHome}})]),e("TheNavigator"),e("div",{staticClass:"header-right"},[e("span",{on:{click:t.logout}},[t._m(0)]),e("span",[e("strong",[t._v("User : ")]),t._v(" "+t._s(t.username))])])],1)},A=[function(){var t=this,e=t._self._c;return e("a",[e("strong",[t._v("LOGOUT")])])}],O=function(){var t=this,e=t._self._c;return e("nav",[e("ul",[e("li",[e("router-link",{attrs:{to:"/sell"}},[t._v("Sell products")])],1),e("li",[e("router-link",{attrs:{to:"/tags"}},[t._v("Tags")])],1),t.isAdmin?e("li",[e("router-link",{attrs:{to:"/register"}},[t._v("Register normal users")])],1):t._e()])])},$=[],I={name:"TheNavigator",data(){return{username:"",role:"",isAdmin:!1}},created(){this.init()},methods:{init:async function(){const t=await this.$store.dispatch("getClaims");this.username=t.username,this.role=t.role,0=="administrator".localeCompare(this.role)&&(this.isAdmin=!0)}}},S=I,F=(0,u.A)(S,O,$,!1,null,null,null),H=F.exports,j={name:"TheHeader",data(){return{username:"",role:"",logoPath:n(3153)}},created(){this.init()},methods:{init:async function(){const t=await this.$store.dispatch("getClaims");null!==t&&(this.username=t.username)},goHome:function(){"/home"!==this.$route.path&&this.$router.push("/home")},logout:async function(){await this.$store.dispatch("logout"),this.$router.push("/")}},components:{TheNavigator:H}},E=j,N=(0,u.A)(E,k,A,!1,null,null,null),M=N.exports,W=function(){var t=this;t._self._c;return t._m(0)},J=[function(){var t=this,e=t._self._c;return e("footer",[e("p",[t._v("2024 Sistema de Gestión de Inventario")])])}],L={name:"TheFooter",data(){return{}},created(){},methods:{}},R=L,U=(0,u.A)(R,W,J,!1,null,null,null),D=U.exports,B=function(){var t=this,e=t._self._c;return e("div",{staticClass:"myTable"},[e("div",{staticClass:"options"},[e("MySearcher",{on:{searchInput:t.search}})],1),e("table",[t._m(0),t._l(t.searchProducts,(function(n){return e("tr",{key:n.code},[e("td",[t._v(t._s(n.code))]),e("td",[t._v(t._s(n.name))]),e("td",[t._v(t._s(n.description))]),e("td",[t._v(t._s(n.stock))])])}))],2)])},G=[function(){var t=this,e=t._self._c;return e("tr",[e("th",[t._v("code")]),e("th",[t._v("name")]),e("th",[t._v("description")]),e("th",[t._v("stock")])])}],Y=function(){var t=this,e=t._self._c;return e("div",{staticClass:"searcher"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.searchInput,expression:"searchInput"}],attrs:{type:"text"},domProps:{value:t.searchInput},on:{input:function(e){e.target.composing||(t.searchInput=e.target.value)}}}),e("button",{on:{click:t.sendSearchInput}},[e("img",{attrs:{src:t.searchImage}})])])},q=[],z={name:"MySearcher",data(){return{searchImage:n(1060),searchInput:""}},created(){},methods:{sendSearchInput:async function(){this.$emit("searchInput",this.searchInput)}}},K=z,Q=(0,u.A)(K,Y,q,!1,null,null,null),V=Q.exports,X={name:"ProductsTable",data(){return{products:[],searchInput:""}},created(){this.getProducts()},computed:{searchProducts(){const t=[];return this.products.forEach((e=>{(e.code.includes(this.searchInput)||e.name.includes(this.searchInput)||e.description.includes(this.searchInput))&&t.push(e)})),t}},methods:{search:async function(t){this.searchInput=t},getProducts:async function(){this.products=await this.$store.dispatch("getProducts")}},components:{MySearcher:V}},Z=X,tt=(0,u.A)(Z,B,G,!1,null,null,null),et=tt.exports,nt={name:"Home_page",data(){return{}},created(){this.init()},methods:{init:async function(){const t=await this.$store.dispatch("getToken");if(null===t)this.$router.push("/");else{const t=await this.$store.dispatch("getClaims");0=="administrator".localeCompare(t.role)&&(this.isAdmin=!0)}}},components:{TheHeader:M,TheFooter:D,ProductsTable:et}},st=nt,rt=(0,u.A)(st,x,P,!1,null,null,null),at=rt.exports,ot=function(){var t=this,e=t._self._c;return e("div",[e("TheHeader"),e("TheFooter")],1)},it=[],ut={name:"SellProducts",data(){return{}},created(){},methods:{},components:{TheHeader:M,TheFooter:D}},ct=ut,lt=(0,u.A)(ct,ot,it,!1,null,null,null),dt=lt.exports,pt=function(){var t=this,e=t._self._c;return e("div",[e("TheHeader"),e("TheFooter")],1)},ht=[],mt={name:"ProductTags",data(){return{}},created(){},methods:{},components:{TheHeader:M,TheFooter:D}},gt=mt,ft=(0,u.A)(gt,pt,ht,!1,null,null,null),vt=ft.exports;s["default"].use(d.Ay);var _t=new d.Ay({routes:[{path:"/",name:"Login",component:v},{path:"/register",name:"Register",component:b},{path:"/home",name:"Home",component:at},{path:"/sell",name:"SellProducts",component:dt},{path:"/tags",name:"ProductTags",component:vt}]}),wt=n(5366),yt=n(2257);const Tt="http://localhost:8000",Ct={init(){s["default"].use(wt.A,yt.A)},async login(t){return yt.A.post(Tt+"/login",t).then((t=>t)).catch((t=>t.response))},async register(t){return yt.A.post(Tt+"/register",t).then((t=>t)).catch((t=>t.response))},async getProducts(){return yt.A.get(Tt+"/get_products").then((t=>t)).catch((t=>t.response))}};var bt=Ct,xt=n(241),Pt=n.n(xt);const kt={init(){s["default"].use(Pt())},async setJWTToken(t){Pt().set("token",t,{expires:"8h"})},async getJWTToken(){return Pt().get("token")},async logOut(){Pt()["delete"]("token")}};var At=kt,Ot=n(1910),$t=n(3569),It=n.n($t);s["default"].use(Ot.Ay);var St=new Ot.Ay.Store({state:{},mutations:{},getters:{},actions:{async login(t,e){const n=await bt.login(e);return 200==n.status&&At.setJWTToken(n.data),n},async logout(){await At.logOut()},async register(t,e){await bt.register(e)},async getToken(){return await At.getJWTToken()},async getClaims(){const t=await At.getJWTToken();if(null!==t){const e=It().decode(t);return e}return null},async getProducts(){const t=await bt.getProducts();if(200===t.status)return t.data.products}}}),Ft=n(1501),Ht=n(7673),jt=(n(9313),n(2641));s["default"].use(d.Wk),jt.A.use(jt.A),s["default"].use(Ft.vGs),s["default"].use(Ht.YS),s["default"].use(_t),At.init,bt.init,new s["default"]({store:St,router:_t,render:t=>t(l)}).$mount("#app")},3153:function(t,e,n){t.exports=n.p+"img/logo.2b999cc2.png"},1060:function(t,e,n){t.exports=n.p+"img/search.e3adca53.png"}},e={};function n(s){var r=e[s];if(void 0!==r)return r.exports;var a=e[s]={id:s,loaded:!1,exports:{}};return t[s].call(a.exports,a,a.exports,n),a.loaded=!0,a.exports}n.m=t,function(){n.amdO={}}(),function(){var t=[];n.O=function(e,s,r,a){if(!s){var o=1/0;for(l=0;l<t.length;l++){s=t[l][0],r=t[l][1],a=t[l][2];for(var i=!0,u=0;u<s.length;u++)(!1&a||o>=a)&&Object.keys(n.O).every((function(t){return n.O[t](s[u])}))?s.splice(u--,1):(i=!1,a<o&&(o=a));if(i){t.splice(l--,1);var c=r();void 0!==c&&(e=c)}}return e}a=a||0;for(var l=t.length;l>0&&t[l-1][2]>a;l--)t[l]=t[l-1];t[l]=[s,r,a]}}(),function(){n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,{a:e}),e}}(),function(){n.d=function(t,e){for(var s in e)n.o(e,s)&&!n.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:e[s]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){n.hmd=function(t){return t=Object.create(t),t.children||(t.children=[]),Object.defineProperty(t,"exports",{enumerable:!0,set:function(){throw new Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: "+t.id)}}),t}}(),function(){n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){n.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){n.p="/"}(),function(){var t={524:0};n.O.j=function(e){return 0===t[e]};var e=function(e,s){var r,a,o=s[0],i=s[1],u=s[2],c=0;if(o.some((function(e){return 0!==t[e]}))){for(r in i)n.o(i,r)&&(n.m[r]=i[r]);if(u)var l=u(n)}for(e&&e(s);c<o.length;c++)a=o[c],n.o(t,a)&&t[a]&&t[a][0](),t[a]=0;return n.O(l)},s=self["webpackChunktfg_frontend"]=self["webpackChunktfg_frontend"]||[];s.forEach(e.bind(null,0)),s.push=e.bind(null,s.push.bind(s))}();var s=n.O(void 0,[504],(function(){return n(8216)}));s=n.O(s)})();
//# sourceMappingURL=app.87a1b881.js.map
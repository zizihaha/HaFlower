(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e372c6e0"],{8619:function(t,a,s){"use strict";s.r(a);var e=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",[s("loading",{attrs:{loader:"dots",active:t.status.isLoading},on:{"update:active":function(a){return t.$set(t.status,"isLoading",a)}}}),t._m(0),s("div",{staticClass:"container"},[s("div",{staticClass:"row pt-md-5"},t._l(t.favProducts,(function(a){return s("div",{key:a.id,staticClass:"col-md-4 mt-md-6 "},[s("div",{staticClass:"card border-0 mb-4 position-relative position-relative"},[s("router-link",{attrs:{to:"/product/"+a.title+"/"+a.id}},[s("img",{staticClass:"card-img-top rounded-0",attrs:{src:a.imageUrl,alt:a.title}})]),s("a",{staticClass:"text-dark",attrs:{href:"#"},on:{click:function(s){return s.preventDefault(),t.delfav(a)}}},[s("i",{staticClass:"fas fa-heart position-absolute text-white",staticStyle:{right:"16px",top:"16px"}})]),s("a",{staticClass:"text-dark",attrs:{href:"#"},on:{click:function(s){return s.preventDefault(),t.addToCart(a)}}},[s("i",{staticClass:"fas fa-shopping-cart position-absolute text-white",staticStyle:{right:"50px",top:"16px"}})]),s("div",{staticClass:"card-body p-0 my-3"},[s("h4",{staticClass:"mb-0"},[s("a",{staticClass:"text-decoration-none",attrs:{href:"#"},on:{click:function(s){return s.preventDefault(),t.goPage(a)}}},[t._v(t._s(a.title))])]),s("p",{staticClass:"card-text"},[t._v(" NT"+t._s(t._f("currency")(a.price))+" "),s("span",{staticClass:"text-muted ml-1"},[s("del",[t._v("NT"+t._s(t._f("currency")(a.origin_price)))])])])])],1)])})),0),t.favProducts.length?t._e():s("div",[s("p",{staticClass:"text-center my-5"},[t._v(" 目前沒有收藏的商品喔， "),s("router-link",{staticClass:"text-decoration-none text-success font-weight-bold",attrs:{to:"/products"}},[t._v(" 去產品頁逛逛吧! ")])],1),s("ProductInfo")],1)])],1)},i=[function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"position-relative d-flex align-items-center justify-content-center",staticStyle:{"min-height":"200px"}},[s("div",{staticClass:"position-absolute",staticStyle:{top:"0",bottom:"0",left:"0",right:"0",opacity:"0.3",background:"url(https://images.unsplash.com/photo-1518199266791-5375a83190b7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80) fixed no-repeat center / cover"}}),s("h3",{staticClass:"mt-4",staticStyle:{color:"#8c7e7e"}},[t._v("收 藏 清 單")])])}],r=(s("99af"),s("4160"),s("a434"),s("159b"),s("a58c")),c={name:"Favorite",components:{ProductInfo:r["a"]},data:function(){return{favProducts:[],favProductsId:[],status:{isLoading:!1}}},created:function(){this.favProducts=JSON.parse(localStorage.getItem("favList"))||[],this.favProductsId=JSON.parse(localStorage.getItem("favId"))||[]},methods:{delfav:function(t){var a=this;this.favProducts.forEach((function(s,e){s.id===t.id&&(a.favProducts.splice(e,1),localStorage.setItem("favList",JSON.stringify(a.favProducts)))})),this.favProductsId.forEach((function(s,e){s===t.id&&(a.favProductsId.splice(e,1),localStorage.setItem("favId",JSON.stringify(a.favProductsId)))})),this.$bus.$emit("message:push","".concat(t.title,"已取消收藏"),"danger")},goPage:function(t){this.$router.push("/product/".concat(t.title,"/").concat(t.id))},addToCart:function(t){var a=this,s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;this.status.isLoading=!0;var e="".concat("https://course-ec-api.hexschool.io/api/").concat("5f936d6a-78a1-48f0-8517-588ebb2f69c6","/ec/shopping"),i={product:t.id,quantity:s};this.$http.post(e,i).then((function(s){a.$bus.$emit("message:push",s.data.data.product.title+"成功加入購物車","success"),a.$bus.$emit("get-cart"),a.status.isLoading=!1,a.delfav(t)})).catch((function(t){a.status.isLoading=!1,a.$bus.$emit("message:push",t.response.data.errors[0],"danger")}))}}},o=c,n=s("2877"),d=Object(n["a"])(o,e,i,!1,null,null,null);a["default"]=d.exports},a58c:function(t,a,s){"use strict";var e=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"container"},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-4 mt-md-4"},[s("div",{staticClass:"card border-0 mb-4"},[s("a",{attrs:{href:"#"},on:{click:function(a){return a.preventDefault(),t.toCategory("新娘捧花")}}},[s("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.img[0],expression:"img[0]"}],staticClass:"card-img-top rounded-0",attrs:{alt:"新娘捧花"}}),t._m(0)])])]),s("div",{staticClass:"col-md-4 mt-md-4"},[s("div",{staticClass:"card border-0 mb-4"},[s("a",{attrs:{href:"#"},on:{click:function(a){return a.preventDefault(),t.toCategory("胸花")}}},[s("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.img[1],expression:"img[1]"}],staticClass:"card-img-top rounded-0",attrs:{alt:"胸花/手腕花"}}),t._m(1)])])]),s("div",{staticClass:"col-md-4 mt-md-4"},[s("div",{staticClass:"card border-0 mb-4"},[s("a",{attrs:{href:"#"},on:{click:function(a){return a.preventDefault(),t.toCategory("婚禮佈置")}}},[s("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.img[2],expression:"img[2]"}],staticClass:"card-img-top rounded-0",attrs:{alt:"婚禮佈置"}}),t._m(2)])])])])])},i=[function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"card-body text-center"},[s("h4",[t._v("新娘捧花")]),s("p",{staticClass:"card-text text-muted mb-0"},[t._v(" 每一位新娘子,一定都要有自己的專屬捧花 ")])])},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"card-body text-center"},[s("h4",[t._v("胸花/手腕花")]),s("p",{staticClass:"card-text text-muted mb-0"},[t._v(" 配戴式花藝，為婚禮增加身上的小亮點 ")])])},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"card-body text-center"},[s("h4",[t._v("婚禮佈置")]),s("p",{staticClass:"card-text text-muted mb-0"},[t._v(" 客製化製作 ")])])}],r={name:"ProductInfo",data:function(){return{img:["https://images.unsplash.com/photo-1589727549629-87f7073149b3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80","https://images.unsplash.com/photo-1588775827551-ec4fc340be0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80","https://images.unsplash.com/photo-1529636798458-92182e662485?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"]}},created:function(){},methods:{toCategory:function(t){this.$router.push({name:"products",params:{categoryType:t}})}}},c=r,o=s("2877"),n=Object(o["a"])(c,e,i,!1,null,null,null);a["a"]=n.exports}}]);
//# sourceMappingURL=chunk-e372c6e0.a545c014.js.map
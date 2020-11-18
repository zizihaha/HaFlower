import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import jquery from 'jquery';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import 'bootstrap';
import {
  ValidationObserver,
  ValidationProvider,
  localize,
  extend,
  configure
} from 'vee-validate';
// ValidationProvider 是 inptu 驗證元件
// ValidationObserver 整體 <form> 驗證元件
// extend 一些擴充功能
// localize 語系，localize 設定檔
import zhTW from 'vee-validate/dist/locale/zh_TW.json'; // 繁體中文語系設定
import * as rules from 'vee-validate/dist/rules'; // 一次導出所有規則檔案，不用各別導入

import App from './App';
import router from './router';
import currencyFilter from './filters/currency';
import unixFilter from './filters/unix';
window.$ = jquery;
Vue.config.productionTip = false;

Vue.use(VueAxios, axios);
import VueLazyload from 'vue-lazyload';
Vue.use(VueLazyload, {
  preLoad: 1.3, // 顯示當前視口高度 (window.innerHeight | 100vh) 的比例
  loading: require('./assets/img/loading.gif'), // 圖片正在加載時顯示的 loading 圖片
  error: require('./assets/img/error.png'), // 圖片加載異常時顯示的 error 圖片
  attempt: 1
});
Vue.component('Loading', Loading);

// VeeValidate 驗證規則，導到 extend 擴充裡面，才能運用
Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});

// VeeValidate 繁體中文語系檔
localize('tw', zhTW);

// VeeValidate 完整form表單 驗證工具載入
Vue.component('ValidationObserver', ValidationObserver);
// VeeValidate input
Vue.component('ValidationProvider', ValidationProvider);

// VeeValidate 自定義設定檔案，錯誤的 className，這兩行針對 BS className 驗證
configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid'
  }
});

Vue.filter('currency', currencyFilter); // '自訂名稱', import 的 filter 名稱
Vue.filter('unix', unixFilter);

// event bus
Vue.prototype.$bus = new Vue();

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app');

import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import { routes } from './router'
import SortedTablePlugin from "vue-sorted-table";


Vue.config.devtools = true;

Vue.use(VueRouter);
Vue.use(SortedTablePlugin);

const router = new VueRouter({
  routes
})

Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

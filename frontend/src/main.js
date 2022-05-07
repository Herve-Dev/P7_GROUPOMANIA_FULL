import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Equal from 'equal-vue'
import 'equal-vue/dist/style.css'


createApp(App).use(router).use(VueAxios, axios).use(Equal).mount('#app')

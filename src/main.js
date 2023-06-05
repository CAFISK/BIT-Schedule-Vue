import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import axios from "axios"

const app = createApp(App);
app.config.globalProperties.$axios=axios
app.use(ElementPlus).use(router).mount('#app')

import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'

import Transformer from 'vue-drag-drop-transformer'
import 'vue-drag-drop-transformer/dist/style.css'

import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'
const app = createApp(App)

app.use(router)
app.use(Transformer)
app.use(ElementPlus, {
  locale: zhCn
})
app.mount('#app')

import './assets/main.scss'
import { createApp } from 'vue'//导入vue
import ElementPlus from 'element-plus'//导入element-plus
import { createPinia } from 'pinia'
import 'element-plus/dist/index.css'//导入element-plus的样式
import router from './router'
import App from './App.vue'//导入app.vue
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()
const app = createApp(App)//创建应用实例
pinia.use(piniaPluginPersistedstate)
app.use(router)
app.use(pinia)
app.use(ElementPlus)//使用element-plus
app.mount('#app')//控制html元素
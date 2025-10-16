import antd from 'antdv-next'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { router } from '@/routes'
import App from './App.vue'
import 'antdv-next/style/reset.css'
import 'uno.css'

const app = createApp(App)
app.use(router)
app.use(antd)
app.use(createPinia())
app.mount('#app')

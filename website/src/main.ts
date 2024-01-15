import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueWriterPlugin } from 'human-writes'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueWriterPlugin, { speed: 40, makeTypos: false })

app.mount('#app')

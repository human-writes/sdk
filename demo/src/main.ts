import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { VueWriterPlugin } from 'human-writes'

const app = createApp(App)

app.use(VueWriterPlugin, { speed: 40, makeTypos: false })
app.use(router)

app.mount('#app')

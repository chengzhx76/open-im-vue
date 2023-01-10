import { createApp } from 'vue'
import App from './App.vue'

import { createPinia } from "pinia"

const pinia = createPinia();

import router from './router'
import component from './components/component'

const app = createApp(App)

app.use(pinia)
app.use(router)

component(app)

app.mount('#app')

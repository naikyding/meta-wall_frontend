import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueClickAway from 'vue3-click-away'

import App from './App.vue'
import router from './router'
import './styles/index.css'
import 'vue-loaders/dist/vue-loaders.css'
import VueLoaders from 'vue-loaders'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueClickAway)
app.use(VueLoaders)

app.mount('#app')

export default app

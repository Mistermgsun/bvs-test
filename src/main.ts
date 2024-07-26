import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

/* Definisco il mio file scss nel progetto */
import './assets/global.scss'

/* Definisco e importo le icone di FontAwesome */
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faAngleLeft, faAngleRight, faPlus, faCheck } from '@fortawesome/free-solid-svg-icons'

library.add(faAngleLeft, faAngleRight, faPlus, faCheck) // Aggiungi le icone alla libreria

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)

app.mount('#app')

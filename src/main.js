import '@babel/polyfill'
import 'mutationobserver-shim'
//import './plugins/bootstrap-vue'
import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import 'bootstrap';
// importa bootstrap listo para usar
import 'bootstrap/dist/css/bootstrap.min.css';
//import 'bootstrap/dis/css/bootstrap.min.css'

createApp(App).use(router).use(store).mount('#app')

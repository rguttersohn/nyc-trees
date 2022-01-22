import { createApp } from 'vue';
import App from './App.vue';
import './index.css';
import store from './controller/Store.js'


createApp(App).use(store).mount('#app')

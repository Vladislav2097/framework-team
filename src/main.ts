import './assets/main.scss';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from '@/App.vue';
import themeStore from '@/stores/themeStore';

const app = createApp(App);

app.use(createPinia());

const theme = themeStore();
theme.initTheme();

app.mount('#app');

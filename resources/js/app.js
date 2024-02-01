/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

import './bootstrap';

import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router'
import About from './components/About.vue';
import News_front from './components/News_front.vue';
import Foot from './components/Foot.vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/About',
        name: 'About',
        component: About},
        { path: '/News',
        name: 'News_front',
        component: News_front},
    ]
});

const app = createApp({});


import Navigation from './components/Navigation.vue';
app.component('navigation', Navigation);

import Navigation_log from './components/Navigation_log.vue';
app.component('navigation_log', Navigation_log);

import Navigation_admin from './components/Navigation_admin.vue';
app.component('navigation_admin', Navigation_admin);

import CompanyData from './components/CompanyData.vue';
app.component('companydata', CompanyData);

import Gallery from './components/Gallery.vue';
app.component('gallery', Gallery);

import Swiper_gallery from './components/Swiper_gallery.vue';
app.component('swiper_gallery', Swiper_gallery);

import Swiper_news from './components/Swiper_news.vue';
app.component('swiper_news', Swiper_news);

import Swiper_front from './components/Swiper_front.vue';
app.component('swiper_front', Swiper_front);

import News_admin from './components/News_admin.vue';
app.component('news_admin', News_admin);
import ShoppingCartSide from './components/ShoppingCartSide.vue';
app.component('ShoppingCartSide', ShoppingCartSide);

import Szamlazas from './components/Szamlazas.vue';
app.component('szamlazas', Szamlazas);

import Szallitas from './components/Szallitas.vue';
app.component('szallitas', Szallitas);

import Megrendeles from './components/Megrendeles.vue';
app.component('megrendeles', Megrendeles);

//import flags
import "/node_modules/flag-icons/css/flag-icons.min.css";

import Modal from './components/Modal.vue';
app.component('Modal', Modal);

// import components from './components/';
app.component('about', About);
app.component('News_front', News_front);
app.component('foot', Foot);

import Termekek from './components/Termekek.vue';
app.component('termekek', Termekek);
import Kosar from './components/Kosar.vue';
app.component('kosar', Kosar);

import "/node_modules/flag-icons/css/flag-icons.min.css";

//Import FontAwesome
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faAngleUp,
    faAngleDown,
    faAngleRight,
    faBars,
    faCartShopping,
    faCheck,
    faEnvelope,
    faMagnifyingGlass,
    faMinus,
    faPhone,
    faUser,
    faTrash,
    faPen,
    faPlus,
    faFloppyDisk,
    faDownload, 
    faCloudArrowUp,
    faExclamation
} from '@fortawesome/free-solid-svg-icons'

import{
    faFacebook,
    faInstagram,
    faYoutube
} from '@fortawesome/free-brands-svg-icons'

library.add(
    faAngleUp,
    faAngleDown,
    faAngleRight,
    faBars,
    faCartShopping,
    faCheck,
    faEnvelope,
    faMinus,
    faFacebook,
    faInstagram,
    faMagnifyingGlass,
    faPhone,
    faUser,
    faYoutube,
    faTrash,
    faPen,
    faPlus,
    faFloppyDisk,
    faDownload,
    faCloudArrowUp,
    faExclamation
)

const pinia = createPinia();

app.use(router);
pinia.use(piniaPluginPersistedstate);
app.use(pinia);
app.use(vuetify);
app.component('font-awesome-icon', FontAwesomeIcon).mount('#app');

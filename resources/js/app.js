/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

import './bootstrap';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';


const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/About',
        name: 'About',
        component: About},
        { path: '/News',
        name: 'News',
        component: News},
    ]
});

const app = createApp({});

import About from './components/About.vue';
app.component('about', About);

import News from './components/News.vue';
app.component('news', News);

import Foot from './components/Foot.vue';
app.component('foot', Foot);

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

import Swiper from './components/Swiper.vue';
app.component('swiper', Swiper);

import Swiper_front from './components/Swiper_front.vue';
app.component('swiper_front', Swiper_front);

import News_admin from './components/News_admin.vue';
app.component('news_admin', News_admin);

import Termekek from './components/Termekek.vue';
app.component('termekek', Termekek);

import Kosar from './components/Kosar.vue';
app.component('kosar', Kosar);

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
    faFacebook,
    faInstagram,
    faMagnifyingGlass,
    faMinus,
    faPhone,
    faPlus,
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
app.component('font-awesome-icon', FontAwesomeIcon).mount('#app');


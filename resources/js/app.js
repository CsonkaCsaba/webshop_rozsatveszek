/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

import './bootstrap';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router'
import About from './components/About.vue';
import News from './components/News.vue';
import Foot from './components/Foot.vue';
import { createPinia } from 'pinia';



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

import News_front from './components/News_front.vue';
app.component('News_front', News_front);

// import components from './components/';
app.component('about', About);
app.component('news', News);
app.component('foot', Foot);

//import flags
import "/node_modules/flag-icons/css/flag-icons.min.css";

//Import FontAwesome
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faBars,
    faCartShopping,
    faEnvelope,
    faMagnifyingGlass,
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
    faBars,
    faCartShopping,
    faEnvelope,
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


app.use(router);
app.use(createPinia());
app.component('font-awesome-icon', FontAwesomeIcon).mount('#app');

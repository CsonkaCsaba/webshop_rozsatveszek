/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

import './bootstrap';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router'
import About from './components/About.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/About',
        name: 'About',
        component: About},
    ]
});

const app = createApp({});


import Navigation from './components/Navigation.vue';
app.component('navigation', Navigation);

import Navigation_log from './components/Navigation_log.vue';
app.component('navigation_log', Navigation_log);

// import About from './components/About.vue';
// app.component('about', About);

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
    faUser
} from '@fortawesome/free-solid-svg-icons'

library.add(
    faBars,
    faCartShopping,
    faMagnifyingGlass,
    faEnvelope,
    faPhone,
    faUser
)

app.use(router);
app.component('font-awesome-icon', FontAwesomeIcon).mount('#app');

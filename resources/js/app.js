/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

import './bootstrap';
import { createApp } from 'vue';


/**
 * Next, we will create a fresh Vue application instance. You may then begin
 * registering components with the application instance so they are ready
 * to use in your application's views. An example is included for you.
 */


const app = createApp({});


import Navigation from './components/Navigation.vue';
app.component('navigation', Navigation);

import Navigation_log from './components/Navigation_log.vue';
app.component('navigation_log', Navigation_log);

import { createRouter, createWebHistory } from 'vue-router'

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

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// Object.entries(import.meta.glob('./**/*.vue', { eager: true })).forEach(([path, definition]) => {
//     app.component(path.split('/').pop().replace(/\.\w+$/, ''), definition.default);
// });

/**
 * Finally, we will attach the application instance to a HTML element with
 * an "id" attribute of "app". This element is included with the "auth"
 * scaffolding. Otherwise, you will need to add an element yourself.
 */

app.component('font-awesome-icon', FontAwesomeIcon).mount('#app');

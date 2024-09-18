/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

import './bootstrap';

import { createApp, defineAsyncComponent } from 'vue';
import { createRouter, createWebHistory } from 'vue-router'

import VueAwesomePaginate from "vue-awesome-paginate";

import "vue-awesome-paginate/dist/style.css";
//import LoadingComponent from './components/LoadingComponent.vue';

import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';



import { createVuetify } from 'vuetify'


const vuetify = createVuetify({

})

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/kosar',
        name: 'kosar',
        component: () => import(/* webpackMode: "lazy" *//* webpackPrefetch: true */'./components/Kosar.vue')},
        { path: '/companydata',
        name: 'companydata',
        component: () => import(/* webpackMode: "lazy" *//* webpackPrefetch: true */'./components/CompanyData.vue')},
        { path: '/gallery',
        name: 'gallery',
        component: () => import(/* webpackMode: "lazy" *//* webpackPrefetch: true */'./components/Gallery.vue')},
        { path: '/dolgozoi',
        name: 'dolgozoi',
        component: () => import(/* webpackMode: "lazy" *//* webpackPrefetch: true */'./components/Admin.vue')},
        { path: '/rendelesek',
        name: 'orders_admin',
        component: () => import(/* webpackMode: "lazy" *//* webpackPrefetch: true */'./components/Orders_admin.vue')},
        
    ]
});

const app = createApp({});

const NavigationAsync = defineAsyncComponent({
    loader:() => import(/* webpackMode: "lazy" *//* webpackPrefetch: true */'./components/Navigation.vue'),
    //loadingComponent: LoadingComponent /* shows while loading */,
    // delay: 1000 /* delay in ms before showing loading component */,
    // timeout: 3000 /* timeout after this many ms */,
})
app.component('navigation', NavigationAsync);

const Navigation_log_Async = defineAsyncComponent({
    loader:() => import(/* webpackMode: "lazy" *//* webpackPrefetch: true */'./components/Navigation_log.vue'),
    //loadingComponent: LoadingComponent /* shows while loading */,
    // delay: 1000 /* delay in ms before showing loading component */,
    // timeout: 3000 /* timeout after this many ms */,
})
app.component('Navigation_log', Navigation_log_Async);

const News_front_child_Async = defineAsyncComponent({
    loader:() => import(/* webpackMode: "lazy" *//* webpackPrefetch: true */'./components/News_front_child.vue')
})
app.component('News_front_child', News_front_child_Async);

const KosarAsync = defineAsyncComponent({
    loader:() => import('./components/Kosar.vue')
})
app.component('Kosar', KosarAsync);

const CompanyDataAsync = defineAsyncComponent({
    loader:() => import('./components/CompanyData.vue')
})
app.component('companydata', CompanyDataAsync);

const GalleryAsync = defineAsyncComponent({
    loader:() => import('./components/Gallery.vue')
})
app.component('gallery', GalleryAsync);

const SwiperGalleryAsync = defineAsyncComponent({
    loader:() => import('./components/Swiper_gallery.vue')
})
app.component('swiper_gallery', SwiperGalleryAsync);

const News_admin_Async = defineAsyncComponent({
    loader:() => import('./components/News_admin.vue')
})
app.component('news_admin', News_admin_Async);

const Swiper_news_Async = defineAsyncComponent({
    loader:() => import('./components/Swiper_news.vue')
})
app.component('swiper_news', Swiper_news_Async);

const Modal_Async = defineAsyncComponent({
    loader:() => import('./components/Modal.vue')
})
app.component('Modal', Modal_Async);

const ModalAccept_Async = defineAsyncComponent({
    loader:() => import('./components/ModalAccept.vue')
})
app.component('modalAccept', ModalAccept_Async);

const Szamlazas_Async = defineAsyncComponent({
    loader:() => import('./components/Szamlazas.vue')
})
app.component('Szamlazas', Szamlazas_Async);

const Szallitas_Async = defineAsyncComponent({
    loader:() => import('./components/Szallitas.vue')
})
app.component('Szallitas', Szallitas_Async);

const Megrendeles_Async = defineAsyncComponent({
    loader:() => import('./components/Megrendeles.vue')
})
app.component('Megrendeles', Megrendeles_Async);

const ShoppingCartSide_Async = defineAsyncComponent({
    loader:() => import('./components/ShoppingCartSide.vue')
})
app.component('ShoppingCartSide', ShoppingCartSide_Async);

const Termekek_Async = defineAsyncComponent({
    loader:() => import('./components/Termekek.vue')
})
app.component('Termekek', Termekek_Async);

const Dolgozoi_Async = defineAsyncComponent({
    loader:() => import('./components/Admin.vue')
})
app.component('dolgozoi', Dolgozoi_Async);

const AddNews_Async = defineAsyncComponent({
    loader:() => import('./components/AddNews.vue')
})
app.component('addnews', AddNews_Async);

const Products_admin_Async = defineAsyncComponent({
    loader:() => import('./components/Products_admin.vue')
})
app.component('products_admin', Products_admin_Async);

const Products_admin_list_Async = defineAsyncComponent({
    loader:() => import('./components/Products_admin_list.vue')
})
app.component('products_admin_list', Products_admin_list_Async);

const Orders_admin_Async = defineAsyncComponent({
    loader:() => import('./components/Orders_admin.vue')
})
app.component('orders_admin', Orders_admin_Async);

const Orders_admin_list_Async = defineAsyncComponent({
    loader:() => import('./components/Orders_admin_list.vue')
})
app.component('orders_admin_list', Orders_admin_list_Async);

const Loader = defineAsyncComponent({
    loader:() => import('./components/Loader.vue')
})
app.component('loader', Loader);

 import Home from './components/Home.vue';
 app.component('Home', Home);

 import About from './components/About.vue';
 app.component('About', About);

 import News_front from './components/News_front.vue';
 app.component('News_front', News_front);
 

 import Foot from './components/Foot.vue';
 app.component('Foot', Foot);

// import Navigation_log from './components/Navigation_log.vue';
// app.component('navigation_log', Navigation_log);

// import Navigation_admin from './components/Navigation_admin.vue';
// app.component('navigation_admin', Navigation_admin);

// import CompanyData from './components/CompanyData.vue';
// app.component('companydata', CompanyData);

// import Gallery from './components/Gallery.vue';
// app.component('gallery', Gallery);

// import Swiper_gallery from './components/Swiper_gallery.vue';
// app.component('swiper_gallery', Swiper_gallery);

// import Swiper_news from './components/Swiper_news.vue';
// app.component('swiper_news', Swiper_news);

// import Swiper_front from './components/Swiper_front.vue';
// app.component('swiper_front', Swiper_front);

// import News_admin from './components/News_admin.vue';
// app.component('news_admin', News_admin);

// import ShoppingCartSide from './components/ShoppingCartSide.vue';
// app.component('ShoppingCartSide', ShoppingCartSide);




// const AboutAsync = defineAsyncComponent({
//     loader:() => import(/* webpackMode: "lazy" *//* webpackPrefetch: true */'./components/About.vue')
// })
// app.component('About', AboutAsync);

// const News_frontAsync = defineAsyncComponent({
//     loader:() => import('./components/News_front.vue')
// })
// app.component('News_front', News_frontAsync);



// const Footer = defineAsyncComponent({
//     loader:() => import(/* webpackMode: "lazy" *//* webpackPrefetch: true */'./components/Footer.vue')
// })
// app.component('Footer', Footer);

// const Foot = defineAsyncComponent({
//     loader:() => import(/* webpackMode: "lazy" *//* webpackPrefetch: true */'./components/Foot.vue')
// })
// app.component('Foot', Foot);
//import flags

import "/node_modules/flag-icons/css/flag-icons.min.css";

// import Modal from './components/Modal.vue';
// app.component('Modal', Modal);

// import components from './components/';
//app.component('About', About);
//app.component('News_front', News_front);
//app.component('foot', Foot);

// import Termekek from './components/Termekek.vue';
// app.component('termekek', Termekek);
// import Kosar from './components/Kosar.vue';
// app.component('kosar', Kosar);

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
    faExclamation,
    faCamera,
    faNewspaper,
    faShop,
    faArrowDownAZ,
    faArrowUpAZ,
    faHourglass,
    faTruck,
    faBan,
    faXmark,
    faCircleExclamation,
    faUpDown,
    faTruckFast
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
    faExclamation,
    faCamera,
    faNewspaper,
    faShop,
    faArrowDownAZ,
    faArrowUpAZ,
    faHourglass,
    faTruck,
    faBan,
    faXmark,
    faCircleExclamation,
    faUpDown,
    faTruckFast
)

const pinia = createPinia();

app.use(router);
pinia.use(piniaPluginPersistedstate);
app.use(pinia);
app.use(vuetify);
app.use(VueAwesomePaginate);
app.component('font-awesome-icon', FontAwesomeIcon).mount('#app');

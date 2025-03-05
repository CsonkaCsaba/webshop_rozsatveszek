/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

import './bootstrap';

import { createApp, defineAsyncComponent, watch } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import VueAwesomePaginate from "vue-awesome-paginate";

import "vue-awesome-paginate/dist/style.css";
//import LoadingComponent from './components/LoadingComponent.vue';

import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi';

import Echo from "laravel-echo";
import Pusher from "pusher-js"

import AOS from 'aos'
import 'aos/dist/aos.css'

const echo = new Echo({
    broadcaster: 'pusher',
    key: "local",
    wsHost:import.meta.env.VUE_APP_WEBSOCKETS_SERVER,
    wsPort: 6001,
    cluster: "mt1",
    forceTLS: false,
    disableStats: true,
});

//window.Echo.channel('rendeles').listen('NewOrder', (e) => {
    //this.newOrder = true;
    //this.orders.push(e.rendeles);
    //console.log(e);
//})
echo.channel('rendeles').listen('NewOrder', (e) => {
    console.log(e);
})
const vuetify = createVuetify({
    icons: {
        iconfont: 'md',
      },
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
        { path: '/kivansaglista',
        name: 'kivansaglista',
        component: () => import(/* webpackMode: "lazy" *//* webpackPrefetch: true */'./components/Wishlist.vue')},             
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

// const News_front_child_Async = defineAsyncComponent({
//     loader:() => import(/* webpackMode: "lazy" *//* webpackPrefetch: true */'./components/News_front_child.vue')
// })
// app.component('News_front_child', News_front_child_Async);

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

const sikeresrendeles_Async = defineAsyncComponent({
    loader:() => import('./components/sikeresrendeles.vue')
})
app.component('sikeresrendeles', sikeresrendeles_Async);

const My_account_Async = defineAsyncComponent({
    loader:() => import('./components/My_account.vue')
})
app.component('my_account', My_account_Async);

const My_data_Async = defineAsyncComponent({
    loader:() => import('./components/My_data.vue')
})
app.component('my_data', My_data_Async);

const My_orders_Async = defineAsyncComponent({
    loader:() => import('./components/My_orders.vue')
})
app.component('my_orders', My_orders_Async);

const Wishlist_Async = defineAsyncComponent({
    loader:() => import('./components/Wishlist.vue')
})
app.component('wishlist', Wishlist_Async);

const WishlistNotLoggedInAsync = defineAsyncComponent({
    loader:() => import('./components/WishlistNotLoggedIn.vue')
})
app.component('wishlistnotloggedin', WishlistNotLoggedInAsync);

const Usernav_Async = defineAsyncComponent({
    loader:() => import('./components/UserNav.vue')
})
app.component('usernav', Usernav_Async);

const Loader = defineAsyncComponent({
    loader:() => import('./components/Loader.vue')
})
app.component('loader', Loader);

const BannerPopup = defineAsyncComponent({
    loader:() => import('./components/BannerPopupAdmin.vue')
})
app.component('BannerPopupAdmin', BannerPopup);

const Banner_Admin = defineAsyncComponent({
    loader:() => import('./components/Banner_Admin.vue')
})
app.component('Banner_Admin', Banner_Admin);

const Popup_Admin = defineAsyncComponent({
    loader:() => import('./components/Popup_Admin.vue')
})
app.component('Popup_Admin', Popup_Admin);

const Popup = defineAsyncComponent({
    loader:() => import('./components/Popup.vue')
})
app.component('Popup', Popup);

const Popup_Front = defineAsyncComponent({
    loader:() => import('./components/Popup_Front.vue')
})
app.component('Popup_Front', Popup_Front);

const BannerFront = defineAsyncComponent({
    loader:() => import('./components/BannerFront.vue')
})
app.component('BannerFront', BannerFront);

const Banner = defineAsyncComponent({
    loader:() => import('./components/Banner.vue')
})
app.component('Banner', Banner);

const Karbatartas = defineAsyncComponent({
    loader:() => import('./components/Karbatartas.vue')
})
app.component('Karbatartas', Karbatartas);

const Navigation_Admin = defineAsyncComponent({
    loader:() => import('./components/Navigation_admin.vue')
})
app.component('navigation_admin', Navigation_Admin);

const Cookie = defineAsyncComponent({
    loader:() => import('./components/Cookie.vue')
})
app.component('cookie', Cookie);

const Stat_Admin = defineAsyncComponent({
    loader:() => import('./components/Stat_Admin.vue')
})
app.component('stat_admin', Stat_Admin);

const PieChart = defineAsyncComponent({
    loader:() => import('./components/PieChart.vue')
})
app.component('pieChart', PieChart);

const BarChart = defineAsyncComponent({
    loader:() => import('./components/BarChart.vue')
})
app.component('barChart', BarChart);

const LineChart = defineAsyncComponent({
    loader:() => import('./components/LineChart.vue')
})
app.component('lineCharta', LineChart);

const Tags_list_Admin = defineAsyncComponent({
    loader:() => import('./components/Tags_list_Admin.vue')
})
app.component('Tags_list_Admin', Tags_list_Admin);

const Gallery_front = defineAsyncComponent({
    loader:() => import('./components/Gallery_front.vue')
})
app.component('Gallery_front', Gallery_front);

const LoaderRose = defineAsyncComponent({
    loader:() => import('./components/LoaderRose.vue')
})
app.component('LoaderRose', LoaderRose);

const Tanacsok = defineAsyncComponent({
    loader:() => import('./components/Tanacsok.vue')
})
app.component('Tanacsok', Tanacsok);

const ModalForProductDetails = defineAsyncComponent({
    loader:() => import('./components/ModalForProductDetails.vue')
})
app.component('ModalForProductDetails', ModalForProductDetails);


import Home from './components/Home.vue';
app.component('Home', Home);

import About from './components/About.vue';
app.component('About', About);

// import News_front from './components/News_front.vue';
// app.component('News_front', News_front);

import News_front_child from './components/News_front_child.vue';
    
app.component('News_front_child', News_front_child);


import Foot from './components/Foot.vue';
app.component('Foot', Foot);

import Wishlist from './components/Wishlist.vue';
app.component('kivansaglista', Wishlist);

import Tags from './components/Tags.vue';
app.component('tagsComponent', Tags);


import "/node_modules/flag-icons/css/flag-icons.min.css";

import "/node_modules/flag-icons/css/flag-icons.min.css";

//Import FontAwesome
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { far } from '@fortawesome/free-regular-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
library.add(far)
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
    faStar,
    faArrowDownAZ,
    faArrowUpAZ,
    faHourglass,
    faTruck,
    faBan,
    faXmark,
    faCircleExclamation,
    faUpDown,
    faTruckFast,
    faHeart,
    faQuestion,
    faWindowMaximize,
    faEye,
    faEyeSlash,
    faRotateLeft,
    faCookie,
    faChartSimple,
    faAngleLeft,
    faTag,
    faCircleInfo
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
    faStar,
    faArrowDownAZ,
    faArrowUpAZ,
    faHourglass,
    faTruck,
    faBan,
    faXmark,
    faCircleExclamation,
    faUpDown,
    faTruckFast,
    faHeart,
    faQuestion,
    faWindowMaximize,
    faEye,
    faEyeSlash,
    faRotateLeft,
    faCookie,
    faChartSimple,
    faAngleLeft,
    faTag,
    faCircleInfo
)

const pinia = createPinia();
watch(
    pinia.Product,
    (Product) => {
      localStorage.setItem("wish", JSON.stringify(Product));
    },
    { deep: true }
    );

AOS.init({ duration: 1200 });
app.use(router);
pinia.use(piniaPluginPersistedstate);
app.use(pinia);
app.use(vuetify);
app.use(VueAwesomePaginate);
app.use(AOS);
app.component('font-awesome-icon', FontAwesomeIcon).mount('#app');

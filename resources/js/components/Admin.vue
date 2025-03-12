<script setup>
import { register } from 'swiper/element/bundle';
import { storeToRefs } from 'pinia';
import { KarbantartasStore } from './store/KarbantartasStore';
import { OrdersStore } from './store/Orders';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { defineAsyncComponent, ref } from 'vue';

const { karbatart, message, modalStatus, newOrder } = storeToRefs(KarbantartasStore());
const { switchkarbatartasAktiv, fetchKarbantartas, receiveEmit, pageReload } = KarbantartasStore();
fetchKarbantartas();
register();
const activeTab = ref('');
window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: import.meta.env.VITE_PUSHER_APP_KEY,
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
    wsHost: window.location.hostname,
    wsPort: 6001,
    forceTLS: false,
    disableStats: true,
});

var audio = new Audio('../resources/assets/hangok/piano.mp3');
window.Echo.channel('orders')
    .listen('.OrderCreated', (e) => {
        newOrder.value = true;
        audio.play();
        OrdersStore().orders = [];
        OrdersStore().slicedOrders = [];
        OrdersStore().fetchOrders();
        OrdersStore().reload += 1;
    });

const props = defineProps({
    manager: {
        type: Boolean,
        required: false,
        default: false
    }
});

const users_admin = defineAsyncComponent(() => import('./Users_Admin.vue'));
const products_admin = defineAsyncComponent(() => import('./Products_Admin.vue'));
const news_admin = defineAsyncComponent(() => import('./News_admin.vue'));
const gallery = defineAsyncComponent(() => import('./Gallery.vue'));
const BannerPopupAdmin = defineAsyncComponent(() => import('./BannerPopupAdmin.vue'));
const companydata = defineAsyncComponent(() => import('./CompanyData.vue'));
</script>

<template>
    <div class="d-flex justify-content-center text-center align">
        <div class="form-check form-switch mt-2">
            <input class="form-check-input" type="checkbox" id="popupCheckbox" v-model="karbatart" :checked="karbatart" @click="switchkarbatartasAktiv">
            <label v-if="!karbatart" class="form-check-label m-1 ps-2" for="popupCheckbox">Karbantartási üzemmód bekapcsolás</label>
            <label v-if="karbatart" class="fw-bold form-check-label m-1 ps-2" for="bannerCheckbox" :class="{activekarbantart : karbatart}">Karbantartási üzemmód aktív</label>
        </div>
    </div>
    <div data-aos="fade-right" v-if="newOrder" class="alert alert-info alert-dismissible fade show align-items-center text-center position-fixed popmessage" role="alert">
        <h4> 🎉 Gratulálok, új rendelésed érkezett! <br>Hozzáadtam a rendelések listájához!</h4>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" @click="newOrder = false"> </button>
    </div>
    <ul class="nav nav-tabs justify-content-center tabs" role="tablist">
        <li class="nav-item" role="presentation">
            <a class="nav-link active" id="simple-tab-0" data-bs-toggle="tab" href="#simple-tabpanel-0" role="tab" aria-controls="simple-tabpanel-0" aria-selected="true"> <font-awesome-icon :icon="['fas', 'cart-shopping']" /> Rendelések </a>
        </li>
        <li v-if="!props.manager" class="nav-item" role="presentation">
            <a class="nav-link" id="simple-tab-1" data-bs-toggle="tab" href="#simple-tabpanel-1" role="tab" aria-controls="simple-tabpanel-1" aria-selected="true" @click="activeTab = 'Felhasználók'"><font-awesome-icon :icon="['fas', 'user']" /> Felhasználók </a>
        </li>
        <li v-if="!props.manager" class="nav-item" role="presentation">
            <a class="nav-link" id="simple-tab-2" data-bs-toggle="tab" href="#simple-tabpanel-2" role="tab" aria-controls="simple-tabpanel-2" aria-selected="false" @click="activeTab = 'Statisztika'"><font-awesome-icon :icon="['fas', 'chart-simple']" /> Statisztika </a>
        </li>
        <li v-if="!props.manager" class="nav-item" role="presentation">
            <a class="nav-link" id="simple-tab-3" data-bs-toggle="tab" href="#simple-tabpanel-3" role="tab" aria-controls="simple-tabpanel-3" aria-selected="false" @click="activeTab = 'Termékek'"><font-awesome-icon :icon="['fas', 'bars']" /> Termékek</a>
        </li>
        <li v-if="!props.manager" class="nav-item" role="presentation">
            <a class="nav-link" id="simple-tab-4" data-bs-toggle="tab" href="#simple-tabpanel-4" role="tab" aria-controls="simple-tabpanel-4" aria-selected="false" @click="activeTab = 'Hírek'"><font-awesome-icon :icon="['fa', 'newspaper']" /> Hírek</a>
        </li>
        <li v-if="!props.manager" class="nav-item" role="presentation">
            <a class="nav-link" id="simple-tab-5" data-bs-toggle="tab" href="#simple-tabpanel-5" role="tab" aria-controls="simple-tabpanel-5" aria-selected="false" @click="activeTab = 'Galéria'"> <font-awesome-icon :icon="['fas', 'camera']" /> Galéria </a>
        </li>
        <li v-if="!props.manager" class="nav-item" role="presentation">
            <a class="nav-link" id="simple-tab-6" data-bs-toggle="tab" href="#simple-tabpanel-6" role="tab" aria-controls="simple-tabpanel-6" aria-selected="false" @click="activeTab = 'Banner & Popup'"><font-awesome-icon :icon="['fas', 'window-maximize']" />  Banner & Popup</a>
        </li>
        <li v-if="!props.manager" class="nav-item" role="presentation">
            <a class="nav-link" id="simple-tab-7" data-bs-toggle="tab" href="#simple-tabpanel-7" role="tab" aria-controls="simple-tabpanel-7" aria-selected="false" @click="activeTab = 'Cégadatok'"> <font-awesome-icon :icon="['fas', 'shop']" /> Cégadatok</a>
        </li>
    </ul>
    <div class="tab-content" id="tab-content">
        <div class="tab-pane fade show active" id="simple-tabpanel-0" role="tabpanel" aria-labelledby="simple-tab-0">
            <Suspense>
                <template #default>
                    <orders_admin></orders_admin>
                </template>
                <template #fallback>
                    <p class="text-center">Betöltés...</p>
                </template>
            </Suspense>
        </div>
        <div class="tab-pane fade" id="simple-tabpanel-1" role="tabpanel" aria-labelledby="simple-tab-1">
            <Suspense>
                <template #default>
                    <users_admin v-if="activeTab === 'Felhasználók' "></users_admin>
                </template>
                <template #fallback>
                    <p class="text-center">Betöltés...</p>
                </template>
            </Suspense>
        </div>
        <div class="tab-pane fade" id="simple-tabpanel-2" role="tabpanel" aria-labelledby="simple-tab-2">
            <Suspense>
                <template #default>
                    <stat_admin></stat_admin>
                </template>
                <template #fallback>
                    <p class="text-center">Betöltés...</p>
                </template>
            </Suspense>
        </div>
        <div class="tab-pane fade" id="simple-tabpanel-3" role="tabpanel" aria-labelledby="simple-tab-3">
            <Suspense>
                <template #default>
                    <products_admin v-if="activeTab === 'Termékek' "></products_admin>
                </template>
                <template #fallback>
                    <p class="text-center">Betöltés...</p>
                </template>
            </Suspense>
        </div>
        <div class="tab-pane fade" id="simple-tabpanel-4" role="tabpanel" aria-labelledby="simple-tab-4">
            <Suspense>
                <template #default>
                    <news_admin v-if="activeTab === 'Hírek' "></news_admin>
                </template>
                <template #fallback>
                    <p class="text-center">Betöltés...</p>
                </template>
            </Suspense>
        </div>
        <div class="tab-pane fade" id="simple-tabpanel-5" role="tabpanel" aria-labelledby="simple-tab-5">
            <Suspense>
                <template #default>
                    <gallery v-if="activeTab === 'Galéria' "></gallery>
                </template>
                <template #fallback>
                    <p class="text-center">Betöltés...</p>
                </template>
            </Suspense>
        </div>
        <div class="tab-pane fade" id="simple-tabpanel-6" role="tabpanel" aria-labelledby="simple-tab-6">
            <Suspense>
                <template #default>
                    <BannerPopupAdmin v-if="activeTab === 'Banner & Popup' "></BannerPopupAdmin>
                </template>
                <template #fallback>
                    <p class="text-center">Betöltés...</p>
                </template>
            </Suspense>
        </div>
        <div class="tab-pane fade" id="simple-tabpanel-7" role="tabpanel" aria-labelledby="simple-tab-7">
            <Suspense>
                <template #default>
                    <companydata v-if="activeTab === 'Cégadatok' "></companydata>
                </template>
                <template #fallback>
                    <p class="text-center">Betöltés...</p>
                </template>
            </Suspense>
        </div>
    </div>
    <Modal v-model="modalStatus" :message="message" @modalStatus="receiveEmit"></Modal>
</template>

<style lang="sass" scoped>
.tabs
    margin-top: 1%
.nav-link 
    background-image: linear-gradient(to right, #232526 0%, #414345  51%, #232526  100%)
    color: white
    border: 5px solid #d1ecf1
    border-radius: 25% 0 0 0
    text-transform: uppercase

.active
    color: black !important
    background-color: white !important
    background-image: none
    
.activekarbantart
    color: red
.popmessage
    z-index: 90
</style>
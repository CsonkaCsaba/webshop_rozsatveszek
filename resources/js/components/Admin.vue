<script setup>
import { register } from 'swiper/element/bundle';
import { storeToRefs} from 'pinia';
import { KarbantartasStore } from './store/KarbantartasStore';

 const { karbatart } = storeToRefs(KarbantartasStore());
 const { switchkarbatartasAktiv, fetchKarbantartas} = KarbantartasStore();
 fetchKarbantartas();
register();
</script>

<template>
        <div class="d-flex justify-content-center text-center align">
            <div class="form-check form-switch mt-2">
                <input class="form-check-input " type="checkbox" id="popupCheckbox" v-model="karbatart" :checked="karbatart" @click="switchkarbatartasAktiv">
                <label class="form-check-label m-1 ps-2" for="popupCheckbox">Karbantartási üzemmód</label>
            </div>
        </div>
    <ul class="nav nav-tabs justify-content-center tabs" role="tablist">
         <li class="nav-item" role="presentation">
            <a class="nav-link active" id="simple-tab-0" data-bs-toggle="tab" href="#simple-tabpanel-0" role="tab" aria-controls="simple-tabpanel-0" aria-selected="true"><font-awesome-icon :icon="['fas', 'shop']" /> Rendelések </a>
        </li>
        <li class="nav-item" role="presentation">
            <a class="nav-link" id="simple-tab-1" data-bs-toggle="tab" href="#simple-tabpanel-1" role="tab" aria-controls="simple-tabpanel-1" aria-selected="false"><font-awesome-icon :icon="['fas', 'camera']" /> Termékek</a>
        </li>
        <li class="nav-item" role="presentation">
            <a class="nav-link" id="simple-tab-2" data-bs-toggle="tab" href="#simple-tabpanel-2" role="tab" aria-controls="simple-tabpanel-2" aria-selected="false"><font-awesome-icon :icon="['fa', 'newspaper']" /> Hírek</a>
        </li>
        <li class="nav-item" role="presentation">
            <a class="nav-link " id="simple-tab-3" data-bs-toggle="tab" href="#simple-tabpanel-3" role="tab" aria-controls="simple-tabpanel-3" aria-selected="false"> <font-awesome-icon :icon="['fas', 'bars']" /> Galéria </a>
        </li>
        <li class="nav-item " role="presentation">
            <a class="nav-link " id="simple-tab-4" data-bs-toggle="tab" href="#simple-tabpanel-4" role="tab" aria-controls="simple-tabpanel-4" aria-selected="false"><font-awesome-icon :icon="['fas', 'window-maximize']" />  Banner & Popup</a>
        </li>
        <li class="nav-item " role="presentation">
            <a class="nav-link " id="simple-tab-5" data-bs-toggle="tab" href="#simple-tabpanel-5" role="tab" aria-controls="simple-tabpanel-5" aria-selected="false"><font-awesome-icon :icon="['fas', 'cart-shopping']" /> Cégadatok</a>
        </li>
    </ul>
    <div class="tab-content" id="tab-content">
        <div class="tab-pane fade show active" id="simple-tabpanel-0" role="tabpanel" aria-labelledby="simple-tab-0">
            <Suspense>
                <orders_admin></orders_admin>
                
            </Suspense>
        </div>
        <div class="tab-pane fade" id="simple-tabpanel-1" role="tabpanel" aria-labelledby="simple-tab-1">
            <Suspense>
                <products_admin></products_admin>
            </Suspense>
        </div>
        <div class="tab-pane fade" id="simple-tabpanel-2" role="tabpanel" aria-labelledby="simple-tab-2">
            <Suspense>
                <news_admin></news_admin>
            </Suspense>
        </div>
        <div class="tab-pane fade" id="simple-tabpanel-3" role="tabpanel" aria-labelledby="simple-tab-3">
            <Suspense>
                <gallery></gallery>
            </Suspense>
        </div>
        <div class="tab-pane fade" id="simple-tabpanel-4" role="tabpanel" aria-labelledby="simple-tab-4">
            <Suspense>
                <BannerPopupAdmin></BannerPopupAdmin>
            </Suspense>
        </div>
        <div class="tab-pane fade" id="simple-tabpanel-5" role="tabpanel" aria-labelledby="simple-tab-5">
            <Suspense>
                <companydata></companydata>
            </Suspense>
        </div>
    </div>
</template>
<style lang="sass" scoped>
.tabs
    margin-top: 3%
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



</style>
<script setup>
import { BannerPopupStore } from './store/BannerPopupStore';
import { storeToRefs} from 'pinia';
import { ref, watch } from 'vue'
const { receiveEmit, saveUpdate, fetchBanners, update, showPreviewButton, closePreviewButton, setToDefault, updateBanner, switchBannerState} = BannerPopupStore()
const { modalStatus, message, activeBanner, banners, showPreview, defaultBackroundColor, defaultFontColor} = storeToRefs(BannerPopupStore())
fetchBanners();


</script>

<template>

<div class="container fontcolor cim">
    <div class="justify-content-center text-center p-2">
        <div class="divider fontcolor"><span></span><span><font-awesome-icon :icon="['fas', 'window-maximize']" /> Banner & Popup </span><span></span></div>
        <img src="../../assets/kepek/popup.png" alt="desk" width="90" height="100">
    </div>
</div>
<div class="container mb-4 pt-4">
    <div class="justify-content-start align-items-start">
        <h3 class="fw-bold">Banner beállításai</h3>
    </div>
    <div class="">
        <div class="form-check form-switch">
            <input class="form-check-input " type="checkbox" id="bannerCheckbox" v-model="activeBanner" :checked="activeBanner" @click="switchBannerState">
            <label v-if="activeBanner" class="form-check-label m-1 ps-2" for="bannerCheckbox">Banner kikapcsolása</label>
            <label v-if="!activeBanner" class="form-check-label m-1 ps-2" for="bannerCheckbox" :class="{active : activeBanner}"> Banner bekapcsolása</label>
        </div>
    </div>
        <div class="col-12 mb-8" v-for="banner in banners[0]" key="banner.id">
            <ul class="m-4">
                <ol>
                <form method="POST" @submit.prevent="update()" >
                    <div class="row">
                        <div class="col-5">
                            <label class="form-label form-label-top mt-4 fw-bold" for="bannertext"> Szöveges tartalom</label>
                            <input type="text" class="form-control"  :placeholder="banner.szoveg" v-model="banner.szoveg" name="bannertext"/>
                        </div>
                        <div class="col-1">
                            <label class="form-label mt-4 fw-bold" for="bannerBackroundColor"> Háttérszín</label>
                            <input type="color" class="form-control form-control-color"  :placeholder="banner.hatterszin" v-model="banner.hatterszin" name="bannerBackroundColor"/>
                        </div>
                        <div class="col-1">
                            <label class="form-label mt-4 fw-bold" for="bannerTextColor"> Betűszín</label>
                            <input type="color" class="form-control form-control-color" :placeholder="banner.betuszin" v-model="banner.betuszin" name="bannerTextColor"/>
                        </div>
                        <div class="col-3 mt-4">
                            <p class="fw-bold">Sebesség</p>
                            <label for="customRange2 " class="form-label"></label>
                            <input type="range" class="form-range" min="5" max="25" v-model="banner.sebesseg" id="customRange2" step="0.5">
                            <div class="d-flex"><p>gyors</p> <p class="ms-8" id="fast">lassú</p></div>
                            <p>Érték: {{ banner.sebesseg }} s</p>
                            
                        </div>
                        <div class="col-2 align-items-center">
                            <button v-if="!showPreview" type="button" class="btn secoundaryBtna btn-lg mt-5" @click="showPreviewButton" data-bs-toggle="tooltip" data-bs-placement="top" title="Előnézet" ><font-awesome-icon :icon="['fas', 'eye']" /></button>

                            <button v-if="showPreview" type="button" class="btn secoundaryBtna btn-lg mt-5" @click="closePreviewButton" data-bs-toggle="tooltip" data-bs-placement="top" title="Előnézet bezárása" ><font-awesome-icon :icon="['fas', 'eye-slash']" /></button>

                            <button type="button" class="btn secoundaryBtna btn-lg mt-5 ms-2" @click="setToDefault" data-bs-toggle="tooltip" data-bs-placement="top" title="Visszaállít" ><font-awesome-icon :icon="['fas', 'rotate-left']" /></button>

                            <button type="button" class="btn secoundaryBtna btn-lg mt-5 ms-2" @click="updateBanner" data-bs-toggle="tooltip" data-bs-placement="top" title="Mentés" ><font-awesome-icon :icon="['fas', 'floppy-disk']" /></button>
                        </div>
                    </div>
                </form>
                
                
                </ol>
            </ul>
            <div v-if="showPreview" class="position-absolute top-0 start-0 w-100 marquee" :style="{'background-color' : banner.hatterszin, 'color': banner.betuszin}"><p class="p-3 mt-3" :style="{'animation-duration':banner.sebesseg+'s'} ">{{ banner.szoveg }}</p></div>
        </div>
</div>

<Modal v-model="modalStatus" :message="message" @modalStatus="receiveEmit" ></Modal>
</template>

<style lang="sass" scoped>
#bannerCheckbox
    width: 35px
    height: 18px

.active
    color: green

#fast
    left: 75%
    position: relative

input[type="range"] 

    box-shadow: 0 0 1px 0 #555
    transition: background .3s ease-in-out
  
</style>
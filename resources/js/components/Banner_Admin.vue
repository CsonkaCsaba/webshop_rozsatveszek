<script setup>
import { BannerPopupStore } from './store/BannerPopupStore';
import { storeToRefs} from 'pinia';
import { ref, watch } from 'vue'
const { receiveEmit, saveUpdate, fetchBanners, fetchPopups, update, showPreviewButton, closePreviewButton, showPreviewButtonPopup, closePreviewButtonPopup, setToDefault,setToDefaultPopup, updateBanner, updatePopup,switchBannerState, switchPopupState, onChange, changeFontFamilyBanner, changeFontStyleBanner} = BannerPopupStore()
const { modalStatus, message, activeBanner, banners, popups, showPreviewBanner, showPreviewPopup, defaultBackroundColor, defaultFontColor, activePopup, popupWithPhoto} = storeToRefs(BannerPopupStore())
fetchBanners();
</script>
<template>
<div class="container mb-4 pt-4 ">
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
        <div class="col-12 mb-8 banner" v-for="banner in banners[0]" key="banner.id">
            <ul class="m-4">
                <ol>
                <form method="POST" @submit.prevent="update()" >
                    <div class="row">
                        <div class="col-6">
                            <label class="form-label form-label-top mt-4 fw-bold" for="bannertext"> Szöveges tartalom</label>
                            <textarea  type="text" class="form-control"  :placeholder="banner.szoveg" v-model="banner.szoveg" name="bannertext" rows="3"></textarea>
                        </div>
                        <div class="col-1">
                            <label class="form-label mt-4 fw-bold" for="bannerBackroundColor"> Háttérszín</label>
                            <input type="color" class="form-control form-control-color"  :placeholder="banner.hatterszin" v-model="banner.hatterszin" name="bannerBackroundColor"/>
                        </div>
                        <div class="col-1">
                            <label class="form-label mt-4 fw-bold" for="bannerTextColor"> Betűszín</label>
                            <input type="color" class="form-control form-control-color" :placeholder="banner.betuszin" v-model="banner.betuszin" name="bannerTextColor"/>
                        </div>
                        <div class="col-2 mt-4">
                            <p class="fw-bold">Sebesség</p>
                            <label for="customRange2 " class="form-label"></label>
                            <input type="range" class="form-range" min="5" max="25" v-model="banner.sebesseg" id="customRange2" step="1">
                            <div class="d-flex"><p>gyors</p> <p class="ms-8" id="fast">lassú</p></div>
                            <p>Érték: {{ banner.sebesseg }} s</p>
                            
                        </div>
                        <div class="col-2 align-items-center">
                            <button v-if="!showPreviewBanner" type="button" class="btn secoundaryBtna btn-lg mt-5" @click="showPreviewButton" data-bs-toggle="tooltip" data-bs-placement="top" title="Előnézet" ><font-awesome-icon :icon="['fas', 'eye']" /></button>

                            <button v-if="showPreviewBanner" type="button" class="btn secoundaryBtna btn-lg mt-5" @click="closePreviewButton" data-bs-toggle="tooltip" data-bs-placement="top" title="Előnézet bezárása" ><font-awesome-icon :icon="['fas', 'eye-slash']" /></button>

                            <button type="button" class="btn secoundaryBtna btn-lg mt-5 ms-2" @click="setToDefault" data-bs-toggle="tooltip" data-bs-placement="top" title="Visszaállít" ><font-awesome-icon :icon="['fas', 'rotate-left']" /></button>

                            <button type="button" class="btn secoundaryBtna btn-lg mt-5 ms-2" @click="updateBanner" data-bs-toggle="tooltip" data-bs-placement="top" title="Mentés" ><font-awesome-icon :icon="['fas', 'floppy-disk']" /></button>
                        </div>
                        <div class="row">
                            <div class="col-3">
                                <label class="form-label fw-bold" for="bannerTextColor"> Betűk típusa</label>
                                <select class="form-select fs-6 px-2 mb-4 " :v-model="selectedValue" @change="changeFontFamilyBanner($event)">
                                    <option :value="banner.betutipus">{{ banner.betutipus }}</option>
                                    <option v-for="option in banner.optionsFinalFontFamily" :key="option.id" :value="option.option" :style="{'font-family': option.option}" >{{ option.option }}</option>
                                </select>
                            </div>
                            <div class="col-3">
                                <label class="form-label fw-bold" for="bannerTextColor"> Betűk stílusa</label>
                                <select class="form-select fs-6 px-2 mb-4 " :v-model="selectedValue" @change="changeFontStyleBanner($event)">
                                    <option :value="banner.betustilus">{{ banner.betustilus }}</option>
                                    <option v-for="option in banner.optionsFinalFontStyle" :key="option.id" :value="option.option" :style="{'font-style': option.option}" >{{ option.option }}</option>
                                </select>
                            </div>
                    </div>
                    </div>
                </form>
                
                
                </ol>
            </ul>
            <div v-if="showPreviewBanner" class="position-absolute top-0 start-0 w-100 marquee" :style="{'background-color' : banner.hatterszin, 'color': banner.betuszin, 'font-family': banner.betutipus, 'font-style': banner.betustilus}"><p class="p-3 mt-3" :style="{'animation-duration':banner.sebesseg+'s'} ">{{ banner.szoveg }}</p></div>
        </div>
</div>
</template>
<style lang="sass" scoped>
</style>
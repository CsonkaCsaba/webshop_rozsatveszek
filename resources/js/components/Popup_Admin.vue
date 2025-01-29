<script setup>
import { BannerPopupStore } from './store/BannerPopupStore';
import { GalleryStore } from './store/Gallery';
import { storeToRefs} from 'pinia';
import { ref, watch } from 'vue';
import Popup from './Popup.vue';

const { receiveEmit, saveUpdate, fetchBanners, fetchPopups, update, showPreviewButton, closePreviewButton, showPreviewButtonPopup, closePreviewButtonPopup, setToDefault,setToDefaultPopup, updateBanner, updatePopup,switchBannerState, switchPopupState, onChange, uploadPoto, changePhotoState, changeFontFamily, changeFontStyle, changeGallery} = BannerPopupStore()
const { modalStatus, message, photoMessage, activeBanner, banners, popups, showPreviewBanner, showPreviewPopup, defaultBackroundColor, defaultFontColor, activePopup, popupWithPhoto, noFile, selectedValue, optionsStatus, isAdmin, chooseFromGallery} = storeToRefs(BannerPopupStore())

const { gallery} = storeToRefs(GalleryStore())

fetchPopups();
</script>

<template>
<div class="container mb-4 pt-4">
        <div class="justify-content-start align-items-start">
            <h3 class="fw-bold">Popup beállításai</h3>
        </div>
        <div class="">
            <div class="form-check form-switch">
                <input class="form-check-input " type="checkbox" id="popupCheckbox" v-model="activePopup" :checked="activePopup" @click="switchPopupState">
                <label v-if="activePopup" class="form-check-label m-1 ps-2" for="popupCheckbox">Popup kikapcsolása</label>
                <label v-if="!activePopup" class="form-check-label m-1 ps-2" for="popupCheckbox" :class="{active : activePopup}"> Popup bekapcsolása</label>
            </div>
        </div>
    </div>
    <div class="container mb-4 pt-4 banner">
    <div class="col-12 mb-8" v-for="popup in popups[0]" key="popup.id">
            <ul class="m-4">
                <ol>
                <form method="POST" @submit.prevent="updatePopup()" >
                    <div class="row">
                        <div class="col-6">
                            <label class="form-label form-label-top mt-4 fw-bold" for="popuptitle">Cím</label>
                            <textarea type="text" class="form-control"  :placeholder="popup.cim" v-model="popup.cim" name="popuptitle" rows="3"></textarea>
                        </div>
                        <div class="col-1">
                            <label class="form-label mt-4 fw-bold" for="popupBackroundColor"> Háttérszín</label>
                            <input type="color" class="form-control form-control-color"  :placeholder="popup.hatterszin" v-model="popup.hatterszin" name="popupBackroundColor"/>
                        </div>
                        <div class="col-1">
                            <label class="form-label mt-4 fw-bold" for="popupTextColor"> Betűk színe</label>
                            <input type="color" class="form-control form-control-color" :placeholder="popup.betuszin" v-model="popup.betuszin" name="popupTextColor"/>
                        </div>
                        <div class="col-2">
                        </div>
                        <div class="col-2 justify-content-end">
                            <button v-if="!showPreviewPopup" type="button" class="btn secoundaryBtna btn-lg mt-5" @click="showPreviewButtonPopup" data-bs-toggle="tooltip" data-bs-placement="top" title="Előnézet" ><font-awesome-icon :icon="['fas', 'eye']" /></button>

                            <button v-if="showPreviewPopup" type="button" class="btn secoundaryBtna btn-lg mt-5" @click="closePreviewButtonPopup" data-bs-toggle="tooltip" data-bs-placement="top" title="Előnézet bezárása" ><font-awesome-icon :icon="['fas', 'eye-slash']" /></button>

                            <button type="button" class="btn secoundaryBtna btn-lg mt-5 ms-2" @click="setToDefaultPopup" data-bs-toggle="tooltip" data-bs-placement="top" title="Visszaállít" ><font-awesome-icon :icon="['fas', 'rotate-left']" /></button>

                            <button type="button" class="btn secoundaryBtna btn-lg mt-5 ms-2" @click="updatePopup" data-bs-toggle="tooltip" data-bs-placement="top" title="Mentés" ><font-awesome-icon :icon="['fas', 'floppy-disk']" /></button>
                        </div>
                    </div>
                        <div class="row">
                            <div class="col-3">
                                <label class="form-label mt-4 fw-bold" for="popupTextColor"> Betűk típusa</label>
                                <select class="form-select fs-6 px-2" :v-model="selectedValue" @change="changeFontFamily($event)">
                                    <option :value="popup.betutipus">{{ popup.betutipus }}</option>
                                    <option v-for="option in popup.optionsFinalFontFamily" :key="option.id" :value="option.option" :style="{'font-family': option.option}" >{{ option.option }}</option>
                                </select>
                            </div>
                            <div class="col-3">
                                <label class="form-label mt-4 fw-bold" for="popupTextColor"> Betűk stílusa</label>
                                <select class="form-select fs-6 px-2" :v-model="selectedValue" @change="changeFontStyle($event)">
                                    <option :value="popup.betustilus">{{ popup.betustilus }}</option>
                                    <option v-for="option in popup.optionsFinalFontStyle" :key="option.id" :value="option.option" :style="{'font-style': option.option}" >{{ option.option }}</option>
                                </select>
                            </div>
                        
                    </div>
                    
                    <div class="row">
                        <div class="col-12">
                            <label class="form-label form-label-top mt-4 fw-bold" for="popuptext"> Szöveges tartalom</label>
                            <textarea  type="text" class="form-control"  :placeholder="popup.szoveg" v-model="popup.szoveg" name="popuptext" rows="5"></textarea>
                        </div>
                    </div>
                        <div class="row mt-4 align-items-end">
                            <label class="form-label form-label-top fw-bold" for="">Fotó</label>
                            <div class="col-6 border-end">
                                <img :src="popup.photo.kepUtvonal" class="w-50 h-50 float-start img-fluid rounded mx-auto d-block"/>
                            </div>
                            <div class="col-6">
                            <form enctype="multipart/form-data" @submit.prevent ="uploadPoto">
                                <div class="form-group p-3">
                                    <label class="form-label form-label-top mt-4 fw-bold" for=""> Fotó hozzáadása</label>
                                    <input type="file" @change="onChange" class="form-control" accept="image/*" id="uploadinput"/>
                                    <p v-if="noFile" class="text-danger">Nem választott ki fájlt a feltöltéshez!</p>
                                    <p v-if="photoMessage" class="text-danger">{{ photoMessage }}</p>
                                </div>
                                <div class="form-group p-3 d-flex">
                                    <button type="submit" class="btn lilagombKicsi mt-1"><font-awesome-icon :icon="['fas', 'cloud-arrow-up']" /> Feltöltés</button>
                                </div>
                            </form>
                        </div>
                        <div class="row mt-4">
                            <div class="col-6">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" @change="changePhotoState" v-model="popupWithPhoto">
                                    <label class="form-check-label" for="flexCheckDefault" >
                                        Fotó megjelenítése a popupon
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-4">
                            <div class="col-3">
                                <button v-if="!chooseFromGallery" type="button" class="btn lilagombKicsi mt-1" @click="changeGallery"><font-awesome-icon :icon="['fas', 'camera']"/> Galéria megnyitása</button>
                                <button v-if="chooseFromGallery" type="button" class="btn lilagombKicsi mt-1" @click="changeGallery"><font-awesome-icon :icon="['fas', 'camera']"/> Galéria bezárása</button>
                            </div>
                        </div>
                        <div v-if="chooseFromGallery" class="row mt-4">
                                <div v-for="gall in gallery" key="gall.id" class="col-2">
                                    <img :src="gall.kepUtvonal" :alt="gall.kepLeiras" class="img-fluid p-1 foto" id=""/>  
                                </div>
                            </div>
                        </div>    
                </form>
                </ol>
            </ul>
            <Popup v-model="showPreviewPopup" :hatterszin="popup.hatterszin" :betuszin="popup.betuszin" :betutipus="popup.betutipus" :betustilus="popup.betustilus" :fotomutat="popupWithPhoto" :popupWithPhoto="popupWithPhoto" :kepUtvonal="popup.photo.kepUtvonal" :cim="popup.cim" :szoveg="popup.szoveg" :isAdmin="isAdmin" @modalStatus="receiveEmit"></Popup>
        </div>
    </div>
</template>

<style lang="sass" scoped>
.foto
    &:hover
       cursor: pointer
       opacity: 0.8
       transform: scale(1.1)
       transition: transform 0.9s ease
</style>
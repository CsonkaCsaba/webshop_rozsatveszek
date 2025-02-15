<script setup>
import { BannerPopupStore } from './store/BannerPopupStore';
import { storeToRefs} from 'pinia';
//import Popup from './Popup.vue';
const { receiveEmit, receiveEmitToHide, fetchPopups} = BannerPopupStore()
const {popups, popupWithPhoto, activePopup, showInFrontPopup, isAdmin} = storeToRefs(BannerPopupStore())
fetchPopups();
</script>
<template>
    <div v-if="showInFrontPopup" v-for="popup in popups[0]" key="popup.id">
        <Popup v-model="popup.aktiv" :hatterszin="popup.hatterszin" :betuszin="popup.betuszin" :betumeret="popup.betumeret" :popupWithPhoto="popupWithPhoto" :kepUtvonal="popup.photo.kepUtvonal"   :cim="popup.cim" :szoveg="popup.szoveg" :isAdmin="isAdmin" @modalStatus="receiveEmit" @hidePop="receiveEmitToHide"></Popup>
    </div>
</template>
<style>
</style>
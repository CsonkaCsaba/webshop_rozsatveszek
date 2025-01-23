<script setup>
import { BannerPopupStore } from './store/BannerPopupStore';
import { reload } from './store/BannerPopupStore';
import { storeToRefs} from 'pinia';
import Banner_Admin from './Banner_Admin.vue';
import Popup_Admin from './Popup_Admin.vue';
const { receiveEmit, saveUpdate, fetchBanners, fetchPopups, update, showPreviewButton, closePreviewButton, showPreviewButtonPopup, closePreviewButtonPopup, setToDefault,setToDefaultPopup, updateBanner, updatePopup,switchBannerState, switchPopupState, onChange} = BannerPopupStore()
const { modalStatus, message, loading, activeBanner, banners, popups, showPreviewBanner, showPreviewPopup, defaultBackroundColor, defaultFontColor, activePopup, popupWithPhoto} = storeToRefs(BannerPopupStore())
</script>

<template>

<div class="container fontcolor cim">
    <div class="justify-content-center text-center p-2">
        <div class="divider fontcolor"><span></span><span><font-awesome-icon :icon="['fas', 'window-maximize']" /> Banner & Popup </span><span></span></div>
        <img src="../../assets/kepek/popup.png" alt="desk" width="90" height="100">
    </div>
</div>
<loader v-if="loading"></loader>
<Banner_Admin></Banner_Admin :key="reload">

<Popup_Admin></Popup_Admin :key="reload">
<Modal v-model="modalStatus" :message="message" @modalStatus="receiveEmit" ></Modal>
</template>

<style lang="sass" scoped>

</style>
<script setup>
import { BannerPopupStore } from './store/BannerPopupStore';
import { storeToRefs } from 'pinia';
const { receiveEmit, saveUpdate, deleteOrder} = BannerPopupStore()
const { modalStatusAccept, message} = storeToRefs(BannerPopupStore())
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
        <h3 class="">Banner beállításai</h3>
    </div>
    <div class="">
        <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="bannerCheckbox">
            <label class="form-check-label" for="bannerCheckbox">Banner aktiválása</label>
        </div>
    </div>
</div>

<modalAccept v-model="modalStatusAccept" :message="message" @modalStatus="receiveEmit" @saveUpdate="saveUpdate" @deleteOrder="deleteOrder"></modalAccept>
</template>

<style lang="sass" scoped>

</style>
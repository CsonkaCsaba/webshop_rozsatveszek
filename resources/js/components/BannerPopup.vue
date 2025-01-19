<script setup>
import { BannerPopupStore } from './store/BannerPopupStore';
import { storeToRefs } from 'pinia';
const { receiveEmit, saveUpdate, fetchBanners, update} = BannerPopupStore()
const { modalStatusAccept, message, activeBanner, banners} = storeToRefs(BannerPopupStore())
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
        <h3 class="">Banner beállításai</h3>
    </div>
    <div class="">
        <div class="form-check form-switch">
            <input class="form-check-input " type="checkbox" id="bannerCheckbox" v-model="activeBanner">
            <label class="form-check-label m-1 ps-2" for="bannerCheckbox" :class="{active : activeBanner}">Banner bekapcsolása</label>
        </div>
    </div>
        <div class="col-12 mb-8">
            <ul class="m-4">
                <ol v-for="banner in banners[0]" key="banner.id">
                <form method="POST" @submit.prevent="update()" >
                    <div class="row">
                        <div class="col-8">
                            <label class="form-label form-label-top mt-4" for="bannertext"> Banner tartalma</label>
                            <input type="text" class="form-control"  :placeholder="banner.szoveg" v-model="banner.szoveg" name="bannertext"/>
                        </div>
                        <div class="col-2">
                            <label class="form-label mt-4" for="bannerBackroundColor"> Banner háttérszíne</label>
                            <input type="color" class="form-control form-control-color"  :placeholder="banner.hatterszin" v-model="banner.hatterszin" name="bannerBackroundColor"/>
                        </div>
                        <div class="col-2">
                            <label class="form-label mt-4" for="bannerTextColor"> Banner betűszíne</label>
                            <input type="color" class="form-control form-control-color"  :placeholder="banner.betuszin" v-model="banner.betuszin" name="bannerTextColor"/>
                        </div>
                    </div>
                </form>
                </ol>
            </ul>

        </div>
        <div class="col-12 mb-8">
            <div class="justify-content-start align-items-start">
                <h4 class="">Minta</h4>
            </div>
        </div>
</div>

<modalAccept v-model="modalStatusAccept" :message="message" @modalStatus="receiveEmit" @saveUpdate="saveUpdate" @deleteOrder="deleteOrder"></modalAccept>
</template>

<style lang="sass" scoped>
#bannerCheckbox
    width: 35px
    height: 18px
.active
    color: green
</style>
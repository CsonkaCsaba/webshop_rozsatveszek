<script setup>
import { BannerPopupStore } from './store/BannerPopupStore';
import { storeToRefs } from 'pinia';
const { showPreview, closePreview, banners, activeBanner} = storeToRefs(BannerPopupStore())
const { fetchBanners} = BannerPopupStore()
fetchBanners();


</script>

<template>
    <div class="col-12 mb-8" v-for="banner in banners" key="banner.id">
    <div v-if="banner[0].aktiv != 0" class="position-absolute top-0 start-0 w-100 marquee" :style="{'background-color' : banner[0].hatterszin, 'color': banner[0].betuszin}"><p class="p-3 mt-3" :style="{'animation-duration':banner[0].sebesseg+'s'} ">{{ banner[0].szoveg }}</p></div>
</div>
</template>

<style lang="sass" scoped>
</style>
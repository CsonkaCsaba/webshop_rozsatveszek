<script setup>
import { BannerPopupStore } from './store/BannerPopupStore';
import { storeToRefs } from 'pinia';
import Banner from './Banner.vue';
const { showPreview, closePreview, banners, activeBanner} = storeToRefs(BannerPopupStore())
const { fetchBanners} = BannerPopupStore()
fetchBanners();


</script>

<template>
    <div v-for="banner in banners[0]" key="banner.id">
        <Banner v-model="banner.aktiv" :hatterszin="banner.hatterszin" :betuszin="banner.betuszin" :szoveg="banner.szoveg" :sebesseg="banner.sebesseg" :betutipus="banner.betutipus" :betustilus="banner.betustilus"></Banner>
    </div>
</template>

<style lang="sass" scoped>
</style>
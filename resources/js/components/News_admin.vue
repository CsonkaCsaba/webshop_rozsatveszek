<script setup>
import { storeToRefs } from 'pinia';
import { NewsStore } from './store/NewsStore';
import { register } from 'swiper/element/bundle';
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Navigation } from 'swiper/modules';
import { showSwiper } from './store/NewsStore';

  // define your modules list here
const modules = [Pagination, Navigation]

const { modalStatus, message} = storeToRefs(NewsStore())
const { receiveEmit} = NewsStore()

</script>


<template>

<div class="container fontcolor">
<div class="justify-content-center text-center p-2">
    <div class="divider fontcolor"><span></span><span>HÍREK</span><span></span></div>
</div>
</div>


<Modal v-model="modalStatus" :message="message" @modalStatus="receiveEmit" >
</Modal>


<swiper_news :key="showSwiper">
</swiper_news>


</template>

<style lang="sass" scoped>

</style>
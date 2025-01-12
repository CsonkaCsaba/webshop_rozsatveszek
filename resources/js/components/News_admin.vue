<script setup>
import { onServerPrefetch } from 'vue'
import { storeToRefs } from 'pinia';
import { NewsStore } from './store/NewsStore';
import { Pagination, Navigation } from 'swiper/modules';
import { showSwiper } from './store/NewsStore';
const store = NewsStore()
onServerPrefetch(async () => {
  await store.fetchData()
});
const modules = [Pagination, Navigation];
const { modalStatus, message, photoMessage, modalStatusAccept} = storeToRefs(NewsStore());
const { receiveEmit, deleteNewsAccepted} = NewsStore();
</script>


<template>

<div class="container fontcolor">
<div class="justify-content-center text-center p-2">
    <div class="divider fontcolor"><span></span><span><font-awesome-icon :icon="['fa', 'newspaper']" /> HÍREK</span><span></span></div>
    <img src="../../assets/kepek/newsicon.png" alt="desk" width="100" height="100">
</div>
</div>



<swiper_news :key="showSwiper">
</swiper_news>

<addnews :key="showSwiper" :photoMessage="photoMessage">
</addnews>

<Modal v-model="modalStatus" :message="message" @modalStatus="receiveEmit" ></Modal>
<modalAccept v-model="modalStatusAccept" :message="message" @modalStatus="receiveEmit" @deleteNewsAccepted="deleteNewsAccepted" ></modalAccept>


</template>

<style lang="sass" scoped>

</style>
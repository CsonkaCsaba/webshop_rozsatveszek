<script setup>
import { storeToRefs } from 'pinia';
import { NewsStore } from './store/NewsStore';
import { reload } from './store/NewsStore';

const { receiveEmit, emitRecive, deleteNewsAccepted } = NewsStore()
const { message, photoMessage, modalStatusAccept, modalStatus} = storeToRefs(NewsStore())

</script>


<template>

<div class="container fontcolor">
<div class="justify-content-center text-center p-2">
    <div class="divider fontcolor"><span></span><span><font-awesome-icon :icon="['fa', 'newspaper']" /> HÍREK</span><span></span></div>
    <img src="../../assets/kepek/newsicon.png" alt="desk" width="100" height="100">
</div>
</div>

<swiper_news :key="reload">
</swiper_news>

<addnews :key="reload" :photoMessage="photoMessage">
</addnews>

<modalAccept v-model="modalStatusAccept" :message="message" @modalStatus="emitRecive" @deleteNewsAccepted="deleteNewsAccepted" ></modalAccept>
<Modal v-model="modalStatus" :message="message" @modalStatus="receiveEmit" ></Modal>
</template>

<style lang="sass" scoped>

</style>
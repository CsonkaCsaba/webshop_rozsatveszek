<script setup>
import { storeToRefs } from 'pinia';
import { GalleryStore } from './store/Gallery';
import {showSwiper} from './store/Gallery';

 const { modalStatus, noFile, message, message_button} = storeToRefs(GalleryStore())
 const { onChange, uploadPoto, receiveEmit} = GalleryStore()

</script>


<template>
<div class="container fontcolor">
<div class="justify-content-center text-center p-2">
    <div class="divider fontcolor"><span></span><span>GALÉRIA</span><span></span></div>
</div>
</div>

<Modal v-model="modalStatus" :message="message" @modalStatus="receiveEmit">
</Modal>
    

<swiper_gallery :key="showSwiper">
</swiper_gallery>


<div class="d-flex justify-content-center m-5">
    <form enctype="multipart/form-data" @submit.prevent ="uploadPoto">
        <div class="form-group p-3">
            <h3>Fotó hozzáadása a galériához</h3>
            <input type="file" @change="onChange" class="form-control" accept="image/jpg, image/png, image/jpeg"/>
            <p v-if="noFile" class="text-danger">Nem választott ki fájlt a feltöltéshez!</p>
            <p v-if="message" class="text-danger">{{ message_button }}</p>
        </div>
        <div class="form-group p-3">
            <button type="submit" class="btn lilagombKicsi mt-1"><font-awesome-icon :icon="['fas', 'cloud-arrow-up']" /> Fotó feltöltése</button>
            
        </div>
    </form>
</div>

</template>

<style lang="sass" scoped>

</style>
<script>


</script>


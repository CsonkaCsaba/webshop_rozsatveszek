<script setup>
import { storeToRefs } from 'pinia';
import { GalleryStore } from './store/Gallery';
// import { reload } from './store/Gallery';

const { onChange, uploadPoto, receiveEmit, emitRecive, deleteImageAccepted} = GalleryStore()
 const { modalStatusAccept, modalStatus, noFile, message, message_button, reload} = storeToRefs(GalleryStore())


</script>


<template>
<div class="container fontcolor">
<div class="justify-content-center text-center p-2">
    <div class="divider fontcolor"><span></span><span> <font-awesome-icon :icon="['fas', 'camera']" /> GALÉRIA</span><span></span></div>
    <img src="../../assets/kepek/gallery.png" alt="desk" width="60" height="60"> 
</div>
</div>


<swiper_gallery :key="reload">
</swiper_gallery>


<div class="d-flex justify-content-center m-5">
    <form enctype="multipart/form-data" @submit.prevent ="uploadPoto">
        <div class="form-group p-3">
            <h3>Fotó hozzáadása a galériához</h3>
            <input type="file" @change="onChange" class="form-control" accept="image/jpg, image/png, image/jpeg" id="uploadinput"/>
            <p v-if="noFile" class="text-danger">Nem választott ki fájlt a feltöltéshez!</p>
            <p v-if="message" class="text-danger">{{ message_button }}</p>
        </div>
        <div class="form-group p-3">
            <button type="submit" class="btn lilagombKicsi mt-1"><font-awesome-icon :icon="['fas', 'cloud-arrow-up']" /> Fotó feltöltése</button>
            
        </div>
    </form>
</div>

<modalAccept v-model="modalStatusAccept" :message="message" @modalStatus="emitRecive" @deleteImageAccepted="deleteImageAccepted" ></modalAccept>

<Modal v-model="modalStatus" :message="message" @modalStatus="receiveEmit">
</Modal>
</template>

<style lang="sass" scoped>

</style>
<script>


</script>


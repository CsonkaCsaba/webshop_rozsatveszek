<script setup>
import { storeToRefs } from 'pinia';
import { GalleryStore } from './store/Gallery';
import {showSwiper} from './store/Gallery';

 const { updateSuccessful, messageDelete, deleteSuccessful, baseUrl, messageUpdate, messageUpload, uploadSuccessful, noFile, message} = storeToRefs(GalleryStore())
 const { deleteStatusChange, updateStatusChange, onChange, uploadPoto, uploadStatusChange} = GalleryStore()

</script>


<template>
<div class="container fontcolor">
<div class="justify-content-center text-center p-2">
    <div class="divider fontcolor"><span></span><span>GALÉRIA</span><span></span></div>
</div>
</div>

    <div class="container" v-if="updateSuccessful">
        <div class="alert alert-info alert-dismissible fade show" role="alert">
            <p>{{ messageUpdate }}</p>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" @click="updateStatusChange()"> </button>
        </div>
    </div>
    <div class="container" v-if="deleteSuccessful">
        <div class="alert alert-info alert-dismissible fade show" role="alert">
             <p>{{ messageDelete }}</p>
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" @click="deleteStatusChange()"> </button>
             </div>
        </div>
    
    <div class="container swipercontainer">
        <swiper :key="showSwiper">
        </swiper>
    </div>
    <div class="container" v-if="uploadSuccessful">
        <div class="alert alert-info alert-dismissible fade show" role="alert">
             <p>{{ messageUpload }}</p>
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" @click="uploadStatusChange()"> </button>
        </div>
    </div>
    <div class="d-flex justify-content-center m-5">
        <form enctype="multipart/form-data" @submit.prevent ="uploadPoto">
            <div class="form-group p-3">
                <h3>Fotó hozzáadása a galériához</h3>
                <input type="file" @change="onChange" class="form-control" accept="image/jpg, image/png, image/jpeg"/>
                <p v-if="noFile" class="text-danger">Nem választott ki fájlt a feltöltéshez!</p>
                <p v-if="message" class="text-danger">{{ message }}</p>
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


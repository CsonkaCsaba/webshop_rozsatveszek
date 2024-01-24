<script setup>
import { storeToRefs } from 'pinia';
import { GalleryStore } from './store/Gallery';
import { register } from 'swiper/element/bundle';
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Navigation } from 'swiper/modules';
  // define your modules list here
  const modules = [Pagination, Navigation]


 const { gallery} = storeToRefs(GalleryStore())
 const { fetchGallery, deletePhoto, updatePhoto, downloadPhoto, oldPhotoName} = GalleryStore()
 fetchGallery();
 

</script>


<template>

<swiper :slides-per-view="2"  :navigation="true" :pagination="true" >
    <swiper-slide v-for="gall in gallery">
        <div class="card">
        <img :src="gall.kepUtvonal" :alt="gall.kepLeiras" class="card-img-top galleryphoto"/>
        <div class="card-header">
        <div class="d-flex justify-content-center">
                <div class="form-group">
                    <button type="button" class="btn lilagombKicsi"  @click="deletePhoto(gall.id, gall.uzletId, gall.kepNev)" data-bs-toggle="tooltip" data-bs-placement="top" title="Fotó törlése"  :disabled="gall.id <= 4"><font-awesome-icon :icon="['fas', 'trash']" class="fa-fw"/> Töröl </button>
                </div>
                <div class="form-group">
                    <a :href="gall.kepUtvonal" @click.prevent="downloadPhoto(gall.kepUtvonal)"><button type="button" class="btn lilagombKicsi" data-bs-toggle="tooltip" data-bs-placement="top" title="Fotó letöltése"><font-awesome-icon :icon="['fas', 'download']" class="fa-fw"/>  Letölt</button></a>
                </div>
            </div>
        </div>
        
        <div class="card-body">
            <div class="card-subtitle mb-2 text-muted">
            <p style="color:red" v-if="gall.id <= 4"><font-awesome-icon :icon="['fas', 'exclamation']"/> Főoldalon megjelenő fotó</p> 
        </div>
        <div class="photosettings ">
            <form method="POST" @submit.prevent="updatePhoto(gall.id)" >
             <div class="p-2">
                <h5 class="d-flex justify-content-center"><font-awesome-icon :icon="['fas', 'pen']" class="fa-solid fa-fw"/> Fotó szerkesztése </h5>
                    <input type="hidden" class="form-control" :placeholder="gall.id" v-model="gall.id" name="id"/>
                    <input type="hidden" class="form-control" :placeholder="gall.uzletId" v-model="gall.uzletId" name="uzlet_id"/>
                    <label class="form-label form-label-top text-secondary" for="nev">Elnevezés</label>
                    <input type="" class="form-control" :placeholder="gall.kepNev" v-model="gall.kepNev" name="nev" @focus="oldPhotoName(gall.kepNev)"/>
                    <label class="form-label form-label-top text-secondary" for="leiras">Leírás</label>
                    <input type="" class="form-control" :placeholder="gall.kepLeiras" v-model="gall.kepLeiras" name="leiras"/>
            </div>
            <div class="d-flex justify-content-center">
                    <button class="btn lilagombKicsi" type="submit" data-bs-toggle="tooltip" data-bs-placement="top" title="Módosítások mentése"><font-awesome-icon :icon="['fas', 'floppy-disk']" class="fa-fw"/>  Mentés</button>
                </div>
        </form>
        </div>
        </div>
    </div>
    </swiper-slide>
</swiper>

</template>

<style lang="sass" scoped>
</style>
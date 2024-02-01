<script setup>
import { storeToRefs } from 'pinia';
import { NewsStore } from './store/NewsStore';
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Navigation } from 'swiper/modules';

const modules = [Pagination, Navigation]

const  { modalStatus, message  } = storeToRefs(NewsStore())
const { deleteNews, updateNews, deleteStatusChange, createNews, showSwiper, receiveEmit } = NewsStore()

const props = defineProps({
      news: {
        type: Array,
        required: true
      }
});
</script>

<template>
<div class="container swipercontainer">
    <swiper :slides-per-view="2"  :navigation="true" :pagination="true" >
        <swiper-slide v-for="ne in news" :key="ne.id">
            <div class="card" >
                <img :src="ne.photo.kepUtvonal" :alt="ne.photo.kepLeiras" class="card-img-top galleryphoto"/>
            <div class="card-body">
            <div class="d-flex justify-content-center">
                <form method="POST" @submit.prevent="updateNews(ne.id, ne.cim, ne.leiras, ne.uzletId, ne.photo.kepUtvonal)" >
                  <div class="p-2">
                      <h5 class="d-flex justify-content-center"><font-awesome-icon :icon="['fas', 'pen']" class="fa-solid fa-fw"/> Hír szerkesztése </h5>
                          <input type="hidden" class="form-control" :placeholder="ne.id" v-model="ne.id" name="id"/>
                          <input type="hidden" class="form-control" :placeholder="ne.uzletId" v-model="ne.uzletId" name="uzlet_id"/>
                          <label class="form-label form-label-top text-secondary" for="cim">Cím</label>
                          <input type="" class="form-control" :placeholder=" ne.cim " v-model=" ne.cim " name="cim"/>
                          <label class="form-label form-label-top text-secondary" for="leiras">Leírás</label>
                          <textarea type="" cols="40" rows="5" class="form-control" :placeholder=" ne.leiras " v-model=" ne.leiras " name="leiras"></textarea>
                  </div>
                  <div class="d-flex justify-content-center">
                      <button class="btn lilagombKicsi" type="submit" title="Módosítások mentése"><font-awesome-icon :icon="['fas', 'floppy-disk']" class="fa-fw"/>  Mentés</button>
                      <button type="button" class="btn lilagombKicsi"  @click="deleteNews( ne.id, ne.cim)" title="Hír törlése"><font-awesome-icon :icon="['fas', 'trash']" class="fa-fw"/> Töröl </button>
                    </div>
      
                </form>
            </div>
            </div>
        </div>
        </swiper-slide>
    </swiper>
    </div>
</template>
<style>
</style>
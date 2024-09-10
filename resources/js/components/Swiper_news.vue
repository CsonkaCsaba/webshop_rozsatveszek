<script setup>
import { storeToRefs } from 'pinia';
import { NewsStore } from './store/NewsStore';
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Navigation } from 'swiper/modules';



const modules = [Pagination, Navigation]

const  { news } = storeToRefs(NewsStore())
const { deleteNews, updateNews, deleteStatusChange, createNews, receiveEmit, fetchNewsadmin } = NewsStore()
fetchNewsadmin();
</script>

<template>
<div class="container swipercontainer">
    <swiper :slides-per-view="1"  :navigation="true" :pagination="true">
        <swiper-slide v-for="ne in news[0]">
            <div class="card" >
                <img :src="ne.photo.kepUtvonal" :alt="ne.photo.kepLeiras" class="card-img-top galleryphoto"/>
                <p class="m-3">{{ne.datum}}</p>
            <div class="card-body">
            <div class="d-flex justify-content-center">
                <form method="POST" @submit.prevent="updateNews(ne.id, ne.cim, ne.leiras, 1, ne.photo.kepUtvonal)" >
                  <div class="p-2">
                      <h5 class="d-flex justify-content-center"><font-awesome-icon :icon="['fas', 'pen']" class="fa-solid fa-fw"/> Hír szerkesztése </h5>
                          <input type="hidden" class="form-control" :placeholder="ne.id" v-model="ne.id" name="id"/>
                          <input type="hidden" class="form-control" :placeholder="ne.uzletId" v-model="ne.uzletId" name="uzlet_id"/>
                          <label class="form-label form-label-top text-muted pt-2 mb-0 " for="cim">Cím</label>
                          <input type="" class="form-control" :placeholder=" ne.cim " v-model=" ne.cim " name="cim"/>
                          <label class="form-label form-label-top text-muted pt-2 mb-0 " for="leiras">Leírás</label>
                          <textarea type="" cols="40" rows="5" class="form-control" :placeholder=" ne.leiras " v-model=" ne.leiras " name="leiras"></textarea>
                  </div>
                  <div class="d-flex justify-content-center m-2">
                      <button class="btn secoundaryBtna m-2" type="submit" title="Módosítások mentése"><font-awesome-icon :icon="['fas', 'floppy-disk']" class="fa-fw"/>  Mentés</button>
                      <button type="button" class="btn secoundaryBtnb m-2"  @click="deleteNews( ne.id, ne.cim)" title="Hír törlése"><font-awesome-icon :icon="['fas', 'trash']" class="fa-fw"/> Töröl </button>
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
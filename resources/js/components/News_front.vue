<script setup>
import { register } from 'swiper/element/bundle';
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Navigation } from 'swiper/modules';

// define your modules list here

const modules = [Pagination, Navigation]

const props = defineProps({
      news: {
        type: Array,
        required: true
      }
});

console.log(props.news)
</script>
<template>

<div class="container fontcolor">
<div class="justify-content-center text-center p-2">
    <div class="divider fontcolor"><span></span><span>HÍREK</span><span></span></div>
</div>
</div>

<swiper :slides-per-view="2"  :navigation="true" :pagination="true" >
    <swiper-slide v-for="ne in news">
        <div class="card">
        <!-- <img :src="gall.kepUtvonal" :alt="gall.kepLeiras" class="card-img-top galleryphoto"/> -->
        <div class="card-header">
        <div class="d-flex justify-content-center">
                
            </div>
        </div>
        <div class="card-body">
        <div class="d-flex justify-content-center">
            <form method="POST" @submit.prevent="updatenews(ne.id)" >
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
                  <button class="btn lilagombKicsi" type="submit" data-bs-toggle="tooltip" data-bs-placement="top" title="Módosítások mentése"><font-awesome-icon :icon="['fas', 'floppy-disk']" class="fa-fw"/>  Mentés</button>
                  <button type="button" class="btn lilagombKicsi"  @click="deleteNews( ne.id, ne.uzletId)" data-bs-toggle="tooltip" data-bs-placement="top" title="Hír törlése"><font-awesome-icon :icon="['fas', 'trash']" class="fa-fw"/> Töröl </button>
                </div>
  
            </form>
        </div>
        </div>
    </div>
    </swiper-slide>
</swiper>
</template>


<style lang="sass" scoped>

.swiper-slide
    max-width: 400px
    max-height:350px
    padding: 30px
    margin-bottom: 350px

.swipercontainer
    margin-bottom: 100px
   
.photosettings
    margin-bottom: 25px
.card
    box-shadow: rgba(149, 157, 165, 0.6) 0px 4px 12px
    &:hover
        box-shadow: rgba(149, 157, 165, 0.6) 0px 8px 24px
        transition: .5s ease
</style>
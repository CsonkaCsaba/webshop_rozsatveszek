<script setup>
import { storeToRefs } from 'pinia';
import { GalleryStore } from './store/Gallery';
import { register } from 'swiper/element/bundle';
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { ref } from 'vue';
import 'swiper/css';

import 'swiper/css/pagination';
import 'swiper/css/navigation';

  // define your modules list here
const modules = [Pagination, Navigation]
 const { gallery} = storeToRefs(GalleryStore())
 const { fetchGallery} = GalleryStore()
 fetchGallery();

</script>

<template>
    <div class="container swipercontainer">
    <swiper 
     
     :spaceBetween="10"
     :centeredSlides="true" 
     :autoplay="{
      delay: 2500,
      disableOnInteraction: false,
    }"
    :pagination="{
      clickable: true,
    }"
    :navigation="true"
    @autoplayTimeLeft="onAutoplayTimeLeft"
    class="mySwiper">
        <swiper-slide v-for="gall in gallery">
            <img :src="gall.kepUtvonal" :alt="gall.kepLeiras" class=""/>
        </swiper-slide>
  </swiper>

</div>
</template>

<style lang="sass" scoped>
// .galleryphoto
//     max-width: 350px
//     max-height:250px
//     box-shadow: rgba(149, 157, 165, 0.6) 0px 8px 24px
//     &:hover
//         opacity: 0.5
//         transition: .5s ease
        
// .swiper-slide
//     max-width: 400px
//     max-height:350px
//     padding: 30px
//     margin-bottom: 350px

//.swipercontainer
    //margin: 80px 80px 80px 0px
    
// .photosettings
//     margin-bottom: 25px
// .card
//     box-shadow: rgba(149, 157, 165, 0.6) 0px 4px 12px
//     &:hover
//         box-shadow: rgba(149, 157, 165, 0.6) 0px 8px 24px
//         transition: .5s ease

.swiper 
  width: 100%
  height: 100%
  margin: 20px

.swiper-slide 
  max-width: 500px
  max-height:450px
  
  /* Center slide text vertically */
  display: flex
  justify-content: center
  align-items: center


.swiper-slide img 
  display: block
  width: 80%
  height: 60%
  object-fit: cover


.swiper-slide 
  width: 80%


.swiper-slide:nth-child(2n) 
  width: 60%


.swiper-slide:nth-child(3n) 
  width: 40%

</style>
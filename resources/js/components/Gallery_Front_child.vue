<script setup>
import { storeToRefs } from 'pinia';
import { GalleryStore } from './store/Gallery';
import { register } from 'swiper/element/bundle';

import { ref } from 'vue';


 const { gallery, slideIndex, currentImage} = storeToRefs(GalleryStore())
 const { fetchGallery, openModal, closeModal, prevSlides, nextSlides, currentSlide, showSlides} = GalleryStore()
 fetchGallery();

</script>

<template>
  <section class="photo-gallery mt-4">
  <div class="container">
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 gallery-grid">
      <div data-aos="flip-left" class="col" v-for="gall in gallery">
        <div class="gallery-item " href="">
          <img :src="gall.kepUtvonal" class="img-fluid" alt="gall.kepLeiras" @click="openModal(), currentSlide(gall.id)" style="cursor: pointer">
        </div>
      </div>
    </div>
  </div>
  <div id="myModal" class="modal">
  <span class="close cursor" @click="closeModal()">&times;</span>
    <div class="mySlides container d-flex align-items-center justify-content-center mt-5">
      <img :src="currentImage.kepUtvonal"  alt="">
    </div>
    <!-- Next/previous controls -->
    <a class="prev" @click="prevSlides()">&#10094;</a>
    <a class="next" @click="nextSlides()">&#10095;</a>

</div>
</section>

</template>

<style scoped>

:root {
  --lightbox: rgb(0 0 0 / 0.75);
  --carousel-text: #fff;
}

body {
  margin: 1.5rem 0 3.5rem;
}
.row > .column {
  padding: 0 8px;
}

.row:after {
  content: "";
  display: table;
  clear: both;
}

/* Create four equal columns that floats next to eachother */
.column {
  float: left;
  width: 25%;
} 

@keyframes zoomin {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

.gallery-item {
  display: block;
}

.gallery-item img {
  box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.15);
  transition: box-shadow 0.2s;

}

.gallery-item:hover img {
  box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.35);
  transform: scale(1.05);
  transition: transform .9s 
}

.modal {
  display: none;
  position: fixed;
  z-index: 99;
  padding-top: 130px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: black;
}

/* Modal Content */
.modal-content {
  position: relative;
  background-color: #fefefe;
  margin: auto;
  padding: 0;
  width: 100%;
  max-width: 100%;
}

/* The Close Button */
.close {
  color: white;
  position: absolute;
  top: 10px;
  right: 25px;
  font-size: 35px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #999;
  text-decoration: none;
  cursor: pointer;
}

/* Hide the slides by default */
.mySlides {
  display: none;
}

/* Next & previous buttons */
.prev,
.next {
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
  padding-left: 80px;
  padding-right: 80px;
  margin-top: -50px;
  color: white;
  font-weight: bold;
  font-size: 50px;
  transition: 0.6s ease;
  border-radius: 0 3px 3px 0;
  user-select: none;
  -webkit-user-select: none;
  background-color: rgba(0, 0, 0, 0.8);
}

/* Position the "next button" to the right */
.next {
  right: 0;
  border-radius: 3px 0 0 3px;
}

/* On hover, add a black background color with a little bit see-through */
.prev:hover,
.next:hover {
  background-color: rgba(0, 0, 0, 0.8);
}


img.demo {
  opacity: 0.6;
}

.active,
.demo:hover {
  opacity: 1;
}

img.hover-shadow {
  transition: 0.3s;
}

.hover-shadow:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

</style>
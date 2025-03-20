<script setup>
import { storeToRefs } from 'pinia';
import { ProductStore } from './store/Product';


const {modalStatusProduct } = storeToRefs(ProductStore())


const props = defineProps({
    prod: {
        type: Object,
        required: true
      }
});

const emit = defineEmits(['modalStatus','toCartFromModal']);

function modalStatus() {
     emit('modalStatus');
   };
function toCartFromModal() {
    emit('toCartFromModal');
}
 function chagePhoto(url){
    document.getElementById('mainPhoto').src = url;
}
function changePhotoBack(url){
    document.getElementById('mainPhoto').src = url;
}
</script>
<template>
    <v-dialog  class="transition m-4 " id="dialog">
        <div class="vdialogclosebutton" @click="modalStatus" >X</div>
        <v-card class="rounded border border-1 p-4 align-items-center" id="cardForProduct">
           <div class="row">
            <div data-aos="fade-right" class="col-6 text-justify lh-lg p-4">
                    <h1>{{prod.nevHu}}</h1>
                    <h2>{{prod.szin}}</h2>
                    <p class="fst-italic pt-2 text-muted">-{{ prod.tagline }}</p>
                    <hr class="cimalatt_hr mt-0">
                    
                    <span style="white-space: pre-wrap; width: 100%;">{{ prod.leirasHu }}</span><br>
                    <div class="fw-bold " ><a class="text-dark" href="tanacsok">Tanácsok ültetéshez és gondozáshoz</a></div>
                    <div class="row">
                        <div class="col-3 lh-lg mt-4">
                            <button v-if="prod.keszlet > 0" class="col-md-8 col-lg-6 col-xl-6 kosarba kosarba-active text-center py-2 gombHover" data-bs-toggle="modal" data-bs-target="#KosarbaModal" @click="toCartFromModal">
                                    <font-awesome-icon :icon="['fas', 'cart-shopping']" class="icon"/>
                                    <span id="gombfelirat"> Kosárba</span>
                                </button> <br>
                            </div>
                            <div class="col lh-lg">
                            <!-- <button class=" btnOk px-4 mt-4" @click="modalStatus"> Bezár </button> -->
                        </div>
                    </div>
                </div>
                <div class="col-6 img-hover-zoom">
                    <img data-aos="fade-left" :src="prod.img" alt="productimage" class="termek-kep kep" style="border-radius: 11px;"  :class="{ maxSize: prod.galeria.length > 0 }" id="mainPhoto"/>
                        <div v-if="prod.galeria.length > 0" class="container" @mouseleave="changePhotoBack(prod.img)">
                        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-6">
                        <div data-aos="fade-right" class="d-flex flex-row" v-for="ph in prod.galeria" >
                            <div class="gallery-item d-inline-flex pt-4" href="">
                            <img :src="ph.kepUtvonal" class="" :alt=ph.kepLeiras @click="chagePhoto(ph.kepUtvonal)" style="cursor: pointer; border-radius: 11px;" >
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
      </v-card>
  </v-dialog>
</template>

<style lang="sass" scoped>
.btnOk
    border-radius: 11px
    background: #1f1f1f
    color: white
    font-size: 16px
#cardForProduct
    background: linear-gradient(270deg, rgba(228,160,183, 0.98) 0%, rgba(255,255,255,1) 70%)
.kep
    &:hover
        transition: all 1.5s ease-out
        filter: brightness(120%)

.img-hover-zoom
    overflow: hidden

.maxSize
    max-height: 80%
    max-width: auto

.gallery-item img 
    width: 100%
    height: auto
    filter: grayscale(50%)

.gallery-item:hover img 
  box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.05)
  filter: grayscale(0%)
  transition: transform 1.9s 

</style>
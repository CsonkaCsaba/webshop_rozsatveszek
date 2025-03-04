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

</script>
<template>
    <v-dialog  class="transition m-4 " id="dialog">
        <div class="vdialogclosebutton" @click="modalStatus" >X</div>
        <v-card class="rounded border border-1 p-4 align-items-center" id="cardForProduct">
           <div class="row">
            <div class="col-6 text-justify lh-lg p-4">
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
                    <img :src="prod.img" alt="productimage" class="termek-kep kep" style="border-radius: 11px;">
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
    &:hover
        img
            transform: scale(1.1) 
            transform-origin: 50% 65%
            transition: transform 5s, filter 3s ease-in-out
    

</style>
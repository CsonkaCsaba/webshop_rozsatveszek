<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { ProductStore } from './store/Product';
import SetNumber from './SetNumber.vue';

const { products } = storeToRefs(ProductStore())
const { update, editStore, fetchProduct } = ProductStore()
fetchProduct();


</script>

<script>
export default {
    data() {
        return{
            szin : ' ',
            nevHu: ' ',
            img: ' ',
        }
    },
    methods: {
      toModal (prodszin,prodnevHu,prodimg) {
        this.szin = prodszin,
        this.nevHu = prodnevHu,
        this.img = prodimg
      }
    },
    components: {
        SetNumber
    }
  }

</script>


<template>
    <div class="mt-8 mb-4 pt-2 container-fluid select-container">
        Termékek
    </div>
    <div class="container-fluid">
        <div class="row justify-content-center g-0">
            <div class="col-lg-4 col-md-4 col-sm-5 col-8 m-2 product" v-for="prod in products" key="prod.id">
                <a href="#">
                    <div class="termek-kep">
                        <img :src="prod.img" class="img-fluid">
                        <div v-if="prod.keszlet <= 0" class="elfogyott px-2 text-start">Elfogyott</div>
                        <div v-else class="keszleten px-2 text-start">Készleten</div>
                    </div>
                </a>
                <div class="row justify-content-center m-1 detail">
                    <div class="szin">{{ prod.szin }}</div>
                    <div class="nev">{{ prod.nevHu }}</div>
                    <div class="col ar m-1">{{ prod.ar }} Ft</div>
                    <button v-if="prod.keszlet > 0" class="col kosarba kosarba-active text-center" data-bs-toggle="modal" data-bs-target="#KosarbaModal" v-on:click="toModal(prod.szin,prod.nevHu,prod.img)">
                        <font-awesome-icon :icon="['fas', 'cart-shopping']" class="pe-1"/>
                        Kosárba
                    </button> 
                    <button v-else disabled class="col kosarba text-center" data-bs-toggle="modal" data-bs-target="#KosarbaModal">
                        <font-awesome-icon :icon="['fas', 'cart-shopping']" class="pe-1"/>
                        Kosárba
                    </button>
                </div>
            </div>
        </div>
    </div>

        <!-- Kosárba Modal -->
    <div class="modal fade" id="KosarbaModal" tabindex="-1" role="dialog" aria-labelledby="KosarbaModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="KosarbaModalLabel">Kosárba</h5>
                    <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div id="KosarbaModalBody" class="modal-body">
                    <div class="termek-kep">
                        <img :src="img" class="img-fluid img-max">
                    </div>
                    <div class="szin">{{ szin }}</div>
                    <div class="nev">{{ nevHu }}</div>
                </div>
                <div class="d-flex d-row justify-content-center">
                    <SetNumber :min="1" :max="10" :value="1"/>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Kosárba</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Mégse</button>                    
                </div>
            </div>
        </div>
    </div>

</template>

<style>

.select-container{
    font-size: 18px;
}

.product{
    background: rgba(228, 160, 183, 0.47);
    position: relative;
}

.termek-kep{
    position: relative;
}

.elfogyott{
    position: absolute;
    font-size: 16px;
    bottom: 0;
    color: #000;
    font-weight: 400;
    width: 40%;
    background: linear-gradient(to right top, #CA212B 40%, transparent);
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
}

.keszleten{
    position: absolute;
    font-size: 16px;
    bottom: 0;
    color: #000;
    font-weight: 400;
    width: 40%;
    background: linear-gradient(to right top, #60A448 40%, transparent);
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
}


.szin{
    font-size: 16px;
    color: #000;
}

.nev{
    font-size: 14px;
}

.ar{
    border-radius: 11px;
    background: #D9D9D9;
    mix-blend-mode: multiply;
    font-size: 16px;
    display: inline-block;
}

.kosarba{
    border-radius: 11px;
    border: 0px;
    background: #D9D9D9;
    mix-blend-mode: multiply;
    font-size: 16px;
}

.kosarba button{
    border: none;
    background: #D9D9D9;
    opacity: 1;
    transition: 0.3s;
}

.kosarba-active:hover{
    background-color: #c9c9c9;
}

#KosarbaModal{
    font-size: medium;
}

.img-max{
    max-width: 35%
}
</style>
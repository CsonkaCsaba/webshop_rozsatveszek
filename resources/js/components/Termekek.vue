<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { ProductStore, elementsToWish } from './store/Product';


const { products, modalStatusAccept,message, modalStatus, add, loading, cimkek} = storeToRefs(ProductStore())
const { update, editStore, fetchWishlist, fetchProduct, addToWishlist, removeFromWishList, receiveEmit, deleteWish} = ProductStore()
fetchProduct();

</script>

<script>
import { ShoppingCart } from './store/ShoppingCart';

export default {
    data() {
        return{
            cartData: ShoppingCart(),
            termek: {
                type: Object
            },
            num: 1,
            message : [ 
            {"id": 1, "message":"😍 Kiváló választás! Ez a magastörzsű rózsa biztosan feldobja kertjét!"},
            {"id": 2, "message":"😍 Tökéletes döntés! A rózsája hamarosan a kertje ékköve lesz."}, 
            {"id": 3, "message":"😍 Gratulálunk! Egy igazi szépséget választott, ami garantáltan örömet okoz."},
            {"id": 4, "message":"😍 Remek választás! Ez a rózsa biztosan varázslatos hangulatot ad a kertjének."},
            {"id": 5, "message":"😍 Ez a rózsa valóban különleges! Készülhet a kertje egy igazi látványossággal."},
            {"id": 6, "message":"😍 Nagyszerű döntés! Egy ilyen gyönyörű magastörzsű rózsa nem hiányozhat a kertjéből."},
            {"id": 7, "message":"😍 Szuper választás! Ezzel a rózsával garantáltan kitűnik majd a kertje."},
            {"id": 8, "message":"😍 Ezt a rózsát nem lehet megunni! Kiváló döntés a kertje szépítésére."},
            {"id": 9, "message":"😍 Ez a rózsa igazi dísze lesz a kertjének! Nagyon jó választás."},
            {"id": 10, "message":"😍 Bámulatos! Ezzel a rózsával a kertje minden pillanatban varázslatos lesz."}
        ],
        }
    },
    methods: {
      toModal (prod) {
        this.termek = prod,
        this.num=1
      },
      increment(){
        this.$refs.customNum.stepUp()
        this.num = this.$refs.customNum.value
      },
        decrement(){
        this.$refs.customNum.stepDown()
        this.num = this.$refs.customNum.value
      },
      addtocart(termek,num){
        this.cartData.addToCart(termek,num)
        if(this.cartData.kosarban){
            $('#KosarbaHelyezveModal').modal('show');
            const randomIndex = Math.floor(Math.random() * this.message.length);
            const randomObject = this.message[randomIndex];
            document.getElementById('randomMessage').innerHTML = randomObject.message;

        }
      },
    },
}

</script>


<template>
<div class="d-flex flex-column justify-content-center pt-md-8">
            <h2 class="pb-2 text-center fontcolor">TERMÉKEK</h2>
            <loader v-if="loading"></loader>
            <hr class="cimalatt_hr mx-auto mt-0">
      </div>
    <div class="container-fluid">
        <div class="row justify-content-center g-0 mt-5">
            <div class="col-lg-3 col-md-4 col-sm-5 col-8 m-5 product position-relative pb-4" v-for="prod in products" key="prod.id" id="box">
                <a href="#" class="row">
                    <div v-if="prod.cimke !=null" class="cimke" :style="{'color': prod.cimke.betuszin, 'font-family': prod.cimke.betutipus, 'font-style': prod.cimke.betustilus, 'background': 'linear-gradient(to left bottom,'+prod.cimke.hatterszin+' 40%, transparent)'}">
                        <h3 class="text-center align-items-center justify-content-center pt-4 fw-bold" :style="{'font-size': prod.cimke.betumeret+'px'}"> {{ prod.cimke.szoveg }} </h3>
                    </div>
                    <div class="termek-kep">
                        <img :src="prod.img" class="img-fluid img-maxDefault">
                        <div v-if="prod.keszlet <= 0" class="elfogyott px-2 text-start">Elfogyott</div>
                        <div v-else class="keszleten px-2 text-start">Készleten</div>
                    </div>
                </a>
                <div class="row justify-content-center m-1 detail container">
                    <div class="row row-cols-1">
                        <div class="szin">{{ prod.szin }}</div>
                        <div class="nev">{{ prod.nevHu }}</div>
                        <div class="row justify-content-center">
                            <div class="col-sm-8 col-md-8 col-lg-8"><p class="ar text-center " :class="{ strikethrough : prod.cimke != null && prod.cimke.akciosarFt>0 || prod.akciosar > 0 }">{{ prod.ar }} ,-Ft</p></div>
                            <div v-if="prod.cimke != null &&  prod.akciosar>0" class="col-sm-8 col-md-8 col-lg-8"><h2 class="text-center fw-bold" >{{ prod.akciosar }} ,-Ft</h2></div>
                            <div v-else-if="prod.cimke == null &&  prod.akciosar>0" class="col-sm-8 col-md-8 col-lg-8"><h2 class="text-center fw-bold" >{{ prod.akciosar }} ,-Ft</h2></div>
                        </div>
                        <div v-if="!prod.addedToWishlist" class="col-md-2 col-lg-col-2 col-xl-2 imagebuttondiv wishlist">
                            <img src="../../assets/kepek/heart.png" class="heartIconEmpty"  alt="rolunk2" @click="addToWishlist(prod.id)">
                        </div>
                        <div v-if="prod.addedToWishlist" class="col-md-2 col-lg-col-2 col-xl-2 imagebuttondiv wishlist">
                            <img src="../../assets/kepek/heartfull.png" class="heartIconEmpty heartIconFull"  alt="rolunk2" @click="removeFromWishList(prod.id)">
                        </div>
                        
                        <button v-if="prod.keszlet > 0" class="col-md-8 col-lg-10 col-xl-10 kosarba kosarba-active text-center" data-bs-toggle="modal" data-bs-target="#KosarbaModal" v-on:click="toModal(prod)">
                            <font-awesome-icon :icon="['fas', 'cart-shopping']" class="pt-1"/>
                            Kosárba
                        </button> 
                        <button v-else disabled class="col-md-8 col-lg-10 col-xl-10  kosarba text-center" data-bs-toggle="modal" data-bs-target="#KosarbaModal">
                            <font-awesome-icon :icon="['fas', 'cart-shopping']" class="pe-1"/>
                            Kosárba
                        </button>
                    </div>
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
                        <img :src="termek.img" class="img-fluid img-max" >
                    </div>
                    <div class="szin">{{ termek.szin }}</div>
                    <div class="nev">{{ termek.nevHu }}</div>
                </div>
                <div class="d-flex d-row justify-content-center">
                    <div class="custom-num d-flex justify-content-center p-2" >
                        <font-awesome-icon class="minusSign" :icon="['fas', 'minus']" @click="decrement"/>        
                        <input 
                            type="number"  
                            class="num-input" 
                            min=1 
                            :max=termek.keszlet
                            v-model="num"
                            ref="customNum" />
                        <font-awesome-icon class="plusSign" :icon="['fas', 'plus']" @click="increment"/>
                    </div>
                </div>
                <div class="ModalKeszletUzenet d-flex justify-content-center p-2">
                        Készleten: {{ termek.keszlet }} db
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="addtocart(termek,num)">Kosárba</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Mégse</button>                    
                </div>
            </div>
        </div>
    </div>

    <!-- Kosárba helyezve Modal-->
    <div class="modal fade" id="KosarbaHelyezveModal" tabindex="-1" role="dialog" aria-labelledby="KosarbaHelyezveModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="KosarbaHelyezveModalLabel">Kosárba helyezve</h5>
                    <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div id="KosarbaModalBody" class="modal-body">
                    <font-awesome-icon :icon="['fas', 'check']" />
                    A termék sikeresen bekerült a kosárba  <br>
                    <p class="fst-italic" id="randomMessage"></p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Tovább vásárolok</button>
                    <a href="kosar"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Tovább a kosárhoz</button></a>                    
                </div>
            </div>
        </div>
    </div>
<modalAccept v-model="modalStatusAccept" :message="message" @modalStatus="receiveEmit" @deleteWish="deleteWish"></modalAccept>
<Modal v-model="modalStatus" :message="message" @modalStatus="receiveEmit" >
</Modal>
</template>

<style>
#box{
    border: 1px solid white;
    border-radius: 11px;
}
#box:hover{
    background: rgba(228, 160, 183, 0.67);
    border: none;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.19);
    transition: box-shadow 0.2s ease-in-out;
    .termek-kep{
        width: 100%;
    }
}

.select-container{
    font-size: 18px;
}

.product{
    background: rgba(228, 160, 183, 0.47);
    border: 1px solid white;
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


.szin, .ModalKeszletUzenet{
    font-size: 16px;
    color: #1B1C1E;
}

.nev{
    font-size: 14px;
}

.ar{
    border-radius: 11px;
    background: #D9D9D9;
    mix-blend-mode: multiply;
    font-size: 15px;
}

.kosarba{
    border-radius: 11px;
    border: 0px;
    background: #1f1f1f;
    color: white;
    mix-blend-mode: multiply;
    font-size: 16px;
}

.kosarba button{
    border: none;
    background: #D9D9D9;
    opacity: 1;
    transition: 0.3s;
    padding-left: 15px;
}

.kosarba-active:hover{
    background-color: #161616;
}

#KosarbaModal, #KosarbaHelyezveModal{
    font-size: medium;
}
.img-maxDefault{
    height: 250px;
    width: 100%;
    border-radius: 9px;
}

.img-max{
    max-width: 35%;
}

/* setNumber */
.custom-num{
    margin: 0.5em;
    width: fit-content;
    border-radius: 1em;
    align-items: center;
    background-color: #d1ecf1;
}

.num-input{
    font-size: 1em;
    text-align: center;
    background: none;
    border: none;
    font-weight: bold;
    width: 100%;
}

.num-input::-webkit-outer-spin-button,
.num-input::-webkit-inner-spin-button {
    display: none;
}

.plusSign, .minusSign{
    font-size: 1em;
    cursor: pointer;
}

.num-max, .num-min{
    padding-top: 0.8em;
    height: 5em;
    padding-bottom: 0;
}
.wishlist {
  font-size: 30px;
  color: rgb(255, 255, 255);
  background-color: transparent;
  transition: transform .2s;
}
.wishlist:hover{
    transform: scale(1.3);
}

.imagebuttondiv{
    font-size: 25px;
}
.heartIconFull{
    animation: pulse 0.5s
}
@keyframes pulse {
    0% {
        transform: scale(0.85);
    }

    70% {
        transform: scale(1);
    }

    100% {
        transform: scale(0.85);
    }
}
.cimke{
    width: 45%;
    height: 18%;
    right: -3%;
    top: -9%;
    position: absolute;
    color: white;
    text-shadow: 0px 0px 6px rgba(255,255,255,0.7);
    z-index: 10;
    background: linear-gradient(to left bottom, #60A448 40%, transparent);
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    border-radius: 10% 2%;
}
.strikethrough{
    text-decoration: line-through;
    color: grey;
}
</style>
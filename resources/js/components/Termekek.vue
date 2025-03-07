<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { ProductStore, elementsToWish } from './store/Product';


const { products, modalStatusAccept, modalStatusProduct, message, modalStatus, add, loading, cimkek, prod, edit_prod} = storeToRefs(ProductStore())
const { update, editStore, fetchWishlist, fetchProduct, addToWishlist, removeFromWishList, receiveEmit, deleteWish, detailsModal, toCartFromModal} = ProductStore()
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
            {"id": 1, "message":"😍 Kiváló választás! Ez a magastörzsű rózsa biztosan feldobja kerted!"},
            {"id": 2, "message":"😍 Tökéletes döntés! A rózsád hamarosan a kerted ékköve lesz."}, 
            {"id": 3, "message":"😍 Gratulálunk! Egy igazi szépséget választottál, ami garantáltan örömet okoz."},
            {"id": 4, "message":"😍 Remek választás! Ez a rózsa biztosan varázslatos hangulatot ad a kertednek."},
            {"id": 5, "message":"😍 Ez a rózsa valóban különleges! Készülhet a kerted egy igazi látványossággal."},
            {"id": 6, "message":"😍 Nagyszerű döntés! Egy ilyen gyönyörű magastörzsű rózsa nem hiányozhat a kertedből."},
            {"id": 7, "message":"😍 Szuper választás! Ezzel a rózsával garantáltan varázaltossá válik majd a kerted."},
            {"id": 8, "message":"😍 Ezt a rózsát nem lehet megunni! Kiváló döntés a kerted szépítésére."},
            {"id": 9, "message":"😍 Ez a rózsa igazi dísze lesz a kertednek! Nagyon jó választás."},
            {"id": 10, "message":"😍 Bámulatos! Ezzel a rózsával a kerted minden pillanatban varázslatos lesz."}
        ],
        }
    },
    methods: {
      toModal (prod) {
        ProductStore().modalStatusProduct = false,
        this.termek = prod,
        this.num=1
        console.log(prod)
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
        <div class="row justify-content-center mt-4">
            <div data-aos="flip-left" class="col-lg-3 col-md-4 col-sm-5 col-8 m-5  position-relative" v-for="prod in products" key="prod.id" id="box">
                <a href="#" class="">
                    <div v-if="prod.cimke !=null" class="cimke" :style="{'color': prod.cimke.betuszin, 'font-family': prod.cimke.betutipus, 'font-style': prod.cimke.betustilus, 'background': 'linear-gradient(to left bottom,'+prod.cimke.hatterszin+' 40%, transparent)'}">
                        <h3 class="text-center align-items-center justify-content-center pt-4 fw-bold" :style="{'font-size': prod.cimke.betumeret+'px'}"> {{ prod.cimke.szoveg }} </h3>
                    </div>
                </a>
                <v-card :loading="loading" class="">
                    <template slot="progress">
                        <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
                    </template>
                        <v-img :src="prod.img" class="termek-kep kep" @click="detailsModal(prod)">
                            <div v-if="prod.keszlet <= 0" class="elfogyott px-2 text-start">Elfogyott</div>
                            <div v-else class="keszleten px-2 text-start">Készleten</div>
                        </v-img>
                        <v-card-title class="pt-3 fw-bold">{{ prod.nevHu }}</v-card-title>
                         <v-card-text>
                            <div>{{ prod.szin }}</div> 
                            <p class="fst-italic pt-2 text-muted">-{{ prod.tagline }}</p>
                        </v-card-text>
                        <v-divider class="mx-4 my-0"></v-divider>
                            <div class="product text-center align-items-center justify-content-center">
                            <v-card-text align="center">
                                <div v-if="!prod.addedToWishlist" class="col-md-2 col-lg-col-2 col-xl-2 imagebuttondiv wishlist">
                                    <img src="../../assets/kepek/heart.png" class="heartIconEmpty"  alt="wishlist" @click="addToWishlist(prod.id)">
                                </div>
                                <div v-if="prod.addedToWishlist" class="col-md-2 col-lg-col-2 col-xl-2 imagebuttondiv wishlist">
                                    <img src="../../assets/kepek/heartfull.png" class="heartIconEmpty heartIconFull"  alt="wishlist" @click="removeFromWishList(prod.id)">
                                </div>
                                <div class="col-sm-8 col-md-8 col-lg-8 "><p class="ar" :class="{ strikethrough : prod.cimke != null && prod.cimke.akciosarFt>0 || prod.akciosar > 0 }">{{ prod.ar }} ,-Ft</p></div>
                                <div v-if="prod.cimke != null &&  prod.akciosar>0" class="col-sm-8 col-md-8 col-lg-8"><h2 class=" fw-bold" >{{ prod.akciosar }} ,-Ft</h2></div>
                                <div v-else-if="prod.cimke == null &&  prod.akciosar>0" class="col-sm-8 col-md-8 col-lg-8"><h2 class="fw-bold" >{{ prod.akciosar }} ,-Ft</h2></div>
                            </v-card-text>

                            <v-card-actions class="text-center align-items-center justify-content-center pb-4 m-0">
                            <v-row class="p-0 m-0">
                                <v-col class="p-0 m-0">
                                    <button class="col-md-8 col-lg-6 col-xl-6 info text-center py-2" data-bs-toggle="modal" @click="detailsModal(prod)">
                                        <font-awesome-icon :icon="['fas', 'circle-info']" /> 
                                        Részletek
                                    </button> 
                                </v-col>
                                <v-col class="p-0 m-0">
                                    <button v-if="prod.keszlet > 0" class="col-md-8 col-lg-6 col-xl-6 kosarba kosarba-active text-center py-2 gombHover" data-bs-toggle="modal" data-bs-target="#KosarbaModal" v-on:click="toModal(prod)">
                                        <font-awesome-icon :icon="['fas', 'cart-shopping']" class="icon"/>
                                        <span id="gombfelirat"> Kosárba</span>
                                    </button> 
                                    <button v-else disabled class="col-md-8 col-lg-10 col-xl-6  kosarba kosarba-active text-center gombHover" data-bs-toggle="modal" data-bs-target="#KosarbaModal">
                                        <font-awesome-icon :icon="['fas', 'cart-shopping']" class="icon"/>
                                        Kosárba
                                    </button>
                                </v-col>
                            </v-row>
                            </v-card-actions>
                        </div>
                        </v-card>
                </div>
        </div>
    </div>

        <!-- Kosárba Modal -->
    <div class="modal fade" id="KosarbaModal" tabindex="-1" role="dialog" aria-labelledby="KosarbaModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="KosarbaModalLabel">Mennyiség megadása</h5>
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
                    <p>Kérjük add meg a mennyiséget!</p>
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
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="addtocart(termek,num)"><font-awesome-icon :icon="['fas', 'cart-shopping']" class="icon"/> Kosárba</button>
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
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">🧐 Megnézem a többit is!</button>
                    <a href="kosar"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal"><font-awesome-icon :icon="['fas', 'cart-shopping']" class="icon"/> Tovább a kosárhoz</button></a>                    
                </div>
            </div>
        </div>
    </div>
<modalAccept v-model="modalStatusAccept" :message="message" @modalStatus="receiveEmit" @deleteWish="deleteWish"></modalAccept>
<Modal v-model="modalStatus" :message="message" @modalStatus="receiveEmit" >
</Modal>
<ModalForProductDetails v-model="modalStatusProduct" :prod="prod" @modalStatus="modalStatusProduct = false" @toCartFromModal="toModal(prod)"></ModalForProductDetails>
</template>

<style>
#box{
    border-radius: 11px;
    margin:0;
    padding: 0;
}
#box:hover{
    box-shadow: 10px 10px 5px #ccc;
    -moz-box-shadow: 10px 10px 5px #ccc;
    -webkit-box-shadow: 10px 10px 5px #ccc;
    transition: box-shadow 0.8s;
    .kep {
        transition: all 1.5s ease-out;
        filter: brightness(120%);
        
    }

}

.select-container{
    font-size: 18px;
}

.product{
    background: rgb(228,160,183);
    background: linear-gradient(0deg, rgba(228,160,183, 0.5) 0%, rgba(255,255,255,1) 100%);
    padding-left: 0;
    padding-right: 0;
    padding-bottom: 0;
    margin: 0;

}

.termek-kep{
    position: relative;
    height: 100%;
    width: 100%;
    object-fit: cover;
    cursor: pointer
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
    color: #f1e9e9;
    font-weight: 400;
    width: 40%;
    background: linear-gradient(to right top, #60A448 40%, transparent);
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.85));
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
    margin-bottom: 3%;
    width: 80%;
    filter: drop-shadow(0px 4px 4px rgba(233, 0, 0, 0.25));
}

.kosarba button{
    border: none;
    opacity: 1;
    transition: 0.3s;
    
}
.kosarba button:hover{
    background-color: #ffffff;
    border: 1px solid white;
    color: rgb(24, 24, 24);
    transition: all 0.5s ease-out;
    
}

.kosarba-active button:hover{
    background-color: #ffffff;
    border: 1px solid white;
    color: rgb(24, 24, 24);
;
}
.gombHover:hover{
    background: #f7f5f0;
    color: #ffffff;
    transition: all 0.5s ease-out;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.45));
    transform: scale(1.1, 1.1);
    .icon{
        transform: translateX(140%);
        scale: 1.2;
        transition: all 0.5s ease-out;
        filter: drop-shadow(0px 4px 4px rgba(255, 255, 255, 0.45));
        color: #212529
    };
    #gombfelirat{
        visibility: hidden;
        transition: all 0.1s ease-out;
    }

}
.gombfelirat{
    padding: 0;
    margin: 0;
}
.info{
    border-radius: 11px;
    border: 0px;
    background: #ffffff;
    color: rgb(24, 24, 24);
    font-size: 16px;
    margin-bottom: 3%;
    width: 80%;
}
.info:hover{
    background: #030303;
    color: rgb(243, 242, 242);
    transition: all 0.5s ease-out;
}
#KosarbaModal, #KosarbaHelyezveModal{
    font-size: medium;
}
.img-maxDefault{
    height: 100%;
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
    width: 30%;
    height: 10%;
    right: -1%;
    top: -1%;
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
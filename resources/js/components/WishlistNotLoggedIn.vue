<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { ProductStore } from './store/Product';

const { wishlist, modalStatusAccept, message, modalStatus, loading, emptyMessage } = storeToRefs(ProductStore())
const { update, editStore, fetchWishlistNotLoggedIn, removeFromWishList, receiveEmit, deleteWish } = ProductStore()
fetchWishlistNotLoggedIn();

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
            num: 1
        }
    },
    methods: {
      toModal (wish) {
        this.termek = wish.product[0],
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
        }
      }
    },
}

</script>


<template>
    <loader v-if="loading"></loader>
    <div class="container-fluid">
        <div class="row justify-content-center g-0">
            <div v-if="emptyMessage" class="justify-content-center text-center"><p>Jelenleg üres a kívánságlistád. <a href="termekek"> <b> Adj hozzá csodálatos rózsákat!</b></a></p></div>
            <div class="col-lg-3 col-md-4 col-sm-5 col-8 m-2 product position-relative" v-for="wish in wishlist" key="wish.id" id="box">
                <a href="#" class="row">
                    <div class="termek-kep">
                        <img :src="wish.img" class="img-fluid img-maxDefault">
                        <div v-if="wish.keszlet <= 0" class="elfogyott px-2 text-start">Elfogyott</div>
                        <div v-else class="keszleten px-2 text-start">Készleten</div>
                    </div>
                </a>
                <div class="row justify-content-center text-center m-1">
                    <div class="szin">{{ wish.szin }}</div>
                      <div class="nev">{{ wish.nevHu }}</div>
                      <div class="row justify-content-center">
                            <div class="col-sm-8 col-md-8 col-lg-8"><p class="ar">{{wish.ar }} ,-Ft</p></div>
                        </div>
                      <div class="col-md-2 col-lg-col-2 col-xl-2 imagebuttondiv wishlist">
                          <img src="../../assets/kepek/heartfull.png" class="heartIconWish"  alt="rolunk2" @click="removeFromWishList(wish.id)">
                      </div>
                    <button v-if="wish.keszlet > 0" class="col-md-8 col-lg-10 col-xl-10 kosarba kosarba-active text-center" data-bs-toggle="modal" data-bs-target="#KosarbaModal" v-on:click="toModal(wish)">
                        <font-awesome-icon :icon="['fas', 'cart-shopping']" class="pt-1"/>
                        Kosárba
                    </button> 
                    <button v-else disabled class="col-md-8 col-lg-10 col-xl-10 kosarba text-center" data-bs-toggle="modal" data-bs-target="#KosarbaModal">
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
                  <div class="row justify-content-center text-center m-1">
                    <div class="termek-kep">
                        <img :src="termek.img" class="img-fluid img-max" >
                    </div>
                    <div class="szin">{{ termek.szin }}</div>
                    <div class="nev">{{ termek.nevHu }}</div>
                  </div>
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
                        <font-awesome-icon class="plusSign" :icon="['fas', 'plus']" @click="increment"/>&nbsp;db
                    </div>
                </div>
                <div class="ModalKeszletUzenet d-flex justify-content-center p-2">
                        <!-- Készleten: {{ termek.keszlet }} db -->
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
                    A termék sikeresen bekerült a kosárba
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Tovább vásárolok</button>
                    <a href="kosar"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Tovább a kosárhoz</button></a>                    
                </div>
            </div>
        </div>
    </div>
<modalAccept v-model="modalStatusAccept" :message="message" @modalStatus="receiveEmit" @saveUpdate="saveUpdate" @deleteWish="deleteWish"></modalAccept>
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
  color: rgb(161, 118, 132);
  transition: transform .2s;
}
.wishlist:hover{
    transform: scale(1.3);
}
.imagebuttondiv{
  font-size: 15px;
  height: 20%;
}

</style>
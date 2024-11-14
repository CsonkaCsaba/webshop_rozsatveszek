<script setup>
import { storeToRefs } from 'pinia';
import { OrdersStore, slicedOrders } from './store/Orders';
import { reactive, computed } from 'vue'
import { ref, watch } from 'vue';
const { orders, selectedValue, addNewProduct,  showDown, showUp, accepted, currentPage, itemsPerPage, totalOrders, pagesShown, input, loading} = storeToRefs(OrdersStore())
const { update, fetchOrders, addNewProductBtn, onChange, createProduct, deleteOrd, orderOrdersByIdASC, orderOrdersByIdDESC, updateOrder, handlePageChange, inputChanged, displayOrders } = OrdersStore()
fetchOrders();
watch(input, ()=>{
    inputChanged();
})
</script>
<!-- <script>
  const gradients = [
    ['#222'],
    ['#42b3f4'],
    ['red', 'orange', 'yellow'],
    ['purple', 'violet'],
    ['#00c6ff', '#F0F', '#FF0'],
    ['#f72047', '#ffd200', '#1feaea'],
  ]

  export default {
    data: () => ({
      width: 2,
      radius: 10,
      padding: 8,
      lineCap: 'round',
      gradient: gradients[5],
      value: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
      gradientDirection: 'top',
      gradients,
      fill: false,
      type: 'trend',
      autoLineWidth: false,
    }),
  }
</script> -->

<template>
<div class="container mb-4 pt-4 align-items-center">

        <!-- <v-sparkline
            :auto-line-width="autoLineWidth"
            :fill="fill"
            :gradient="gradient"
            :gradient-direction="gradientDirection"
            :line-width="width"
            :model-value="value"
            :padding="padding"
            :smooth="radius || false"
            :stroke-linecap="lineCap"
            :type="type"
            auto-draw
        ></v-sparkline> -->

    <div class="row row-cols-7 fw-bold fs-5 px-4">
        <div class="col d-flex justify-content-start align-items-start">
            <button v-if="showDown" class="btn btn-light fw-bold fs-5 btnorder" @click="orderOrdersByIdASC">
                <font-awesome-icon :icon="['fas', 'angle-down']" />
            </button>
            <button v-if="showUp" class="btn btn-light fw-bold fs-5 btnorder" @click="orderOrdersByIdDESC">
                <font-awesome-icon :icon="['fas', 'angle-up']" />
            </button>
            <p>Azonosító</p>
        </div>
        <div class="col "><p>Vevő neve</p></div>
        <div class="col"><p>Dátum</p></div>
        <div class="col"><p id="vegosszeg">Végösszeg</p></div>
        <div class="col"><p id="fizmod">Fizetési mód</p></div>
        <div class="col"><p>Állapot</p></div>
        <div class="col"><p>Műveletek</p></div>
    </div>
</div>
<div class="container justify-content-center align-items-center">
    <div class="d-inline-flex  ps-3">
        <input type="text" v-model="input" placeholder="Keresés..." class="form-control ms-2"/>
</div>

<div class="d-inline-flex justify-content-center align-items-center ps-4" v-if="input&&slicedOrders.length == 0">
     <h4>Sajnálom, nincs ilyen névvel regisztrált vevő a rendszerben!</h4>
  </div>
</div>
<loader v-if="loading"></loader>
<div class="container mb-4 pt-4">
    <ul class="list">
        <li  class="row row-cols-7 mt-2 p-4" v-for="order in slicedOrders" :key="order.id">
            <div class="col"><p class="">{{ order.id }} </p> </div>
            <div class="col"><p class=" fw-bold">{{ order.vasarlo.nev}} </p></div>
            <div class="col"><p class="">{{ order.rogzitDatum }}</p></div>
            <div class="col ms-4"><p class="">{{ order.vegosszeg }},-Ft</p></div>
            <div class="col"><p class="">{{ order.fizetesiMod }}</p></div>
            <div class="col-2 d-flex align-items-center">
                <select class="form-select fs-6 px-2" :v-model="selectedValue" @change="onChange(order.id, $event)">
                    <option :value="order.allapot">{{ order.allapot }}</option>
                    <option v-for="option in order.optionsFinal" :key="option.id" :value="option.option">{{ option.option }}</option>
                </select>
                <font-awesome-icon  v-if="order.allapot == 'Feldolgozás alatt'" :icon="['fa', 'hourglass']" class="ps-3" color="#7a7d80"/>
                <font-awesome-icon v-if="order.allapot == 'Kiszállítás alatt'" :icon="['fa', 'truck']" class="ps-3" color="#1679c9"/>
                <font-awesome-icon v-if="order.allapot == 'Teljesítve'" :icon="['fa', 'check']" class="ps-3" color="#64c916"/>
                <font-awesome-icon  v-if="order.allapot == 'Visszamondott'" :icon="['fa', 'ban']" class="ps-3" color="#d41e1e"/>
                <font-awesome-icon v-if="order.allapot == 'Sikertelen kézbesítés'" :icon="['fa', 'xmark']" class="ps-3" color="#d41e1e"/>
                <font-awesome-icon v-if="order.allapot == 'Utalás ellenőrzése'" :icon="['fas', 'question']" class="ps-3"/>
                
            </div>
            <div class="col-2 buttons align-items-center">
                <button type="button" class="btn secoundaryBtna btn-lg ms-2" @click="updateOrder(order.id)" data-bs-toggle="tooltip" data-bs-placement="top" title="Mentés" ><font-awesome-icon :icon="['fas', 'floppy-disk']" /></button>
                <button type="button" class="btn secoundaryBtna btn-lg ms-2" :class="{ rotateBtn : order.edit}" @click="order.edit = !order.edit, showDown = !showDown" :key="order.id" data-bs-toggle="tooltip" data-bs-placement="top" title="Tovább" ><font-awesome-icon :icon="['fas', 'angle-down']" /></button>
                <button type="button" class="btn secoundaryBtnb btn-lg ms-2" @click="deleteOrd(order.id)" data-bs-toggle="tooltip" data-bs-placement="top" title="Törlés"><font-awesome-icon :icon="['fas', 'trash']" /></button>
            </div>
            <div  v-if="order.edit">
                <hr class=""/>
                <h5 class="text-uppercase fw-bold"><font-awesome-icon :icon="['fas', 'phone']"/> Kapcsolat</h5>
                <div class="row row-cols-3 mt-2 align-items-center">
                    <div class="col"><p class="fw-bold">Telefonszám: <br></p>{{ order.vasarlo.telefonszam }} </div>
                    <div class="col"><p class="fw-bold">Email: <br></p>{{ order.vasarlo.email }}</div>
                    <div class="col"><p class="fw-bold">Megjegyzés: <br></p>{{ order.megjegyzes }}</div>
                </div>
                <hr class=""/>
                <h5 class="text-uppercase fw-bold"><font-awesome-icon :icon="['fas', 'truck-fast']" /> Címek</h5>
                <div class="row row-cols-3 mt-2 align-items-center">
                    <div v-if="order.szallitasi_cim == null">Személyes átvétel</div>
                    <div v-else class="col"><p class="fw-bold">Szállítási cím</p> {{ 
                        order.szallitasi_cim.iranyitoszam + " " + 
                        order.szallitasi_cim.telepules + ", " +
                        order.szallitasi_cim.utca + " " +
                        order.szallitasi_cim.hazszam}}</div>
                    <div class="col "><p class="fw-bold">Számlázási cím</p> {{ 
                        order.szamlazasi_cim.iranyitoszam + " " + 
                        order.szamlazasi_cim.telepules + ", " +
                        order.szamlazasi_cim.utca + " " +
                        order.szamlazasi_cim.hazszam}} </div>
                </div>
                <hr class=""/>
                <h5 class="text-uppercase fw-bold"><font-awesome-icon :icon="['fas', 'cart-shopping']"/> Rendelt termékek</h5>
                <div class="container mb-4 pt-4 flex-fill">
                    <div class="row row-cols-6 fw-bold fs-5 px-5 ">
                        <div class="col"><p>Termékkép</p></div>
                        <div class="col "><p>Terméknév</p></div>
                        <div class="col"><p>Mennyiség</p></div>
                        <div class="col"><p id="">Szín</p>
                        </div><div class="col"><p id="">Egységár</p></div>
                        <div class="col"><p>Részösszesen</p></div>
                    </div>
                </div>
            
                <div class="row row-cols-6 mt-2 flex-fill">
                    <ul class="listProduct">
                        <li class="row row-cols-6 mt-2 p-4 align-items-center" v-for="termek in order.termek" :key="order.id">
                            <div class="col"><img class="img-thumbnail" :src="termek.img" /></div>
                            <div class="col"><p class="ms-4">{{ termek.nevHu }}</p> </div>
                            <div class="col"><p class="ms-4">{{ termek.pivot.mennyiseg }} db</p> </div>
                            <div class="col"><p class="">{{ termek.szin }}</p> </div>
                            <div class="col"><p class="">{{ termek.ar }},-Ft/db</p> </div>
                            <div class="col"><p class="">{{ termek.subTotal }},-Ft</p></div>
                            <hr class=""/>
                        </li>
                    
                    </ul>
                </div>
            </div>  
            
            </li>
    </ul>
<div class="example-six align-items-center justify-content-center text-center">
    <vue-awesome-paginate v-model="currentPage" :total-items="totalOrders" :items-per-page="itemsPerPage" :max-pages-shown="pagesShown" @click="handlePageChange" :container-class="'pagination-container'">
        <template #prev-button id="nextBtn">
        <span>  Előző</span>
    </template>

    <template #next-button>
        <span> Következő  ></span>
    </template>
    </vue-awesome-paginate>
</div>
</div>  

</template>

<style lang="sass" scoped>
    
.example-six 
    .pagination-container 
        column-gap: 8%

.secoundaryBtna,
.btnorder
    border: none
    margin-top: -2%
    margin-right: 2%

hr 
  margin-top: 1rem
  margin-bottom: 1rem
  border: 0
  border-top: 1px solid rgba(0, 0, 0, 0.3)
  width: 100%

.rotateBtn
    transform: rotate(180deg)
    transition: transform 0.5s ease

#fizmod,
#vegosszeg
    margin-left: -23%

.listProduct
    list-style-type: none
    width: 100%
    height: auto
    li
        &:hover
            box-shadow: rgba(149, 157, 165, 0.1) 0px 0px 0px!important
   

.list
    list-style-type: none
    width: 100%
    height: auto
    font-size: 18px
    padding-left: 2%
    padding-right: 2%
    
    
    li
        &:hover
            box-shadow: rgba(149, 157, 165, 0.6) 0px 4px 8px
            img
                -webkit-filter: brightness(100%)
                -webkit-transition: all 1s ease
                -moz-transition: all 1s ease
                -o-transition: all 1s ease
                -ms-transition: all 1s ease
                transition: all 1s ease
                border-radius: 0%
            .keszlet
                filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.65))

li:nth-child(odd)
        background: #f7f5f0
    
    
    
.image
    max-width: 60%
    max-height: auto
    padding: 10px
    border-radius: 10%
    -webkit-filter: brightness(75%)

.elfogyott
    background: linear-gradient(to right top, #CA212B 40%, transparent)
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))
    padding: 5px

.keszleten
    background: linear-gradient(to right top, #60A448 40%, transparent)
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))
    padding: 5px
.figyelem
    background: linear-gradient(to right top, #CA212B 40%, transparent)
    color: white
    margin-left: 90px
    top: -35px


.keszlet
    position: absolute
    width: 150px
    margin-top: 150px
    color: #000
    font-weight: 400


.name
    font-size: 16px
    color: black
    text-align: start
    text-transform: uppercase
    font-weight: bold
    margin-left: -200px
    margin-top: 70px
.color
    font-size: 16px
    color: grey
    text-align: start
    text-transform: uppercase
    font-weight: light
    margin-left: -200px
    margin-top: -45px
.ar
    font-size: 16px
    color: black
    text-align: start
    text-transform: uppercase
    margin-left: -130px
    margin-top: 70px


.artop
    margin-left: 45px
.addNewBtn
    margin-left: 100px
    font-size: 21px 

.szerkeszttop
    margin-right: 15px

.v-enter-active
    transition: opacity 0.8s ease
.v-leave-active 
    transition: opacity 0.2s ease
.v-enter-from,
.v-leave-to 
  opacity: 0

</style>
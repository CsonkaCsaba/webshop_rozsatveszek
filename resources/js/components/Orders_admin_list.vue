<script setup>
import { storeToRefs } from 'pinia';
import { OrdersStore, slicedOrders } from './store/Orders';
import { reactive, computed } from 'vue'
import { ref, watch } from 'vue';

const { orders, selectedValue, addNewProduct,  showDown, showUp, accepted, currentPage, itemsPerPage, totalOrders, pagesShown, input, loading, width, radius, padding, lineCap, gradient, value, gradientDirection, fill, type, autoLineWidth, labels, currentMonth, numberOfTheCurrentMonth} = storeToRefs(OrdersStore());

const { update,  addNewProductBtn, onChange, createProduct, deleteOrd, orderOrdersByIdASC, orderOrdersByIdDESC, updateOrder, handlePageChange, inputChanged, displayOrders, daysInMonth, fetchOrders } = OrdersStore();

fetchOrders();
watch(input, ()=>{
    inputChanged();
})


</script>

<template>
<div class="container justify-content-center align-items-center">
    <div class="d-inline-flex  ps-3">
        <input type="text" v-model="input" placeholder="Keresés..." class="form-control ms-2"/>
</div>

<div class="d-inline-flex justify-content-center align-items-center ps-4" v-if="input&&slicedOrders.length == 0">
     <h4 class="text-danger">Sajnálom, nincs ilyen névvel regisztrált vevő a rendszerben!</h4>
  </div>
</div>
<div class="container mb-4 pt-4 align-items-center">

    
    <div class="row row-cols-7 fw-bold fs-5 px-4">
        <div class="col-1 d-flex justify-content-start align-items-start">
            <button v-if="showDown" class="btn btn-light fw-bold fs-5 btnorder" @click="orderOrdersByIdASC">
                <font-awesome-icon :icon="['fas', 'angle-down']" />
            </button>
            <button v-if="showUp" class="btn btn-light fw-bold fs-5 btnorder" @click="orderOrdersByIdDESC">
                <font-awesome-icon :icon="['fas', 'angle-up']" />
            </button>
            <p class="fs-6">Azonosító</p>
        </div>
        <div class="col-2 text-start ps-5 fs-6"><p>Vevő neve</p></div>
        <div class="col-1 text-center fs-6"><p>Időpont</p></div>
        <div class="col-1 text-center fs-6"><p id="vegosszeg">Végösszeg</p></div>
        <div class="col-1 text-center fs-6"><p id="fizmod">Fizetési mód</p></div>
        <div class="col-2 text-center fs-6"><p>Állapot</p></div>
        <div class="col text-center fs-6"><p>Műveletek</p></div>
    </div>
</div>

<loader v-if="loading"></loader>
<div class="container mb-4 pt-4">
    <ul class="list">
        <li  class="row mt-2 py-4 ps-4" v-for="order in slicedOrders" :key="order.id">
            <div class="col-1 pt-4 px-0"><p class="fs-6">{{ order.id }} </p> </div>
            <div class="col-2 pt-4 px-0"><p class="fs-6 fw-bold">{{ order.vasarlo.nev}} </p></div>
            <div class="col pt-2 px-0"><span class="fs-6">{{ order.rogzitDatum }}<br></span><span class="fs-6 text-muted p-0 m-0">{{ order.rogzitOra }}</span></div>
            <div class="col pt-4 px-0"><p class="fs-6">{{ order.vegosszeg }},-Ft</p></div>
            <div class="col pt-4 px-0"><p class="fs-6">{{ order.fizetesiMod }}</p></div>
            <div class="col-3 d-flex align-items-center">
                <select class="form-select fs-6 px-2" :v-model="selectedValue" @change="onChange(order.id, $event)">
                    <option :value="order.allapot" class="fs-6">{{ order.allapot }}</option>
                    <option v-for="option in order.optionsFinal" :key="option.id" :value="option.option" class="fs-6">{{ option.option }}</option>
                </select>
                <font-awesome-icon  v-if="order.allapot == 'Feldolgozás alatt'" :icon="['fa', 'hourglass']" class="ps-2" color="#7a7d80"/>
                <font-awesome-icon v-if="order.allapot == 'Kiszállítás alatt'" :icon="['fa', 'truck']" class="ps-2" color="#1679c9"/>
                <font-awesome-icon v-if="order.allapot == 'Teljesítve'" :icon="['fa', 'check']" class="ps-2" color="#64c916"/>
                <font-awesome-icon  v-if="order.allapot == 'Visszamondott'" :icon="['fa', 'ban']" class="ps-2" color="#d41e1e"/>
                <font-awesome-icon v-if="order.allapot == 'Sikertelen kézbesítés'" :icon="['fa', 'xmark']" class="ps-2" color="#d41e1e"/>
                <font-awesome-icon v-if="order.allapot == 'Utalás ellenőrzése'" :icon="['fas', 'question']" class="ps-2"/>
                
            </div>
            <div class="col-3 buttons align-items-center mt-3">
                <button type="button" class="btn secoundaryBtna btn-lg ms-2" @click="updateOrder(order.id)" data-bs-toggle="tooltip" data-bs-placement="top" title="Mentés" ><font-awesome-icon :icon="['fas', 'floppy-disk']" /></button>
                <button type="button" class="btn secoundaryBtna btn-lg ms-2" :class="{ rotateBtn : order.edit}" @click="order.edit = !order.edit, showDown = !showDown" :key="order.id" data-bs-toggle="tooltip" data-bs-placement="top" title="Tovább" ><font-awesome-icon :icon="['fas', 'angle-down']" /></button>
                <button type="button" class="btn secoundaryBtnb btn-lg ms-2" @click="deleteOrd(order.id)" data-bs-toggle="tooltip" data-bs-placement="top" title="Törlés"><font-awesome-icon :icon="['fas', 'trash']" /></button>
            </div>
            <div  v-if="order.edit" class="fs-6">
                <hr class=""/>
                <h5 class="text-uppercase fw-bold fs-6"><font-awesome-icon :icon="['fas', 'phone']"/> Kapcsolat</h5>
                <div class="row row-cols-3 mt-2 align-items-center">
                    <div class="col"><p class="fw-bold">Telefonszám: <br></p>{{ order.vasarlo.telefonszam }} </div>
                    <div class="col"><p class="fw-bold">Email: <br></p>{{ order.vasarlo.email }}</div>
                    <div class="col"><p class="fw-bold">Megjegyzés: <br></p>{{ order.megjegyzes }}</div>
                </div>
                <hr class=""/>
                <h5 class="text-uppercase fw-bold fs-6"><font-awesome-icon :icon="['fas', 'truck-fast']" /> Címek</h5>
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
                <h5 class="text-uppercase fw-bold fs-6"><font-awesome-icon :icon="['fas', 'cart-shopping']"/> Rendelt termékek</h5>
                <div class="container mb-4 pt-4 flex-fill fs-6">
                    <div class="row row-cols-6 fw-bold fs-5 px-5 ">
                        <div class="col fs-6"><p>Termékkép</p></div>
                        <div class="col fs-6"><p>Terméknév</p></div>
                        <div class="col fs-6"><p>Mennyiség</p></div>
                        <div class="col fs-6"><p id="">Szín</p>
                        </div><div class="col fs-6"><p id="">Egységár</p></div>
                        <div class="col fs-6"><p>Részösszesen</p></div>
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
<div class="row example-six text-center">
    <div class="col-10">
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
</div>  

</template>

<style lang="sass" scoped>
    
.example-six 
    .pagination-container 
        column-gap: 5%

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
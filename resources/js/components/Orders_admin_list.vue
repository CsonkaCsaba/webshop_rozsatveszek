<script setup>
import { storeToRefs } from 'pinia';
import { OrdersStore } from './store/Orders';
import { reactive, computed } from 'vue'
const { orders, selectedValue, addNewProduct,  showDown, accepted} = storeToRefs(OrdersStore())
const { update, fetchOrders, addNewProductBtn, onChange, createProduct, deleteOrd, orderByProductsAz, orderByProductsZa, updateOrder } = OrdersStore()
fetchOrders();

</script>

<template>
<!-- <div class="container">
    <div class="d-flex addNewBtn mb-4 ">
      <button type="button" class="btn secoundaryBtnb" @click="addNewProductBtn" :disabled="disableBtnAdd"><font-awesome-icon :icon="['fas', 'plus']" /> Új termék hozzáadás</button>
    </div>
</div>
<Transition>
<div class="addNewProduct p-2" v-if="addNewProduct"> -->
 <!--show if Add New Product button clicked-->
 <!-- <form method="POST" @submit.prevent="createProduct(name, color, price, stock, description)" id="addNewproductForm">
        <div class="container">
            <div class="row justify-content-center text-center">
                <div class="col-4">
                    <label for="name" class="p-1 col">Név</label>
                    <input id="nameInput" type="text" class="form-control fw-light" required placeholder="Név megadása" name="nameInput" v-model="name"/>
                </div>
                <div class="col-4">
                <div>
                    <label for="color" class="p-1 col">Szín</label>
                    <input id="color" type="text" class="form-control fw-light" required placeholder="Szín megadása" name="colorInput" v-model="color"/>
                </div>
                </div>
            </div>

            <div class="row justify-content-center text-center mt-2">
                <div class="col-4">
                    <label for="price" class="p-1 col">Ár</label>
                    <div class="input-group mb-3">
                        <input id="price" type="number"  class="form-control fw-light" required placeholder="Ár megadása" name="priceInput" v-model="price"/>
                        <span class="input-group-text">-Ft</span> 
                    </div>
                </div>
                <div class="col-4">
                    <label for="stock" class="p-1 col">Készlet</label>
                    <div class="input-group mb-3">
                        <input id="stock" type="number"  class="form-control fw-light" required placeholder="Készlet megadása" name="stockInput" v-model="stock"/>
                        <span class="input-group-text">db</span>  
                    </div>
                </div>
            </div>
            <div class="row justify-content-center text-center">
                <div class="col-4">
                    <label for="description" class="p-1 col">Leírás</label>
                        <textarea id="description"  class="form-control fw-light" required placeholder="Leírás megadása" name="descriptionInput" v-model="description" rows="8">
                        </textarea>
                </div>
                <div class=" col-4 form-floating mb-3">
                    <p class="mt-4 form-label form-label-top pt-2 mb-4">Fotó hozzáadása</p> 
                    <input id="uploadInput" type="file" @change="onChange" class="form-control" accept="image/*" name="photo" reqired/>
                    <p class="text-danger">{{ photoMessage }}</p>
                </div>
            </div>
                <div class="justify-content-center text-center">
                <div class="d-inline-flex p-4 mt-2">
                    <button type="submit" class="btn m-1 secoundaryBtna" :disabled="disableBtn">Hozzáadás</button>
                    <button type="button" class="btn secoundaryBtnb m-1" @click="addNewProduct = false; disableBtnAdd = false">Mégsem</button>
                </div>
                </div>
            </div>
    </form>
  </div>
</Transition>-->

<!-- <div class="container fw-bold mb-4 justify-content-center text-center">
  <div class="row">
    
    <div class="col-sm">
        <div v-if="showDown">
            <button class="btn fw-bold" @click="orderByProductsAz">
                Termék <font-awesome-icon :icon="['fas', 'arrow-down-a-z']" />
            </button>
        </div>
        <div v-if="showUp">
            <button class="btn fw-bold" @click="orderByProductsZa">
                Termék <font-awesome-icon :icon="['fas', 'arrow-up-a-z']" />
            </button>
        </div>
        
       
       
    </div>
    <div class="col-sm artop">
        Ár
    </div>
    <div class="col-sm szerkeszttop">
        Szerkesztés
    </div>
  </div>
</div>-->
<div class="container mb-4 pt-4 align-items-center">
    <div class="row row-cols-7 fw-bold fs-5 px-5">
        <div class="col"><p>Azonosító</p></div>
        <div class="col "><p>Vevő neve</p></div>
        <div class="col"><p>Dátum</p></div>
        <div class="col"><p id="vegosszeg">Végösszeg</p></div>
        <div class="col"><p id="fizmod">Fizetési mód</p></div>
        <div class="col"><p>Állapot</p></div>
        <div class="col"><p>Műveletek</p></div>
    </div>
</div>

<div class="container mb-4 pt-4">
    <ul class="list">
        <li class="row row-cols-7 mt-2 p-4" v-for="order in orders" :key="order.id">
            <div class="col"><p class="">{{ order.id }} </p> </div>
            <div class="col"><p class=" fw-bold">{{ order.vasarlo.nev}} </p></div>
            <div class="col"><p class="">{{ order.rogzitDatum }}</p></div>
            <div class="col ms-4"><p class="">{{ order.vegosszeg }},-Ft</p></div>
            <div class="col"><p class="">{{ order.fizetesiMod }}</p></div>
            <div class="col-2 d-flex align-items-center">
                <font-awesome-icon  v-if="order.allapot == 'Feldolgozás alatt'" :icon="['fa', 'hourglass']" class="pe-3" color="#7a7d80"/>
                <font-awesome-icon v-if="order.allapot == 'Kiszállítás alatt'" :icon="['fa', 'truck']" class="pe-3" color="#1679c9"/>
                <font-awesome-icon v-if="order.allapot == 'Teljesítve'" :icon="['fa', 'check']" class="pe-3" color="#64c916"/>
                <font-awesome-icon  v-if="order.allapot == 'Visszamondott'" :icon="['fa', 'ban']" class="pe-3" color="#d41e1e"/>
                <font-awesome-icon v-if="order.allapot == 'Sikertelen kézbesítés'" :icon="['fa', 'xmark']" class="pe-3" color="#d41e1e"/>
                <select class="form-select fs-6 px-2" :v-model="selectedValue" @change="onChange(order.id, $event)">
                    <option selected :value="order.allapot">{{ order.allapot }}</option>
                    <option v-for="option in order.optionsFinal" :key="option.id" :value="option.option">{{ option.option }}</option>
                </select>
            </div>
            
                
                 
                <!-- <div class="col-5 ">
                    <img :src="prod.img" class="image">
                </div>  -->
                <!-- <div class="col-2 mt-5 keszlet">
                    <p v-if="prod.keszlet <= 0" class="elfogyott">Elfogyott</p>
                    <p v-else class="keszleten ">Készleten: <br><b>{{ prod.keszlet }} db</b></p>
                    <p v-if ="prod.keszlet > 1 && prod.keszlet <= 10" class=""> <span class="position-absolute translate-middle badge rounded-pill bg-danger figyelem">
                        A készlet hamarosan elfogy!</span></p>
                </div> -->

                <div class="col-2 buttons align-items-center">
                    <button type="button" class="btn secoundaryBtna btn-lg ms-2" @click="updateOrder(order.id)" data-bs-toggle="tooltip" data-bs-placement="top" title="Mentés" ><font-awesome-icon :icon="['fas', 'floppy-disk']" /></button>
                    <button type="button" class="btn secoundaryBtna btn-lg ms-2" :class="{ rotateBtn : order.edit}" @click="order.edit = !order.edit, showDown = !showDown" :key="order.id" data-bs-toggle="tooltip" data-bs-placement="top" title="Tovább" ><font-awesome-icon :icon="['fas', 'angle-down']" /></button>
                    <button type="button" class="btn secoundaryBtnb btn-lg ms-2" @click="deleteOrd(order.id)" data-bs-toggle="tooltip" data-bs-placement="top" title="Törlés"><font-awesome-icon :icon="['fas', 'trash']" /></button>
                </div>
                <div  v-if="order.edit">
                    <div class="row row-cols-3 mt-2 align-items-center">
                        <hr class=""/>
                        <div class="col"><p class="fw-bold">Telefonszám: <br></p>{{ order.vasarlo.telefonszam }} </div>
                        <div class="col"><p class="fw-bold">Email: <br></p>{{ order.vasarlo.email }}</div>
                        <div class="col"><p class="fw-bold">Megjegyzés: <br></p>{{ order.megjegyzes }}</div>
                    </div>
                    <hr class=""/>
                    <div class="col"><p class="fw-bold pt-4">Rendelt termékek <br></p></div>
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
                
                <!--<div class="row editOrderForm" v-if="order.edit">
                    <form class="col ml-8" method="PUT" @submit.prevent="updateProduct(prod.id, prod.nevHu, prod.szin, prod.ar, prod.keszlet, prod.leirasHu)">
                        <div class="container">
                            <div class="row justify-content-center text-center">
                                <div class="col-4">
                                    <label for="name" class="p-1 col">Név</label>
                                    <input id="nameInput" type="text" class="form-control fw-light" required :placeholder=prod.nevHu v-model="prod.nevHu"/>
                                </div>
                                <div class="col-4">
                                <div>
                                    <label for="color" class="p-1 col">Szín</label>
                                    <input id="color" type="text" class="form-control fw-light" required :placeholder=prod.szin  v-model="prod.szin"/>
                                </div>
                                </div>
                            </div>

                            <div class="row justify-content-center text-center mt-2">
                                <div class="col-4">
                                    <label for="price" class="p-1 col">Ár</label>
                                    <div class="input-group mb-3">
                                        <input id="price" type="number"  class="form-control fw-light" required :placeholder=prod.ar  v-model="prod.ar"/>
                                        <span class="input-group-text">-Ft</span> 
                                    </div>
                                </div>
                                <div class="col-4">
                                    <label for="stock" class="p-1 col">Készlet</label>
                                    <div class="input-group mb-3">
                                        <input id="stock" type="number"  class="form-control fw-light" required :placeholder=prod.keszlet v-model="prod.keszlet"/>
                                        <span class="input-group-text">db</span>  
                                    </div>
                                </div>
                            </div>
                            <div class="row justify-content-center text-center">
                                <div class="col-4">
                                    <label for="description" class="p-1 col">Leírás</label>
                                        <textarea id="description"  class="form-control fw-light" required :placeholder=prod.leirasHu v-model="prod.leirasHu" rows="8">
                                        </textarea>
                                </div>
                                <div class=" col-4 form-floating mb-3">
                                    <p class="mt-4 form-label form-label-top pt-2 mb-4">Fotó módosítás</p> 
                                    <input name="upload_file" id="upload_file" type="file" @change="onChange" class="form-control" accept="image/*"/>
                                    <p class="text-danger">{{ photoMessage }}</p>
                                </div> 
                            </div>
                                <div class="justify-content-center text-center">
                                <div class="d-inline-flex p-4 mt-2">
                                    <button type="submit" class="btn m-1 secoundaryBtna">Módosítás</button>
                                    <button type="button" class="btn secoundaryBtnb m-1" @click="prod.edit= false">Mégsem</button>
                                </div>
                                </div>
                            </div>
                        </form>
                </div> -->

        </li>
    </ul>
</div>  
</template>

<style lang="sass" scoped>
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
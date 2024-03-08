<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { ProductStore } from './store/Product';
const { products, addNewProduct, disableBtnAdd, photoMessage} = storeToRefs(ProductStore())
const { update, editStore, fetchProduct, addNewProductBtn, onChange, createProduct, deleteProduct } = ProductStore()
fetchProduct();
</script>

<template>
<div class="container">
    <div class="d-flex addNewBtn mb-4 ">
      <button type="button" class="btn secoundaryBtnb" @click="addNewProductBtn" :disabled="disableBtnAdd"><font-awesome-icon :icon="['fas', 'plus']" /> Új termék hozzáadás</button>
    </div>
</div>

<div class="addNewProduct p-2" v-if="addNewProduct">
 <!--show if Add New Product button clicked-->
 <form method="POST" @submit.prevent="createProduct(name, color, price, stock, description)" id="addNewproductForm">
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
                    <input id="uploadInput" type="file" @change="onChange" class="form-control" accept="image/*" name="photo"/>
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

<div class="container fw-bold mb-4 justify-content-center text-center">
  <div class="row">
    <div class="col-sm">
        Termék
    </div>
    <div class="col-sm artop">
        Ár
    </div>
    <div class="col-sm szerkeszttop">
        Szerkesztés
    </div>
  </div>
</div>


<div class="container mb-4">
    <ul class="list">
        <li class="text-left" v-for="prod in products" :key="prod">
            <div class="row ">
                <div class="col-5 ">
                    <img :src="prod.img" class="rounded image">
                </div>
                <div class="col-2 mt-5 keszlet">
                    <p v-if="prod.keszlet <= 0" class="elfogyott">Elfogyott</p>
                    <p v-else class="keszleten ">Készleten</p>
                </div>
                <div class="col-2">
                    <p class="name">{{ prod.nevHu }}</p><br>
                    <p class="color">{{ prod.szin }}</p>
                </div>
                <div class="col-sm ar">
                    {{ prod.ar }} Ft
                </div>
                <div class="col-sm buttons">
                    <button type="button" class="btn btn-primary btn-lg m-4" @click=""><font-awesome-icon :icon="['fas', 'pen']" /></button>
                    <button type="button" class="btn btn-outline-secondary btn-lg" @click="deleteProduct"><font-awesome-icon :icon="['fas', 'trash']" /></button>
                </div>
                
            </div>
        </li>
    </ul>
</div>
</template>

<style lang="sass" scoped>
.list
    list-style-type: none
    width: 100%
    height: auto
    font-size: 18px
    padding-left: 5%
    padding-right: 5%
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
            
            
            
.image
    max-width: 60%
    max-height: auto
    padding: 10px
    border-radius: 25%
    -webkit-filter: brightness(70%)
    
    


.elfogyott
    background: linear-gradient(to right top, #CA212B 40%, transparent)
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))

.keszleten
    background: linear-gradient(to right top, #60A448 40%, transparent)
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))
.keszlet
    position: absolute
    width: 150px
    margin-top: 150px
    font-size: 20px
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

.buttons
    margin-top: 40px
    margin-left: 85px

.artop
    margin-left: 45px
.addNewBtn
    margin-left: 100px
    font-size: 21px 

.szerkeszttop
    margin-right: 15px
</style>
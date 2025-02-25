<script setup>
import { storeToRefs } from 'pinia';
import { ProductStore } from './store/Product';
import { TagsStore } from './store/Tags';
import { watch } from 'vue'
import { BannerPopupStore } from './store/BannerPopupStore';

const {  loading, products,} = storeToRefs(ProductStore())
//const { } = ProductStore()

const { tag, showPreviewtag, selectedValue, selectedProduct, prewievProducts, cim, szoveg, hatterszin, betuszin, betutipus, betustilus, betumeret, akciosarFt, akciosarSzazalek, modalStatus, message, cimkek, allSelected, showDown, cimkekForShow, getProdData, addNewTag, selectedProd, selectedIndex, changed, reload } = storeToRefs(TagsStore())
const { newTag, showPreviewButton, closePreviewButton, setToDefault, updateTag, changeFontFamilytag, changeFontStyletag,  changeFontSize, pushToSelectedProducts, reducePrice, createTag, receiveEmit, fetchCimkek, deleteTag, TagProd, setInd, setDataToSelectedProducts, changeSelectedProd, chipDelete, emptingVariables } = TagsStore()
fetchCimkek()
watch(selectedProduct, () => {
    pushToSelectedProducts()
    
  });
  watch(akciosarSzazalek, () => {
    reducePrice()
    
  });

TagsStore().cimkekForShow.forEach((item, index) => {
  watch(item,() => {
    setDataToSelectedProducts()
    },{ deep: true }
  );
});
// watch(selectedProd, () => {
//     changeSelectedProd()
    
//   });
</script>

<template>
<loader v-if="loading"></loader>
    <div class="container">
        <button type="button" class="btn secoundaryBtnb addNewProd" @click="addNewTag = true" :disabled="disableBtnAdd"><font-awesome-icon :icon="['fas', 'tag']" /> Új címke létrehozása </button>
    </div>
<div class="" v-if="addNewTag">
    <div class="container mb-4 pt-4 back mt-4">
        <div class="col-12 mb-8">
                <ul class="m-4">
                    <ol>
                    <form method="POST"  @submit.prevent="createTag()" id="addNewTag">
                        <div class="row">
                            <div class="col-3">
                                <label class="form-label form-label-top mt-4 fw-bold" for="tagCim"> Cím</label>
                                <textarea  type="text" class="form-control" v-model="cim" name="tagCim" required></textarea>
                            </div>
                            <div class="col-3">
                                <label class="form-label form-label-top mt-4 fw-bold" for="tagText" required> Szöveges tartalom</label>
                                <textarea  type="text" class="form-control"  v-model="szoveg" name="tagText" rows="3"></textarea>
                            </div>
                            <div class="col-1">
                                <label class="form-label mt-4 fw-bold" for="tagBackroundColor"> Háttérszín</label>
                                <input type="color" class="form-control form-control-color"  v-model="hatterszin" name="tagBackroundColor"/>
                            </div>
                            <div class="col-1">
                                <label class="form-label mt-4 fw-bold" for="tagTextColor"> Betűszín</label>
                                <input type="color" class="form-control form-control-color" v-model="betuszin" name="tagTextColor"/>
                            </div>
                            <div class="col-1">
                                
                            </div>
                            <div class="col-3 border-start mt-4">
                                <input class="form-check-input" type="checkbox" name="inlineCheckbox1" id="inlineCheckbox1" value="" v-model="allSelected">
                                <label class="form-check-label ms-4" for="inlineCheckbox1"> Beállítás az összes termékre</label>
                                    <v-autocomplete color="blue-grey-lighten-2" v-model="selectedProduct" :items="products" item-title="nevHu" item-value="nevHu" label="Választás" variant="underlined" chips  multiple auto-select-first placeholder="Termék kiválasztása" item-props>
                                        <template v-slot:chip="{ props, item }">
                                            <v-chip class="hideBtn" v-bind="props" :prepend-avatar="item.raw.img" :text="item.title" :key="item.raw.id" closable ></v-chip>
                                        </template>

                                        <template v-slot:item="{ props, item }">
                                                <v-list-item class="items" v-bind="props" :prepend-avatar="item.raw.img" :subtitle="item.raw.szin" :title="item.title"></v-list-item>
                                        </template>
                                    </v-autocomplete>
                            </div>
                            <div class="row mt-4">
                                <div class="col-3">
                                    <label class="form-label fw-bold" for="tagTextType"> Betűk típusa</label>
                                    <select class="form-select fs-6 px-2 mb-4 " v-model="betutipus" @change="changeFontFamilytag($event)">
                                        <option :value="betutipus">{{ betutipus }}</option>
                                        <option v-for="option in BannerPopupStore().optionsFontFamily" :key="option.id" :value="option.option" :style="{'font-family': option.option}" >{{ option.option }}</option>
                                    </select>
                                </div>
                                <div class="col-3">
                                    <label class="form-label fw-bold" for="tagTextStyle"> Betűk stílusa</label>
                                    <select class="form-select fs-6 px-2 mb-4 " v-model="betustilus" @change="changeFontStyletag($event)">
                                        <option :value="betustilus">{{ betustilus }}</option>
                                        <option v-for="option in BannerPopupStore().optionsFontStyle" :key="option.id" :value="option.option" :style="{'font-style': option.option}" >{{ option.option }}</option>
                                    </select>
                                </div>
                                <div class="col-3">
                                    <label class="form-label fw-bold" for="tagTextSize"> Betűk mérete</label>
                                    <select class="form-select fs-6 px-2 mb-4 " v-model="betumeret" @change="changeFontSize($event)">
                                        <option :value="betumeret">{{ betumeret }}</option>
                                        <option v-for="option in BannerPopupStore().optionsFontSize" :key="option.id" :value="option.option" :style="{'font-size': option.option}" >{{ option.option }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mt-4">
                                <div class="col-3">
                                    <label class="form-label fw-bold" for="inlineCheckbox2">Akciós ár (Ft)</label>
                                    <input  type="text" class="form-control px-2 mb-4" v-model="akciosarFt" name="tagCim"/>
                                </div>
                                <div class="col-3">
                                    <label class="form-label fw-bold" for="inlineCheckbox2">Akciós ár (%)</label>
                                    <input  type="text" class="form-control px-2 mb-4" v-model="akciosarSzazalek" name="tagCim"/>
                                 </div>
                                 <div class="col-3 align-items-end mt-4">
                                    <button type="submit" class="btn secoundaryBtna px-2 mb-4 ms-2" data-bs-toggle="tooltip" data-bs-placement="top" title="Mentés" >Mentés</button>
                                    <button type="button" class="btn secoundaryBtnb px-2 mb-4 ms-2" @click="addNewTag=false">Mégsem</button>
                                </div>
                        </div>
                        
                                                        <!-- TERMÉKEK -->
                        <div class="container-fluid">
                            <div class="row g-0">
                                <h5 class="fw-bold">Előnézet</h5>
                                <div class="col-lg-4 col-md-4 col-sm-5 col-8 m-2 product position-relative m-4 pb-4" v-for="prod in prewievProducts" key="prod.id" id="box" >
                                    <a href="#" class="row">
                                        <div class="cimke" :style="{'color': betuszin, 'font-family': betutipus, 'font-style': betustilus, 'background': 'linear-gradient(to left bottom,'+hatterszin+' 40%, transparent)'}">
                                            <h3 class="text-center align-items-center justify-content-center pt-4 fw-bold" :style="{'font-size': betumeret+'px'}"> {{ szoveg }} </h3>
                                        </div>
                                        <div class="termek-kep">
                                            <img :src="prod.img" class="img-fluid img-maxDefault">
                                            <div v-if="prod.keszlet <= 0" class="elfogyott px-2 text-start">Elfogyott</div>
                                            <div v-else class="keszleten px-2 text-start">Készleten</div>
                                        </div>
                                    </a>
                                    <div class="row justify-content-center m-1 detail container">
                                        <div class="row row-cols-1 text-center">
                                            <div class="szin">{{ prod.szin }}</div>
                                            <div class="nev">{{ prod.nevHu }}</div>
                                            <div class="row justify-content-center">
                                                <div class="col-sm-8 col-md-8 col-lg-8"><p class="ar text-center " :class="{ strikethrough : akciosarFt>0 }">{{ prod.ar }} ,-Ft</p></div>
                                                <div v-if="akciosarFt>0" class="col-sm-8 col-md-8 col-lg-8"><h2 class="text-center fw-bold" >{{ akciosarFt }} ,-Ft</h2></div>
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
                        </div>
                    </form>
                    </ol>
                </ul>
        </div>
    </div>
</div>

<div class="container mb-4">
        <ul class="list mt-4 mb-6">
            <li class="text-left" v-for="(item, index) in cimkekForShow" :key="item.cimkeId">
                <div class="container" :class="{hideElem : selectedIndex !== null && selectedIndex !== index}">
                    <div class="row">
                        <div class="col-6">
                            <p class="align-items-center justify-content-center pt-4 fw-bold">{{item.cim}} </p>
                           
                        </div>
                        <div class="col">
                            <p class="d-flex align-items-start justify-content-start pt-5 text-muted fw-light fs-6">{{item.szoveg}} </p>
                        </div>
                        <div class="col buttons align-items-end pt-4 ms-5 ">
                            <button type="button" class="btn secoundaryBtna btn-lg  ms-5"  data-bs-toggle="tooltip" data-bs-placement="top" title="Mentés" ><font-awesome-icon :icon="['fas', 'floppy-disk']" /></button>
                            <button v-if="!item.edit" type="button" class="btn secoundaryBtna btn-lg ms-2" @click="item.edit = !item.edit, TagProd(item.cimkeId), setInd(index)" data-bs-toggle="tooltip" data-bs-placement="top" title="Szerkeszt" ><font-awesome-icon :icon="['fas', 'pen']" /></button>
                            <button v-if="item.edit" type="button" class="btn secoundaryBtna btn-lg ms-2" @click="item.edit = !item.edit,  emptingVariables()" data-bs-toggle="tooltip" data-bs-placement="top" title="Bezár" ><font-awesome-icon :icon="['fas', 'xmark']" /></button>
                            <button type="button" class="btn secoundaryBtnb btn-lg ms-2" data-bs-toggle="tooltip" data-bs-placement="top" title="Törlés"><font-awesome-icon :icon="['fas', 'trash']" @click="deleteTag(item)"/></button>
                        </div>
                    </div>
                    <div class="d-flex justify-content-start">
                        <div v-for="data in getProdData" class="d-flex">
                                <div v-if="data.cimke.cim === item.cim" class="d-flex justify-content-start ms-2">
                                    <img class="imgCimke" :src="data.img"></img><p class="text-muted fw-light fs-6 ps-2">{{ data.nevHu }} &nbsp;</p>
                                </div> 
                            </div>
                        </div>
                </div>
                <div class="" v-if="item.edit">
                    <div class="container mb-4 pt-4 back mt-4">
                        <div class="col-12 mb-8">
                                <ul class="m-4">
                                    <ol>
                                    <form method="PUT" @submit.prevent="updateTag(item.cimkeId, item.cim, item.szoveg, item.hatterszin, item.betuszin, item.betutipus, item.betustilus, item.betumeret, item.akciosarFt, item.akciosarSzazalek)" id="updateTag">
                                        <div class="row">
                                            <div class="col-3">
                                                <label class="form-label form-label-top mt-4 fw-bold" for="tagCim"> Cím</label>
                                                <textarea  type="text" class="form-control" :placeholder=item.cim v-model="item.cim" name="tagCim"></textarea>
                                            </div>
                                            <div class="col-3">
                                                <label class="form-label form-label-top mt-4 fw-bold" for="tagText"> Szöveges tartalom</label>
                                                <textarea  type="text" class="form-control"  :placeholder=item.szoveg v-model="item.szoveg" name="tagText" rows="3"></textarea>
                                            </div>
                                            <div class="col-1">
                                                <label class="form-label mt-4 fw-bold" for="tagBackroundColor"> Háttérszín</label>
                                                <input type="color" class="form-control form-control-color"  :placeholder=item.hatterszin v-model="item.hatterszin" name="tagBackroundColor"/>
                                            </div>
                                            <div class="col-1">
                                                <label class="form-label mt-4 fw-bold" for="tagTextColor"> Betűszín</label>
                                                <input type="color" class="form-control form-control-color" :placeholder=item.betuszin v-model="item.betuszin" name="tagTextColor"/>
                                            </div>
                                            <div class="col-1">
                                                
                                            </div>
                                            <div class="col-3 border-start mt-4">
                                                <input class="form-check-input" type="checkbox" name="inlineCheckbox1" id="inlineCheckbox1" value="" v-model="allSelected">
                                                <label class="form-check-label ms-4" for="inlineCheckbox1"> Beállítás az összes termékre</label>
                                                    
                                                        <v-autocomplete color="blue-grey-lighten-2" v-model="selectedProduct" :items="products" item-title="nevHu" item-value="nevHu" label="Választás" variant="underlined" chips  multiple auto-select-first placeholder="Termék kiválasztása" item-props>
                                                            <template v-slot:chip="{ props, item }">
                                                                <v-chip class="hideBtn" v-bind="props" :prepend-avatar="item.raw.img" :text="item.title" :key="item.raw.id" closable ></v-chip>
                                                            </template>

                                                            <template v-slot:item="{ props, item }">
                                                                    <v-list-item  :disabled="item.raw.cimkeId !== null" class="items" v-bind="props" :prepend-avatar="item.raw.img" :subtitle="item.raw.szin" :title="item.title"></v-list-item>
                                                            </template>
                                                        </v-autocomplete>

                                            </div>
                                            <div class="row mt-4">
                                                <div class="col-3">
                                                    <label class="form-label fw-bold" for="tagTextType"> Betűk típusa</label>
                                                    <select class="form-select fs-6 px-2 mb-4 " v-model="item.betutipus" @change="changeFontFamilytag($event)">
                                                        <option :value="item.betutipus">{{ item.betutipus }}</option>
                                                        <option v-for="option in BannerPopupStore().optionsFontFamily" :key="option.id" :value="option.option" :style="{'font-family': option.option}" >{{ option.option }}</option>
                                                    </select>
                                                </div>
                                                <div class="col-3">
                                                    <label class="form-label fw-bold" for="tagTextStyle"> Betűk stílusa</label>
                                                    <select class="form-select fs-6 px-2 mb-4 " v-model="item.betustilus" @change="changeFontStyletag($event)">
                                                        <option :value="item.betustilus">{{ item.betustilus }}</option>
                                                        <option v-for="option in BannerPopupStore().optionsFontStyle" :key="option.id" :value="option.option" :style="{'font-style': option.option}" >{{ option.option }}</option>
                                                    </select>
                                                </div>
                                                <div class="col-3">
                                                    <label class="form-label fw-bold" for="tagTextSize"> Betűk mérete</label>
                                                    <select class="form-select fs-6 px-2 mb-4 " v-model="item.betumeret" @change="changeFontSize($event)">
                                                        <option :value="item.betumeret">{{ item.betumeret }}</option>
                                                        <option v-for="option in BannerPopupStore().optionsFontSize" :key="option.id" :value="option.option" :style="{'font-size': option.option}" >{{ option.option }}</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row mt-4">
                                                <div class="col-3">
                                                    <label class="form-label fw-bold" for="inlineCheckbox2">Akciós ár (Ft)</label>
                                                    <input  type="text" class="form-control px-2 mb-4" v-model="item.akciosarFt" name="tagCim"/>
                                                </div>
                                                <div class="col-3">
                                                    <label class="form-label fw-bold" for="inlineCheckbox2">Akciós ár (%)</label>
                                                    <input  type="text" class="form-control px-2 mb-4" v-model="item.akciosarSzazalek" name="tagCim"/>
                                                </div>
                                                <div class="col-3 align-items-end mt-4">
                                                    <button type="submit" class="btn secoundaryBtna px-2 mb-4 ms-2" data-bs-toggle="tooltip" data-bs-placement="top" title="Mentés" >Mentés</button>
                                                    <button type="button" class="btn secoundaryBtnb px-2 mb-4 ms-2" @click="item.edit = !item.edit,  emptingVariables()">Mégsem</button>
                                                </div>
                                        </div>
                                        </div>
                                    </form>
                                    </ol>
                                </ul>
                        </div>

                                    <div class="container-fluid" :key="reload">
                                        <div class="row g-0">
                                            <h5 class="fw-bold">Előnézet</h5>
                                            <div class="col-lg-4 col-md-4 col-sm-5 col-8 m-2 product position-relative m-4 pb-4" v-for="data in prewievProducts" key="prod.id" id="box" >
                                                
                                        
                                                    <a href="#" class="row">
                                                   
                                                        <div  class="cimke" :style="{'color': data.cimke.betuszin, 'font-family': data.cimke.betutipus, 'font-style': data.cimke.betustilus, 'background': 'linear-gradient(to left bottom,'+data.cimke.hatterszin+' 40%, transparent)'}">
                                                            <h3 class="text-center align-items-center justify-content-center pt-4 fw-bold" :style="{'font-size': data.cimke.betumeret+'px'}"> {{ data.cimke.szoveg }} </h3>
                                                        </div>
                                                        <div class="termek-kep">
                                                            <img :src="data.img" class="img-fluid img-maxDefault">
                                                            <div v-if="data.keszlet <= 0" class="elfogyott px-2 text-start">Elfogyott</div>
                                                            <div v-else class="keszleten px-2 text-start">Készleten</div>
                                                        </div>
                                                    </a>
                                                <div class="row justify-content-center m-1 detail container">
                                                    <div class="row row-cols-1 text-center">
                                                        <div class="szin">{{ data.szin }}</div>
                                                        <div class="nev">{{ data.nevHu }}</div>
                                                        <div class="row justify-content-center">
                                                            <div class="col-sm-8 col-md-8 col-lg-8"><p class="ar text-center " :class="{ strikethrough : data.akciosarFt>0 }">{{ data.ar }} ,-Ft</p></div>
                                                            <div v-if="data.akciosarFt>0" class="col-sm-8 col-md-8 col-lg-8"><h2 class="text-center fw-bold" >{{ data.akciosarFt }} ,-Ft</h2></div>
                                                        </div>
                                                        <div  class="col-md-2 col-lg-col-2 col-xl-2 imagebuttondiv wishlist">
                                                            <img src="../../assets/kepek/heart.png" class="heartIconEmpty"  alt="rolunk2" @click="addToWishlist(prod.id)">
                                                        </div>
                                                        <button v-if="data.keszlet > 0" class="col-md-8 col-lg-10 col-xl-10 kosarba kosarba-active text-center" data-bs-toggle="modal" data-bs-target="#KosarbaModal" v-on:click="toModal(prod)">
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
                    </div>
                    
                </div>
        </li>
    </ul>
</div>


<Modal v-model="modalStatus" :message="message" @modalStatus="receiveEmit" ></Modal>
</template>

<style lang="sass" scoped>
.back
    background-color: #f7f5f0
.v-list-item
    &:hover 
        opacity: 0.9
        background-color: rgba(0, 0, 0, 0.2)
        color: rgba(0, 0, 0, 0.2)

.v-list-item__overlay 
    position: absolute
    background-color: rgba(0, 0, 0, 0.85)
    color: white

.hideBtn
    &:hover
        color: red
        transition: 0.5s ease

#box
    border: 1px solid white
    border-radius: 11px

#box:hover
    background: rgba(228, 160, 183, 0.67)
    border: none
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.19)
    transition: box-shadow 0.2s ease-in-out
.termek-kep
    width: 100%
    
.select-container
    font-size: 18px

.product
    background: rgba(228, 160, 183, 0.47)
    border: 1px solid white

.termek-kep
    position: relative


.elfogyott
    position: absolute
    font-size: 16px
    bottom: 0
    color: #000
    font-weight: 400
    width: 40%
    background: linear-gradient(to right top, #CA212B 40%, transparent)
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))

.keszleten
    position: absolute
    font-size: 16px
    bottom: 0
    color: #000
    font-weight: 400
    width: 40%
    background: linear-gradient(to right top, #60A448 40%, transparent)
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))


.szin, .ModalKeszletUzenet
    font-size: 16px
    color: #1B1C1E

.nev
    font-size: 14px

.ar
    border-radius: 11px
    background: #D9D9D9
    mix-blend-mode: multiply
    font-size: 15px

.kosarba
    border-radius: 11px
    border: 0px
    background: #1f1f1f
    color: white
    mix-blend-mode: multiply
    font-size: 16px

.kosarba button
    border: none
    background: #D9D9D9
    opacity: 1
    transition: 0.3s
    padding-left: 15px


.kosarba-active
    &:hover
    background-color: #161616


#KosarbaModal, #KosarbaHelyezveModal
    font-size: medium

.img-maxDefault
    height: 250px
    width: 100%
    border-radius: 9px

.img-max
    max-width: 35%


/* setNumber */
.custom-num
    margin: 0.5em
    width: fit-content
    border-radius: 1em
    align-items: center
    background-color: #d1ecf1

.num-input
    font-size: 1em
    text-align: center
    background: none
    border: none
    font-weight: bold
    width: 100%


.num-input::-webkit-outer-spin-button,
.num-input::-webkit-inner-spin-button 
    display: none


.plusSign, .minusSign
    font-size: 1em
    cursor: pointer


.num-max, .num-min
    padding-top: 0.8em
    height: 5em
    padding-bottom: 0

.wishlist 
  font-size: 30px
  color: rgb(255, 255, 255)
  background-color: transparent
  transition: transform .2s

.wishlist
    &:hover
    transform: scale(1.3)


.imagebuttondiv
    font-size: 25px

.heartIconFull
    animation: pulse 0.5s

@keyframes pulse 
    0% 
        transform: scale(0.85)
    

    70% 
        transform: scale(1)
    

    100% 
        transform: scale(0.85)
.cimke
    width: 45%
    height: 18%
    right: -3%
    top: -9%
    position: absolute
    color: white
    text-shadow: 0px 0px 6px rgba(255,255,255,0.7)
    z-index: 10
    background: linear-gradient(to left bottom, #60A448 40%, transparent)
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))
    border-radius: 10% 2%

.strikethrough
    text-decoration: line-through
    color: grey

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
            

li:nth-child(odd)
    background: #f7f5f0   

.rotateBtn
    transform: rotate(180deg)
    transition: transform 0.5s ease 

.imgCimke
    max-width: 30px
    max-height: 30px
    border-radius: 100%
    padding-bottom: 5px

.hideElem
    display: none

</style>

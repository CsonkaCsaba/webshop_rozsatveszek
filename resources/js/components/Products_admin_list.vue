<script setup>
import { storeToRefs } from 'pinia';
import { ProductStore, slicedProducts } from './store/Product';
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Navigation, Scrollbar } from 'swiper/modules';
import { watch } from 'vue';
  const modules = [Pagination, Navigation, Scrollbar]

const { products, addNewProduct, disableBtnAdd, photoMessage, showUp, showDown, modalStatus, message, modalStatusAccept, tags, loading, addAnewPhoto, defaultImage, addAnewPhotoToProductGallery, photoMessageProduct, reload, showDelete,  photoMessageNewProductGalleryPhoto, galleryPhotoCounter, temporaryGallery, hasImg1, hasImg2, hasImg3, hasImg4, hasImg5,name, color, egyseg, cikkszam, price, akciosar, stock, description, shortdescription, input, totalProducts, currentPage, itemsPerPage, pagesShown, errorPublicityMessage, selectedOption, options } = storeToRefs(ProductStore())
const { update, fetchProduct, addNewProductBtn, onChange, createProduct, deleteProduct, orderByProductsAz, orderByProductsZa, updateProduct, receiveEmit, removeProduct, tagsFunction, changeMainPhoto, updateProductImage, addAnewPhotoToProductGalleryBtn, addImageToGallery, changeStateBt, deleteImageAccepted, onChangeNewProductGalleryPhoto, deleteTemporaryProductImageFromGallery, inputChanged, handlePageChange, changePublicity} = ProductStore()
fetchProduct();
document.addEventListener("DOMContentLoaded", function() {
    document.getElementsByClassName('swiper-button-prev').stlye.top = '20% !important';
    document.getElementsByClassName('swiper-button-next').stlye.top = '20% !important';
});

function previewFile() {
  const preview = document.getElementById('previewNewProductPhoto');
  const file = document.getElementById('uploadInput').files[0];
  ProductStore().file = file;
  const reader = new FileReader();

  reader.addEventListener("load", function () {
    preview.src = reader.result;
  }, false);
  if (file) {
    reader.readAsDataURL(file);
  }
}
function deleteTemporaryProductImageUrl(){
    ProductStore().showDelete = false;
    ProductStore().file = '';
    ProductStore().changeStateBt;
    document.getElementById('previewNewProductPhoto').src = '';
    document.getElementById('uploadInput').value = null;
};

watch(input, ()=>{
    inputChanged();
});
function deleteImageFromGalleryProxy(ph_id, prod_id){
    console.log(ph_id, prod_id);
    ProductStore().deleteImageFromGallery(ph_id, prod_id);
}
</script>

<template>
    <loader v-if="loading"></loader>
    <div class="container">
        <div class="row m-4">
            <div class="col-3">
                <div class="d-inline-flex justify-content-center align-items-center" v-if="input&&slicedProducts.length == 0">
                    <p class="text-danger pt-4">Sajnálom, nincs ilyen termék a rendszerben!</p>
                </div>
                <input type="text" v-model="input" placeholder="Keresés..." class="form-control ms-4" autofocus="on"/>
            </div>
            <div class="col-4 ms-4">
                <button type="button" class="btn secoundaryBtnb addNewProd" @click="addNewProductBtn"><font-awesome-icon :icon="['fas', 'plus']" /> Új termék hozzáadás </button>
            </div>
        </div>
    </div>
    
    <div class="addNewProduct p-2" v-if="addNewProduct">
  
    <!--show if Add New Product button clicked-->
    <form method="POST" @submit.prevent="createProduct(name, color, egyseg, cikkszam, price, akciosar, stock, description, shortdescription, selectedOption)" id="addNewproductForm" autocomplete="off">
            <div class="container">
                <div class="row justify-content-center text-center">
                    <div class="col-4">
                        <label for="name" class="p-1 col">Név</label>
                        <input id="nameInput" type="text" class="form-control fw-light" required placeholder="Név megadása" name="nameInput" v-model="name"/>
                    </div>
                </div>
                <div class="row justify-content-center text-center">
                    <div class="col-4">
                    <div>
                        <label for="color" class="p-1 col">Szín</label>
                        <input id="color" type="text" class="form-control fw-light" required placeholder="Szín megadása" name="colorInput" v-model="color"/>
                    </div>
                    </div>
                    <div class="col-4">
                        <label for="name" class="p-1 col">Egység (db, szál, kg. stb.)</label>
                        <input id="nameInput" type="text" class="form-control fw-light" required placeholder="Egység megadása" name="nameInput" v-model="egyseg"/>
                    </div>
                    <div class="col-4">
                    <div>
                        <label for="color" class="p-1 col">Cikszám</label>
                        <input id="color" type="number" class="form-control fw-light"  placeholder="Cikszám megadása" name="colorInput" v-model="cikkszam"/>
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
                        <label for="akciosar" class="p-1 col">Kedvezményes ár</label>
                        
                        <div class="input-group mb-3">
                            <input id="price" type="number"  class="form-control fw-light" required placeholder="Kedvezményes ár megadása" name="priceInput" v-model="akciosar"/>
                            <span class="input-group-text">-Ft/{{ egyseg }}</span> 
                        </div>
                        <p class="text-danger" v-if="akciosar !== '' && price !== '' && akciosar >= price">Az akciós árnak alacsonyabbnak kell lennie!</p>
                    </div>
                    <div class="col-4">
                        <label for="stock" class="p-1 col">Készlet</label>
                        <div class="input-group mb-3">
                            <input id="stock" type="number"  class="form-control fw-light" required placeholder="Készlet megadása" name="stockInput" v-model="stock"/>
                            <span class="input-group-text">{{egyseg}}</span>  
                        </div>
                    </div>
                </div>
                <div class="row justify-content-center text-center">
                    <div class="col-6">
                        <label for="description" class="p-1 col">Leírás</label>
                            <textarea id="description"  class="form-control fw-light" required placeholder="Leírás megadása" name="descriptionInput" v-model="description" rows="8">
                            </textarea>
                    </div>
                    <div class="col-6">
                        <label for="description" class="p-1 col">Egysoros</label>
                            <textarea id="shortdescription"  class="form-control fw-light" required placeholder="Egysoros megadása" name="shortdescriptionInput" v-model="shortdescription" rows="4">
                            </textarea>
                    </div>
                    
                </div>
                <div class="row justify-content-center text-center pt-4">
                    <div class=" col-6">
                        <p class="text-muted fs-6"><font-awesome-icon :icon="['fas', 'circle-info']"/> A legjobb teljesítmény elérése érdekében a feltöltésre kerülő fotókat automatikisan konvertáljuk .webp   kiterjesztésre és 1280*710 pixel méretre állítjuk!</p>
                    </div>
                </div>
                <div class="row justify-content-center text-center">
                    <div class=" col-6 form-floating mb-3 border-end">
                        <p class="mt-4 form-label form-label-top pt-2 mb-5">Termékfotó hozzáadása</p>
                        <p class="text-muted fs-6">Termékenként egy termékfotó jelölhetsz ki. További fotókat a termékgaláriában adhatsz hozzá.</p>
                        <div v-if="showDelete" style="position: absolute; right: 2%; color: red; cursor: pointer; z-index: 15" class="">
                        <button type="button" class="btn deleteBtnNewProd" @click="deleteTemporaryProductImageUrl"><font-awesome-icon :icon="['fas', 'trash']" /></button> 
                        </div>
                        <img id="previewNewProductPhoto" src="" class="w-50 float-center img-fluid rounded mx-auto d-block" @mouseenter="showDelete = true">

                        <input id="uploadInput" type="file" @change="previewFile()" class="form-control mt-4" accept="image/*" name="photo" reqired/>
                        <p class="text-danger">{{ photoMessage }}</p>
                    </div>
                    <div class=" col-6 form-floating mb-3 border-end">
                        <p class="mt-4 form-label form-label-top pt-2 mb-4">Fotó hozzáadása a galériához</p>
                        <p class="text-muted fs-6">A galériában lévő fotók száma: {{ galleryPhotoCounter }} (feltölthető fotók száma max.: 5 db)</p>
                        <div class="d-flex d-inline-flex m-4">
                            <div style="width: 20%" class="" id="photoGalleryNewProduct1">
                                <button v-if="hasImg1" id="deleteBtn1" type="button" class="btn deleteBtnNewProdGallery" @click="deleteTemporaryProductImageFromGallery(1)"><font-awesome-icon :icon="['fas', 'trash']"/> </button> 
                            </div>
                            <div style="width: 20%" class="" id="photoGalleryNewProduct2">
                                <button v-if="hasImg2" id="deleteBtn2" type="button" class="btn deleteBtnNewProdGallery" @click="deleteTemporaryProductImageFromGallery(2)"><font-awesome-icon :icon="['fas', 'trash']" /> </button></div>
                            <div style="width: 20%" class="" id="photoGalleryNewProduct3">
                                <button v-if="hasImg3" id="deleteBtn3" type="button" class="btn deleteBtnNewProdGallery" @click="deleteTemporaryProductImageFromGallery(3)"><font-awesome-icon :icon="['fas', 'trash']" /> </button></div>
                            <div style="width: 20%" class="" id="photoGalleryNewProduct4">
                                <button v-if="hasImg4" id="deleteBtn4" type="button" class="btn deleteBtnNewProdGallery" @click="deleteTemporaryProductImageFromGallery(4)"><font-awesome-icon :icon="['fas', 'trash']" /> </button></div>
                            <div style="width: 20%" class="" id="photoGalleryNewProduct5">
                                <button v-if="hasImg5" id="deleteBtn5" type="button" class="btn deleteBtnNewProdGallery" @click="deleteTemporaryProductImageFromGallery(5)"><font-awesome-icon :icon="['fas', 'trash']" /> </button></div>
                        </div>
                        <img id="previewNewProductGalleryPhoto" src="" class="w-50 float-center img-fluid rounded mx-auto d-block">
                    
                        <input v-if="galleryPhotoCounter < 5" id="uploadInputAdd" type="file" @change="onChangeNewProductGalleryPhoto" class="form-control" accept="image/*" name="photo" reqired/>
                        <p class="text-muted s-6">{{ photoMessageNewProductGalleryPhoto }}</p>
                        <p v-if="galleryPhotoCounter == 5" class="text-muted s-6">Elérted az egy termékhez galériájához maximálisan feltölthető fotók számát!</p>
                        
                    </div>
                    <div class="row">
                        <div class="col-3">
                            <p class="mt-4 form-label form-label-top pt-2 mb-4">Termék megjelenítése</p>
                            <select class="form-select fs-6 px-2" v-model="selectedOption" reqired>
                                <option v-for="option in options" :value="option.value" :key="option.value">
                                {{ option.text }}
                            </option>
                        </select>
                        </div>
                    </div>
                </div>
                
                
                
                <loader v-if="loading"></loader>
                    <div class="justify-content-center text-center">
                    <div class="d-inline-flex p-4 mt-2">
                        <button type="submit" class="btn m-1 secoundaryBtna" :disabled="disableBtn">+ Termék létrehozása</button>
                        <button type="button" class="btn secoundaryBtnb m-1" @click="addNewProduct = false; disableBtnAdd = false, galleryPhotoCounter = 0">Mégsem</button>
                    </div>
                    </div>
                </div>
        </form>
    </div>
  

    <div class="container fw-bold mb-4 justify-content-center text-center">
    <div class="row">
        
        <div class="col-4">
            <div v-if="showDown">
                <button class="btn fw-bold fs-5" @click="orderByProductsAz">
                    Termék <font-awesome-icon :icon="['fas', 'arrow-down-a-z']" />
                </button>
            </div>
            <div v-if="showUp">
                <button class="btn fw-bold fs-5" @click="orderByProductsZa">
                    Termék <font-awesome-icon :icon="['fas', 'arrow-up-a-z']" />
                </button>
            </div>
        </div>
        <div class="col-4 fw-bold fs-5 text-end pe-5">
            Ár
        </div>
        <div class="col-4  fw-bold fs-5 text-center">
            Szerkesztés
        </div>
    </div>
    </div>


    <div class="container mb-4">
        <ul class="list" :key="reload">
            <li class="text-left" v-for="prod in slicedProducts" :key="prod.id">
                <div class="row ">
                    <div class="col-5">
                        <img :src="prod.img" class="image" @click="prod.edit = !prod.edit" style="cursor:pointer;">
                    </div>
                    <div class="keszlet">
                        <p v-if="prod.keszlet <= 0" class="elfogyott">Elfogyott</p>
                        <p v-else class="keszleten">Készleten: <br><b>{{ prod.keszlet }} {{ prod.egyseg }}</b></p>
                        <p v-if ="prod.keszlet > 1 && prod.keszlet <= 10" class=""> <span class="position-absolute translate-middle badge rounded-pill bg-danger figyelem">
                            A készlet hamarosan elfogy!</span></p>
                    </div>
                    <div class="col-1 align-self-center">
                        <p class="name" @click="prod.edit = !prod.edit" style="cursor:pointer;">{{ prod.nevHu }}</p><br>
                        <p class="color">{{ prod.szin }}<br><span class="fs-6 text-muted fw-light align-start"></span>
                            <p class="text-danger" v-if="errorPublicityMessage != ''">{{ errorPublicityMessage }}</p>
                            <font-awesome-icon v-if="prod.kozzeteve == true" :icon="['fas', 'eye']" color="#64c916"/>
                            <font-awesome-icon v-if="prod.kozzeteve == false || prod.kozzeteve == null" :icon="['fas', 'eye-slash']" color="#d41e1e"/></p>
                        

                    </div>
                    <div class="col-2 align-self-center text-start">
                        {{ prod.ar }} Ft/{{ prod.egyseg }}
                    </div>
                    <div class="col-3 align-self-center buttons">
                        <button v-if="prod.kozzeteve == true" type="button" class="btn secoundaryBtna btn-lg" @click="changePublicity(prod.id);" data-bs-toggle="tooltip" data-bs-placement="top" title="Vázlatra állítás" ><font-awesome-icon :icon="['fas', 'eye']" /></button>
                        <button v-if="prod.kozzeteve == false || prod.kozzeteve == null" type="button" class="btn secoundaryBtna btn-lg" @click="changePublicity(prod.id);" data-bs-toggle="tooltip" data-bs-placement="top" title="Közzétesz" ><font-awesome-icon :icon="['fas', 'eye-slash']" /></button>
                        <button type="button" class="btn secoundaryBtna btn-lg m-4" @click="prod.edit = !prod.edit"  data-bs-toggle="tooltip" data-bs-placement="top" title="Termék szerkesztése" ><font-awesome-icon :icon="['fas', 'pen']" /></button>
                        <button type="button" class="btn secoundaryBtnb btn-lg" @click="removeProduct(prod.id)" data-bs-toggle="tooltip" data-bs-placement="top" title="Termék törlése"><font-awesome-icon :icon="['fas', 'trash']" /></button>
                    </div>
                    <Transition>
                    <div class="row editProductForm" v-if="prod.edit">
                        <form class="col ml-8" method="PUT" @submit.prevent="updateProduct(prod.id, prod.nevHu, prod.szin, prod.egyseg, prod.cikkszam, prod.ar, prod.akciosar , prod.keszlet, prod.leirasHu, prod.tagline)">
                            <div class="container">
                                <div class="row justify-content-center text-center">
                                    <div class="col-4">
                                        <label for="name" class="p-1">Név</label>
                                        <input id="nameInput" type="text" class="form-control fw-light" required :placeholder=prod.nevHu v-model="prod.nevHu"/>
                                    </div>
                                        <!-- <div class="col-2">
                                         <label for="publication">Közzétéve:  </label>
                                         <input class="form-check-input" type="checkbox" id="bannerCheckbox" v-model="prod.kozzeteve" :checked="prod.kozzeteve" @click="prod.kozzeteve = !prod.kozzeteve">
                                        </div> -->
                                </div>
                                
                                <div class="row justify-content-center text-center mt-2">
                                    <div class="col-2">
                                        <div>
                                            <label for="color" class="p-1 col">Szín</label>
                                            <input id="color" type="text" class="form-control fw-light" required :placeholder=prod.szin  v-model="prod.szin"/>
                                        </div>
                                    </div>
                                    <div class="col-2">
                                        <label for="name" class="p-1 col">Egység</label>
                                        <input id="nameInput" type="text" class="form-control fw-light" required :placeholder=prod.egyseg name="nameInput" v-model="prod.egyseg"/>
                                    </div>
                                    <div class="col-4">
                                    <div>
                                        <label for="color" class="p-1 col">Cikszám</label>
                                        <input id="color" type="number" class="form-control fw-light"  :placeholder=prod.cikkszam name="colorInput" v-model="prod.cikkszam" value=0/>
                                    </div>
                                    </div>
                                </div>
                                <div class="row justify-content-center text-center mt-2">
                                    <div class="col-2">
                                        <label for="price" class="p-1 col">Ár</label>
                                        <div class="input-group mb-3">
                                            <input id="price" type="number"  class="form-control fw-light" required :placeholder=prod.ar  v-model="prod.ar"/>
                                            <span class="input-group-text">-Ft/{{ prod.egyseg }}</span> 
                                        </div>
                                    </div>
                                    <div class="col-2">
                                        <label for="price" class="p-1 col">Akciós ár</label>
                                        <div class="input-group mb-3">
                                            <input id="akciosar" type="number"  class="form-control fw-light" required :placeholder=prod.akciosar  v-model="prod.akciosar"/>
                                            <span class="input-group-text">-Ft/{{ prod.egyseg }}</span> 
                                        </div>
                                    </div>
                                    <div class="col-4">
                                        <label for="stock" class="p-1 col">Készlet</label>
                                        <div class="input-group mb-3">
                                            <input id="stock" type="number"  class="form-control fw-light" required :placeholder=prod.keszlet v-model="prod.keszlet"/>
                                            <span class="input-group-text">{{prod.egyseg}}</span>  
                                        </div>
                                    </div>
                                </div>
                                <div class="row justify-content-center text-center">
                                    <div class="col-6">
                                        <label for="description" class="p-1 col">Leírás</label>
                                            <textarea id="description"  class="form-control fw-light" required :placeholder=prod.leirasHu v-model="prod.leirasHu" rows="8">
                                            </textarea>
                                    </div>
                                    <div class="col-4">
                                        <label for="description" class="p-1 col">Egysoros</label>
                                            <textarea id="shortdescription"  class="form-control fw-light" required :placeholder=prod.tagline v-model="prod.tagline" rows="4">
                                            </textarea>
                                    </div>
                                    <!-- <div class=" col-4 form-floating mb-3">
                                        <p class="mt-4 form-label form-label-top pt-2 mb-4">Fotó módosítás</p> 
                                        <input name="upload_file" id="upload_file" type="file" @change="onChange" class="form-control" accept="image/*"/>
                                        <p class="text-danger">{{ photoMessage }}</p>
                                    </div> -->
                                </div>
                                <div class="row justify-content-center text-center pt-2">
                                    <div class="col-6 border-end">
                                        <p class="p-1">Termékfotó</p>
                                        <div v-if ="!addAnewPhoto" >
                                            <img :src="prod.img" class="w-50 float-center img-fluid rounded mx-auto d-block"/>
                                            <button type="button" class="btn secoundaryBtnb m-1 pt-2" @click="changeMainPhoto"><font-awesome-icon :icon="['fas', 'camera']" /> Új termékfotót töltök fel</button>
                                        </div>
                                        <div v-else>
                                            <p class="p-1">Új termékfotó feltöltése</p>
                                            <p class="text-muted fs-6"><font-awesome-icon :icon="['fas', 'circle-info']"/> A legjobb teljesítmény elérése érdekében a feltöltésre kerülő fotókat automatikisan konvertáljuk .webp kiterjesztésre és egységesen 1280*710 pixel méretre állítjuk!</p>
                                            <input id="uploadInputUpdate" type="file" @change="onChange" class="form-control" accept="image/*" name="photo" reqired/>
                                            <p class="text-muted">{{ photoMessage }}</p>
                                            <button type="button" class="btn secoundaryBtna m-1 pt-2" @click="updateProductImage(prod.id, prod.img, null)"><font-awesome-icon :icon="['fas', 'cloud-arrow-up']" /> Feltöltés</button>
                                            <button type="button" class="btn secoundaryBtnb m-1 pt-2" @click="updateProductImage(prod.id, defaultImage, true)"><font-awesome-icon :icon="['fas', 'rotate-left']" /> Visszaállít</button>
                                            <button type="button" class="btn secoundaryBtnb m-1 pt-2" @click="photoMessage = '', addAnewPhoto = false">X Bezár</button>
                                        </div>
                                    </div>
                                    <div class="col-4 ">
                                        <p class="p-1">Termékgaléria</p>
                                        <div v-if ="prod.galeria.length > 0 && addAnewPhotoToProductGallery == false " class="container swipercontainer" :key="prod.id">
                                            <div class="row">
                                            <div v-for="ph in prod.galeria" class="col-4" :key="ph.id">
                                                <div style="position: relative; right: 2%; color: red; cursor: pointer; z-index: 15">
                                                    <button type="button" class="btn deleteBtn" @click="deleteImageFromGalleryProxy(ph.id, prod.id)"><font-awesome-icon :icon="['fas', 'trash']" /></button></div>
                                                <img :src="ph.kepUtvonal" :alt="ph.kepLeiras" class="card-img-top galleryphoto"/>
                                            </div>
                                            </div>
                                            <!-- <swiper :slides-per-view="1"  :navigation="true" :pagination="true" :key="reload">
                                                <swiper-slide v-for="ph in prod.galeria">
                                                    <div style="position: absolute; right: 2%; color: red; cursor: pointer; z-index: 15">
                                                        <button type="button" class="btn deleteBtn" @click="deleteImageFromGallery(ph.id, prod.id)"><font-awesome-icon :icon="['fas', 'trash']" /> Törlés</button></div>
                                                    <img :src="ph.kepUtvonal" :alt="ph.kepLeiras" class="card-img-top galleryphoto"/>
                                                </swiper-slide>

                                            </swiper> -->
                                        
                                            <button v-if ="prod.galeria.length < 5" type="button" class="btn secoundaryBtnb m-1 pt-2" @click="addAnewPhotoToProductGalleryBtn"><font-awesome-icon :icon="['fas', 'camera']" /> Új termékfotót töltök fel a galériába</button>
                                        </div>
                                        <div v-else>
                                            <p class="p-1">Új termékfotó feltöltése a galériába</p>
                                            <p class="text-muted fs-6"><font-awesome-icon :icon="['fas', 'circle-info']"/> A legjobb teljesítmény elérése érdekében a feltöltésre kerülő fotókat automatikisan konvertáljuk .webp kiterjesztésre és egységesen 1280*710 pixel méretre állítjuk!</p>

                                            <input id="uploadInputAdd" type="file" @change="onChange" class="form-control" accept="image/*" name="photo" reqired/>
                                            <p class="text-muted fs-6">{{ photoMessageProduct }}</p>
                                            <button type="button" class="btn secoundaryBtna m-1 pt-2" @click="addImageToGallery(prod.id)"><font-awesome-icon :icon="['fas', 'cloud-arrow-up']" /> Feltöltés</button>
                                            <button type="button" class="btn secoundaryBtnb m-1 pt-2" @click="photoMessageProduct = '', addAnewPhotoToProductGallery = false">X Bezár</button>
                                        </div>
                                    </div>
                                </div>
                                    <div class="justify-content-center text-center">
                                    <div class="d-inline-flex p-4 mt-2">
                                        <button type="submit" class="btn m-1 secoundaryBtna">Mentés</button>
                                        <button type="button" class="btn secoundaryBtnb m-1" @click="prod.edit= false">Mégsem</button>
                                    </div>
                                    </div>
                                </div>
                            </form>
                    </div>
                </Transition>
                    
                </div>

            </li>
        </ul>
    </div>
    <div class="row example-six text-center" :key="reload">
        <div class="col-10">
            <vue-awesome-paginate v-if="totalProducts > 9" v-model="currentPage" :total-items="totalProducts" :items-per-page="itemsPerPage" :max-pages-shown="pagesShown" @click="handlePageChange" :container-class="'pagination-container'">
                <template #prev-button id="nextBtn">
                <span>  Előző</span>
            </template>

            <template #next-button>
                <span> Következő  ></span>
            </template>
            </vue-awesome-paginate>
    </div>
</div>
<modalAccept v-model="modalStatusAccept" :message="message" @modalStatus="receiveEmit" @deleteProduct="deleteProduct" @deleteImageAccepted="deleteImageAccepted"></modalAccept>
<Modal v-model="modalStatus" :message="message" @modalStatus="receiveEmit" ></Modal>
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
    width: 250px
    margin-top: 100px
    color: #000
    font-weight: 400


.name
    font-size: 16px
    color: black
    text-align: start
    text-transform: uppercase
    font-weight: bold
    margin-left: -200px

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
    margin-left: 85px


.addNewProd
    font-size: 12px 

.tagsBtn
    float: right
    margin-right: 100px


.v-enter-active
    transition: opacity 0.8s ease
.v-leave-active 
    transition: opacity 0.2s ease
.v-enter-from,
.v-leave-to 
  opacity: 0

.swiper-button-prev
.swiper-button-next
    padding-top: 15% 
    top: 50% 

.swiper-slide
    max-width: 500px
    max-height:450px
    padding: 2px
    margin-bottom: 5px

.swipercontainer
    margin-bottom: 1px

.deleteBtn
    background-color: #414a4c
    color: white
    font-size: 70%
    &:hover
        background-color: #212529
        
.deleteBtnNewProd
    background-color: #414a4c
    align-content: center
    margin-left: 0px
    margin-right: 160px
    color: white
    font-size: 80%
    &:hover
        background-color: #212529

.deleteBtnNewProdGallery
    background-color: #414a4c
    align-content: center
    margin-left: 0px
    margin-right: 0px
    top: -15%
    color: white
    font-size: 80%
    position: relative

.example-six 
.pagination-container 
    column-gap: 5%
</style>
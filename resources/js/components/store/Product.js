import { defineStore } from 'pinia'
import axios from 'axios';
import {ref } from 'vue'
import { el, fa } from 'vuetify/locale';
import { nextTick } from 'vue';
export let reload = ref(0);
export let elementsToWish = [];
export let elementsToWishLoggedIn = [];
export let slicedProducts =[];
export const ProductStore = defineStore("Product",{
    state: () => {
      return {
        products: [],
        wishlist: [],
        cimkek: [],
        temporaryGallery: [],
        temporaryNewProductPhoto : null,
        temporarySrc: null,
        addNewProduct: false,
        disableBtnAdd: false,
        photoMessage : "",
        photoMessageNewProductGalleryPhoto : "",
        file: null,
        message : "",
        modalStatus: false,
        modalStatusAccept: false,
        lastInsertproductId: 0,
        showDown : true,
        showUp : false,
        edit_id: null,
        add: true,
        loading: false,
        emptyMessage : false,
        modalStatusProduct: false,
        prod: null,
        reload: 0,

//        uzenet: "Sikeres mentés ",
        updateSuccessful: false,
        db_data: {
            photo: {},
        },
        tags: false,
        addNewTag: false,
        loadedOnce: false,
        addAnewPhoto: false,
        uploadedPhotoUrl: "",
        defaultImage: "",
        addAnewPhotoToProductGallery: false,
        photoMessageProduct: "",
        showDelete: false,
        termekId: null,
        galleryPhotoCounter: 0,
        imgId: 0,
        newProductGallery: [],
        deleteTheProduct: false,
        hasImg1: false,
        hasImg2: false,
        hasImg3: false,
        hasImg4: false,
        hasImg5: false,
        deletedIds: [],
        name: "",
        color: "",
        egyseg: "", 
        cikkszam: "", 
        price: "",
        akciosar: "",
        stock: "",
        description: "",
        shortdescription: "",
        input: "",
        currentPage:1,
        itemsPerPage: 10,
        totalOrders: 0,
        pagesShown: 5,
        startIndex: 0,
        endIndex: 10,
        totalProducts: 0,
       
        }
    },
    getters: {
        displayedProducts(){
            const startIndex = (this.currentPage * this.itemsPerPage) - this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage; 
            slicedProducts = this.products.slice(startIndex, endIndex)
        },

    },
    actions: {

        async fetchWishlist(){
            this.loading = true;
            let wishlistProducts = [];
            try {
                    await axios.get('api/user/wishlist').then(function(response){
                        
                        wishlistProducts = response.data
                    }).catch(error => {
                        if (error.response.status === 500) {
                              location.reload();
                              console.error('Internal Server Error: Please try again later.');
                        } 
                    });
                    for(const product of wishlistProducts){
                        this.wishlist.push(product);
                        elementsToWishLoggedIn.push(product);
                    }
                    if(elementsToWishLoggedIn.length === 0){
                        this.emptyMessage = true;
                    }
                }
                 catch(error){
                    console.log(error.response.data)
                }
            this.loading = false;
        },
        async fetchWishlistNotLoggedIn(){
            let termekek = [];
            try {
                await axios.get('api/termekek').then(function(response){
                    
                    termekek = response.data
                }).catch(error => {
                    if (error.response.status === 500) {
                          location.reload();
                          console.error('Internal Server Error: Please try again later.');
                    } 
                });
                for(const termek of termekek){
                    let localWish = JSON.parse(localStorage.getItem("wish")) 
                    if(localWish.length !== 0){
                        for(const wish of localWish){                         
                            if(termek.id ===  wish.id){  
                                termek.addedToWishlist = true;
                                this.wishlist.push(termek);
                            } 
                        }
                    } else{
                        this.emptyMessage = true;
                    }
                    
                }
                
                this.loading = false;
            }catch(error){
                console.log(error)
            }
        },
        async fetchProduct(){
            if(this.loadedOnce === true){
                return
            }else {
                this.loading = true;
                let termekek = [];
                try {
                        await axios.get('api/termekek').then(function(response){
                        
                            termekek = response.data
                        }).catch(error => {
                            if (error.response.status === 500) {
                                location.reload();
                                console.error('Internal Server Error: Please try again later.');
                            } 
                        });
                        for(const termek of termekek){
                            termek.edit = false
                            let localWish = JSON.parse(localStorage.getItem("wish")) 
                            if(localWish != null){//logged in users
                                for(const wish of localWish){                         
                                    if(wish.product_id || wish.id){ 
                                        if(termek.id === wish.product_id || termek.id === wish.id){  
                                            termek.addedToWishlist = true
                                        } 
                                    }
                                }
                            } else {//logged in users
                                let wishlistProducts = [];
                                await axios.get('api/user/wishlist').then(function(response){
                                    
                                    wishlistProducts = response.data
                                }).catch(error => {
                                    if (error.response.status === 500) {
                                        location.reload();
                                        console.error('Internal Server Error: Please try again later.');
                                    } 
                                });
                                if(wishlistProducts.length === 0){
                                    this.emptyMessage = true;
                                }
                                localStorage.setItem('wish', JSON.stringify(wishlistProducts));
                                let localW = JSON.parse(localStorage.getItem("wish"));
                                    for(const wish of localW){  
                                        if(termek.id === wish.product_id){
                                            termek.addedToWishlist = true
                                            }
                                    }
                            }
                            
                            this.products.push(termek);
                            
                        }
                        this.totalProducts = this.products.length;
                        localStorage.setItem('products', JSON.stringify(this.products));
                        slicedProducts = this.products.slice(this.startIndex, this.endIndex)
                    }
                    catch(error){
                        console.log(error)
                    }

                this.loading = false;
                this.loadedOnce = true;
            }
        },
        addNewProductBtn(){
            this.addNewProduct = true
            this.disableBtnAdd = true;
            this.newProductGallery = [];
            this.temporaryGallery = [];
            for( const product of this.products){
                product.edit = false;
            }
        },
        onChange(e){
            let file;
            file = e.target.files[0];
            this.file = file;
            file = null;
            this.photoMessage = '';
            this.photoMessageProduct = '';
        },
        onChangeNewProductGalleryPhoto(e){
            let newProductGalleryPhotoFile;
            newProductGalleryPhotoFile = e.target.files[0];
            this.temporaryGallery.push(newProductGalleryPhotoFile);
            const reader = new FileReader();
            const preview = document.getElementById('previewNewProductGalleryPhoto');
            reader.addEventListener("load", function () {
                preview.src = reader.result;
            }, false);
            if (newProductGalleryPhotoFile) {
                reader.readAsDataURL(newProductGalleryPhotoFile);
                
            }
            newProductGalleryPhotoFile = null;
            this.photoMessageNewProductGalleryPhoto = 'Sikeres feltöltés a galériába!';
            this.galleryPhotoCounter += 1;
            if(this.galleryPhotoCounter > 0){
                if(this.deletedIds.length == 0){
                    this.imgId += 1;
                    const previewDIV = document.getElementById('photoGalleryNewProduct'+this.imgId);
                    const lastPhoto = this.temporaryGallery[this.temporaryGallery.length - 1];
                    const img = document.createElement('img');
                        const reader = new FileReader();
                        reader.addEventListener("load", function () {
                            img.src = reader.result;
                        }, false);
                        if (lastPhoto) {
                            reader.readAsDataURL(lastPhoto);
                        }
                        img.style.width = '80%';
                        img.style.height = 'auto';
                        img.style.margin = '1px';
                        img.style.padding = '1px';
                        img.style.border = '1px solid black';
                        img.id = this.imgId;
                        switch(this.imgId){
                            case 1:
                                this.hasImg1 = true;
                                break;
                            case 2:
                                this.hasImg2 = true;
                                break;
                            case 3:                         
                                this.hasImg3 = true;
                                break;
                            case 4: 
                                this.hasImg4 = true;
                                break;
                            case 5:
                                this.hasImg5 = true;
                                break;
                        }
                        img.className = 'img';
                        previewDIV.appendChild(img);
                    }else {
                        this.imgId = this.deletedIds[0];
                        const previewDIV = document.getElementById('photoGalleryNewProduct'+this.imgId);
                        const lastPhoto = this.temporaryGallery[this.temporaryGallery.length - 1];
                        const img = document.createElement('img');
                            const reader = new FileReader();
                            reader.addEventListener("load", function () {
                                img.src = reader.result;
                            }, false);
                            if (lastPhoto) {
                                reader.readAsDataURL(lastPhoto);
                            }
                            img.style.width = '80%';
                            img.style.height = 'auto';
                            img.style.margin = '1px';
                            img.style.padding = '1px';
                            img.style.border = '1px solid black';
                            img.id = this.imgId;
                            this[`hasImg${img.id}`] = true;
                            img.className = 'img';
                            previewDIV.appendChild(img);
                            this.deletedIds.shift();
                    }
            }
        },
        deleteImageFromTemporaryGallery(id){
            let img = document.getElementById(id);
            let index = this.temporaryGallery.findIndex(photo=>photo == img.src);
            this.temporaryGallery.splice(index, 1);
            img.remove();
            this.galleryPhotoCounter -= 1;
        },
        deleteTemporaryProductImageFromGallery(id){
            this.temporaryGallery.splice(id-1, 1);
            const previewDIV = document.getElementById('photoGalleryNewProduct'+id);
            const imageToDelete = document.getElementById(id);
            imageToDelete.remove();
            switch(id){
                case 1:
                    this.hasImg1 = false;
                    break;
                case 2:
                    this.hasImg2 = false;
                    break;
                case 3:                         
                    this.hasImg3 = false;
                    break;
                case 4: 
                    this.hasImg4 = false;
                    break;
                case 5:
                    this.hasImg5 = false;
                    break;
            }
            this.deletedIds.push(id);
            this.galleryPhotoCounter -= 1;
        },
        createProduct(nev, szin, egyseg, cikkszam, ar, akciosar, keszlet, leiras, tagline){
            this.loading = true;
            let formNewProduct = document.getElementById('addNewproductForm');
            if(cikkszam == null || cikkszam == ""){
                cikkszam = 0;
            }
            this.nev = nev,
            this.szin = szin,
            this.egyseg = egyseg,
            this.cikkszam = cikkszam,
            this.ar = ar,
            this.akciosar = akciosar,
            this.keszlet = keszlet,
            this.leiras = leiras,
            this.tagline = tagline


            const config = {
                headers: {
                    'content-type':'multipart/form-data'
                }
            }
            let formData = new FormData();

            if(this.file !== null){
                formData.append('file', this.file);
                
                let form_data = JSON.stringify({
                    nev : this.nev,
                    szin : this.szin,
                    egyseg: this.egyseg,
                    cikkszam: this.cikkszam,
                    ar : this.ar,
                    akciosar : this.akciosar,
                    keszlet: this.keszlet,
                    leiras: this.leiras,
                    tagline: this.tagline
                  });

                  formData.append('form_data', form_data)
                 
                    axios.post('api/termekadmin/create',formData, config).then((response)=>{
                    if (response.data.error === 422){
                        this.photoMessage = response.data.message;
                        document.getElementById('uploadInput').value = null;
                        this.file = null;
                        return;
                    }
                    if(response.status == 200){
                    this.lastInsertproductId = response.data.product_Id;
                        if(this.temporaryGallery.length > 0){
                            for(const photo of this.temporaryGallery){
                                this.addImageToGalleryFromNewProduct(photo, this.lastInsertproductId);
                                
                            }
                        }
                    
                    // const formDataObj = {};
                    // formData.forEach((value, key) => (formDataObj[key] = value));
                    
                    let productPush = {
                        id: this.lastInsertproductId,
                        nevHu : this.nev,
                        szin : this.szin,
                        egyseg: this.egyseg,
                        cikkszam: this.cikkszam,
                        ar : this.ar,
                        akciosar : this.akciosar,
                        keszlet: this.keszlet,
                        leirasHu: this.leiras,
                        leiras: this.leiras,
                        tagline: this.tagline,
                        img: response.data.kepUtvonal,
                        galeria: this.newProductGallery,
                        addedToWishlist: false,
                        edit: false
                    }
                    this.products.push(productPush);
                    slicedProducts = this.products.slice(this.startIndex, this.endIndex);
                    this.totalProducts = this.products.length;
                    localStorage.setItem('products', JSON.stringify(this.products));
                    this.message = "Új termék létrehozása sikeres!";
                    this.modalStatus = true;
                    }
                    
                    }).catch(console.error) 
            }else {
                this.photoMessage = "Nem választott ki fájlt a feltöltéshez!";
                }

            
            this.addNewProduct = false;
            this.name = "";
            this.color = "";
            this.egyseg = "";
            this.cikkszam= "";
            this.price= "";
            this.akciosar= "";
            this.stock= "";
            this.description= "";
            this.shortdescription = "";
            this.reload += 1;
            this.hasImg1 = false;
            this.hasImg2 = false;
            this.hasImg3 = false;
            this.hasImg4 = false;
            this.hasImg5 = false;
            formNewProduct.reset();
            document.getElementById('uploadInput').value = null;
            this.galleryPhotoCounter = 0;
            this.imgId = 0;
            this.loading = false; 
        },
        removeProduct(id){
            this.deleteTheProduct = true;
            this.edit_id = id;
            this.message = '';
            this.message = 'Biztos benne, hogy törölni szeretné a terméket?';
            this.modalStatusAccept = true;

        },
        async deleteProduct() {
            try {
                let id = this.edit_id;
                const response =  await axios.delete('api/termekadmin/'+id);
                if((response && response.status === 200) || (response && response.status === 204)){
                    // let index = this.products.findIndex(termek=>termek.id == id);
                    // this.products.splice(index, 1);
                    this.products = this.products.filter(product => product.id !== id);
                    this.products = [...this.products];
                    slicedProducts = this.products.slice(this.startIndex, this.endIndex);
                    this.reload += 1;
                    await nextTick();
                    
                    this.modalStatusAccept = false;
                    this.modalStatus = true;
                    this.message = "A terméket töröltük!";
                    this.totalProducts = this.products.length;
                    localStorage.setItem('products', JSON.stringify(this.products));
                    this.deleteTheProduct = false;
                    
                } else {
                    console.error("Váratlan HTTP válasz:", response.status);
                }
                }catch(error){
                    console.error("Hiba történt a törlés során:", error);
                }

        },

        receiveEmit(){
            this.modalStatus = false;
            this.modalStatusAccept = false;
            this.modalStatusProduct = false;
            
        },
        orderByProductsAz(){
            function compareByName(a, b) {
                return a.nevHu.localeCompare(b.nevHu);
              }
            this.products.sort(compareByName)
            this.showDown = false,
            this.showUp = true
        },
        orderByProductsZa(){

            function compareByName(a, b) {
                return b.nevHu.localeCompare(a.nevHu);
              }
            this.products.sort(compareByName)

            this.showDown = true,
            this.showUp = false
        },

        updateProduct(id, nevHu, szin, egyseg, cikkszam, ar, akciosar, keszlet, leirasHu, tagline){
            this.edit_id = id
            let product = this.products.find(product=>product.id == id)
            if(product != null){ 
                this.id = id,
                this.nevHu = nevHu,
                this.szin = szin,
                this.egyseg = egyseg,
                this.cikkszam = cikkszam,
                this.ar = ar,
                this.akciosar = akciosar,
                this.keszlet = keszlet,
                this.leirasHu = leirasHu,
                this.tagline = tagline
            }
            let form_data_update = {
                id: this.id,
                nevHu : this.nevHu,
                szin : this.szin,
                egyseg: this.egyseg,
                cikkszam: this.cikkszam,
                ar : this.ar,
                akciosar: this.akciosar,
                keszlet: this.keszlet,
                leirasHu: this.leirasHu,
                tagline: this.tagline
            }
            //form_data_update.push(element)
            axios.put('api/termekadmin/'+id, form_data_update).then((response)=>{
                if(response.status == 200){
                this.message = "A termék módosítása sikeres!";
                this.modalStatus = true;
                this.products.forEach(function(element) {
                if(element.id === id){
                    element.edit = false
                        }
                    })    
                }
                }).catch(console.error) 
            
        },
        updateProductImage(id, defaultImage, reset){
            
            this.defaultImage = defaultImage;
            this.edit_id = id;
            if(reset === true){
                let form_data = {
                    id : id,
                    img: defaultImage
                  };
                    axios.post('api/termekadmin/updateimage',form_data).then((response)=>{
                    if(response.status == 200){
                    this.uploadedPhotoUrl = response.data.kepUtvonal
                    this.photoMessage = "A termékképet visszaállítottuk!";
                    this.file = null;
                    this.products.forEach(element => {
                    if(element.id == id){
                        element.img = this.defaultImage
                            }
                        })  
                    document.getElementById('uploadInputUpdate').value = null;  
                    }
                    }).catch(console.error)

            } else {
            const config = {
                headers: {
                    'content-type':'multipart/form-data'
                }
            }
            let formData = new FormData();

            if(this.file !== null){
                formData.append('file', this.file);
            }else {
                this.photoMessage = "Nem választott ki fájlt a feltöltéshez!";
                return
            }
            let form_data = JSON.stringify({
                id : this.edit_id
              });

              formData.append('form_data', form_data)
              
              axios.post('api/termekadmin/updateimage',formData, config).then((response)=>{
                if (response.data.error === 422){
                    this.photoMessage = response.data.message;
                    document.getElementById('uploadInputUpdate').value = null;
                    this.file = null;
                    return;
                }
                if(response.status == 200){
                this.uploadedPhotoUrl = response.data.kepUtvonal
                this.photoMessage = "A feltöltés és a termékkép módosítása sikeres!";
                this.products.forEach(element => {
                if(element.id == id){
                    element.img = this.uploadedPhotoUrl
                        }
                    })    
                } 
                
                }).catch(console.error);
            }
        },
        addImageToGallery(id){
            this.edit_id = id;
            const config = {
                headers: {
                    'content-type':'multipart/form-data'
                }
            }
            let formData = new FormData();

            if(this.file !== null){
                formData.append('file', this.file);
            }else {
                this.photoMessageProduct = "Nem választott ki fájlt a feltöltéshez!";
                return
            }
            let form_data = JSON.stringify({
                id : this.edit_id
              });

              formData.append('form_data', form_data)
              
              axios.post('api/termekadmin/addImageToGallery',formData, config).then((response)=>{
                if (response.data.error === 422){
                    this.photoMessageProduct = response.data.message;
                    document.getElementById('uploadInputAdd').value = null;
                    this.file = null;
                    return;
                }
                if(response.status == 200){
                this.photoMessageProduct = "A fotó feltöltése a galériába sikeres!";
                this.uploadedPhotoUrl = response.data.kepUtvonal;
                let imagePush = {
                    id: response.data.id,
                    kepLeiras: response.data.kepLeiras,
                    kepNev: response.data.kepNev,
                    kepUtvonal: response.data.kepUtvonal,
                    termekid: response.data.termekid,
                    
                }
               //this.products.push(productPush);
                this.products.forEach(element => {
                if(element.id == id){
                    element.galeria.push(imagePush)
                        }
                    })  
                this.reload += 1;  
                } 
                
                }).catch(console.error);
            
        },
        addImageToGalleryFromNewProduct(imgage, productId){
            const config = {
                headers: {
                    'content-type':'multipart/form-data'
                }
            }
            let formData = new FormData();

            if(imgage !== null){
                formData.append('file', imgage);
            }else {
                this.photoMessageProduct = "Nem választott ki fájlt a feltöltéshez!";
                return
            }
            let form_data = JSON.stringify({
                id : productId
              });

              formData.append('form_data', form_data)
              
              axios.post('api/termekadmin/addImageToGalleryFromNewProduct',formData, config).then((response)=>{
                if (response.data.error === 422){
                    this.photoMessageProduct = response.data.message;
                    document.getElementById('uploadInputAdd').value = null;
                    this.file = null;
                    return;
                }
                if(response.status == 200){
                    let imagePush = {
                        id: response.data.id,
                        kepLeiras: response.data.kepLeiras,
                        kepNev: response.data.kepNev,
                        kepUtvonal: response.data.kepUtvonal,
                        termekid: response.data.termekid,
                        
                    }
                    this.newProductGallery.push(imagePush);
                 } 
                
                }).catch(console.error);
            
        },
        removeFromWishList(id){
            this.edit_id = id;
            this.message = 'Biztos benne, hogy törölni szeretné a kívánságlistáról a terméket?';
            this.modalStatusAccept = true;
        },
        deleteWish(){
                let id = this.edit_id;
                axios.delete('api/user/wishlist/'+id).then((response)=>{
                if(response.status == 200){
                let index = this.wishlist.findIndex(termek=>termek.id == id);
                this.wishlist.splice(index, 1)
                for(const termek of this.products){
                    if(termek.id === this.edit_id){  
                        termek.addedToWishlist = false
                        }
                    }
                let localWish = JSON.parse(localStorage.getItem("wish"))
                let ind = localWish.findIndex(wish=>wish.id == this.edit_id);
                localWish.splice(ind, 1);
                localStorage.setItem('wish', JSON.stringify(localWish));
                }
                if(response.data.message == 'user not logged in'){
                    let localWish = JSON.parse(localStorage.getItem("wish")) 
                    for(const termek of this.products){
                        if(termek.id === this.edit_id){  
                            termek.addedToWishlist = false
                            let ind = localWish.findIndex(wish=>wish.id == this.edit_id);
                            localWish.splice(ind, 1);
                        }
                        
                    }
                    localStorage.setItem('wish', JSON.stringify(localWish));
                    
                }

                    this.modalStatusAccept = false,
                    this.modalStatus = true;
                    this.message = "A terméket töröltük a kívánságlistájáról!";
            }).catch(console.error)
        },
        receiveEmit(){
            this.modalStatus = false;
            this.modalStatusAccept = false;
            
        },
        addToWishlist(id){
            let newElement = {};
            this.products.forEach(function(element) {
                if(element.id === id){
                    element.addedToWishlist = true
                    elementsToWish.push(element);
                    newElement = element;
                        }
                    })
            let form_data= {
                id: id
            }
            axios.post('api/user/wishlist',form_data).then((response)=>{
                let localWish = JSON.parse(localStorage.getItem("wish")) 
                if(response.data.message == 'user not logged in' && localWish != null){
                    localWish.push(newElement)
                    localStorage.setItem("wish", JSON.stringify(localWish));
                }
                else if (response.data.message == 'user not logged in' && localWish == null){
                    let localWishlist = localStorage.setItem("wish", JSON.stringify(elementsToWish));
                }
                else if(response.status == 200){
                    newElement.product_id = id
                    localWish.push(newElement)
                    localStorage.setItem("wish", JSON.stringify(localWish));
                }
                }).catch(console.error)
        },
        detailsModal(prod){
            this.modalStatusProduct = true;
            this.prod = prod;
        },
        changeMainPhoto(){
            this.addAnewPhoto = true;
        },
        addAnewPhotoToProductGalleryBtn(){
            this.addAnewPhotoToProductGallery = true;
        },
        deleteImageFromGallery(ph_id, prod_id){
            if(!this.deleteTheProduct){
                this.edit_id = ph_id;
                this.termekId = prod_id;
                this.message = 'Biztos benne, hogy törölni szeretné a fotót a gelériából?';
                this.modalStatusAccept = true;
                
            }
        },
        deleteImageAccepted(){
            axios.delete('api/termekadmin/removeImageFromGallery/'+this.edit_id).then((response)=>{
                if(response.status == 200){

                // let index = this.wishlist.findIndex(termek=>termek.id == id);
                // this.wishlist.splice(index, 1)
                for(const termek of this.products){
                    if(termek.id === this.termekId){  
                        for(const foto of termek.galeria){
                            if(foto.id === this.edit_id){
                                // const index = termek.galeria.indexOf(foto);
                                // if (index > -1) { 
                                //     termek.galeria.splice(index, 1); // 2nd parameter means remove one item only
                                //   }
                                termek.galeria = termek.galeria.filter(photo => photo.id !== this.edit_id);
                                termek.galeria = [...termek.galeria];
                            }
                        }
                        }
                    }
                this.message = 'A fotó törlése a galériából sikeres';
                this.modalStatus = true;
                }
            });
        },
        changeStateBt(){
            this.showDelete = !this.showDelete
        },
         inputChanged(){
            slicedProducts = this.products.filter((product) =>
            product.nevHu.toLowerCase().includes(this.input.toLowerCase())
            ).slice(this.startIndex, this.endIndex);
        },
        handlePageChange(){
            const startIndex = (this.currentPage * this.itemsPerPage) - this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage; 
            let localOrders = JSON.parse(localStorage.getItem('products')) 
                if(localOrders.length > 0){
                    slicedProducts = localOrders.slice(startIndex, endIndex)
                } else{
                    slicedProducts = this.products.slice(startIndex, endIndex)
                }
            
        },
        
        
       

        
        
    //     update(){

    //     } ,

    //     editItem(id){

    //     },

    //     deleteItem(){

    //     }
     }

})
import { defineStore } from 'pinia'
import axios from 'axios';
import {ref } from 'vue'
export let reload = ref(0);
export let elementsToWish = [];
export let elementsToWishLoggedIn = [];
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
       
        }
    },
    getters: {

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
                                let localW = JSON.parse(localStorage.getItem("wish"))
                                    for(const wish of localW){  
                                        if(termek.id === wish.product_id){
                                            termek.addedToWishlist = true
                                            }
                                    }
                            }
                                
                            this.products.push(termek);
                        }
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
                this.imgId += 1;
                const previewDIV = document.getElementById('photoGalleryNewProduct');
                const lastPhoto = this.temporaryGallery[this.temporaryGallery.length - 1];
                const img = document.createElement('img');
                    const reader = new FileReader();
                    reader.addEventListener("load", function () {
                        img.src = reader.result;
                    }, false);
                    if (lastPhoto) {
                        reader.readAsDataURL(lastPhoto);
                    }
                    img.style.width = '40%';
                    img.style.height = 'auto';
                    img.style.margin = '1px';
                    img.style.padding = '1px';
                    img.style.border = '1px solid black';
                    img.id = this.imgId;
                    img.className = 'img';
                    img.addEventListener('mouseover', () => {
                        const button = document.createElement('p');
                        button.textContent = 'Törlés';
                        // button.style.position = 'absolute';
                        // button.style.top = '0';
                        // button.style.right = '0';
                        // button.style.zIndex = '15';
                        // button.style.backgroundColor = '#414a4c';
                        // button.style.color = 'white';
                        // button.style.fontSize = '70%';
                        // button.style.padding = '1px';
                        img.appendChild(button);
                      });
                    // img.onclick = function() {
                    //     previewDIV.removeChild(previewDIV.children[img.id-1]);
                    //     document.getElementById('uploadInputAdd').value = null;
                    // };
                    previewDIV.appendChild(img);
            }
        },
        deleteImageFromTemporaryGallery(id){
            let img = document.getElementById(id);
            let index = this.temporaryGallery.findIndex(photo=>photo == img.src);
            this.temporaryGallery.splice(index, 1);
            img.remove();
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
                    this.message = "Új termék létrehozása sikeres!";
                    this.modalStatus = true;
                    const formDataObj = {};
                    formData.forEach((value, key) => (formDataObj[key] = value));
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
                   this.newProductGallery = [];
                   this.temporaryGallery = [];
                   formNewProduct.reset();
                   this.disableBtnAdd = false
                   this.addNewProduct = false
                    }
                    }).catch(console.error) 
            }else {
                this.photoMessage = "Nem választott ki fájlt a feltöltéshez!";
                }
            this.loading = false;
        },
        removeProduct(id){
            this.deleteTheProduct = true;
            this.edit_id = id;
            this.message = '';
            this.message = 'Biztos benne, hogy törölni szeretné a terméket?';
            this.modalStatusAccept = true;

        },
        deleteProduct(){
                let id = this.edit_id;
                axios.delete('api/termekadmin/'+id).then((response)=>{
                if(response.status == 200){
                let index = this.products.findIndex(termek=>termek.id == id);
                this.products.splice(index, 1);
                this.reload += 1;
                this.modalStatus = true;
                this.message = "A terméket töröltük!";
                }
                }).catch(console.error)

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
        deleteImageFromGallery(fotoid, termekid){
            if(!this.deleteTheProduct){
                this.edit_id = fotoid;
                this.termekId = termekid;
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
                                const index = termek.galeria.indexOf(foto);
                                if (index > -1) { 
                                    termek.galeria.splice(index, 1); // 2nd parameter means remove one item only
                                  }
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
        }
        
        
       

        
        
    //     update(){

    //     } ,

    //     editItem(id){

    //     },

    //     deleteItem(){

    //     }
     }

})
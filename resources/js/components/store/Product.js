import { defineStore } from 'pinia'
import axios from 'axios';
import {ref } from 'vue'

export let reload = ref(0);
export let elementsToWish = [];
export let elementsToWishLoggedIn = [];
export const ProductStore = defineStore("Product",{
    state: () => {
      return {
        products: [

        ],
        wishlist: [

        ],
        cimkek: [

        ],
        addNewProduct: false,
        disableBtnAdd: false,
        photoMessage : "",
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

//        uzenet: "Sikeres mentés ",
        updateSuccessful: false,
        db_data: {
            photo: {},
        },
        tags: false,
        addNewTag: false
       
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
                });
                for(const termek of termekek){
                    let localWish = JSON.parse(localStorage.getItem("wish")) 
                    if(localWish.length > 0){
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
            this.loading = true;
            let termekek = [];
            try {
                    await axios.get('api/termekek').then(function(response){
                        termekek = response.data
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
        },
        addNewProductBtn(){
            this.addNewProduct = true
            this.disableBtnAdd = true;
            
        },
        onChange(e){
            let file;
            file = e.target.files[0];
            this.file = file;

        },
        createProduct(nev, szin, ar, keszlet, leiras){
            let formNewProduct = document.getElementById('addNewproductForm');

            this.nev = nev,
            this.szin = szin,
            this.ar = ar,
            this.keszlet = keszlet
            this.leiras = leiras

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
                    ar : this.ar,
                    keszlet: this.keszlet,
                    leiras: this.leiras,
                  });

                  formData.append('form_data', form_data)
                 
                    axios.post('api/termekadmin/create',formData, config).then((response)=>{
                    if(response.status == 200){
                    this.lastInsertproductId = response.data.product_Id;
                    this.message = "Új termék létrehozása sikeres!";
                    this.modalStatus = true;
                    const formDataObj = {};
                    formData.forEach((value, key) => (formDataObj[key] = value));
                    let productPush = {
                        id: this.lastInsertproductId,
                        nevHu : this.nev,
                        szin : this.szin,
                        ar : this.ar,
                        keszlet: this.keszlet,
                        leiras: this.leiras,
                        img: "../public/img/uploads/"+formDataObj.file.name
                    }
                   this.products.push(productPush);
                   formNewProduct.reset();
                   this.disableBtnAdd = false
                   this.addNewProduct = false
                    }
                    }).catch(console.error) 
            }else {
                this.photoMessage = "Nem választott ki fájlt a feltöltéshez!";
                }

        },
        removeProduct(id){
            this.edit_id = id;
            this.message = 'Biztos benne, hogy törölni szeretné a terméket?';
            this.modalStatusAccept = true;

        },
        deleteProduct(){
                let id = this.edit_id;
                axios.delete('api/termekadmin/'+id).then((response)=>{
                if(response.status == 200){
                let index = this.products.findIndex(termek=>termek.id == id);
                this.products.splice(index, 1)
                this.modalStatus = true;
                this.message = "A terméket töröltük!";
                }
                }).catch(console.error)

        },

        receiveEmit(){
            this.modalStatus = false
            
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

        updateProduct(id, nevHu, szin, ar, keszlet, leirasHu){
            this.edit_id = id
            let product = this.products.find(product=>product.id == id)
            if(product != null){ 
                this.id = id,
                this.nevHu = nevHu,
                this.szin = szin,
                this.ar = ar,
                this.keszlet = keszlet,
                this.leirasHu = leirasHu
            }
            let form_data_update = {
                id: this.id,
                nevHu : this.nevHu,
                szin : this.szin,
                ar : this.ar,
                keszlet: this.keszlet,
                leirasHu: this.leirasHu
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

        
        
    //     update(){

    //     } ,

    //     editItem(id){

    //     },

    //     deleteItem(){

    //     }
     }

})
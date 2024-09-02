import { defineStore } from 'pinia'
import axios from 'axios';
import {ref } from 'vue'

export let reload = ref(0);

export const ProductStore = defineStore("Product",{
    state: () => {
      return {
        products: [

        ],
        addNewProduct: false,
        disableBtnAdd: false,
        photoMessage : "",
        file: null,
        message : "",
        modalStatus: false,
        lastInsertproductId: 0,
        showDown : true,
        showUp : false,
        edit_id: null,

//        uzenet: "Sikeres mentés ",
        updateSuccessful: false,
        db_data: {
            photo: {},
        }
       
        }
    },
    getters: {

    },
    actions: {

        async fetchProduct(){
            let termekek = [];
            try {
                    await axios.get('api/termekek').then(function(response){
                        termekek = response.data
                    });
                    for(const termek of termekek){
                        termek.edit = false
                        this.products.push(termek);
                    }
                }
                 catch(error){
                    console.log(error.response.data)
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

        }, deleteProduct(id){
            let answer = confirm("Biztos benne, hogy törölni szeretné a terméket?"); 
            if(answer != false){
                axios.delete('api/termekadmin/'+id).then((response)=>{
                if(response.status == 200){
                let index = this.products.findIndex(termek=>termek.id == id);
                this.products.splice(index, 1)
                this.modalStatus = true;
                this.message = "A terméket töröltük!";
                }
                }).catch(console.error)
            }
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
            
            

            // if(this.file !== null){
               
            //     const conf = {
            //         headers: {
            //             'Content-type':'multipart/form-data',
            //             'enctype':"multipart/form-data"
            //         }
            //     };
            //     let formData_update = new FormData();
            //     formData_update.append('upload_file',  document.getElementById('upload_file').files[0]);
            //     formData_update.append('form_data_update', JSON.stringify(form_data_update));
            //     for (let [key, value] of formData_update) {
            //         console.log(`${key}: ${value}`)
            //       }
            //     axios.put('api/termekadmin/'+id, formData_update, conf).then((response)=>{
            //         if(response.status == 200){
            //         this.message = "A termék módosítása sikeres!";
            //         this.modalStatus = true;
            //         }
            //         }).catch(console.error)

            // } else {
                    
            //     }

            

            

                  //     const formDataObj = {};
                //     formData.forEach((value, key) => (formDataObj[key] = value));
                //     let productPush = {
                //         id: this.lastInsertproductId,
                //         nevHu : this.nev,
                //         szin : this.szin,
                //         ar : this.ar,
                //         keszlet: this.keszlet,
                //         leiras: this.leiras,
                //         img: "../public/img/uploads/"+formDataObj.file.name
                //     }
                //    this.products.push(productPush);
                //    formNewProduct.reset();
                //    this.disableBtnAdd = false
                //    this.addNewProduct = false
        }

    //     update(){

    //     } ,

    //     editItem(id){

    //     },

    //     deleteItem(){

    //     }
     }

})
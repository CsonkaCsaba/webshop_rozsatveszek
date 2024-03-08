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

            if(this.file != ""){
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
                    }).catch(console.error) 
            }else {
                this.photoMessage = "Nem választott ki fájlt a feltöltéshez!";
                }

        }, deleteProduct(id){
            let answer = confirm("Biztos benne, hogy törölni szeretné a terméket?"); 
            console.log(id)
            if(answer != false){
                console.log(id)
                axios.delete('api/termekadmin/'+id).then(res=>{
                let index = this.products.findIndex(termek=>termek.id == id);
                this.products.splice(index, 1)
                this.modalStatus = true;
                this.message = "A terméket töröltük!";
                }).catch(console.error)
            }
        },

        receiveEmit(){
            this.modalStatus = false
            
        },
        // orderByProducts(){
        //     function compareByName(a, b) {
        //         return a.name.localeCompare(b.name);
        //       }
        //     this.products.sort(compareByName)
        // }

    //     update(){

    //     } ,

    //     editItem(id){

    //     },

    //     deleteItem(){

    //     }
     }

})
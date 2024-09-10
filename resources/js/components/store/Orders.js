import { defineStore } from 'pinia'
import axios from 'axios';
import {ref } from 'vue'

export let reload = ref(0);

export const OrdersStore = defineStore("OrdersStore",{
    state: () => {
      return {
        orders: [

        ],
        addNewProduct: false,
        disableBtnAdd: false,
        message : "",
        modalStatus: false,
        modalStatusAccept: false,
        save: false,
        lastInsertproductId: 0,
        showDown : false,
        edit_id: null,
        selectedValue: "",
        optionsStatus:[ {"id": 1, "option":"Feldolgozás alatt"},
                        {"id": 2, "option":"Kiszállítás alatt"}, 
                        {"id": 3, "option":"Teljesítve"},
                        {"id": 4, "option":"Visszamondott"},
                        {"id": 5, "option":"Sikertelen kézbesítés"}],
        optionsFinal:[],
        updateSuccessful: false,
        accepted: false,
        }
    },
    getters: {

    },
    actions: {

        async fetchOrders(){
            let rendelesek = [];
            try {
                    await axios.get('api/rendelesek').then(function(response){
                        rendelesek = response.data
                    });
                    for(const rendeles of rendelesek){
                        const spl = rendeles.rogzitDatum.split('T');
                        const rendelesDate = spl[0];
                        rendeles.rogzitDatum = rendelesDate;
                        rendeles.optionsFinal = this.optionsStatus.filter(option => option.option !== rendeles.allapot);
                        for(const product of rendeles.termek) {
                            const db = product.pivot.mennyiseg;
                            const price = product.ar
                            product.subTotal = db * price
                        }
                        this.orders.push(rendeles);
                    }
                    // for(const order fthis.orders)
                }
                 catch(error){
                    console.log(error.message)
                }
        },
        addNewProductBtn(){
            this.addNewProduct = true
            this.disableBtnAdd = true;
            
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

        }, deleteOrd(id){
            let order = this.orders.find(order=>order.id == id)
            if(order != null){ 
                this.edit_id = id;
                this.message = 'Biztosan törlöd a rendelést?';
                this.modalStatusAccept = true;
            } else{
                this.message = 'A kiválasztott rendelés nem található a rendszerben!';
                this.modalStatusAccept = true;
            }
        },deleteOrder(){
            axios.delete('api/rendelesek/'+this.edit_id).then((response)=>{
            if(response.status == 200){
                let index = this.orders.findIndex(order=>order.id == this.edit_id);
                this.orders.splice(index, 1)
                this.modalStatusAccept = false,
                this.modalStatus = true;
                this.message = "A rendelést töröltük!";
            }
            }).catch(console.error)
        },

        receiveEmit(){
            this.modalStatus = false;
            this.modalStatusAccept = false;
            
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

        updateOrder(id){
            let order = this.orders.find(order=>order.id == id)
            if(order != null){ 
                this.message = 'A módosítással email értesítést küldünk ki az ügyfélnek. Biztosan mented a módosítást?';
                this.modalStatusAccept = true;
            } else{
                this.message = 'A kiválasztott rendelés nem található a rendszerben!';
                this.modalStatusAccept = true;
            }
        },

        selectedStatus(){
            console.log(this.selectedStatus);
        },
        onChange(id, event) {
            let order = this.orders.find(order=>order.id == id)
            if(order!= null){
                order.allapot = event.target.value
                order.optionsFinal = this.optionsStatus.filter(option => option.option !== event.target.value);
                }
            this.edit_id = id;
        },
        saveUpdate(){
            this.modalStatus = false;
            this.modalStatusAccept = false;
            this.save = true;
            let order = this.orders.find(order=>order.id == this.edit_id)
            if(order!= null){
            let form_data_update = {
                id: this.edit_id,
                allapot: order.allapot
            }
                axios.put('api/rendelesek/'+this.edit_id, form_data_update).then((response)=>{
                if(response.status == 200){
                    this.message = "A rendelés állapotának módosítása sikeres!";
                    this.modalStatus = true;   
                }
                }).catch(console.error) 
            }
           

        }


     }

})
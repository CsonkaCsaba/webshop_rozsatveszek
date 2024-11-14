import { defineStore } from 'pinia'
import axios from 'axios';
import {ref } from 'vue'

export let reload = ref(0);
export let slicedOrders =[]

export const OrdersStore = defineStore("OrdersStore",{
    state: () => {
      return {
        orders: [

        ],
        addresses:[

        ],
        addNewProduct: false,
        disableBtnAdd: false,
        message : "",
        modalStatus: false,
        modalStatusAccept: false,
        save: false,
        lastInsertproductId: 0,
        showDown : true,
        showUp: false,
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
        currentPage:1,
        itemsPerPage: 10,
        totalOrders: 0,
        pagesShown: 1,
        startIndex: 0,
        endIndex: 10,
        loading: false,
        input: ""
        }
    },
    getters: {
        displayedOrders(){
            const startIndex = (this.currentPage * this.itemsPerPage) - this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage; 
            slicedOrders = this.orders.slice(startIndex, endIndex)
        },
        async fetchAddresses(){
            let cimek = [];
            await axios.get('api/rendelesekCim').then(function(response){
                    cimek = response.data
            });
            this.addresses.push(cimek);
        }
    },
    actions: {

        async fetchOrders(){
            this.loading = true;
            let rendelesek = [];
            let cimes = [];
            let cims = [];
            try {
                    await axios.get('api/rendelesek').then(function(response){
                        rendelesek = response.data
                    });
                    for(const rendeles of rendelesek){
                        const spl = rendeles.rogzitDatum.split('T');
                        const rendelesDate = spl[0];
                        rendeles.rogzitDatum = rendelesDate;
                        rendeles.optionsFinal = this.optionsStatus.filter(option => option.option !== rendeles.allapot);
                        rendeles.OriginalStatus = rendeles.allapot;
                        for(const product of rendeles.termek) {
                            const db = product.pivot.mennyiseg;
                            const price = product.ar
                            product.subTotal = db * price
                        }
                        this.orders.push(rendeles);
                    }
                        localStorage.setItem('orders', JSON.stringify(rendelesek));
                        this.totalOrders = rendelesek.length;
                        this.pagesShown = Math.ceil(this.totalOrders/ this.itemsPerPage);
                        slicedOrders = this.orders.slice(this.startIndex, this.endIndex)

                  this.loading = false;
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
                this.message = 'Biztosan véglegesen törlöd a rendelést?';
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
        orderOrdersByIdASC(){
            slicedOrders.sort( function( a, b ){
                  return parseInt( a.id ) > parseInt( b.id ) ? 1 : -1;
            });
            this.showDown = false,
            this.showUp = true
        },
        orderOrdersByIdDESC(){
            slicedOrders.sort( function( a, b ){
                  return parseInt( a.id ) < parseInt( b.id ) ? 1 : -1;
            });
            this.showDown = true,
            this.showUp = false
        },

        updateOrder(id){
            let order = this.orders.find(order=>order.id == id)
            if(order != null && order.allapot != order.OriginalStatus){ 
                this.message = 'A módosítással email értesítést küldünk ki az ügyfélnek. Biztosan mented a módosítást?';
                this.modalStatusAccept = true;
            } else{
                this.message = 'Nem történt módosítás az eredeti állapothoz képest!';
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
            this.loading = true;
            this.modalStatus = false;
            this.modalStatusAccept = false;
            this.save = true;
            let order = this.orders.find(order=>order.id == this.edit_id)
            if(order!= null){
                order.OriginalStatus = order.allapot;
            let form_data_update = {
                id: this.edit_id,
                allapot: order.allapot,
                email: order.vasarlo.email,
                nev: order.vasarlo.nev

            }
                axios.put('api/rendelesek/'+this.edit_id, form_data_update).then((response)=>{
                if(response.status == 200){
                    this.message = "A rendelés állapotának módosítása sikeres!";
                    this.modalStatus = true;   
                }
                }).catch(console.error)

                if(form_data_update.allapot == "Visszamondott" || form_data_update.allapot =="Sikertelen kézbesítés"){
                    let order = this.orders.find(order=>order.id == this.edit_id);
                    for(const termek of order.termek){
                        let id = termek.id;
                        let mennyiseg = termek.pivot.mennyiseg;
                        let form_data_update = {
                            mennyiseg : mennyiseg
                        }
                        axios.put('api/termekadminmennyiseg/'+id, form_data_update).then((response)=>{

                        }).catch(console.error)
                    }
                }

            }
           
            this.loading = false;
        },
        handlePageChange(){
            const startIndex = (this.currentPage * this.itemsPerPage) - this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage; 
            let localOrders = JSON.parse(localStorage.getItem('orders')) 
                if(localOrders.length > 0){
                    console.log(localOrders)
                    slicedOrders = localOrders.slice(startIndex, endIndex)
                } else{
                    slicedOrders = this.orders.slice(startIndex, endIndex)
                }
            
        },
        inputChanged(){
                slicedOrders = this.orders.filter((order) =>
                order.vasarlo.nev.toLowerCase().includes(this.input.toLowerCase())
            ).slice(this.startIndex, this.endIndex);
        }


     }

})
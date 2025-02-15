import { defineStore } from 'pinia'
import axios from 'axios';
import { ProductStore } from './Product';
import { BannerPopupStore } from './BannerPopupStore';

export const TagsStore = defineStore("TagsStore",{
    state: () => {
      return {
        selectedProduct: [],
        prewievProducts : [],
        cimkek: [],
        cim: "", 
        szoveg: "",
        hatterszin: "",
        betuszin: "",
        betutipus: "",
        betustilus: "",
        betumeret: "",
        akciosarFt: 0,
        akciosarSzazalek: 0,
        message: "",
        modalStatus: false,
        modalStatusAccept: false,
        responseOk: [],
        allOk: true,
        }
        
    },
    getters: {

    },
    actions: {
        createTag(){
          let formNewTag = document.getElementById("addNewTag");
          if(this.hatterszin == ""){
            this.hatterszin = "#60A448"
          }
          if(this.betuszin == ""){
            this.betuszin = "#white"
          }
          if(this.betutipus == ""){
            this.betutipus = "'Nunito, sans-serif'"
          }
          if(this.betumeret == ""){
            this.betumeret = "14"
          }
          if(this.betustilus == ""){
            this.betustilus = "normal"
          }
          
          for(const create of this.prewievProducts){
            let form_data = {
              cim : this.cim,
              szoveg : this.szoveg,
              hatterszin : this.hatterszin,
              betuszin: this.betuszin,
              betutipus: this.betutipus,
              betustilus: this.betustilus,
              betumeret: this.betumeret,
              akciosarFt: this.akciosarFt,
              akciosarSzazalek: this.akciosarSzazalek,
              termekId: create[0].id
            };
            axios.post('api/cimke/create',form_data).then((response)=>{
              if(response.status == 200){
                this.responseOk.push(true);
              // let cimkePush = {
              //   id: this.lastInsertproductId,
              //   szoveg : this.szoveg,
              //   hatterszin : this.hatterszin,
              //   betuszin: this.betuszin,
              //   betutipus: this.betutipus,
              //   betustilus: this.betustilus,
              //   betumeret: this.betumeret,
              //   akciosarFt: this.akciosarFt,
              //   akciosarSzazalek: this.akciosarSzazalek
              //   }
                }
              }).catch(console.error)
            }
            for(const resp of this.responseOk){
              if(resp !== true){
                this.allOk = false;
              }
            }
            if(this.allOk){
            this.message = "Új címke létrehozása sikeres!";
            this.modalStatus = true;
            }
            //this.cimkek.push(cimkePush);
            formNewTag.reset();
        },
        pushToSelectedProducts(){
          if(this.prewievProducts.length != 0){
            this.prewievProducts = [];
            }
          for(const pro of this.selectedProduct){
            this.prewievProducts.push(ProductStore().products.filter(option => option.nevHu == pro))
          }
        },
        reducePrice(){
          for(const prod of this.prewievProducts){
            let szazalek = this.akciosarSzazalek * 0.01
            prod[0].akciosarFt = prod[0].ar - (prod[0].ar * szazalek)
            this.akciosarFt = prod[0].akciosarFt
          }
          if(this.akciosarSzazalek == ""){
            this.akciosarFt = ""
          }
        },
        receiveEmit(){
          this.modalStatus = false
        }

       
     }

})
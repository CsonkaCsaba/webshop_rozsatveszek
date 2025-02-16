import { defineStore } from 'pinia'
import axios from 'axios';
import { ProductStore } from './Product';
import { BannerPopupStore } from './BannerPopupStore';

export const TagsStore = defineStore("TagsStore",{
    state: () => {
      return {
        selectedProduct: [],
        prewievProducts : [{}],
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
        lastInsertproductId: "",
        allSelected: false,
        showDown: false

        }
        
    },
    getters: {

    },
    actions: {
        async fetchCimkek(){
            this.loading = true;
            let cimke = [];
            try {
                await axios.get('api/cimkek').then(function(response){
                    cimke = response.data
                    console.log(cimke)
                });    
                    this.cimkek.push(cimke);
                }
                 catch(error){
                    console.log(error)
                }
        this.loading = false;
        },
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
          if(this.allSelected){
            for(const all of ProductStore().products){
              this.setDatatoDatabase(all)
            }
          } else {
              for(const create of this.prewievProducts){
                  this.setDatatoDatabase(create)
                  }
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
            let findProducts = ProductStore().products.find(option => option.nevHu == pro);
            console.log(findProducts)
            this.prewievProducts.push(findProducts);
          }
        },
        reducePrice(){
          for(const prod of this.prewievProducts){
            let szazalek = this.akciosarSzazalek * 0.01
            prod.akciosarFt = prod.ar - (prod.ar * szazalek)
            this.akciosarFt = prod.akciosarFt
          }
          if(this.akciosarSzazalek == ""){
            this.akciosarFt = ""
          }
        },
        receiveEmit(){
          this.modalStatus = false
        },
        setDatatoDatabase(product){
          let form_data = {
            cim : this.cim,
            szoveg : this.szoveg,
            hatterszin : this.hatterszin,
            betuszin: this.betuszin,
            betutipus: this.betutipus,
            betustilus: this.betustilus,
            betumeret: this.betumeret,
            akciosarFt: this.akciosarFt,
            akciosarSzazalek: this.akciosarSzazalek
          };
          axios.post('api/cimke/create',form_data).then((response)=>{
            if(response.status == 200){
              this.responseOk.push(true);

              this.lastInsertproductId = response.data.last_id;
              let form_data_update = {
                cimkeId: this.lastInsertproductId
              }

            //form_data_update.push(element)
                axios.put('api/termekCimkeUpdate/'+product.id, form_data_update).then((response)=>{
                    if(response.status == 200){
                    this.message = "A termék módosítása sikeres!";
                    this.modalStatus = true;
                    }
                    }).catch(console.error) 
                
                  }
            }).catch(console.error)
        },
        updateTag(id, cim, szoveg, hatterszin, betuszin, betutipus, betustilus, betumeret, akciosarFt, akciosarSzazalek){

        }

       
     }

})
import { defineStore } from 'pinia'
import axios from 'axios';
import { ProductStore } from './Product';
import { BannerPopupStore } from './BannerPopupStore';
import { th } from 'vuetify/locale';


export const TagsStore = defineStore("TagsStore",{
    state: () => {
      return {
        selectedProduct: [],
        prewievProducts : [],
        cimkek: [],
        cimkekForShow: [],
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
        showDown: false,
        getProdData: [],
        addNewTag: false,
        selectedProd: [],
        selectedIndex: null,
        reload : 0

        }
        
    },
    getters: {

    },
    actions: {
        async fetchCimkek(){
            this.loading = true;
            let termekek = [];
            let convToObj = {};
            //let cimke = [];
            try {
                // await axios.get('api/cimkek').then(function(response){
                //     cimke = response.data
                //     console.log(cimke)
                // });    
                    //this.cimkek.push(cimke);
                    for(const prod of ProductStore().products){
                      const exists = Object.entries(this.cimkekForShow).some(([key, value]) => value.cim === prod.cimke.cim);
                      if(prod.cimke != null && !exists){
                        this.cimkekForShow.push({ 
                          cimkeId: prod.cimke.id,
                          cim : prod.cimke.cim,
                          termekNev: prod.nevHu,
                          termekId: prod.id, 
                          szoveg: prod.cimke.szoveg,
                          hatterszin : prod.cimke.hatterszin,
                          betuszin: prod.cimke.betuszin,
                          betutipus: prod.cimke.betutipus,
                          betustilus: prod.cimke.betustilus,
                          betumeret: prod.cimke.betumeret,
                          akciosarFt: prod.cimke.akciosarFt,
                          akciosarSzazalek: prod.cimke.akciosarSzazalek,
                        });
                        this.getProdData.push(prod)
                      } else if(prod.cimke != null && exists){
                        for(const cimke of this.cimkekForShow){
                            if(cimke.cim === prod.cimke.cim){
                              this.getProdData.push(prod)
                            }
                        }
                      }
                    }
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
          this.addNewTag = false;
        },
        pushToSelectedProducts(){
          if(this.prewievProducts.length != 0){
            this.prewievProducts = [];
            }
          for(const pro of this.selectedProduct){
            let findProducts = ProductStore().products.find(option => option.nevHu == pro);
            if(findProducts.cimkeId === null){
              findProducts.cimke = this.cimkekForShow[this.selectedIndex];
            }
            this.prewievProducts.push(findProducts);
          }
          this.reload += 1;
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

        },
        deleteTag(cimke){
          //let iDs = []
          //iDs.push(id)
          let obj_common = []
          for (const elem of this.getProdData){
                if(cimke.cim === elem.cimke.cim){
                  obj_common.push(elem)
                }
          }
          for(const obj of obj_common){

            axios.delete('api/tagdelete/'+obj.cimkeId).then((response)=>{
            if(response.status == 200){
              let index = this.cimkekForShow.findIndex(cimke=>cimke.cimkeId == obj.cimkeId);
              this.cimkekForShow.splice(index, 1)
              this.responseOk.push(true);
                }
              for(const resp of this.responseOk){
                if(resp !== true){
                  this.allOk = false;
                }
              }
              if(this.allOk){
              this.message = "A címkét töröltük!";
              this.modalStatus = true;
              }
              })
          }
      },
      TagProd(cimkeId){
        this.selectedProd = [];
        if(this.selectedProduct.length > 0){
          this.selectedProduct = [];
        }
        for(const data of this.getProdData){
          for(const cimke of this.cimkekForShow){
            if(cimkeId = cimke.cimkeId && cimke.edit === true && data.cimke.cim === cimke.cim){
                this.selectedProduct.push(data)
                this.prewievProducts.push(data)
            }
          }
          
        }

      },
      setInd(indexNumber){
        if(this.selectedIndex === null){
            this.selectedIndex = indexNumber
        } else if(this.selectedIndex === indexNumber){
            this.selectedIndex = null
        }
      },
      setDataToSelectedProducts(){
        for(const cimke of this.cimkekForShow){
          for(const selected of this.prewievProducts){
            if(cimke.cim == selected.cimke.cim){
                selected.cimke.akciosarFt = cimke.akciosarFt

                if(cimke.akciosarSzazalek != 0){
                  let szazalek = cimke.akciosarSzazalek * 0.01
                  selected.akciosarFt = selected.ar - (selected.ar * szazalek)
                }else{
                  selected.akciosarFt = ""
                }
                selected.cimke.betumeret = cimke.betumeret
                selected.cimke.betustilus = cimke.betustilus
                selected.cimke.betuszin = cimke.betuszin
                selected.cimke.betutipus = cimke.betutipus
                selected.cimke.cim = cimke.cim
                selected.cimke.hatterszin = cimke.hatterszin
                selected.cimke.id = cimke.id
                selected.cimke.szoveg = cimke.szoveg
            }
          }
        }

      },
      chipDelete(item){
        console.log(item)
        for(const pro of this.prewievProducts){
          if(item.title == pro.nevHU){
            let index = this.prewievProducts.findIndex(pr=>pr.nevHU == item.title);
            this.prewievProducts.splice(index, 1)
            //this.prewievProducts = this.prewievProducts.filter(option => option.nevHu !== item.title);
          }
        }
        //this.prewievProducts = [];
        // for(const pro of this.selectedProduct){
          
        //   let findProducts = ProductStore().products.find(option => option.nevHu == pro);
        //   console.log(findProducts)
        //   this.prewievProducts.push(findProducts);
        // }
      },
      emptingVariables(){
        this.selectedProduct = [];
        this.prewievProducts = [];
        this.cimkek= [];
        this.selectedProd= [];
        this.selectedIndex= null;
      }
    }
})
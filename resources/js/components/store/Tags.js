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
        prewievProductsBefore : [],
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
        reload : 0,
        previewProductLenght: 0,
        differentObjects: [],
        addedObjects: [],
        modalStatusAccept: false,
        rel: 0

        }
        
    },
    getters: {

    },
    actions: {
        async fetchCimkek(){
            this.loading = true;
            let termekek = [];
            let convToObj = {};
            try {
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
            this.message = "Minden terméket kijelöltél. Ha voltak korábbi címkék, akkor azokat törölni fogjuk, mert egyetlen termék se tartozik majd hozzájuk. Biztos vagy benne?";
              this.modalStatusAccept = true;
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
          // if(this.allOk){
          // this.message = "Új címke létrehozása sikeres!";
          // this.modalStatus = true;
          // }
          //this.cimkek.push(cimkePush);
          formNewTag.reset();
          this.addNewTag = false;
          this.reload +=1;
          this.rel +=1;
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
          if(this.prewievProductsBefore.length > this.prewievProducts.length && this.prewievProducts.length > 0){
            let different = this.prewievProductsBefore.filter(firstelement => !this.prewievProducts.some(secondelement => firstelement.id === secondelement.id))
            this.differentObjects.push(different[0]);
          }
          if(this.selectedProduct.length > this.prewievProductsBefore.length && this.prewievProducts.length > 0){
            let diff = this.selectedProduct.filter(firstelement => !this.prewievProductsBefore.some(secondelement => firstelement == secondelement.nevHu))
            this.addedObjects[0] = diff;
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
                cimkeId: this.lastInsertproductId,
                akciosar: this.akciosarFt
              }
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
                if(akciosarSzazalek > 0){
                  let szazalek = akciosarSzazalek * 0.01
                  akciosarFt = prod.ar - (prod.ar * szazalek)
                }
                this.loading = true;
                let form_data_update = {
                    id: id,
                    cim: cim, 
                    szoveg: szoveg, 
                    hatterszin: hatterszin, 
                    betuszin: betuszin, 
                    betutipus: betutipus, 
                    betustilus: betustilus, 
                    betumeret: betumeret, 
                    akciosarFt: akciosarFt, 
                    akciosarSzazalek: akciosarSzazalek

                }

                axios.put('api/updateTag/'+id, form_data_update).then((response)=>{
                if(response.status == 200){
                    this.message = "A címke módosítása sikeres!";
                    this.modalStatus = true;   
                }
                }).catch(console.error)
           
                if(this.allSelected){
                  this.setTagForEveryProduct(id, akciosarFt, akciosarSzazalek)
                } else {
                    if(this.prewievProducts.length > 0 && this.allSelected == false){
                      let form_data_update = {}
                      for(const prod of this.prewievProducts){
                          if(akciosarSzazalek > 0){
                            let szazalek = akciosarSzazalek * 0.01
                            akciosarFt = prod.ar - (prod.ar * szazalek)
                          }
                          if(prod.cimkeId > 0){
                              form_data_update = {
                              cimkeId: prod.cimkeId,
                              akciosar: akciosarFt
                            }
                          } else if(prod.cimkeId == null){
                            form_data_update = {
                                  cimkeId: id,
                                  akciosar: akciosarFt
                                }
                            }
                              axios.put('api/termekCimkeUpdate/'+prod.id, form_data_update).then((response)=>{
                                if(response.status == 200){
                                this.message = "A termék módosítása sikeres!";
                                this.modalStatus = true;
                                }
                                }).catch(console.error) 
                          }
                        }
                    if(this.differentObjects.length > 0){
                      for (const elem of this.differentObjects){
                        if(akciosarSzazalek > 0){
                          let szazalek = akciosarSzazalek * 0.01
                          akciosarFt = elem.ar - (elem.ar * szazalek)
                        }
                        form_data_update = {
                          cimkeId: null,
                          akciosar: akciosarFt
                        }
                        axios.put('api/termekCimkeUpdate/'+elem.id, form_data_update).then((response)=>{
                          if(response.status == 200){
                            let index = this.getProdData.findIndex(e=>e.nevHu == elem.nevHu);
                            this.getProdData.splice(index, 1);
                            
                            }
                          }).catch(console.error) 
                      }
                    }
                    if(this.addedObjects.length > 0){
                      for(const elem of this.addedObjects[0]){
                        let findProduct = ProductStore().products.find(option => option.nevHu == elem);
                        this.getProdData.push(findProduct)
                      }
                    }
                  }
                    this.cimkekForShow[this.selectedIndex].edit = false;
                    this.loading = false;
                    this.reload += 1;
                    this.rel +=1;
                    this.emptingVariables();
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
                this.prewievProductsBefore = this.prewievProducts
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
                } else{
                  selected.akciosarFt = cimke.akciosarFt
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
          }
        }
      },
      emptingVariables(){
        this.selectedProduct = [];
        this.prewievProducts = [];
        this.cimkek= [];
        this.selectedProd= [];
        this.selectedIndex= null;
        this.differentObjects = [];
        this.allSelected = false;
        this.reload += 1;
        this.rel +=1;
      },
      saveUpdate(){
       
        for(const prod of ProductStore().products){
          this.setDatatoDatabase(prod)
        }
        // axios.get('api/utolsoCimke').then(function(response){
        //   if(response.status == 200){
        //     //  this.cimkekForShow.push(response.data)
        //     //  console.log(response.data)

        //   }
             
        // this.cimkekForShow.push({
        //   id: response.id,
        //   cim: response.cim,
        //   szoveg: response.szoveg,
        //   hatterszin: response.hatterszin,
        //   betuszin : response.betuszin,
        //   betustilus:  response.betustilus,
        //   betutipus : response.betutipus,
        //   betumeret: response.betumeret,
        //   akciosarFt: response.akciosarFt,
        //   akciosarSzazalek: response.akciosarSzazalek,})
        //   });    
        //})
        // this.cimkekForShow = [];
        //  axios.get('api/utolsoCimke').then(function(response){
        //   if(response.status == 200){
        //      //this.cimkekForShow.push(response.data)
        //      console.log(typeof(response.data))

        //   }
        // })
        // this.cimkekForShow = [];
        // ProductStore().fetchProduct()
        // for(const prod of ProductStore().products){
        //   const exists = Object.entries(this.cimkekForShow).some(([key, value]) => value.cim === prod.cimke.cim);
        //   if(prod.cimke != null && !exists){
        //     this.cimkekForShow.push({ 
        //       cimkeId: prod.cimke.id,
        //       cim : prod.cimke.cim,
        //       termekNev: prod.nevHu,
        //       termekId: prod.id, 
        //       szoveg: prod.cimke.szoveg,
        //       hatterszin : prod.cimke.hatterszin,
        //       betuszin: prod.cimke.betuszin,
        //       betutipus: prod.cimke.betutipus,
        //       betustilus: prod.cimke.betustilus,
        //       betumeret: prod.cimke.betumeret,
        //       akciosarFt: prod.cimke.akciosarFt,
        //       akciosarSzazalek: prod.cimke.akciosarSzazalek,
        //     });
            //this.getProdData.push(prod)
          //}
        //}
        //this.fetchCimkek();
        //location.reload();
        this.allSelected = false;
        this.reload += 1;
        this.rel +=1;
      },
      receiveEmit(){
        this.modalStatus = false;
        this.modalStatusAccept = false;
        
      },
      setTagForEveryProduct(id, akciosarFt, akciosarSzazalek){
       
        for(const prod of ProductStore().products){
          if(akciosarSzazalek > 0){
            let szazalek = akciosarSzazalek * 0.01
            akciosarFt = prod.ar - (prod.ar * szazalek)
          }
          let form_data_update = {
            cimkeId: id,
            akciosar : akciosarFt
          }
          axios.put('api/termekCimkeUpdate/'+prod.id, form_data_update).then((response)=>{
            if(response.status == 200){
            this.message = "A termék módosítása sikeres!";
            this.modalStatus = true;
            }
            }).catch(console.error) 
        }
      }
    }
})
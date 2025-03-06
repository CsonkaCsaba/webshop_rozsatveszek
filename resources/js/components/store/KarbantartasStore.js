import { defineStore } from 'pinia'
import axios from 'axios'
import {ref} from 'vue'

export let reload = ref(0);

export const KarbantartasStore = defineStore("KarbantartasStore",{
    state: () => ({
        karbantartas:[

        ],
        karbatart: false,
        modalStatus: false,
        message : "",
        newOrder: false
      }),
      
        getters: {

        },
        actions: { 
          
          async fetchKarbantartas(){
          let karbantart = [];
          try {
                 await axios.get('api/karbantartas').then(function(response){
                 
                  karbantart = response.data;
                 
                  }).catch(error => {
                    if (error.response.status === 500) {
                          location.reload();
                          console.error('Internal Server Error: Please try again later.');
                    } 
                });
                      this.karbantartas.push(karbantart);
                      for(const karbantart of this.karbantartas[0]){
                        if(karbantart.aktiv === 1){
                          this.karbatart = true;
                        }
                      }
              }
               catch(error){
                  console.log(error)
              }
            },
                switchkarbatartasAktiv(){
                    for(const karbantart of this.karbantartas[0]){
                        if(karbantart.aktiv === 1){
                            karbantart.aktiv = 0
                            this.karbatart = false;
                        }else {
                            karbantart.aktiv = 1
                            this.karbatart = true;
                        }
                        let form_data_update = {
                            aktiv: karbantart.aktiv,
                        }
                        axios.put('api/karbantartas/'+1, form_data_update).then((response)=>{
                            if(response.status == 200){
                                this.message = "A karbantartás beállítása sikeresen elmentve";
                                this.modalStatus = true;   
                            }
                            }).catch(console.error)
                        }
                        this.loading = false;
                },
                receiveEmit(){
                  this.modalStatus = false;
                  this.modalStatusAccept = false;
              },
              pageReload(){
                window.location.reload();
              }
            
            }
            ,
            methods:{
        
            }   
            
            }
    )
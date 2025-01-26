import { defineStore } from 'pinia'
import axios from 'axios'
import {ref} from 'vue'

export let reload = ref(0);

export const KarbantartasStore = defineStore("KarbantartasStore",{
    state: () => ({

      }),
      
        getters: {

        },
        actions: {
                switchkarbatartasAktiv(){
                    // for(const karbantart of this.karbantartas){
                    //     if(karbantart.aktiv === 1){
                    //         karbantart.aktiv = 0
                    //         this.karbatartasAktiv = false;
                    //     }else {
                    //         karbantart.aktiv = 1
                    //         this.karbantart = true;
                    //     }
                    //     let form_data_update = {
                    //         aktiv: karbantart.aktiv,
                    //     }
                    //     axios.put('api/karbantartas/'+1, form_data_update).then((response)=>{
                    //         if(response.status == 200){
                    //             this.message = "A karbantartás beállítása sikeresen elmentve";
                    //             this.modalStatus = true;   
                    //         }
                    //         }).catch(console.error)
                    //     }
                    //     this.loading = false;
                }
            
            }
            ,
            methods:{
        
            }   
            
            }
    )
import { defineStore } from 'pinia'
import axios from 'axios'
import {ref} from 'vue'


export let reload = ref(0);

export const BannerPopupStore = defineStore("BannerPopupStore",{
    state: () => {
      return {
        banners: [
            
        ],
        modalStatus: false,
        modalStatusAccept: false,
        edit_id: null,
        message : "",
        loading: false,
        activeBanner: false
        }
    },
    getters: {

    },
    actions: {

        async fetchBanners(){
            let banner = [];
            try {
                   await axios.get('api/banner').then(function(response){
                    banner = response.data;
                   
                    });
                        this.banners.push(banner);
                }
                 catch(error){
                    console.log(error)
                }
        },
        
        receiveEmit(){
            this.modalStatus = false;
            this.modalStatusAccept = false;
        },
        
        }
    }
)
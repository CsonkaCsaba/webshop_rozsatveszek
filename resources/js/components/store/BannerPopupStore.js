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
        activeBanner: false,
        showPreview: false,
        defaultBackroundColor: "",
        defaultFontColor: "",
        defaultSpeed: "",
        edit_id: ""
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
                        for(const bann of this.banners[0]){
                            if(bann.aktiv === 1){
                                this.activeBanner = true
                            };
                            this.edit_id = bann.id;
                            this.message = bann.szoveg;
                            this.defaultBackroundColor = bann.hatterszin;
                            this.defaultFontColor = bann.betuszin;
                            this.defaultSpeed = bann.sebesseg;
                            bann.sebesseg = String(bann.sebesseg);
                            // if(bann.szoveg != ""){
                            //     let string1 = bann.szoveg;
                            //     let string2 = bann.szoveg;
                            //     let string3 = bann.szoveg;
                            //     let string4 = bann.szoveg;
                            //     bann.szoveg = string1 + " " +string2+" "+string3+ " "+string4
                            // }
                        }
                }
                 catch(error){
                    console.log(error)
                }
        },
        
        receiveEmit(){
            this.modalStatus = false;
            this.modalStatusAccept = false;
        },
        showPreviewButton(){
            this.showPreview = true;

        },
        closePreviewButton(){
            this.showPreview = false;
        },
        setToDefault(){
            for(const bann of this.banners[0]){
                bann.hatterszin = this.defaultBackroundColor
                bann.betuszin = this.defaultFontColor
            }   
        },
        updateBanner(){
            for(const bann of this.banners[0]){
                let form_data_update = {
                szoveg : bann.szoveg,
                hatterszin : bann.hatterszin,
                betuszin : bann.betuszin,
                aktiv: bann.aktiv,
                sebesseg: bann.sebesseg
                }
                axios.put('api/banner/'+this.edit_id, form_data_update).then((response)=>{
                    if(response.status == 200){
                        this.message = "A banner beállítása sikeresen elmentve";
                        this.modalStatus = true;   
                    }
                    }).catch(console.error)
                }
            },
            switchBannerState(){
                for(const bann of this.banners[0]){
                    if(bann.aktiv === 1){
                        bann.aktiv = 0
                        this.activeBanner = false;
                    }else {
                        bann.aktiv = 1
                        this.activeBanner = true;
                    }
                    let form_data_update = {
                        szoveg : bann.szoveg,
                        hatterszin : bann.hatterszin,
                        betuszin : bann.betuszin,
                        aktiv: bann.aktiv,
                        sebesseg: bann.sebesseg
                    }
                    axios.put('api/banner/'+this.edit_id, form_data_update).then((response)=>{
                        if(response.status == 200){
                            this.message = "A banner beállítása sikeresen elmentve";
                            this.modalStatus = true;   
                        }
                        }).catch(console.error)
                    }
                },
            }    
        
        }
)
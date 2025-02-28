import { defineStore } from 'pinia'
import axios from 'axios'
import {ref} from 'vue'


export let reload = ref(0);

export const BannerPopupStore = defineStore("BannerPopupStore",{
    state: () => {
      return {
        banners: [
            
        ],
        popups: [
            
        ],
        modalStatus: false,
        modalStatusAccept: false,
        edit_id: null,
        edit_popup_id: null,
        popup_cim : "",
        popup_leiras : "",
        popup_kepUtvonal: "",
        defaultPopupCim: "",
        defaultPopupSzoveg: "",
        defaultPopupFontColor:"",
        defaultPopupBackroundColor: "",
        defaultPopupKepId: "",
        defaultPopupAktiv: "",
        defaultPopupKepUtvonal : "",
        defaultPopupFotoMutat: false,
        defaultPopupBetuStilus:"",
        defaultPopupBetuTipus: "",
        defaultPopupBetuMeret: null,
        popupWithPhoto: null,
        kepUtvonalGalleriabol: "",
        message : "",
        loading: false,
        activeBanner: false,
        showPreviewBanner: false,
        showPreviewPopup: false,
        defaultBackroundColor: "",
        defaultFontColor: "",
        defaultSpeed: "",
        defaultFontType: "",
        defaultFontStyle: "",
        defaultFontSize: null,
        isAdmin: false,
        activePopup: false,
        file: "",
        lastInsertId: null,
        loading: false,
        photoMessage: "",
        noFile: false,
        uploadedPhotoUrl:"",
        showInFrontPopup: false,
        selectedValue: "",
        selectedFontSize: 0,
        optionsFontStyle:[ {"id": 1, "option":"normal"},
                        {"id": 2, "option":"italic"}, 
        ],
        optionsFinalFontStyle:[],
        optionsFontFamily:[ {"id": 1, "option":"'Arial', sans-serif"},
            {"id": 2, "option":"'Verdana ', sans-serif"}, 
            {"id": 3, "option":"'Tahoma ', sans-serif"},
            {"id": 4, "option":"'Trebuchet MS', sans-serif"},
            {"id": 5, "option":"'Times New Roman', serif"},
            {"id": 6, "option":"'Georgia', serif"},
            {"id": 7, "option":"'Garamond', serif"},
            {"id": 8, "option":"'Courier New', monospace"},
            {"id": 9, "option":"'Brush Script MT', cursive"},
            {"id": 10, "option":"'Nunito', sans-serif"}
        ],
        optionsFinalFontFamily:[],
        optionsFontSize: [
            {"id":1, "option": 8},
            {"id":2, "option": 9},
            {"id":3, "option": 10},
            {"id":4, "option": 11},
            {"id":5, "option": 12},
            {"id":6, "option": 14},
            {"id":7, "option": 16},
            {"id":8, "option": 18},
            {"id":9, "option": 20},
            {"id":10, "option": 24},
            {"id":11, "option": 26},
            {"id":12, "option": 28},  
        ],
        optionsFinalFontSize: [],
        chooseFromGallery: false
        }
        
    },
    getters: {

    },
    actions: {

        async fetchBanners(){
            this.loading = true;
            let banner = [];
            try {
                   await axios.get('api/banner').then(function(response){
                    if(response.status === 500){
                        location.reload();
                    }
                    banner = response.data;
                    });
                        this.banners.push(banner);
                        for(const bann of this.banners[0]){
                            if(bann.aktiv === 1){
                                this.activeBanner = true
                            };
                            bann.optionsFinalFontStyle = this.optionsFontStyle.filter(option => option.option !== bann.betustilus);
                            bann.optionsFinalFontFamily = this.optionsFontFamily.filter(option => option.option !== bann.betutipus);
                            bann.optionsFinalFontSize = this.optionsFontSize.filter(option => option.option !== bann.betumeret);
                            this.edit_id = bann.id;
                            this.message = bann.szoveg;
                            this.defaultBackroundColor = bann.hatterszin;
                            this.defaultFontColor = bann.betuszin;
                            this.defaultSpeed = bann.sebesseg;
                            this.defaultFontType = bann.betutipus;
                            this.defaultFontStyle = bann.betustilus;
                            this.defaultFontSize = bann.betumeret;
                            bann.sebesseg = String(bann.sebesseg);

                            // if(bann.szoveg != ""){
                            //     let string1 = bann.szoveg;
                            //     let string2 = bann.szoveg;
                            //     let string3 = bann.szoveg;
                            //     let string4 = bann.szoveg;
                            //     bann.szoveg = string1 + " " +string2+" "+string3+ " "+string4
                            // }
                        }
                        this.loading = false;
                }
                 catch(error){
                    console.log(error)
                }
        },
        async fetchPopups(){
            this.loading = true;
            let popup = [];
            try {
                   await axios.get('api/popup').then(function(response){
                    if(response.status === 500){
                        location.reload();
                    }
                    popup = response.data;
                    });
                        this.popups.push(popup);
                        for(const popup of this.popups[0]){
                            popup.optionsFinalFontStyle = this.optionsFontStyle.filter(option => option.option !== popup.betustilus);
                            popup.optionsFinalFontFamily = this.optionsFontFamily.filter(option => option.option !== popup.betutipus);
                            popup.optionsFinalFontSize = this.optionsFontSize.filter(option => option.option !== popup.betumeret);
                            if(popup.aktiv === 1){
                                this.activePopup = true;
                                this.showInFrontPopup = true;
                            };
                            if(popup.fotomutat === 1){
                                this.popupWithPhoto = true;
                            }
                            this.edit_popup_id = popup.id;
                            this.defaultPopupCim = popup.cim;
                            this.defaultPopupSzoveg = popup.szoveg;
                            this.defaultPopupFontColor = popup.betuszin;
                            this.defaultPopupBackroundColor = popup.hatterszin;
                            this.defaultPopupKepId = popup.photo.kepId;
                            this.defaultPopupAktiv = popup.aktiv;
                            this.defaultPopupKepUtvonal = popup.photo.kepUtvonal;
                            this.kepUtvonalGalleriabol = popup.photo.kepUtvonal;
                            this.defaultPopupFotoMutat = popup.fotomutat;
                            this.defaultPopupBetuStilus = popup.betustilus;
                            this.defaultPopupBetuTipus = popup.betutipus;
                            this.defaultPopupBetuMeret = popup.betumeret;
                         }
                    this.loading = false;
                }
                 catch(error){
                    console.log(error)
                }
        },
        
        receiveEmit(){
            this.modalStatus = false;
            this.modalStatusAccept = false;
            this.showPreviewPopup = false;
            this.showInFrontPopup = false;
        },
        showPreviewButton(){
            this.showPreviewBanner = true;

        },
        showPreviewButtonPopup(){
            this.showPreviewPopup = true;
            this.isAdmin = true;
        },
        closePreviewButtonPopup(){
            this.showPreviewPopup = false;
        },
        closePreviewButton(){
            this.showPreviewBanner = false;
        },
        setToDefault(){
            for(const bann of this.banners[0]){
                bann.hatterszin = this.defaultBackroundColor;
                bann.betuszin = this.defaultFontColor;
                bann.betutipus = this.defaultFontType;
                bann.betustilus = this.defaultFontStyle;
                bann.betumeret = this.defaultFontSize;
            }   
        },
        setToDefaultPopup(){
            for(const popup of this.popups[0]){
                popup.cim = this.defaultPopupCim;
                popup.szoveg = this.defaultPopupSzoveg;
                popup.betuszin = this.defaultPopupFontColor;
                popup.hatterszin = this.defaultPopupBackroundColor;
                popup.photo.kepId = this.defaultPopupKepId;
                popup.aktiv = this.defaultPopupAktiv;
                popup.photo.kepUtvonal = this.defaultPopupKepUtvonal;
                this.kepUtvonalGalleriabol = this.defaultPopupKepUtvonal;
                popup.fotomutat = this.defaultPopupFotoMutat;
                popup.betustilus = this.defaultPopupBetuStilus;
                popup.betutipus =this.defaultPopupBetuTipus;
                popup.betumeret = this.defaultPopupBetuMeret;
                
            } 
        },
        onChange(e){
            let file;
            file = e.target.files[0];
            this.file = file;

        },
        uploadPoto(e){
            this.message = "";
            e.preventDefault();
            const config = {
                headers: {
                    'content-type':'multipart/form-data'
                }
            }
            
            let data = new FormData();
            if(this.file != ""){
                this.noFile = false;
                data.append('file', this.file);
                axios.post('api/galeria/upload', data, config)
                .then((response) => {
                    if(response.data.message == "Sikeres feltöltés!"){
                        this.modalStatus= true;
                        this.message = "A fotó feltöltése sikeres!";
                        uploadinput.value = null;
                        this.lastInsertId = response.data.last_insert_id;
                        this.uploadedPhotoUrl = response.data.kepUtvonal
                        for(const popup of this.popups[0]){
                            popup.photo.id = this.lastInsertId;
                            popup.photo.kepUtvonal = this.uploadedPhotoUrl;
                            this.kepUtvonalGalleriabol = this.uploadedPhotoUrl
                        }
                            this.file = null;
                    } else if (response.data.error === 422)
                    {
                         this.photoMessage = response.data.message;
                         uploadinput.value = null;
                         this.file = null;
                    }
                }).catch((error) => {
                    console.log(error)
                    if(error.response.status === 422){
                        // this.modalStatus= true;
                        // this.message = "Kérjük ellenőrizze, hogy jelölt-e ki fájlt! "+error.response.data.message;
                        this.file = null;
                    }
      
                });
            } else {
                this.noFile = true
            }
            
        },
        updateBanner(){
            this.loading = true;
            for(const bann of this.banners[0]){
                let form_data_update = {
                szoveg : bann.szoveg,
                hatterszin : bann.hatterszin,
                betuszin : bann.betuszin,
                aktiv: bann.aktiv,
                sebesseg: bann.sebesseg,
                betutipus : bann.betutipus,
                betustilus: bann.betustilus
                }
                axios.put('api/banner/'+this.edit_id, form_data_update).then((response)=>{
                    if(response.status == 200){
                        this.message = "A banner beállítása sikeresen elmentve";
                        this.modalStatus = true;   
                    }
                    }).catch(console.error)
                }
                this.loading = false;
        },
        updatePopup(){
            this.loading = true;
            for(const popup of this.popups[0]){
                let form_data_update = {
                cim : popup.cim,
                szoveg : popup.szoveg,
                kepId: popup.photo.id,
                aktiv: popup.aktiv,
                hatterszin : popup.hatterszin,
                betuszin : popup.betuszin,
                betutipus : popup.betutipus,
                fotomutat : popup.fotomutat,
                betustilus : popup.betustilus,

                }
                axios.put('api/popup/'+this.edit_popup_id, form_data_update).then((response)=>{
                    if(response.status == 200){
                        this.message = "A popup beállítása sikeresen elmentve";
                        this.modalStatus = true;   
                    }
                    }).catch(console.error)
                }
            // }   

            const popupData = {
                popupState: 'updated',
                viewed: false,
            };
            
            this.setThePopupCookie('hideThePopup', popupData, 7);
            reload += 1;
            this.loading = false;

        },
        switchBannerState(){
            this.loading = true;
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
                    sebesseg: bann.sebesseg,
                    betutipus : bann.betutipus,
                    betustilus: bann.betustilus,
                    betumeret: bann.betumeret
                }
                axios.put('api/banner/'+this.edit_id, form_data_update).then((response)=>{
                    if(response.status == 200){
                        this.message = "A banner beállítása sikeresen elmentve";
                        this.modalStatus = true;   
                    }
                    }).catch(console.error)
                }
                this.loading = false;
            },
            switchPopupState(){
                this.loading = true;
                for(const popup of this.popups[0]){
                    if(popup.aktiv === 1){
                        popup.aktiv = 0
                        this.deleteThePopupCookie('hideThePopup');
                        this.activePopup = false;
                        this.showInFrontPopup = false;
                    }else {
                        popup.aktiv = 1
                        const popupData = {
                            popupState: 'turnedOn',
                            viewed: false,
                        };
                        
                        this.setThePopupCookie('hideThePopup', popupData, 30);
                        this.activePopup = true;
                        this.showInFrontPopup = true;
                    }
                    for(const popup of this.popups[0]){
                        let form_data_update = {
                        cim : popup.cim,
                        szoveg : popup.szoveg,
                        kepId : popup.kepId,
                        aktiv: popup.aktiv,
                        hatterszin : popup.hatterszin,
                        betuszin : popup.betuszin,
                        betutipus : popup.betutipus,
                        fotomutat : popup.fotomutat,
                        betustilus : popup.betustilus,
                        betumeret : popup.betumeret,
                        }
                        axios.put('api/popup/'+1, form_data_update).then((response)=>{
                            if(response.status == 200){
                                this.message = "A popup beállítása sikeresen elmentve";
                                this.modalStatus = true;   
                            }
                            }).catch(console.error)
                        }
                        reload += 1;
                    }
                   
                    this.loading = false;
                },

                receiveEmitToHide(){
                    this.showInFrontPopup = false;
                    const popupData = {
                        popupState: 'hided',
                        viewed: true,
                    };
                    
                    this.setThePopupCookie('hideThePopup', popupData, 30);
                },
                changePhotoState(){
                    for(const popup of this.popups[0]){
                        popup.fotomutat = !popup.fotomutat;
                    }
                },
                changeFontFamily(event){
                    this.selectedValue = event.target.value
                    for(const popup of this.popups[0]){
                        popup.betutipus = this.selectedValue;
                        popup.optionsFinalFontFamily = this.optionsFontFamily.filter(option => option.option !== this.selectedValue);
                    }
                },
                changeFontStyle(event){
                    this.selectedValue = event.target.value
                    for(const popup of this.popups[0]){
                        popup.betustilus = this.selectedValue;
                        popup.optionsFinalFontStyle = this.optionsFontStyle.filter(option => option.option !== this.selectedValue);
                    }
                },
                changeFontSize(event){
                    this.selectedFontSize = parseInt(event.target.value);
                    for(const popup of this.popups[0]){
                        popup.betumeret = this.selectedFontSize;
                        popup.optionsFinalFontSize = this.optionsFontSize.filter(option => option.option !== this.selectedFontSize);
                    }
                },
                changeFontFamilyBanner(event){
                    this.selectedValue = event.target.value
                    for(const banner of this.banners[0]){
                        banner.betutipus = this.selectedValue;
                        banner.optionsFinalFontFamily = this.optionsFontFamily.filter(option => option.option !== this.selectedValue);
                    }
                },
                changeFontStyleBanner(event){
                    this.selectedValue = event.target.value
                    for(const banner of this.banners[0]){
                        banner.betustilus = this.selectedValue;
                        banner.optionsFinalFontStyle = this.optionsFontStyle.filter(option => option.option !== this.selectedValue);
                    }
                },
                changeFontSizeBanner(event){
                    this.selectedFontSize = parseInt(event.target.value);
                    for(const banner of this.banners[0]){
                        banner.betumeret = this.selectedFontSize;
                        banner.optionsFinalFontSize = this.optionsFontSize.filter(option => option.option !== this.selectedFontSize);
                    }
                },
                setThePopupCookie(name, value, days){
                    const expires = new Date(Date.now() + days * 864e5).toUTCString();
                    document.cookie = name + '=' + encodeURIComponent(JSON.stringify(value)) + '; expires=' + expires + '; path=/';
                },
                deleteThePopupCookie(name){
                    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
                },
                changeGallery(){
                    this.chooseFromGallery = ! this.chooseFromGallery
                },
                changePhotoFromGallery(kepUtvonal, id){
                    for(const popup of this.popups[0]){
                        popup.photo.kepUtvonal = kepUtvonal;
                        popup.photo.id = id;
                    }
                    this.kepUtvonalGalleriabol = kepUtvonal
                }
        }    
        
        }
    )
import { defineStore } from 'pinia'
import axios from 'axios'
import {ref } from 'vue'


export let showSwiper = ref(0);
let answer = false;

export const GalleryStore = defineStore("Gallery",{
    state: () => {
      return {
        gallery: [
           
        ],
        modalStatus: false,
        message : "",
        message_button: "" ,
        baseUrl: window.location.origin,
        edit_id: null,
        file: '',
        oldPhotoName: null,
        noFile: false,
        }
    },
    getters: {

    },
    actions: {

        async fetchGallery(){
            let gallery = [];
            try {
                    await axios.get('api/galeria').then(function(response){
                    gallery = response.data
                    });
                for(const element of gallery){
                        this.gallery.push(element);
                    }
                }
                 catch(error){
                    console.log(error.response.data)
                }
        },
        deletePhoto(id, uzletId, name){
            try{
                console.log(id, name)
                if (id<= 4){
                answer = confirm("Figyelem! A kiválasztott fotó törlése befolyásolhatja a kezdőoldal megjelenését! Biztos bene, hogy törölni szeretné a(z) " +name+" elnevezésű fotót?");
                } else {
                answer = confirm("Biztos bene, hogy törölni szeretné a(z) " +name+" elnevezésű fotót?");
                }
                if(answer != false){
                axios.delete('api/galeria/'+id).then(res=>{
                    let index = this.gallery.findIndex(gall=>gall.id == id);
                    this.gallery.splice(index, 1)
                    this.modalStatus = true;
                    this.message = "A fotó törlése sikeres!",
                    answer = false;
                    }).catch(console.error)
                }
            }catch(error){
                console.log(error)
            }

        },
        downloadPhoto(kepUtvonal){
                axios({
                    url: kepUtvonal,
                    method: 'GET',
                    responseType: 'blob'
                })
                  .then((response) => {
                    let fileUrl = window.URL.createObjectURL(new Blob([response.data]))
                    let fileLink = document.createElement('a')
                    fileLink.href = fileUrl
                    fileLink.setAttribute('download','image.jpg')
                    document.body.appendChild(fileLink)
                    fileLink.click()
                  }).catch(console.error)
        },
        updatePhoto(id){
            let photo = this.gallery.find(gallery=>gallery.id == id)
            if(photo){ 
                this.uzletId = photo.uzletId,
                this.kepNev = photo.kepNev,
                this.kepLeiras = photo.kepLeiras
                this.edit_id = photo.id
            }
               
                let form_data ={
                id : this.id,    
                kepNev : this.kepNev,
                kepLeiras : this.kepLeiras,
                uzletId: this.uzletId,
                }
                axios.put('api/galeria/'+this.edit_id, form_data, this.oldPhotoName).then(res=>{
                    console.log(res);
                    this.message = "A fotó adatainak módosítása sikeres!";
                    this.modalStatus=true;
                }).catch(console.error)
        }, 
        onChange(e){
            let file;
            file = e.target.files[0];
            this.file = file;

        },
        uploadPoto(e){
            e.preventDefault();
            const config = {
                headers: {
                    'content-type':'multipart/form-data'
                }
            }
            
            let data = new FormData();
            if(this.file != ""){
                this.noFile = false;
                this.message = "";
                data.append('file', this.file);
                axios.post('api/galeria/upload', data, config)
                .then((response) => {
                    if(response.data.message == "Sikeres feltöltés!"){
                        this.modalStatus=true;
                        this.message = "A fotó feltöltése sikeres!";
                       //location.reload();
                       //showSwiper +=1
                    } else {
                        this.message_button = response.data.message;
                    }
                }).catch((error) => {
                    console.log(error)
                    if(error.response.status === 422){
                        this.message_button = "Csak .jpg, .jpeg, .png kiterjesztésű fotók tölthetők fel!"
                    }
                    //if(error.message == "Request failed with status code 422")
                    //this.message = "error";        
                });
            } else {
                this.noFile = true
            }
            
        },

        oldPhotoName(e){
            this.oldPhotoName = e
        },
        
        updateStatusChange(){
            this.updateSuccessful = false
        }, 

        deleteStatusChange(){
            this.deleteSuccessful = false
        },
        uploadStatusChange(){
            this.uploadSuccessful = false
        },
        receiveEmit(){
            this.modalStatus = false
        },

     },
     methods:{
     }
  
})
import { defineStore } from 'pinia'
import axios from 'axios'
import {ref } from 'vue'


// export let reload = ref(0);
let answer = false;

export const GalleryStore = defineStore("Gallery",{
    state: () => {
      return {
        gallery: [
           
        ],
        modalStatus: false,
        modalStatusAccept: false,
        message : "",
        message_button: "" ,
        baseUrl: window.location.origin,
        edit_id: null,
        file: '',
        oldPhotoName: null,
        noFile: false,
        reload: 0,
        slideIndex: 1,
        currentImage: ""
        }
    },
    getters: {

    },
    actions: {

        async fetchGallery(){
            this.gallery = [];
            let gallery = [];
            try {
                    await axios.get('api/galeria').then(function(response){
                        if(response.status === 500){
                            location.reload();
                        }
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
        deletePhoto(id){
            let hasImgage = this.gallery.some(e => e.id === id);
            if(hasImgage){ 
                this.edit_id = id;
                this.modalStatusAccept = true;
                this.message = 'Biztos benne, hogy véglegesen törölni szeretné a fotót?';
                } else{
                this.modalStatusAccept = true;
                this.message = 'A kiválasztott fotó nem található a rendszerben!';
                } 
        },
        deleteImageAccepted(){
        try {
            axios.delete('api/galeria/'+this.edit_id).then(res=>{
            let index = this.gallery.findIndex(gall=>gall.id == this.edit_id);
            this.gallery.splice(index, 1);
            this.modalStatusAccept = false;
            this.modalStatus = true;
            this.message = "A fotó törlése sikeres!",
            this.reload += 1;
            answer = false;
            }).catch(console.error)
                }
            catch(error){
                console.log(error)
            }

        },
        receiveEmit(){
            this.modalStatus = false;
            this.modalStatusAccept = false;
        },
        emitRecive(){
            this.modalStatus = false;
            this.modalStatusAccept = false;
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
            file = null;

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

                        console.log(response.data.kepNev, response.data.kepLeiras, response.data.last_insert_id, response.data.kepUtvonal, response.data.uzletId);
                        let newPhoto = {
                            id: response.data.last_insert_id,
                            kepLeiras : response.data.kepLeiras,
                            kepNev : response.data.kepNev, 
                            kepUtvonal: response.data.kepUtvonal,
                            uzletId: response.data.uzletId
                          }
                          this.gallery.push(newPhoto);
                          newPhoto = {};
                          this.file = null;

                    } else if (response.data.error === 422)
                    {
                         this.modalStatus= true;
                         this.message = response.data.message;
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
        openModal(){
            document.getElementById("myModal").style.display = "block";
        },
         closeModal(){
            document.getElementById("myModal").style.display = "none";
         },
         prevSlides(){
                for(let i = this.gallery.length -1; i >= 0; i--){
                        if(this.gallery[i].id < this.currentImage.id){
                            this.currentImage = this.gallery[i]
                            break;
                        }
                }
            }, 
          nextSlides(){
            for(const image of this.gallery){
                if(image.id > this.currentImage.id){
                    this.currentImage = image
                    break;
                }
            }
          },
          currentSlide(n){
            this.showSlides(n);
          },
           showSlides(n){
            for(const image of this.gallery){
                if(image.id == n){
                    this.currentImage = image
                }
            }
            document.getElementsByClassName("mySlides")[0].style.display = "block";
          }

     },
     methods:{
     }
  
})
import { defineStore } from 'pinia'
import axios from 'axios'
import {ref } from 'vue'


export const NewsStore = defineStore("NewsStore",{
    state: () => {
      return {
        news: [{
            id : null,
            cim : null,
            leiras : null,
            uzletId : null,
            edit_id : null,
            foto : null,
        }],
        messageDelete: "A hír törlése sikeres!",
        messageUpdate: "Sikeres módosítás!",
        messageUpload: "Sikeres feltöltés!",
        updateSuccessful: false,
        deleteSuccessful: false,
        baseUrl: window.location.origin,
        edit_id: null,
        file: '',
        uploadSuccessful: false,
        oldPhotoName: null,
        noFile: false,
        message : "",


        }
    },
    getters: {

    },
    actions: {

        deleteNews(id, cim){
            try{
                let answer = confirm("Biztos bene, hogy törölni szeretné a(z) " +cim+" című hírt?");          
                if(answer != false){
                axios.delete('api/hirek/'+id).then(res=>{
                    answer = false;
                    location.reload();
                    this.deleteSuccessful=true;
                    }).catch(console.error)
                }
            }catch(error){
                console.log(error)
            }

        },
        // downloadPhoto(kepUtvonal){
        //         axios({
        //             url: kepUtvonal,
        //             method: 'GET',
        //             responseType: 'blob'
        //         })
        //           .then((response) => {
        //             let fileUrl = window.URL.createObjectURL(new Blob([response.data]))
        //             let fileLink = document.createElement('a')
        //             fileLink.href = fileUrl
        //             fileLink.setAttribute('download','image.jpg')
        //             document.body.appendChild(fileLink)
        //             fileLink.click()
        //           }).catch(console.error)
        // },
        updateNews(id, cim, leiras, uzletId, foto){
            try{
                this.id = id;
                this.edit_id = id;
                this.cim = cim;
                this.leiras = leiras;
                this.uzletId = uzletId;
                this.foto = foto;
                
                let form_data ={
                id : this.id,    
                cim : this.cim,
                leiras : this.leiras,
                uzletId: this.uzletId,
                }
                axios.put('api/hirek/'+this.edit_id, form_data).then(res=>{
                    console.log(res);
                    this.updateSuccessful = true;
                }).catch(console.error)
            }catch(error){
                console.log(error)
            }
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
                        this.uploadSuccessful = true;
                       location.reload();
                       //showSwiper +=1
                    } else {
                        this.message = response.data.message;
                    }
                }).catch((error) => {
                    console.log(error)
                    if(error.response.status === 422){
                        this.message = "Csak .jpg, .jpeg, .png kiterjesztésű fotók tölthetők fel!"
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
        }

     },
     methods:{
     }
  
})
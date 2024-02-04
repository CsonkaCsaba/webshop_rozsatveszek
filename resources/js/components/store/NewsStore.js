import { defineStore } from 'pinia'
import axios from 'axios'
import {ref} from 'vue'

export let showSwiper = 0;

export const NewsStore = defineStore("NewsStore",{
    state: () => {
      return {
        news: [
            
        ],
        modalElements: [
            
        ],
        modalStatus: false,
        baseUrl: window.location.origin,
        edit_id: null,
        file: '',
        oldPhotoName: null,
        noFile: false,
        message : "",
        }
    },
    getters: {

    },
    actions: {

        async fetchNews(){
            let news = [];
            try {
                   await axios.get('api/hirek').then(function(response){
                   news = response.data;
                   //console.log(news);
                    });
                        this.news.push(news);
                }
                 catch(error){
                    console.log(error)
                }
        },
        async fetchNewsadmin(){
            let news = [];
            try {
                   await axios.get('api/hirekadmin').then(function(response){
                   news = response.data;
                   //console.log(news);
                    });
                        this.news.push(news);
                }
                 catch(error){
                    console.log(error)
                }
        },

        deleteNews(id, cim){
            try{
                console.log(id,cim)
                let answer = confirm("Biztos benne, hogy törölni szeretné a(z) " +cim+" című hírt?");          
                if(answer != false){
                axios.delete('api/hirekadmin/'+id).then(res=>{
                    console.log(res);
                    if(res.status == 200){
                        let index = this.news.findIndex(news=>news.id == id);
                        this.news.splice(index, 1)
                        this.modalStatus = true;
                        this.message = "A hír törlése sikeres!";
                        showSwiper +=1
                    }
                    answer = false;
                    
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
        updateNews(id, cim, leiras, uzletId, kepId){
            try{
                this.id = id;
                this.edit_id = id;
                this.cim = cim;
                this.leiras = leiras;
                this.uzletId = uzletId;
                this.kepId = kepId;
                
                let form_data ={
                id : this.id,    
                cim : this.cim,
                leiras : this.leiras,
                uzletId: this.uzletId,
                }
                axios.put('api/hirekadmin/'+this.edit_id, form_data).then(res=>{
                    console.log(res);
                    this.message = "A hír módosítása sikeres!";
                    this.modalStatus = true;
                    this.showSwiper +=1;
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
        },
        receiveEmit(){
            this.modalStatus = false
            
        },
        modalOpen(cim, datum, leiras, kepUtvonal){
            this.modalStatus = true;
            this.modalElements = [
            this.modalCim = cim,
            this.modalDatum = datum,
            this.modalLeiras = leiras,
            this.modalKepUtvonal = kepUtvonal
            ];
            
            return modalElements;
        }

     },
     methods:{
   
     }
  
})
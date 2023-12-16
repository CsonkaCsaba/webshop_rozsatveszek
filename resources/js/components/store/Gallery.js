import { defineStore } from 'pinia'
import axios from 'axios';

export const GalleryStore = defineStore("Gallery",{
    state: () => {
      return {
        gallery: [

        ],
        uzenet: "Sikeres mentés ",
        updateSuccessful: false
       
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

    //     update(){
    //             let form_data = {
    //                 id: this.posts[0].id,
    //                 nev: this.posts[0].nev,
    //                 bemutatkozasHu: this.posts[0].bemutatkozasHu,
    //                 bemutatkozasEn: this.posts[0].bemutatkozasEn,
    //                 iranyitoszam: this.posts[0].iranyitoszam,
    //                 telepules: this.posts[0].telepules,
    //                 utca: this.posts[0].utca,
    //                 hazszam: this.posts[0].hazszam,
    //                 tel: this.posts[0].tel,
    //                 email: this.posts[0].email,
    //                 adoszam: this.posts[0].adoszam
    //             }; 
    //             console.log(form_data);
                

    //             axios.put('uzlet/'+this.edit_id, form_data).then(res=>{
    //             console.log(res);
    //             this.updateSuccessful= true;
    //             this.text = "Sikeres módosítás! ";
    //             })
    //     } ,
    //     editItem(id){
    //         let post = this.posts.find(post=>post.id == id)
    //         if(post){     
    //             this.id = post.id
    //             this.nev = post.nev
    //             this.bemutatkozasHu = post.bemutatkozasHu
    //             this.bemutatkozasEn = post.bemutatkozasEn
    //             this.iranyitoszam = post.iranyitoszam
    //             this.telepules = post.telepules
    //             this.utca = post.utca
    //             this.hazszam = post.hazszam
    //             this.tel = post.tel
    //             this.email = post.email
    //             this.adoszam = post.adoszam  
    //             this.edit_id = post.id         
    //         }
    //     },
    //     deleteItem(){

    //     }
     }

})
import { defineStore } from 'pinia'
import axios from 'axios';

export const PostStore = defineStore("post",{
    state: () => {
      return {
        posts: [

        ],
        edit_id :1,
        uzenet: "Sikeres mentés ",
        updateSuccessful: false,
        modalStatus: false,
        message : ""
       
        }
    },
    getters: {

    },
    actions: {

        async fetchStore(){
            let uzlet = [];
            try {
                await axios.get('api/uzlet').then(function(response){
                    if(response.status === 500){
                        location.reload();
                    }
                    uzlet = response.data[0]
                });
                
                this.posts.push({
                    id: uzlet.id,
                    nev: uzlet.nev,
                    bemutatkozasHu: uzlet.bemutatkozasHu,
                    bemutatkozasEn: uzlet.bemutatkozasEn,
                    iranyitoszam: uzlet.iranyitoszam,
                    telepules: uzlet.telepules,
                    utca:uzlet.utca,
                    hazszam:uzlet.hazszam,
                    tel:uzlet.tel,
                    email: uzlet.email,
                    adoszam:uzlet.adoszam,
                    cegjegyzekszam: uzlet.cegjegyzekszam,
                    bank: uzlet.bank,
                    bankszamlaszam: uzlet.bankszamlaszam,
                    iban: uzlet.iban,
                    swiftbic: uzlet.swiftbic

                })
                
                } catch(error){
                    console.log(error.response.data)
                }
        },

        update(){
                let form_data = {
                    id: this.posts[0].id,
                    nev: this.posts[0].nev,
                    bemutatkozasHu: this.posts[0].bemutatkozasHu,
                    bemutatkozasEn: this.posts[0].bemutatkozasEn,
                    iranyitoszam: this.posts[0].iranyitoszam,
                    telepules: this.posts[0].telepules,
                    utca: this.posts[0].utca,
                    hazszam: this.posts[0].hazszam,
                    tel: this.posts[0].tel,
                    email: this.posts[0].email,
                    adoszam: this.posts[0].adoszam,
                    cegjegyzekszam: this.posts[0].cegjegyzekszam,
                    bank: this.posts[0].bank,
                    bankszamlaszam: this.posts[0].bankszamlaszam,
                    iban: this.posts[0].iban,
                    swiftbic: this.posts[0].swiftbic
                }; 
                axios.put('uzlet/'+this.edit_id, form_data).then(res=>{
                this.updateSuccessful= true;
                this.modalStatus = true;
                this.message = "Sikeres módosítás!";
                })
        } ,
        editItem(id){
            let post = this.posts.find(post=>post.id == id)
            if(post){     
                this.id = post.id
                this.nev = post.nev
                this.bemutatkozasHu = post.bemutatkozasHu
                this.bemutatkozasEn = post.bemutatkozasEn
                this.iranyitoszam = post.iranyitoszam
                this.telepules = post.telepules
                this.utca = post.utca
                this.hazszam = post.hazszam
                this.tel = post.tel
                this.email = post.email
                this.adoszam = post.adoszam  
                this.edit_id = post.id         
            }
        },
        receiveEmit(){
            this.modalStatus = false;
            this.modalStatusAccept = false;
        }
    }

})
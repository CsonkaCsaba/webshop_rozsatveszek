import { defineStore } from 'pinia'
import axios from 'axios';

export const ProductStore = defineStore("Product",{
    state: () => {
      return {
        products: [

        ],
//        uzenet: "Sikeres mentés ",
        updateSuccessful: false
       
        }
    },
    getters: {

    },
    actions: {

        async fetchProduct(){
            let termekek = [];
            try {
                    await axios.get('api/termekek').then(function(response){
                        termekek = response.data
                    });
                    for(const termek of termekek){
                        this.products.push(termek);

                    }
                }
                 catch(error){
                    console.log(error.response.data)
                }
        },

    //     update(){

    //     } ,

    //     editItem(id){

    //     },

    //     deleteItem(){

    //     }
     }

})
import { defineStore } from 'pinia'
import axios from 'axios';

export const CategoryStore = defineStore("Category",{
    state: () => {
      return {
        categories: [

        ],
//        uzenet: "Sikeres mentés ",
        updateSuccessful: false
       
        }
    },
    getters: {

    },
    actions: {

        async fetchCategory(){
            let kategoriak = [];
            try {
                    await axios.get('api/kategoria').then(function(response){
                        kategoriak = response.data
                    });
                    for(const kategoria of kategoriak){
                        this.categories.push(kategoria);
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
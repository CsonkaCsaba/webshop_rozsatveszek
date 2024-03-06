import { defineStore } from 'pinia'
import axios from 'axios';

export const ProductStore = defineStore("Product",{
    state: () => {
      return {
        products: [

        ],
        addNewProduct: false,
        disableBtnAdd: false,
        photoMessage : "",
        file: '',
        photoMessage : "",

//        uzenet: "Sikeres mentés ",
        updateSuccessful: false,
        db_data: {
            photo: {},
        }
       
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
        addNewProductBtn(){
            this.addNewProduct = true
            this.disableBtnAdd = true;
            
        },
        onChange(e){
            let file;
            file = e.target.files[0];
            this.file = file;

        },
        createProduct(nev, szin, ar, keszlet, leiras){
            this.nev = nev,
            this.szin = szin,
            this.ar = ar,
            this.keszlet = keszlet
            this.leiras = leiras
            console.log(nev, szin, ar, keszlet, leiras)

            const config = {
                headers: {
                    'content-type':'multipart/form-data'
                }
            }
            let photoData = new FormData();

            if(this.file != ""){
                photoData.append('file', this.file);
                this.db_data.photo = photoData;
                let form_data ={ 
                    nev : this.nev,
                    szin : this.szin,
                    ar : this.ar,
                    keszlet: this.keszlet,
                    leiras: this.leiras,
                    photo: this.db_data.photo
                    }
                    console.log(form_data)
                    axios.post('api/termekadmin/create',form_data, config).then(res=>{
                    // this.message = "A hír módosítása sikeres!";
                    // this.modalStatus = true;
                    // this.showSwiper +=1;
                    }).catch(console.error)

            }

        }

    //     update(){

    //     } ,

    //     editItem(id){

    //     },

    //     deleteItem(){

    //     }
     }

})
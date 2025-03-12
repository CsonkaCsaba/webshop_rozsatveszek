import { defineStore } from 'pinia';
import axios from 'axios';

export const ShoppingCart = defineStore("ShoppingCart",{
    state: () => {
        return {
            kosarban: false,
            cartItems: [],
            billingAddress: {
                company: 'no',
                name: '',
                taxNumber: '',
                email: '',
                phone: '',
                zipCode: '',
                city: '',
                street: '',
                house: ''
            },
            shippingAddress: {
                new: 'no',
                name: '',
                zipCode: '',
                city: '',
                street: '',
                house: ''
            },
            payment: 'delivery',
            comment: 'Egyéb megjegyzés...',
            vegosszeg: 0,
            db_data: {
                items: {},
                billingAddress: {},
                delivery: 'personal',
                shippingAddress: {},
                payment: '',
                comments: '',
                vegosszeg: 0
            },
            notApproved: false,
        }
    },

    getters: {
        countCartItems(){
            let count = 0;
            for (let i = 0; i < this.cartItems.length; i++)
            count += this.cartItems[i].quantity;
            return count;
        },
        getCartItems(){
            return this.cartItems;
        }
    },
    
    actions: {
        addToCart(item,num) {
            this.kosarban = false;
            let index = this.cartItems.findIndex(product => product.id === item.id);
            if(index == -1) {
                this.cartItems.push(item);
                let index2 = this.cartItems.findIndex(product => product.id === item.id);
                this.cartItems[index2].quantity = Number(num);
                this.kosarban = true;
            }else{
                if((item.keszlet == this.cartItems[index].quantity) || (item.keszlet-this.cartItems[index].quantity < Number(num))){
                    alert("Sajnos már nincs ennyi" + item.nevHu + " a készleten.");
                }else{
                    this.cartItems[index].quantity += Number(num);
                    this.kosarban = true;                    
                }
            }
        },
        increment(item) {
            let index = this.cartItems.findIndex(product => product.id === item.id);
            if(this.cartItems[index].quantity < this.cartItems[index].keszlet){
                this.cartItems[index].quantity += 1;
            }else{
                alert("A maximális rendelhető mennyiség: " + this.cartItems[index].keszlet + " db");
            }
        },
        decrement(item) {
            let index = this.cartItems.findIndex(product => product.id === item.id);
            if(this.cartItems[index].quantity != 1){
                this.cartItems[index].quantity -= 1;
            }
        },
        removeFromCart(item) {
            this.cartItems = this.cartItems.filter(product => product.id !== item.id);
        }, 
        countTotal(){
            let total = 0;
            for (let i = 0; i < this.cartItems.length; i++)
            total += this.cartItems[i].quantity * this.cartItems[i].ar;
            this.vegosszeg = total;
            return total;
        },
        async storeToDB(){
            this.db_data.items = this.cartItems;
            this.db_data.billingAddress = this.billingAddress;
            this.db_data.shippingAddress = this.shippingAddress;
            this.db_data.payment = this.payment;
            this.db_data.comments = this.comment;
            this.db_data.vegosszeg = this.vegosszeg;

            //Billing address is always stored
            try{
                const response = await axios.post('api/megrendeles/storeOrder', this.db_data)
                return response
            }catch(error) {
                alert(error)
            };
        }
    },                                                               
    
    persist: {
        storage: sessionStorage, // data in sessionStorage is cleared when the page session ends.
      },
})
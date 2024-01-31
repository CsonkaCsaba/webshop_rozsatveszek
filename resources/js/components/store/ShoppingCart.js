import { defineStore } from 'pinia';

export const ShoppingCart = defineStore("ShoppingCart",{
    state: () => {
        return {
            cartItems: [],
            kosarban: false,
            billingAddress: {
                company: '',
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
                new: '',
                name: '',
                zipCode: '',
                city: '',
                street: '',
                house: ''
            }
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
                    alert("Sajnos már nincs több " + item.nevHu + " termék a készleten.");
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
            return total;
        },
        clearBillingAddress(){
            this.billingAddress = [];
        }
    },                                                               
    
    persist: {
        storage: sessionStorage, // data in sessionStorage is cleared when the page session ends.
      },
})
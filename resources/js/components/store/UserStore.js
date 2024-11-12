import { defineStore } from 'pinia'
import axios from 'axios';
import {ref } from 'vue'

export const UserStore = defineStore("UserStore",{
    state: () => {
        return {
            orders: [],
        }
    },
    actions: {
        async fetchStore(){
            try {
                const ordersFromDB = await axios.get('api/user/orders');
                this.orders = []
                ordersFromDB.data.forEach(order => {
                    this.orders.push(order);
                });
            }catch(error) {
                alert(error.response.data.error)
            };
        }
    }
})
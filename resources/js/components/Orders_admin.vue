<script setup>
import { OrdersStore } from './store/Orders';
import { storeToRefs } from 'pinia';
import { reload } from './store/Orders';
const { receiveEmit, saveUpdate, deleteOrder} = OrdersStore()
const { modalStatusAccept, message} = storeToRefs(OrdersStore())
</script>

<template>

<div class="container fontcolor">
    <div class="justify-content-center text-center p-2">
        <div class="divider fontcolor"><span></span><span><font-awesome-icon :icon="['fas', 'cart-shopping']" /> RENDELÉSEK </span><span></span></div>
        <img src="../../assets/kepek/shoppingcart.png" alt="desk" width="70" height="80">
    </div>
</div>

<orders_admin_list :key="reload">
</orders_admin_list>

<modalAccept v-model="modalStatusAccept" :message="message" @modalStatus="receiveEmit" @saveUpdate="saveUpdate" @deleteOrder="deleteOrder"></modalAccept>
</template>

<style lang="sass" scoped>
.cim
    margin-top: 1%
</style>
<script setup>
import { onServerPrefetch } from 'vue'
import { storeToRefs } from 'pinia';
import { OrdersStore } from './store/Orders';
import { reload } from './store/Product';

const store = OrdersStore()
onServerPrefetch(async () => {
  await store.fetchData()
})

const { modalStatus, message} = storeToRefs(OrdersStore())
const { receiveEmit} = OrdersStore()
</script>

<template>
<div class="container fontcolor">
    <div class="justify-content-center text-center p-2">
        <div class="divider fontcolor"><span></span><span><font-awesome-icon :icon="['fas', 'bars']" /> TERMÉKEK</span><span></span></div>
        <img src="../../assets/kepek/products1.png" alt="desk" width="80" height="80">
    </div>
</div>

<products_admin_list :key="reload">
</products_admin_list>

<Modal v-model="modalStatus" :message="message" @modalStatus="receiveEmit" >
</Modal>

</template>
<style lang="sass" scoped>
</style>
<script setup>
import { onServerPrefetch } from 'vue'
import { storeToRefs } from 'pinia';
import { OrdersStore } from './store/Orders';
import { reload } from './store/Product';
import { TagsStore } from './store/Tags';
const {  rel } = storeToRefs(TagsStore());
const store = OrdersStore()
onServerPrefetch(async () => {
  await store.fetchData()
})

const { modalStatus, message} = storeToRefs(OrdersStore())
const { receiveEmit} = OrdersStore()

import { ProductStore } from './store/Product';
const { tags } = storeToRefs(ProductStore())
const { } = ProductStore()

</script>

<template>
<div class="container fontcolor">
    <div class="justify-content-center text-center p-2">
        <div class="divider fontcolor"><span></span><span><font-awesome-icon :icon="['fas', 'bars']" /> TERMÉKEK</span><span></span></div>
        <img src="../../assets/kepek/products1.png" alt="desk" width="70" height="70">
        <div class="m-4">
          <button type="button" class="btn secoundaryBtnb tagsBtn secoundaryBtna m-2" @click="tags=false" :class="{ activeBtn: !tags }"><font-awesome-icon :icon="['fas', 'bars']" /> Termékek</button>
          <button type="button" class="btn secoundaryBtnb tagsBtn secoundaryBtna m-2" @click="tags=true" :class="{ activeBtn: tags }"><font-awesome-icon :icon="['fas', 'tag']" /> Címkék</button>
        </div>
    </div>
</div>

<products_admin_list v-if="!tags" :key="reload">
</products_admin_list>
 <tagsComponent v-if="tags" :key="rel"></tagsComponent>

<Modal v-model="modalStatus" :message="message" @modalStatus="receiveEmit" >
</Modal>

</template>
<style lang="sass" scoped>
</style>
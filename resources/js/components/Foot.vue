<script setup>
import { defineAsyncComponent } from 'vue'
//import LoadingComponent from './loadingcomponent.vue';

const AsyncFooter = defineAsyncComponent({
  loader: () => import('./Footer.vue'),
  //loadingComponent: LoadingComponent /* shows while loading */,
//   delay: 1000 /* delay in ms before showing loading component */,
//   timeout: 3000 /* timeout after this many ms */,
})
</script>



<template>
    <Suspense>
        <AsyncFooter>
        </AsyncFooter>
    </Suspense>
</template>

<style lang="sass" scoped>


</style>
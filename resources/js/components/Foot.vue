<script setup>
import { defineAsyncComponent } from 'vue'
import LoaderRose from './LoaderRose.vue';
//import LoadingComponent from './loadingcomponent.vue';

const AsyncFooter = defineAsyncComponent({
  loader: () => import('./footer.vue'),
  //loadingComponent: LoadingComponent /* shows while loading */,
//   delay: 1000 /* delay in ms before showing loading component */,
//   timeout: 3000 /* timeout after this many ms */,
})
</script>



<template>
    <Suspense>
      <template #default>
        <AsyncFooter>
        </AsyncFooter>
      </template>
      <template #fallback>
         <LoaderRose>
         </LoaderRose>
      </template>
    </Suspense>
</template>

<style lang="sass" scoped>


</style>
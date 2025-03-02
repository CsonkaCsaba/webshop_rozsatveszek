<script setup>
import { defineAsyncComponent } from 'vue'

const TanacsokChild = defineAsyncComponent({
  loader: () => import('./TanacsokChild.vue'),
 
})
</script>

<template>
  
  <Suspense>
            <template #default>
                <TanacsokChild>
                </TanacsokChild>
            </template>
            <template #fallback>
                <LoaderRose>
                </LoaderRose>
            </template>
        </Suspense>

</template>

<style scoped>


</style>
<script setup>
import { defineAsyncComponent } from 'vue'

const GalleryFrontChild = defineAsyncComponent({
  loader: () => import('./Gallery_Front_child.vue'),
 
})
</script>

<template>
  
  <Suspense>
            <template #default>
                <GalleryFrontChild>
                </GalleryFrontChild>
            </template>
            <template #fallback>
                <LoaderRose>
                </LoaderRose>
            </template>
        </Suspense>

</template>

<style scoped>


</style>
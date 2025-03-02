<script setup>
import { defineAsyncComponent } from 'vue'

const AsyncAbout = defineAsyncComponent({
  loader: () => import('./About.vue'),
 
})
const News_front = defineAsyncComponent({
  loader: () => import('./News_front.vue'),
 
})
const Foot = defineAsyncComponent({
  loader: () => import('./Foot.vue'),
 
})
</script>

<template>
        <Suspense>
            <template #default>
                <AsyncAbout>
                </AsyncAbout>
            </template>
            <template #fallback>
                <LoaderRose>
                </LoaderRose>
            </template>
        </Suspense>
        <Suspense>
            <template #default>
                <News_front>
                </News_front>
            </template>
            <template #fallback>
                <LoaderRose>
                </LoaderRose>
            </template>
        </Suspense>
        <Suspense>
            <template #default>
                <Foot>
                </Foot>
            </template>
            <template #fallback>
                <LoaderRose>
                </LoaderRose>
            </template>
        </Suspense>
</template>
   

<style lang="sass" scoped>
</style>
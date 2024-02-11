<script setup>
import { register } from 'swiper/element/bundle';
register();
</script>

<template>
<Suspense>
    <companydata>
    </companydata>
</Suspense>
<Suspense>
    <gallery>
    </gallery>
</Suspense>
<Suspense>
    <news_admin>
    </news_admin>
</Suspense>

</template>

<style lang="sass" scoped>

</style>
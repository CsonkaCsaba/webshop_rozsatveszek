<script setup>
import { register } from 'swiper/element/bundle';
register();
</script>

<template>
    <ul class="nav nav-tabs justify-content-center" role="tablist">
         <li class="nav-item" role="presentation">
            <a class="nav-link active" id="simple-tab-0" data-bs-toggle="tab" href="#simple-tabpanel-0" role="tab" aria-controls="simple-tabpanel-0" aria-selected="true">Cégadatok</a>
        </li>
        <li class="nav-item" role="presentation">
            <a class="nav-link" id="simple-tab-1" data-bs-toggle="tab" href="#simple-tabpanel-1" role="tab" aria-controls="simple-tabpanel-1" aria-selected="false">Galéria</a>
        </li>
        <li class="nav-item" role="presentation">
            <a class="nav-link" id="simple-tab-2" data-bs-toggle="tab" href="#simple-tabpanel-2" role="tab" aria-controls="simple-tabpanel-2" aria-selected="false">Hírek</a>
        </li>
        <li class="nav-item" role="presentation">
            <a class="nav-link " id="simple-tab-3" data-bs-toggle="tab" href="#simple-tabpanel-3" role="tab" aria-controls="simple-tabpanel-3" aria-selected="false">Termékek</a>
        </li>
        <li class="nav-item " role="presentation">
            <a class="nav-link disabled" id="simple-tab-4" data-bs-toggle="tab" href="#simple-tabpanel-4" role="tab" aria-controls="simple-tabpanel-4" aria-selected="false">Rendelések</a>
        </li>
    </ul>
    <div class="tab-content pt-5" id="tab-content">
        <div class="tab-pane fade show active" id="simple-tabpanel-0" role="tabpanel" aria-labelledby="simple-tab-0">
            <Suspense>
                <companydata></companydata>
            </Suspense>
        </div>
        <div class="tab-pane fade" id="simple-tabpanel-1" role="tabpanel" aria-labelledby="simple-tab-1">
            <Suspense>
                <gallery></gallery>
            </Suspense>
        </div>
        <div class="tab-pane fade" id="simple-tabpanel-2" role="tabpanel" aria-labelledby="simple-tab-2">
            <Suspense>
                <news_admin></news_admin>
            </Suspense>
        </div>
        <div class="tab-pane fade" id="simple-tabpanel-3" role="tabpanel" aria-labelledby="simple-tab-3">
            <Suspense>
                <products_admin></products_admin>
            </Suspense>
        </div>
        <div class="tab-pane fade" id="simple-tabpanel-4" role="tabpanel" aria-labelledby="simple-tab-4">
            <!-- <Suspense>
                <news_admin></news_admin>
            </Suspense> -->
            <p>Rendelések</p>
        </div>
    </div>
</template>
<style lang="sass" scoped>

</style>
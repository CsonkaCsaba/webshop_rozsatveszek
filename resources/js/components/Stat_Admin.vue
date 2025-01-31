<script setup>
import { onMounted, watch } from 'vue';
import { storeToRefs} from 'pinia';
import { OrdersStore } from './store/Orders';
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

const { chartOptions, chartData, currentYear, salesSum,deliveredSum, deliverySum, prepare, canceled, notDelivered, transaction, ordersSum } = storeToRefs(OrdersStore());

ChartJS.register( Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

</script>

<template>
    <div class="container text-center mt-2">
        <div class="row">
            <div class="col-12">
                <h2 class="pt-4 mt-4">{{ currentYear }}.év</h2>
                <!-- <h3 class="">Rendelések összege mindösszesen: {{ salesSum }} ,-Ft</h3> -->
                <div class="row mt-4">
                    <div class="col border-end">
                        <font-awesome-icon :icon="['fas', 'question']" class="ps-3"/><p>Utalás ellenőrzése: {{ transaction }} db</p>
                    </div>
                    <div class="col border-end">
                        <font-awesome-icon  :icon="['fa', 'check']" class="ps-3" color="#64c916"/> <p>Teljesítve: {{ deliveredSum }} db</p>
                    </div>
                    <div class="col border-end">
                        <font-awesome-icon :icon="['fa', 'truck']" class="ps-3" color="#1679c9"/><p> Kiszállítás alatt: {{ deliverySum }} db</p>
                    </div>
                    <div class="col border-end">
                        <font-awesome-icon  :icon="['fa', 'hourglass']" class="ps-3" color="#7a7d80"/><p>Feldolgozás alatt: {{ prepare }} db</p>
                    </div>
                    <div class="col border-end">
                        <font-awesome-icon  :icon="['fa', 'ban']" class="ps-3" color="#d41e1e"/> <p>Visszamondott: {{ canceled }} db</p>
                    </div>
                    <div class="col">
                        <font-awesome-icon :icon="['fa', 'xmark']" class="ps-3" color="#d41e1e"/><p>Sikertelen kézbesítés: {{ notDelivered }} db</p>
                    </div>
                </div>
                <Bar class="my-4" id="my-chart-id" :options="chartOptions" :data="chartData" />
                <div class="row mt-4 mb-4">
                    <div class="col mt-4 border-end">
                        <p>Rendelések száma összesen: {{ ordersSum }} db</p>
                    </div>
                    <div class="col mt-4 border-end">
                        <p> Rendelések összértéke: {{ salesSum }},-Ft</p>
                    </div>
                    <div class="col mt-4 border-end ">
                        <p data-bs-toggle="tooltip" data-bs-placement="top" title="mérőszám, amelyet az ügyfelek által egy tranzakció során elköltött átlagos összeg meghatározására használnak"> Átlagos kosárérték: {{ Math.round(salesSum/ordersSum) }},-Ft</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-6">
                <piechart></piechart>
            </div>
        </div>
</div>
   
</template>

<style lang="sass" scoped>
.mainStat
    background-color: black
    color: white
</style>
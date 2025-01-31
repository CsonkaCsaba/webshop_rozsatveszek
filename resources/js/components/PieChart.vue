<script setup>
import { onMounted, watch } from 'vue';
import { storeToRefs} from 'pinia';
import { OrdersStore } from './store/Orders';
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

const { chartOptionsPie, chartDataPie} = storeToRefs(OrdersStore());

ChartJS.register(Title, Tooltip, Legend, ArcElement);

</script>

<template>
    <div class="container text-center mt-2">
        <h2 class="pt-4 mt-4">Termékek előfordulása a rendelésekben</h2>
        <Pie class="my-4" id="my-chart-id" :options="chartOptionsPie" :data="chartDataPie" />
    </div>
</template>

<style lang="sass" scoped>

</style>
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
        <div class="col-12 flex justify-content-center align-self-center align-items-center">
            <h4 class="pt-4 mt-4">Termékek előfordulása a rendelésekben éves szinten</h4>
            <Pie class="w-50 h-50" id="my-chart-id" :options="chartOptionsPie" :data="chartDataPie" />
        </div>
</template>

<style lang="sass" scoped>

</style>
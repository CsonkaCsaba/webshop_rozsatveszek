<script setup>
import { onMounted, watch } from 'vue';
import { storeToRefs} from 'pinia';
import { OrdersStore } from './store/Orders';
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

const { chartOptions, chartData} = storeToRefs(OrdersStore());


ChartJS.register( Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
</script>

<template>
        <Bar class="my-4" id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<style lang="sass" scoped>
.pointer
    cursor: pointer
</style>
<script setup>
import { storeToRefs} from 'pinia';
import { OrdersStore } from './store/Orders';
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

const { chartOptions, chartData, currentYear, salesSum } = storeToRefs(OrdersStore());

ChartJS.register( Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
</script>

<template>
    <div class="container text-center mt-2">
        <h2 class="pt-4 mt-4">{{ currentYear }}.év</h2>
        <h3 class="">Rendelések összege: {{ salesSum }} ,-Ft</h3>
        <Bar class="mb-4" id="my-chart-id" :options="chartOptions" :data="chartData" />
    </div>
</template>

<style lang="sass" scoped>

</style>
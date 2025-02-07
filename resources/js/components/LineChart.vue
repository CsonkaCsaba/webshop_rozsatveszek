<script setup>
import { storeToRefs} from 'pinia';
import { OrdersStore } from './store/Orders';
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'


const { chartOptionsLine, chartDataLine} = storeToRefs(OrdersStore());

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

</script>

<template>
        <div class="col-12 flex justify-content-center align-self-center align-items-center">
            <Line class="" id="my-chart-id" :options="chartOptionsLine" :data="chartDataLine" />
        </div>
</template>

<style lang="sass" scoped>

</style>
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


const { chartOptionsLine, chartDataLine, loading} = storeToRefs(OrdersStore());

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
          <loader class="mt-4" v-if="loading"></loader>
            <h4 class="pt-4 mt-4 text-center">Termékek előfordulása a rendelésekben havi szinten</h4>
            <Line class="" id="my-chart-id" :options="chartOptionsLine" :data="chartDataLine" />
        </div>
</template>

<style lang="sass" scoped>

</style>
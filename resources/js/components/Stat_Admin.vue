<script setup>
import { storeToRefs} from 'pinia';
import { OrdersStore } from './store/Orders';

const { minusYear, plusYear, changeView } = OrdersStore();
const { currentYear, salesSum,deliveredSum, deliverySum, prepare, canceled, notDelivered, transaction, ordersSum,  messageAboutYear, loading, reload, bevetel, termek,  mennyiseg, lineChart, linemonth, salesSumDelivered} = storeToRefs(OrdersStore());
</script>

<template>
<div class="container fontcolor">
    <div class="justify-content-center text-center pt-2">
        <div class="divider fontcolor"><span></span><span><font-awesome-icon :icon="['fas', 'chart-simple']" /> STATISZTIKA</span><span></span></div>
        <img src="../../assets/kepek/charts.webp" alt="desk" width="120" height="120">
    </div>
</div>
    <div class="container text-center">
        <div class="row">
            <div class="col-12">
                <h2 class="pt-4 mt-4"><span @click="minusYear" class="pointer"><font-awesome-icon :icon="['fas', 'angle-left']"/></span> {{ currentYear }}.év <span class="pointer" @click="plusYear"><font-awesome-icon :icon="['fas', 'angle-right']"/></span></h2>
                <!-- <h3 class="">Rendelések összege mindösszesen: {{ salesSum }} ,-Ft</h3> -->
                 <p style="color: red">{{ messageAboutYear }}</p>
                 <loader class="mt-4" v-if="loading"></loader>
            </div>
        </div>

        <div class="row">
            <div class="col border-end border-bottom">
                <font-awesome-icon :icon="['fas', 'question']" class="ps-3"/><p>Utalás ellenőrzése: {{ transaction }} db</p>
            </div>
            <div class="col border-end border-bottom">
                <font-awesome-icon  :icon="['fa', 'check']" class="ps-3" color="#64c916"/> <p>Teljesítve: {{ deliveredSum }} db</p>
            </div>
            <div class="col border-end border-bottom">
                <font-awesome-icon :icon="['fa', 'truck']" class="ps-3" color="#1679c9"/><p> Kiszállítás alatt: {{ deliverySum }} db</p>
            </div>
            <div class="col border-end border-bottom">
                <font-awesome-icon  :icon="['fa', 'hourglass']" class="ps-3" color="#7a7d80"/><p>Feldolgozás alatt: {{ prepare }} db</p>
            </div>
            <div class="col border-end border-bottom">
                <font-awesome-icon  :icon="['fa', 'ban']" class="ps-3" color="#d41e1e"/> <p>Visszamondott: {{ canceled }} db</p>
            </div>
            <div class="col border-bottom">
                <font-awesome-icon :icon="['fa', 'xmark']" class="ps-3" color="#d41e1e"/><p>Sikertelen kézbesítés: {{ notDelivered }} db</p>
            </div>
        </div>

        <div class="row text-start mt-4">
            <div class="col-2 mt-4 border-end">
                <!-- <h5>Havi statisztika</h5> -->
                <button id="bevetelek" type="button" :class="{ activeBtn: bevetel }" class="acceptBtn mt-4" @click="changeView($event)">Bevételek (Ft)</button><br>
                <button id="mennyiseg" type="button" :class="{ activeBtn: mennyiseg }" class="acceptBtn mt-4" @click="changeView($event)">Mennyiség (db)</button><br>
                <button id="termekek" type="button" :class="{ activeBtn: termek }" class="acceptBtn mt-4" @click="changeView($event)">Termékek</button>
            </div>
            <div  class="col-10" id="chartsDiv">
                <barChart v-if="bevetel || mennyiseg" :key="reload"></barChart>
                <div v-if="termek" class="row container mt-2 justify-item-center text-start ">
                    <div class="row text-center mb-4">
                        <div class="col-6">
                            <button id="" type="button" :class="{ activeBtn: linemonth }" class="acceptBtn mt-4" @click="linemonth = true, pieyear = false">Havi bontás</button><br>
                        </div>
                        <div class="col-6">
                            <button id="mennyiseg" type="button" :class="{ activeBtn: pieyear }" class="acceptBtn mt-4" @click="pieyear = true, linemonth = false">Éves összesítés</button><br>
                        </div>
                    </div>

                    <lineCharta v-if="termek && linemonth" :key="reload"></lineCharta>
                    <pieChart  v-if="termek && pieyear" :key="reload"></pieChart>
                </div>
            </div>
        </div>
        <div class="row mt-4 mb-4">
            <div class="col-2 mt-4 border-end ">
            </div>
            <div class="col mt-4 border-end border-top">
                <p class="p-2">Rendelések száma összesen: {{ ordersSum.toLocaleString() }} db</p>
            </div>
            <div class="col mt-4 border-end border-top">
                <p class="p-2"> Rendelések összértéke: {{ salesSum.toLocaleString() }},-Ft</p>
            </div>
            <div class="col mt-4 border-end border-top">
                <p class="p-2"> Teljesített rendelések: {{ salesSumDelivered.toLocaleString() }},-Ft</p>
            </div>
            <div class="col mt-4 border-end border-top">
                <p class="p-2" data-bs-toggle="tooltip" data-bs-placement="top" title="mérőszám, amelyet az ügyfelek által egy tranzakció során elköltött átlagos összeg meghatározására használnak"> Átlagos kosárérték: {{ Math.round(salesSum/ordersSum).toLocaleString() }},-Ft</p>
            </div>
        </div>
    </div>
</template>

<style lang="sass" scoped>
.mainStat
    background-color: black
    color: white

</style>
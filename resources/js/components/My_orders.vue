<template>
  <div class="container fontcolor cim">
    <div class="justify-content-center text-center p-2">
      <div class="divider fontcolor"><span></span><span><font-awesome-icon :icon="['fas', 'cart-shopping']" />
          RENDELÉSEIM </span><span></span></div>
      <img src="../../assets/kepek/shoppingcart.png" alt="desk" width="90" height="100">
    </div>
    <div class="container mb-4 pt-4 align-items-center">
      <div class="row row-cols-7 fw-bold fs-5 px-4">
        <div class="col ">
          <p>Azonosító</p>
        </div>
        <div class="col">
          <p>Dátum</p>
        </div>
        <div class="col">
          <p>Végösszeg</p>
        </div>
        <div class="col">
          <p>Fizetési mód</p>
        </div>
        <div class="col">
          <p>Állapot</p>
        </div>
        <div class="col">
          <p>Termékek</p>
        </div>
      </div>
    </div>

    <div class="container mb-4 pt-4">
      <ul class="list">
        <li class="product-li row row-cols-7 mt-2 p-4" v-for="order in userData.orders" :key="order.id">
          <div class="col">
            <p class="">{{ order.id }} </p>
          </div>
          <div class="col">
            <p class="">{{ new Date(order.rogzitDatum).getFullYear() }}-
              {{ new Date(order.rogzitDatum).getMonth() + 1 }}-
              {{ new Date(order.rogzitDatum).getDate() }}
            </p>
          </div>
          <div class="col ms-4">
            <p class="">{{ order.vegosszeg }},-Ft</p>
          </div>
          <div class="col">
            <p class="">{{ order.fizetesiMod }}</p>
          </div>
          <div class="col">
            <p class="">{{ order.allapot }}</p>
          </div>
          <div class="col">
            <button
              type="button"
              class="btn secoundaryBtna btn-lg ms-2"
              :class="{ rotateBtn: isOrderVisible(order.id) }"
              @click="toggleProduct(order.id)"
              data-bs-toggle="tooltip"
              data-bs-placement="top">
              <font-awesome-icon :icon="['fas', 'angle-down']" />
            </button>
          </div>
          <hr class="" />
          <div v-if="isOrderVisible(order.id)">
            <h5 class="text-uppercase fw-bold"><font-awesome-icon :icon="['fas', 'cart-shopping']" /> Rendelt termékek</h5>
            <div class="row mt-2 flex-fill">
              <ul class="listProduct">
                <li class="row mt-2 p-2 align-items-center fw-bold">
                  <div class="col">
                  </div>
                  <div class="col "><p>Terméknév</p></div>
                  <div class="col"><p>Mennyiség</p></div>
                  <div class="col"><p id="">Szín</p></div>
                  <div class="col"><p id="">Egységár</p></div>
                </li>
                <li class="row mt-2 p-2 align-items-center" v-for="termek in order.termek" :key="order.id">
                  <div class="col"><img class="img-thumbnail" :src="termek.img" /></div>
                  <div class="col">
                    <p class="">{{ termek.nevHu }}</p>
                  </div>
                  <div class="col">
                    <p class="">{{ termek.pivot.mennyiseg }} db</p>
                  </div>
                  <div class="col">
                    <p class="">{{ termek.szin }}</p>
                  </div>
                  <div class="col">
                    <p class="">{{ termek.ar }},-Ft/db</p>
                  </div>
                  <hr class="" />
                </li>
  
              </ul>
            </div>

            <h5 class="text-uppercase fw-bold"><font-awesome-icon :icon="['fas', 'fa-bars']" /> Számlázási adatok</h5>
            <div class="row mt-2 flex-fill">
              <ul class="listProduct">
                <li class="row mt-2 p-2 align-items-center fw-bold">
                  <div class="col"><p>Név</p></div>
                  <div class="col "><p>Irányítószám</p></div>
                  <div class="col"><p>Település</p></div>
                  <div class="col"> <p>Utca</p></div>
                  <div class="col"><p>Házszám</p></div>
                </li>
                <li class="row mt-2 p-2 align-items-center">
                  <div class="col"><p class="">{{ order.vasarlo.nev }}</p></div>
                  <div class="col"><p class="">{{ order.szamlazasi_cim.iranyitoszam }} </p></div>
                  <div class="col"><p class="">{{ order.szamlazasi_cim.telepules }}</p></div>
                  <div class="col"><p class="">{{ order.szamlazasi_cim.utca }}</p></div>
                  <div class="col"><p class="">{{ order.szamlazasi_cim.hazszam }}</p></div>
                  <hr class="" />
                </li>
              </ul>
            </div>

            <h5 class="text-uppercase fw-bold"><font-awesome-icon :icon="['fas', 'fa-bars']" /> Szállítási adatok</h5>
            <h6 v-if="order.szallitasi_cim == null">Személyes átvétel</h6>
            <div v-else class="row mt-2 flex-fill">
              <ul class="listProduct">
                <li class="row mt-2 p-2 align-items-center fw-bold">
                  <div class="col "><p>Irányítószám</p></div>
                  <div class="col"><p>Település</p></div>
                  <div class="col"> <p>Utca</p></div>
                  <div class="col"><p>Házszám</p></div>
                </li>
                <li class="row mt-2 p-2 align-items-center">
                  <div class="col"><p class="">{{ order.szallitasi_cim.iranyitoszam }} </p></div>
                  <div class="col"><p class="">{{ order.szallitasi_cim.telepules }}</p></div>
                  <div class="col"><p class="">{{ order.szallitasi_cim.utca }}</p></div>
                  <div class="col"><p class="">{{ order.szallitasi_cim.hazszam }}</p></div>
                  <hr class="" />
                </li>
              </ul>
            </div>
          </div>
        </li>
      </ul>

    </div>

  </div>
</template>

<script setup>
import { UserStore } from './store/UserStore';
import { ref, onMounted } from 'vue';

const userData = UserStore();
onMounted(() =>{
  userData.fetchStore();
});

const visibleOrderId = ref(null);

const toggleProduct = (orderId) => {
  if (visibleOrderId.value === orderId) {
    visibleOrderId.value = null;
  } else {
    visibleOrderId.value = orderId;
  }
};

const isOrderVisible = (orderId) => visibleOrderId.value === orderId;

</script>

<style lang="sass" scoped>

.list
  list-style-type: none
  width: 100%
  height: auto
  font-size: 18px
  padding-left: 2%
  padding-right: 2%
  
  
  .product-li
    box-shadow: rgba(149, 157, 165, 0.6) 0px 4px 8px
    background-color: #f5f5f5

    &:hover
      background-color: #e3d3d3

.rotateBtn
  transform: rotate(180deg)
  transition: transform 0.5s ease

</style>
<script setup>
import { ref, onMounted } from 'vue';

const activeTab = ref(localStorage.getItem('activeTab'));

onMounted(() => {
  const hash = window.location.hash;
  if (hash) {
    activeTab.value = hash;
  }
});

const setActiveTab = (tabId) => {
  activeTab.value = tabId;
  localStorage.setItem('activeTab', tabId);
};
</script>

<template>
  <ul class="nav nav-tabs justify-content-center tabs" role="tablist">
    <li class="nav-item" role="presentation">
      <a class="nav-link" :class="{ active: activeTab === 'fiokom' }" @click="setActiveTab('fiokom')" role="button">
        <font-awesome-icon :icon="['fas', 'user']" /> Fiókom
      </a>
    </li>
    <li class="nav-item" role="presentation">
      <a class="nav-link" :class="{ active: activeTab === 'adataim' }" @click="setActiveTab('adataim')" role="button">
        <font-awesome-icon :icon="['fa', 'bars']" /> Adataim
      </a>
    </li>
    <li class="nav-item" role="presentation">
      <a class="nav-link" :class="{ active: activeTab === 'rendeleseim' }" @click="setActiveTab('rendeleseim')" role="button">
        <font-awesome-icon :icon="['fas', 'cart-shopping']" /> Rendeléseim
      </a>
    </li>
    <li class="nav-item" role="presentation">
      <a class="nav-link" :class="{ active: activeTab === 'kivansaglistam' }" @click="setActiveTab('kivansaglistam')" role="button">
        <font-awesome-icon :icon="['fas', 'star']" /> Kívánságlistám
      </a>
    </li>
  </ul>

  <div class="tab-content" id="tab-content">
    <div v-show="activeTab === 'fiokom'">
      <Suspense>
        <my_account></my_account>
      </Suspense>
    </div>
    <div v-show="activeTab === 'adataim'">
      <Suspense>
        <my_data></my_data>
      </Suspense>
    </div>
    <div v-show="activeTab === 'rendeleseim'">
      <Suspense>
        <my_orders></my_orders>
      </Suspense>
    </div>
    <div v-show="activeTab === 'kivansaglistam'">
      <Suspense>
        <wishlist></wishlist>
      </Suspense>
    </div>
  </div>
</template>


<style lang="sass" scoped>
.tabs
    margin-top: 3%
.nav-link 
    background-image: linear-gradient(to right, #232526 0%, #414345  51%, #232526  100%)
    color: white
    border: 5px solid #d1ecf1
    border-radius: 25% 0 0 0
    text-transform: uppercase

.active
    color: black !important
    background-color: white !important
    background-image: none



</style>
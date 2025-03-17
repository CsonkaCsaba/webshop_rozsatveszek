<script setup>
import { storeToRefs } from 'pinia';
import { UsersStore_Admin } from './store/UsersStore_Admin';
import { ref, watch } from 'vue';
import { defineAsyncComponent } from 'vue'

const AsyncInfo = defineAsyncComponent(() =>
  import('./InformationsForUsers.vue')
)
let open = ref(false);
const { slicedUsers, selectedValue, showDown, showUp, accepted, currentPage, itemsPerPage, totalUsers, pagesShown, input, loading, reload, message, modalStatusAccept, modalStatus} = storeToRefs(UsersStore_Admin());

const { update,  addNewProductBtn, onChange, createProduct, deleteOrd, orderUsersByIdASC, orderUsersByIdDESC, updateUser, handlePageChange, inputChanged, displayusers, daysInMonth, fetchUsers, show, clearlist, receiveEmit, saveUpdate} = UsersStore_Admin();
fetchUsers();
watch(input, ()=>{
    inputChanged();
})
const isActive1 = ref(false);
const isActive2 = ref(false);
const isActive3 = ref(false);
const isActive4 = ref(false);

const toggleChip = (button) => {
    if (button === "button1"){
        isActive1.value = !isActive1.value;
        if(isActive1.value == true){
            show('Adminisztrátor');
            isActive2.value = false;
            isActive3.value = false;
            isActive4.value = false;
        }else{
            clearlist();
        }
    } 
    if (button === "button2"){
        isActive2.value = !isActive2.value;
        if(isActive2.value == true){
            show('Bolt kezelő');
            isActive1.value = false;
            isActive3.value = false;
            isActive4.value = false;
        }else{
            clearlist();
        }
    } 
    if (button === "button3"){
        isActive3.value = !isActive3.value;
        if(isActive3.value == true){
            show('Regisztrált felhasználó');
            isActive2.value = false;
            isActive1.value = false;
            isActive4.value = false;
        }else{
            clearlist();
        }
        
    } 
    if (button === "button4") {
        isActive4.value = !isActive4.value;
        if(isActive4.value == true){
            show('Vásárló');
            isActive2.value = false;
            isActive3.value = false;
            isActive1.value = false;
        }else{
            clearlist();
        }
        
    }
};
</script>

<template>
<div class="container fontcolor">
    <div class="justify-content-center text-center p-2">
        <div class="divider fontcolor"><span></span><span><font-awesome-icon :icon="['fas', 'user']" /> FELHASZNÁLÓK</span><span></span></div>
        <img src="../../assets/kepek/user.webp" alt="desk" width="80" height="80">
    </div>
</div>
<div class="container justify-content-center align-items-center">
    <div class="d-inline-flex">
        <input type="text" v-model="input" placeholder="Keresés..." class="form-control " autofocus="on"/>
        <button type="button" class="btn btn-outline-dark custom-btn ms-2 rounded-pill p-2" :class="{ 'active-btn': isActive1 }" @click="toggleChip('button1')">Adminisztrátor </button>
        <button type="button" class="btn btn-outline-dark custom-btn ms-2 rounded-pill p-2" :class="{ 'active-btn': isActive2 }" @click="toggleChip('button2')">Bolt kezelő </button>
        <button type="button" class="btn btn-outline-dark custom-btn ms-2 rounded-pill p-2" :class="{ 'active-btn': isActive3 }" @click="toggleChip('button3')">Regisztrált felhasználó</button>
        <button type="button" class="btn btn-outline-dark custom-btn ms-2 rounded-pill p-2" :class="{ 'active-btn': isActive4 }" @click="toggleChip('button4')">Vásárló </button>
        <div  @click="open = !open">
            <font-awesome-icon :icon="['fas', 'circle-info']" class="info" /> 
        </div> 
</div>
<AsyncInfo v-if="open"></AsyncInfo> 
<div class="d-inline-flex justify-content-center align-items-center ps-4" v-if="input&&slicedUsers.length == 0">
     <h4 class="text-danger">Sajnálom, nincs ilyen névvel regisztrált felhasználó a rendszerben!</h4>
  </div>
</div>
<div class="container mb-4 pt-4 align-items-center">
    <div class="col-1 d-flex justify-content-start align-items-start">
            <button v-if="showDown" class="btn btn-light fw-bold fs-5 btnuser" @click="orderUsersByIdASC">
                <font-awesome-icon :icon="['fas', 'angle-down']" />
            </button>
            <button v-if="showUp" class="btn btn-light fw-bold fs-5 btnuser" @click="orderUsersByIdDESC">
                <font-awesome-icon :icon="['fas', 'angle-up']" />
            </button>
        </div>
    
    <div class="row text-center fw-bold fs-6 pt-4">
        <div class="col-1 text-end  "><p>Azonosító</p></div>
        <div class="col-2 text-center "><p>Név</p></div>
        <div class="col-2 text-center "><p>Regisztráció</p></div>
        <div class="col text-start "><p>Email cím</p></div>
        <div class="col-2 text-start"><p>Feliratkozó</p></div>
        <div class="col-2 text-start "><p>Szerepkör</p></div>
        <div class="col text-start"><p>Műveletek</p></div>
    </div>
</div>

<loader v-if="loading"></loader>
<div class="container mb-4 pt-4">
    <ul class="list text-center">
        <li  class="row mt-2 py-4 ps-4" v-for="user in slicedUsers" :key="user.id">
            <div class="col-1 pt-4"><p class="fs-6">{{ user.id }} </p> </div>
            <div class="col-2 pt-4 px-0"><span class="fs-6 fw-bold">
                <img v-if="user.role == 'Regisztrált felhasználó'" src="../../assets/kepek/user (1)_11zon.webp" width="30" height="auto" alt="user icon" class="m-2"/>
                <img v-if="user.role == 'Bolt kezelő'"  src="../../assets/kepek/working_11zon.webp" width="30" height="auto" alt="user icon" class="m-2"/>
                <img  v-if="user.role == 'Adminisztrátor'" src="../../assets/kepek/businessman (1)_11zon.webp" width="30" height="auto" alt="user icon" class="m-2"/>
                <img  v-if="user.role == 'Vásárló'" src="../../assets/kepek/online-shopping.webp" width="40" height="auto" alt="user icon" class="m-2"/> 
                <span class="text-muted smallFont " v-if="user.role == 'Bolt kezelő'">Bolt kezelő<br></span>
                <span class=" text-muted smallFont" v-if="user.role == 'Adminisztrátor'">Adminisztrátor<br></span>
                 {{ user.name}}</span></div>
            <div class="col pt-4 px-0"><span class="fs-6">{{ user.registrationDate }}<br></span><span class="fs-6 text-muted ">{{ user.registrationTime }}</span></div>
            <div class="col pt-4 px-0"><span class="fs-6"><a href="mailto:{{ user.email }}">{{ user.email }}</a></span><br>
                <div v-if="user.email_verified_at !== null" class="col  px-0"><span class="fs-6 text-muted  fw-light">Megerősítve:  Igen</span> <font-awesome-icon :icon="['fas', 'check']" color="#64c916"/></div>
                <div v-else class="col px-0"><span class="fs-6 text-muted  fw-light">Megerősítve:  Nem </span><font-awesome-icon :icon="['fas', 'xmark']" color="#d41e1e"/></div>
            </div>
            
            <div v-if="user.subscriber !== null" class="col-1 pt-4  px-0"><span class="fs-6 text-muted ps-4 m-0 fw-light">Igen  </span><font-awesome-icon :icon="['fas', 'check']" color="#64c916"/></div>
            <div v-else class="col-1 px-0 pt-4 "><span class="fs-6 text-muted ps-4 m-0 fw-light">Nem  </span><font-awesome-icon :icon="['fas', 'xmark']" color="#d41e1e"/></div>
            <div class="col-3 d-flex align-items-center">
                <select class="form-select fs-6" :v-model="selectedValue" @change="onChange(user.id, $event)">
                    <option :value="user.role" class="fs-6">{{ user.role }}</option>
                    <option v-for="option in user.optionsFinal" :key="option.id" :value="option.option" class="fs-6">{{ option.option }}</option>
                </select>
            </div>
            <div class="col buttons align-items-center mt-3">
                <button type="button" class="btn secoundaryBtna btn-lg ms-2" @click="updateUser(user.id)" data-bs-toggle="tooltip" data-bs-placement="top" title="Mentés" ><font-awesome-icon :icon="['fas', 'floppy-disk']" /></button>
            </div> 
        </li>
    </ul>
<div class="row example-six text-center" :key="reload">
    <div class="col-10">
    <vue-awesome-paginate v-if="totalUsers > 9" v-model="currentPage" :total-items="totalUsers" :items-per-page="itemsPerPage" :max-pages-shown="pagesShown" @click="handlePageChange" :container-class="'pagination-container'">
        <template #prev-button id="nextBtn">
        <span>  Előző</span>
    </template>

    <template #next-button>
        <span> Következő  ></span>
    </template>
    </vue-awesome-paginate>
    </div>
</div>
</div>
<Modal v-model="modalStatus" :message="message" @modalStatus="receiveEmit" ></Modal> 
<modalAccept v-model="modalStatusAccept" :message="message" @modalStatus="receiveEmit" @saveUpdate="saveUpdate"></modalAccept>
</template>

<style lang="sass" scoped>

.list
    list-style-type: none
    width: 100%
    height: auto
    font-size: 18px
    padding-left: 2%
    padding-right: 2%

    li
        &:hover
            box-shadow: rgba(149, 157, 165, 0.6) 0px 4px 8px
            img
                -webkit-filter: brightness(100%)
                -webkit-transition: all 1s ease
                -moz-transition: all 1s ease
                -o-transition: all 1s ease
                -ms-transition: all 1s ease
                transition: all 1s ease
                border-radius: 0%

li:nth-child(odd)
    background: #f7f5f0

.pagination-container 
    column-gap: 5%
.admin
    color: #b39700
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.20)
    font-style: italic
.manager
    color: #696969
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.20)
    font-style: italic

.custom-btn 
    transition: none !important 
    white-space: nowrap
    overflow: visible
    text-overflow: ellipsis
    max-width: 100%
    font-size: 0.7rem !important
    
    
.custom-btn:hover 
    background-color: #232526 !important
    border-color: #232526 !important
    color: white
    
    
.active-btn 
    background-color: #232526 !important
    color: white !important
    border-color: #232526 !important

.smallFont
    font-size: 0.8rem
    font-weight: 200
    font-style: italic
    text-align: start
.info
    margin: 60%
    cursor: pointer
</style>
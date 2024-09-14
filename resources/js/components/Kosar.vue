<script setup>
import { ShoppingCart } from './store/ShoppingCart';

const cartData = ShoppingCart();

</script>

<template>
    <div class="mt-8 mb-5 mx-auto p-2 row container nav-container">
        <div class="col nav-item active">Kosár</div>
        <div class="col nav-item">Számlázás</div>
        <div class="col nav-item">Szállítás</div>
        <div class="col nav-item">Fizetés</div>
    </div>
    <div v-if="cartData.cartItems.length > 0 " class="container">
        <div v-for="item in cartData.cartItems" class="row product-container m-2">
            <img :src="item.img" class="img-fluid img-max m-2 col">
            <div class="product-name col d-flex align-items-center">{{ item.nevHu }}</div>
            <div class="col egysegar d-flex align-items-center flex-column m-auto">
                <div>Egységár</div>
                <div>{{ item.ar }} Ft</div>
            </div>
            <div class="custom-num d-inline-flex align-items-center p-2 m-auto mx-lg-5 col" >
                <font-awesome-icon class="minusSign" :icon="['fas', 'minus']" @click="cartData.decrement(item)"/>
                <input type="number" min="1" :max="item.keszlet" :value="item.quantity" class="num-input"/>      
                <font-awesome-icon class="plusSign" :icon="['fas', 'plus']" @click="cartData.increment(item)"/>
            </div>
            <div class="col d-flex align-items-center justify-content-center trash">
                <font-awesome-icon :icon="['fas', 'trash']" class="trash" @click="cartData.removeFromCart(item)" />
            </div>
        </div>
        <div class="container">
            <div class="vegosszeg d-flex justify-content-end">
                Végösszeg: {{ cartData.countTotal() }} Ft
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-6 d-flex justify-content-start"><a href="termekek"><button type="button" class="btn btn-vasarlas m-0">Tovább vásárolok</button></a></div>
                <div class="col-6 d-flex justify-content-end"><a href="szamlazas"><button type="button" class="btn btn-vasarlas m-0">Folytatás<font-awesome-icon :icon="['fas', 'angle-right']" class="ps-1" /></button></a></div>
            </div>
        </div>        
    </div>
    <div v-else class="container m-auto">
        <div class="row kosar-ures">A kosár üres.</div>
        <div class="row vasarlas">
            <a href="termekek"><button type="button" class="btn btn-vasarlas m-0">Vásárlás</button></a>
        </div>
    </div>
</template>

<style>
.nav-container, .vegosszeg{
    font-size: 20px;
    color: #787878;

}

.nav-container .nav-item{
    background: #b1b3b3;
    color: white;
    clip-path: polygon(calc(100% - 1.5rem) 0,100% 50%,calc(100% - 1.5rem) 100%,0 100%,1.5rem 50%,0 0);
    margin-top: 15%;
}

.nav-container .nav-item:first-of-type{
    clip-path: polygon(calc(100% - 1.5rem) 0,100% 50%,calc(100% - 1.5rem) 100%,0 100%,0 50%,0 0);
}

.nav-container .nav-item:last-of-type{
    clip-path: polygon(100% 0,100% 50%,100% 100%,0 100%,1.5rem 50%,0 0);
}

.nav-container .active{
    background: #E4A0B7;
}

.btn-vasarlas{
    font-size: 20px;
    border-radius: 18px;
    background: #E4A0B7;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    color: #fff;
}

.btn-vasarlas:hover{
    color: #fff;
    background: #d95f88;
    transition: .5s ease all;
}

.kosar-ures{
    font-size: 20px;
    justify-content: center;
}

.vasarlas{
    justify-content: center;
}

.img-max{
    max-width: 20%
}

.product-container{
    border: solid #e7e7e7 2px;


}

.egysegar{
    font-size: 20px;
}

.product-name{
    font-size: 20px;
}

/* setNumber */
.custom-num{
    font-size: 20px;
    margin: 0.5em;
    width: fit-content;
    border-radius: 1em;
    align-items: center;
    background-color: #d1ecf1;
}

.num-input{
    font-size: 1em;
    text-align: center;
    background: none;
    border: none;
    font-weight: bold;
    width: 100%;
}

.num-input::-webkit-outer-spin-button,
.num-input::-webkit-inner-spin-button {
    display: none;
}

.plusSign, .minusSign{
    font-size: 1em;
    cursor: pointer;
}

.num-max, .num-min{
    padding-top: 0.8em;
    height: 5em;
    padding-bottom: 0;
}

.trash{
    font-size: 30px;
}

.trash{
    cursor: pointer;
}

.trash:hover{
    color: red;
}

@media only screen and (max-width: 768px) {
    .product-name, .egysegar, .custom-num, .trash{
        font-size: 17px;
    }
}

@media only screen and (max-width: 462px) {
    .egysegar{
        display: none !important;
    }
}

</style>
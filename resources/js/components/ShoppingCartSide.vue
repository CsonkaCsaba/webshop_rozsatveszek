<script setup>
import { ShoppingCart } from './store/ShoppingCart';

const cartData = ShoppingCart();

</script>

<script>
// export default {
//     data() {
//         return { 
//             szallitas: 1500
//         }
//     }
// }
</script>

<template>
<div class="col-sm-12 col-md-12 col-lg-5 kosar-tartalma">
    <section class="px-2">
        <div class="my-3 fw-bolder"><font-awesome-icon :icon="['fas', 'cart-shopping']" class="icon"/>  Kosár tartalma</div>
        <hr class="cimalatt_hr m-auto mb-4">
        <table class="m-auto">
            <tr class="mb-3">
                <th>Termék</th>
                <th>Ár/Ft</th>
                <th>Mennyiség/db</th>
            </tr>
            <tr v-for="product in cartData.cartItems">
                <td><img :src="product.img" class="img-fluid img-max rounded w-25 h-auto">  {{ product.nevHu }}</td>
                <td>{{ product.ar }}</td>
                <td>{{ product.quantity }}</td>
                <td><font-awesome-icon class="plusSign mt-3" :icon="['fas', 'plus']" @click="cartData.increment(product)"/>
                    <font-awesome-icon class="minusSign" :icon="['fas', 'minus']" @click="cartData.decrement(product)"/></td> 
                <td><font-awesome-icon :icon="['fas', 'trash']" class="trash" @click="cartData.removeFromCart(product)" /></td>    
            </tr>
            <!-- <tr>
                <td colspan="2" class="table-foot"><b>Végösszeg: </b></td>
                <td class="table-foot"><b>{{ cartData.countTotal() }} Ft</b></td>
            </tr> -->
            <!-- <tr>
                <td colspan="2" class="table-foot no-border"><b>Szállítási költség: </b></td>
                <td class="table-foot no-border"><b>+{{ szallitas }} Ft</b></td>
            </tr> -->
            <tr>
                <td id="fizetendo" colspan="3" class="table-foot no-border"><a href="termekek">+ Tegyünk még hozzá további csodálatos rózsákat!🌹💖</a></td>
            </tr>
            <tr>
                <!-- <td id="fizetendo" colspan="3" class="table-foot no-border"><b>Fizetendő: {{ cartData.countTotal() + szallitas }} Ft</b></td> -->
                <td id="fizetendo" colspan="3" class="table-foot no-border"><b>Termékek végösszege: {{ cartData.countTotal().toLocaleString('hu-HU')}} ,-Ft</b></td>
            </tr>
        </table>
    </section>
</div>
</template>

<style>
.kosar-tartalma{
    font-size: 20px;
    border-left: 0.1rem solid #b1b3b3;
    background: #ede8ea;
}

.kosar-tartalma th, .kosar-tartalma td{
    font-size: 15px;
    padding: 0.5rem;
}

.kosar-tartalma td{
    border-top: 0.1rem solid #b1b3b3;
}

.kosar-tartalma .table-foot{
    font-size: 15px;
    padding: 0.5rem;
}

.kosar-tartalma .no-border{
    border-top: none;
}

#fizetendo{
    font-size: 15px;
}
.plusSign, .minusSign{
    font-size: 1em;
    cursor: pointer;
}
</style>
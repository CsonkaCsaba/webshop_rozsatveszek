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
<div class="col-12 col-sm-5 col-md-5 col-lg-4 kosar-tartalma">
    <section class="px-2">
        <div class="my-3">Kosár tartalma</div>
        <table class="m-auto">
            <tr class="mb-3">
                <th>Termék</th>
                <th>Ár/Ft</th>
                <th>Mennyiség/db</th>
            </tr>
            <tr v-for="product in cartData.cartItems">
                <td>{{ product.nevHu }}</td>
                <td>{{ product.ar }}</td>
                <td>{{ product.quantity }}</td>
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
                <!-- <td id="fizetendo" colspan="3" class="table-foot no-border"><b>Fizetendő: {{ cartData.countTotal() + szallitas }} Ft</b></td> -->
                <td id="fizetendo" colspan="3" class="table-foot no-border"><b>Termékek végösszege: {{ cartData.countTotal()}} Ft</b></td>
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
</style>
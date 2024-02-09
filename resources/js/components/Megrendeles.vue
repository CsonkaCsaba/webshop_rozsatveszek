<script setup>
import { ShoppingCart } from './store/ShoppingCart';

const cartData = ShoppingCart();

</script>

<template>
    <div class="mt-8 mb-5 mx-auto p-2 row container nav-container">
        <div class="col nav-item">Kosár</div>
        <div class="col nav-item">Számlázás</div>
        <div class="col nav-item">Szállítás</div>
        <div class="col nav-item active">Megrendelés</div>
    </div>
    <div v-if="cartData.cartItems.length > 0 ">
        <div id="megrendeles-content" class="container-fluid d-flex row p-md-0">
            <div class="flex-grow-1 col-12 col-sm-7 col-md-7 col-lg-8 font-20">
                <div><b>Számlázási adatok</b>
                    <div class="ms-5 text-start font-15"><b>Név: </b> {{ cartData.billingAddress.name }}</div>
                    <div v-if="cartData.billingAddress.company == 'yes'" class="ms-5 text-start font-15"><b>Adószám: </b> {{ cartData.billingAddress.taxNumber }}</div>
                    <div class="ms-5 text-start font-15"><b>E-mail cím: </b> {{ cartData.billingAddress.email }}</div>
                    <div class="ms-5 text-start font-15"><b>Irányítószám: </b> {{ cartData.billingAddress.phone }}</div>
                    <div class="ms-5 text-start font-15"><b>Település: </b> {{ cartData.billingAddress.city }}</div>
                    <div class="ms-5 text-start font-15"><b>Utca: </b> {{ cartData.billingAddress.street }}</div>
                    <div class="ms-5 text-start font-15"><b>Házszám: </b> {{ cartData.billingAddress.house }}</div>
                </div>
                <div v-if="cartData.shippingAddress.new == 'no'" class="my-3"><b>Szállítási adatok</b>
                    <div class="font-15">A számlázási adatokkal megegyezik.</div>
                </div>
                <div v-else class="my-3"><b>Szállítási adatok</b>
                    <div class="ms-5 text-start font-15"><b>Név: </b> {{ cartData.shippingAddress.name }}</div>
                    <div class="ms-5 text-start font-15"><b>Irányítószám: </b> {{ cartData.shippingAddress.phone }}</div>
                    <div class="ms-5 text-start font-15"><b>Település: </b> {{ cartData.shippingAddress.city }}</div>
                    <div class="ms-5 text-start font-15"><b>Utca: </b> {{ cartData.shippingAddress.street }}</div>
                    <div class="ms-5 text-start font-15"><b>Házszám: </b> {{ cartData.shippingAddress.house }}</div>
                </div>
                <div class="my-3"><b>Fizetési mód</b>
                    <label class="container" for="delivery">
                        Utánvét
                        <input type="radio" id="delivery" value="delivery" v-model="cartData.payment" name="payment"/>
                    </label>
                    <label class="container" for="transfer">
                        Előre utalás
                        <input type="radio" id="transfer" value="transfer" v-model="cartData.payment" name="payment"/>
                    </label>
                </div>
            </div>
            <ShoppingCartSide />        
        </div>
        <div class="container">
            <div class="row mt-3 align-items-center">
                <div class="col-6 d-flex justify-content-start"><a href="szallitas"><button type="button" class="btn btn-vasarlas m-0">Vissza</button></a></div>
                <div class="col-6 d-flex justify-content-end"><button type="submit" class="btn btn-vasarlas m-0">Megrendelés</button></div>
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

<style scoped>

.font-20{
    font-size: 20px;
}
.font-15{
    font-size: 15px;
}

</style>
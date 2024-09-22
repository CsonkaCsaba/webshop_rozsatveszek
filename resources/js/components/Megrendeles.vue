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
                    <div class="ms-5 text-start font-15"><b>Telefonszám: </b> {{ cartData.billingAddress.phone }}</div>
                    <div class="ms-5 text-start font-15"><b>Irányítószám: </b> {{ cartData.billingAddress.zipCode }}</div>
                    <div class="ms-5 text-start font-15"><b>Település: </b> {{ cartData.billingAddress.city }}</div>
                    <div class="ms-5 text-start font-15"><b>Utca: </b> {{ cartData.billingAddress.street }}</div>
                    <div class="ms-5 text-start font-15"><b>Házszám: </b> {{ cartData.billingAddress.house }}</div>
                </div>
                <div v-if="cartData.shippingAddress.new == 'no'" class="my-3"><b>Szállítási adatok</b>
                    <div class="font-15">A számlázási adatokkal megegyeznek.</div>
                </div>
                <div v-else class="my-3"><b>Szállítási adatok</b>
                    <div class="ms-5 text-start font-15"><b>Név: </b> {{ cartData.shippingAddress.name }}</div>
                    <div class="ms-5 text-start font-15"><b>Irányítószám: </b> {{ cartData.shippingAddress.zipCode }}</div>
                    <div class="ms-5 text-start font-15"><b>Település: </b> {{ cartData.shippingAddress.city }}</div>
                    <div class="ms-5 text-start font-15"><b>Utca: </b> {{ cartData.shippingAddress.street }}</div>
                    <div class="ms-5 text-start font-15"><b>Házszám: </b> {{ cartData.shippingAddress.house }}</div>
                </div>
                <div class="comments container">
                    <b>Egyéb megjegyzések</b>
                    <form>
                        <textarea class="mt-2" v-model="cartData.comment"></textarea>
                    </form>
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
                <div class="col-6 d-flex justify-content-end"><button type="submit" class="btn btn-vasarlas m-0" @click="toDB">Megrendelés</button></div>
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

<script setup>
import { ShoppingCart } from './store/ShoppingCart';
import { useRouter } from 'vue-router';
import { ref } from "vue";

const router = useRouter();
const cartData = ShoppingCart();

let errorMsg = ref("");

function toDB() {

  cartData.storeToDB()
    .then((response) => {
        console.log(response.data);
        window.location.href = 'sikeresrendeles';
        cartData.cartItems = []
    })
    .catch((error) => {
        console.log(error)
    });
}
</script>

<style scoped>

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
.nav-container, .vegosszeg{
    font-size: 20px;
    color: #787878;
}

.nav-container .nav-item{
    background: #b1b3b3;
    color: white;
    clip-path: polygon(calc(100% - 1.5rem) 0,100% 50%,calc(100% - 1.5rem) 100%,0 100%,1.5rem 50%,0 0);
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
.font-20{
    font-size: 20px;
}
.font-15{
    font-size: 15px;
}

#megrendeles-content textarea{
  width: 100%;
  height: 100px;
  padding: 12px 20px;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  background-color: #f8f8f8;
  font-size: 16px;
  resize: none;
}

.kosar-ures{
    font-size: 20px;
    justify-content: center;
}

</style>
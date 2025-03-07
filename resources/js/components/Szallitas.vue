<script setup>
import { ShoppingCart } from './store/ShoppingCart';

const cartData = ShoppingCart();

</script>

<template>
    <div class="mt-8 mb-5 mx-auto p-2 row container nav-container">
        <div class="col nav-item">Kosár</div>
        <div class="col nav-item">Számlázás</div>
        <div class="col nav-item active">Szállítás</div>
        <div class="col nav-item">Megrendelés</div>
    </div>
    <div v-if="cartData.cartItems.length > 0">
        <div id="szallitas-content" class="container-fluid d-flex row p-md-0">
            <div class="flex-grow-1 col-12 col-sm-7 col-md-7 col-lg-8">
                <div class="title my-3">Szállítási adatok</div>
                <section class="szallitasi-adatok">
                    <div class="col my-3">
                        <div>
                            <input class="form-check-input" type="radio" id="personal" value="personal" v-model="cartData.db_data.delivery" />
                            <label class="form-check-label px-3" for="personal">
                                Személyes átvétel
                            </label>
                        </div>
                        <div>
                            <input class="form-check-input" type="radio" id="tohouse" value="tohouse" v-model="cartData.db_data.delivery" />
                            <label class="form-check-label px-3" for="tohouse">
                                Házhoz szállítás
                            </label>
                        </div>
                    </div>
                    <div v-if="cartData.db_data.delivery=='tohouse'">
                        <div class="row my-3" id="address">
                        <div class="col d-inline-flex">
                            <div class="checkbox-wrapper-21">
                                <label class="control control--checkbox ps-5 container" for="othAdd">
                                    Számlázási címtől eltérő szállítási cím.
                                    <input type="checkbox" id="othAdd" value="othAdd"
                                        v-model="cartData.shippingAddress.new" true-value="yes" false-value="no"
                                        name="othAdd" />
                                    <div class="control__indicator ms-3"></div>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="mb-3">
                        <form id="shipping-form" action="http://localhost/webshop_rozsatveszek/public/megrendeles"
                            class="d-lg-inline-flex">
                            <div class="d-inline-flex flex-column">
                                <div class="row d-inline-flex center mb-2">
                                    <input id="cart-lastname" v-if="cartData.shippingAddress.new == 'no'" type="text"
                                        v-model="cartData.billingAddress.name" class="form-control ms-3 col" disabled
                                        required />
                                </div>
                                <div class="row d-inline-flex center mb-2">
                                    <label for="cart-zipcode" class="p-1 col text-end">Irányítószám</label>
                                    <input id="cart-zipcode" v-if="cartData.shippingAddress.new == 'no'" type="text"
                                        v-model="cartData.billingAddress.zipCode" class="form-control ms-3 col" disabled
                                        required />
                                    <input id="cart-zipcode" v-else type="text"
                                        v-model="cartData.shippingAddress.zipCode" class="form-control ms-3 col"
                                        required />
                                </div>
                                <div class="row d-inline-flex center mb-2">
                                    <label for="cart-city" class="p-1 col text-end">Település</label>
                                    <input id="cart-city" v-if="cartData.shippingAddress.new == 'no'" type="text"
                                        v-model="cartData.billingAddress.city" class="form-control ms-3 col" disabled
                                        required />
                                    <input id="cart-city" v-else type="text" v-model="cartData.shippingAddress.city"
                                        class="form-control ms-3 col" required />
                                </div>
                                <div class="row d-inline-flex center mb-2">
                                    <label for="cart-street" class="p-1 col text-end">Utca</label>
                                    <input id="cart-street" v-if="cartData.shippingAddress.new == 'no'" type="text"
                                        v-model="cartData.billingAddress.street" class="form-control ms-3 col" disabled
                                        required />
                                    <input id="cart-street" v-else type="text" v-model="cartData.shippingAddress.street"
                                        class="form-control ms-3 col" required />
                                </div>
                                <div class="row d-inline-flex center mb-2">
                                    <label for="cart-house" class="p-1 col text-end">Házszám</label>
                                    <input id="cart-house" v-if="cartData.shippingAddress.new == 'no'" type="text"
                                        v-model="cartData.billingAddress.house" class="form-control ms-3 col" disabled
                                        required />
                                    <input id="cart-house" v-else type="text" v-model="cartData.shippingAddress.house"
                                        class="form-control ms-3 col" required />
                                </div>
                            </div>
                        </form>
                    </div>
                    </div>

                </section>
            </div>
            <ShoppingCartSide />
        </div>
        <div class="container">
            <div class="row mt-3 align-items-center">
                <div class="col-6 d-flex justify-content-start"><a href="szamlazas"><button type="button"
                            class="btn btn-vasarlas m-0"><font-awesome-icon :icon="['fas', 'angle-left']" class="iconBack"/> Vissza</button></a>
                </div>
                <div v-if="cartData.db_data.delivery=='tohouse'" class="col-6 d-flex justify-content-end"><button type="submit" form="shipping-form"
                        class="btn btn-vasarlas m-0">Folytatás<font-awesome-icon :icon="['fas', 'angle-right']"
                            class="ps-1 icon" /></button>
                </div>
                <div v-else class="col-6 d-flex justify-content-end"><a href="megrendeles"><button type="button"
                            class="btn btn-vasarlas m-0">Folytatás<font-awesome-icon :icon="['fas', 'angle-right']"
                            class="ps-1 icon" /></button></a>
                </div>
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
.btn-vasarlas {
    font-size: 20px;
    border-radius: 18px;
    background: #E4A0B7;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    color: #fff;
}

.btn-vasarlas:hover {
    color: #fff;
    background: #d95f88;
    transition: .5s ease all;
}

.nav-container,
.vegosszeg {
    font-size: 20px;
    color: #787878;
}

.nav-container .nav-item {
    background: #b1b3b3;
    color: white;
    clip-path: polygon(calc(100% - 1.5rem) 0, 100% 50%, calc(100% - 1.5rem) 100%, 0 100%, 1.5rem 50%, 0 0);
}

.nav-container .nav-item:first-of-type {
    clip-path: polygon(calc(100% - 1.5rem) 0, 100% 50%, calc(100% - 1.5rem) 100%, 0 100%, 0 50%, 0 0);
}

.nav-container .nav-item:last-of-type {
    clip-path: polygon(100% 0, 100% 50%, 100% 100%, 0 100%, 1.5rem 50%, 0 0);
}

.nav-container .active {
    background: #E4A0B7;
}

#szallitas-content .szallitasi-adatok,
#szallitas-content .title {
    font-size: 20px;
}

#szallitas-content {
    border: 0.1rem solid #e6e6e6;
    padding: 0px;
}

#szallitas-content .cim-adatok {
    font-size: 20px;
}

#rendeles-form label {
    font-size: 18px;
}

#billing-form input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    display: none;
}

.checkbox-wrapper-21 .control {
    display: block;
    position: relative;
    padding-left: 30px;
    cursor: pointer;
    font-size: 18px;
}

.checkbox-wrapper-21 .control input {
    position: absolute;
    z-index: -1;
    opacity: 0;
}

.checkbox-wrapper-21 .control__indicator {
    position: absolute;
    top: 2px;
    left: 0;
    height: 20px;
    width: 20px;
    background: #e6e6e6;
}

.checkbox-wrapper-21 .control:hover input~.control__indicator,
.checkbox-wrapper-21 .control input:focus~.control__indicator {
    background: #ccc;
}

.checkbox-wrapper-21 .control input:checked~.control__indicator {
    background: #2aa1c0;
}

.checkbox-wrapper-21 .control:hover input:not([disabled]):checked~.control__indicator,
.checkbox-wrapper-21 .control input:checked:focus~.control__indicator {
    background: #0e647d;
}

.checkbox-wrapper-21 .control input:disabled~.control__indicator {
    background: #e6e6e6;
    opacity: 0.6;
    pointer-events: none;
}

.checkbox-wrapper-21 .control__indicator:after {
    content: '';
    position: absolute;
    display: none;
}

.checkbox-wrapper-21 .control input:checked~.control__indicator:after {
    display: block;
}

.checkbox-wrapper-21 .control--checkbox .control__indicator:after {
    left: 8px;
    top: 4px;
    width: 3px;
    height: 8px;
    border: solid #fff;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
}

.checkbox-wrapper-21 .control--checkbox input:disabled~.control__indicator:after {
    border-color: #7b7b7b;
}

@media only screen and (max-width: 966px) {
    #szallitas-content .szallitasi-adatok {
        font-size: 18px;
    }
}

@media only screen and (max-width: 640px) {
    #szallitas-content .szallitasi-adatok {
        font-size: 15px;
    }

    .nav-container {
        font-size: 15px;
    }
}

.kosar-ures {
    font-size: 20px;
    justify-content: center;
}
</style>
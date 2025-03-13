
<template>
    <div class="mt-8 mb-5 mx-auto p-2 row container nav-container">
        <div class="col nav-item">Kosár</div>
        <div class="col nav-item">Számlázás</div>
        <div class="col nav-item">Szállítás</div>
        <div class="col nav-item active">Megrendelés</div>
    </div>
    <div v-if="cartData.cartItems.length > 0 ">
        <div id="megrendeles-content" class="container">
            <div class="row pb-4">
            <div class="col-sm-12 col-md-12 col-lg-7 font-20 mt-2">
                <div class="pt-2"><b>Megrendelés összesítése</b>
                    <hr class="cimalatt_hr m-auto mb-4 mt-3">
                    <div class="row">
                        <div class="fw-bold text-center">Számlázási adatok</div>
                        <div class="ms-5 text-start font-15"><b>Név: </b> {{ cartData.billingAddress.name }}</div>
                        <div v-if="cartData.billingAddress.company == 'yes'" class="ms-5 text-start font-15"><b>Adószám: </b> {{ cartData.billingAddress.taxNumber }}</div>
                        <div class="ms-5 text-start font-15"><b>E-mail cím: </b> {{ cartData.billingAddress.email }}</div>
                        <div class="ms-5 text-start font-15"><b>Telefonszám: </b> {{ cartData.billingAddress.phone }}</div>
                        <div class="ms-5 text-start font-15"><b>Irányítószám: </b> {{ cartData.billingAddress.zipCode }}</div>
                        <div class="ms-5 text-start font-15"><b>Település: </b> {{ cartData.billingAddress.city }}</div>
                        <div class="ms-5 text-start font-15"><b>Utca: </b> {{ cartData.billingAddress.street }}</div>
                        <div class="ms-5 text-start font-15"><b>Házszám: </b> {{ cartData.billingAddress.house }}</div>
                    </div>
                </div>
                <div v-if="cartData.db_data.delivery=='tohouse' && cartData.shippingAddress.new == 'no'" class="fw-bold text-center mt-4"><b>Szállítási adatok</b>
                    <div class="font-15">A számlázási adatokkal megegyeznek.</div>
                </div>
                <div v-if="cartData.db_data.delivery=='tohouse' && cartData.shippingAddress.new == 'yes'" class="fw-bold text-center  mt-4"><b>Szállítási adatok</b>
                    <div class="ms-5 text-start font-15"><b>Név: </b> {{ cartData.shippingAddress.name }}</div>
                    <div class="ms-5 text-start font-15"><b>Irányítószám: </b> {{ cartData.shippingAddress.zipCode }}</div>
                    <div class="ms-5 text-start font-15"><b>Település: </b> {{ cartData.shippingAddress.city }}</div>
                    <div class="ms-5 text-start font-15"><b>Utca: </b> {{ cartData.shippingAddress.street }}</div>
                    <div class="ms-5 text-start font-15"><b>Házszám: </b> {{ cartData.shippingAddress.house }}</div>
                </div>
                <div v-if="cartData.db_data.delivery=='personal' && cartData.shippingAddress.new == 'no'" class="fw-bold text-center  mt-4"><b>Szállítási adatok</b>
                    <div class="text-start font-15 ms-5">Személyes átvétel.</div>
                </div>
                <div class="comments text-center ms-5 mt-4">
                    <b>Egyéb megjegyzések</b>
                    <form>
                        <textarea class="w-75" v-model="cartData.comment"></textarea>
                    </form>
                </div>
                <div class="my-1"><b>Fizetési mód</b>
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
                <div class="row text-center">
                <div class="col-8 fs-6 fw-light text-muted ">
                    <label for="consent" class="" ></label>
                    <input id="consent" type="checkbox" class="form-check-input ms-2 messageCheckbox" v-model="approvedConsent" name="consent" required>
                    <span class="fw-light text-muted"> Elolvastam, tudomásulvettem és elfogadom az „Adatvédelmi és adtakezelési szabályzat” tartalmát.<br></span>
                </div>
                <div  v-if="errorMsgConsent" class="row mt-1 ms-5">
                <div class="col-10 text-start ms-5">
                    <span  class="text-danger fs-6 fw-light text-start fw-bold" ><font-awesome-icon :icon="['fas', 'angle-up']" /> A továbblépéshez kérjük, hogy ismerje meg és fogadja el az Adatvédelmi és adtakezelési         szabályzatunkat!</span>
                </div>
            </div>
        </div>    
            </div>
             
        </div>
        <div class="container"> 
            <div class="row mt-3 align-items-center">
                <div class="col-6 d-flex justify-content-start"><a href="szallitas"><button type="button" class="btn btn-vasarlas m-0"><font-awesome-icon :icon="['fas', 'angle-left']" class="iconBack"/> Vissza</button></a></div>
                <div class="col-6 d-flex justify-content-end">
                    <button type="submit" class="btn btn-vasarlas m-0 gombHover" @click="toDB"><font-awesome-icon :icon="['fas', 'truck']" class="icon"/> <span id="gombfelirat">Megrendelés</span></button></div>
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
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { ref } from "vue";
const { approved } = storeToRefs(ShoppingCart())
const { } = ShoppingCart()
//let consent = document.getElementById("consent");
let approvedConsent = ref(false);
let errorMsgConsent = ref(false);
const router = useRouter();
const cartData = ShoppingCart();


let errorMsg = ref("");

function toDB() {
    
    if(approvedConsent.value === true){
        cartData.storeToDB()
            .then((response) => {
                window.location.href = 'sikeresrendeles';
                cartData.cartItems = []
            })
            .catch((error) => {
                console.log(error)
            });
        }else{
            errorMsgConsent.value = true;
        }
}

</script>

<style scoped>

.btn-vasarlas{
    font-size: 20px;
    border-radius: 18px;
    background: #d95f88 ;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    color: #fff;
}

.btn-vasarlas:hover{
    color: #fff;
    background: #E4A0B7;
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
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5)
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
  border: 0.1rem solid #e6e6e6;
  border-radius: 4px;
  background-color: #f8f8f8;
  font-size: 16px;
  resize: none;
}
#megrendeles-content {
    border: 0.1rem solid #e6e6e6;
    padding: 0px;
}
.kosar-ures{
    font-size: 20px;
    justify-content: center;
}

.gombHover:hover{
    background: #f7f5f0;
    color: #ffffff;
    transition: all 0.5s ease-out;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.45));
    transform: scale(1.1, 1.1);
    .icon{
        transform: translateX(180%);
        scale: 1.2;
        transition: all 0.5s ease-out;
        filter: drop-shadow(0px 4px 4px rgba(255, 255, 255, 0.45));
        color: #212529
    };
    #gombfelirat{
        visibility: hidden;
        transition: all 0.1s ease-out;
    }
}
</style>
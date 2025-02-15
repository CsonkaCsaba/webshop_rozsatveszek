<script setup>
import { CookieStore } from './store/CookieStore';
import { storeToRefs} from 'pinia';
const { acceptAllCookies, cookieSettings, changeView, switchbasicOperationAcception, switchStatisticOperationAcception, switchMarketingOperationAcception, acceptAllCookiesfromSettings, declineAllCookiesfromSettings, saveCookieSettings } = CookieStore()
const {cookieaktiv, cookieSettingsOpen, defaultTextWindow, basicOperationWindow, statisticWindow, marketingWindow, basicOperationAccepted, statisticOperationAccepted, marketingOperationAccepted, acceptedAll} = storeToRefs(CookieStore())


let CookieWindowviewed = "";
let show = true;

function getCookie(name) {
    const value = document.cookie.split('; ').find(row => row.startsWith(name + '='));
    return value ? JSON.parse(decodeURIComponent(value.split('=')[1])) : null;
}

const CookieSettings = getCookie('cookieSettings');
if (CookieSettings) {
    CookieWindowviewed = CookieSettings.saved; 
}
if( CookieWindowviewed == true){
    show = false;
}
</script>

<template>
<v-dialog v-if="show" v-model="cookieaktiv" persistent max-width="600px" class="transition coockie">
    <v-card>
      <v-card-title class="headline fw-bold"><img src="../../assets/kepek/cookie_icon.png" alt="cookieicon">Sütik kezelése</v-card-title>
      <v-card-text>
        Weboldalunkon sütiket (cookie) használunk az oldal működéséhez, a munkamenetek támogatásához és azonosításához, a tartalom és a hirdetések személyre szabásához, a közösségi médiafunkciók és a forgalom elemzéséhez. A sütikkel tesszük weboldalunk használatát kényelmesebbé. 
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <button type="button" class="acceptBtn" @click="acceptAllCookies">Összes elfogadása</button>
        <button type="button" class="btn btn-outline-dark" @click="cookieSettings">Beállítások</button>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog v-model="cookieSettingsOpen" persistent max-width="800px" class="transition coockie">
    <v-card>
      <v-card-title class="headline fw-bold"><font-awesome-icon :icon="['fas', 'cookie']" /> Sütik egyedi beállításai</v-card-title>
       <div class="row">
        <div class="col-3 m-2 p-2 align-middle text-start ">
            <button id="defaultTextWindow" type="button" class="acceptBtn m-2 p-4" @click="changeView($event)">Adatvédelmi áttekintés</button>
            <button id="basicOperationWindow" type="button" class="acceptBtn m-2 p-4" @click="changeView($event)">Alapműködést biztosító sütik</button>
            <button id="statisticWindow"type="button" class="acceptBtn m-2 p-4" @click="changeView($event)">Statisztikai célú sütik</button>
            <button id="marketingWindow" type="button" class="acceptBtn m-2 p-4" @click="changeView($event)">Marketing célú sütik</button>
        </div>
        <div class="col-8 m-2 p-2 justify-content-center text-center bg-light">
            <div  v-if="defaultTextWindow" >
                <h2>Adatvédelmi áttekintés</h2>
                Weboldalunkon sütiket (cookie) használunk a látogatói forgalom elemzéséhez, az egyes felhasználói munkamenetek azonosításához, a tartalom és a hirdetések személyre szabásához, valamint a közösségi médiafunkciókhoz. Az "Összes elfogadása" gombra kattintva, Ön beleegyezik ezen cookie-k használatába, vagy az alábbi lehetőségek közül kiválaszthatja, mely sütiket engedélyezi. (Egyes sütik technikai okok miatt az első újratöltésig létrejöhetnek.)
            </div>
            <div  v-if="basicOperationWindow" >
                <h2>Alapműködést biztosító sütik</h2>
                A működéshez szükséges sütik a weboldal használatát segítik azzal, hogy alapvető funkciókat aktiválnak.
                <div class="text-start form-check form-switch mt-4">
                    <input class="form-check-input p-2 m-2" type="checkbox" id="basicOperation" v-model="basicOperationAccepted" :checked="basicOperationAccepted" @click="switchbasicOperationAcception">
                    <label v-if="basicOperationAccepted" class="form-check-label m-1" for="basicOperation" :class="{activeInput: basicOperationAccepted}"> Alapműködést biztosító sütik elfogadva</label>
                    <label v-if="!basicOperationAccepted" class="form-check-label m-1" for="basicOperation"> Alapműködést biztosító sütik elutasítva</label>
                </div>
            </div>
            <div  v-if="statisticWindow" >
                <h2>Statisztikai célú sütik</h2>
                A statisztikai süti visszajelzést nyújtanak a weboldal tulajdonosának, hogy átlássa, a látogatók milyen tartalmat kedvelnek a weboldalon. Az adatok nem kapcsolódnak konkrét személyhez. Oldalunkon a Matomo (korábban Piwik) webanalitikai rendszer sütijeit használjuk.
                <div class="text-start form-check form-switch mt-4">
                    <input class="form-check-input p-2 m-2" type="checkbox" id="bannerCheckbox" v-model="statisticOperationAccepted" :checked="statisticOperationAccepted" @click="switchStatisticOperationAcception">
                    <label v-if="statisticOperationAccepted" class="form-check-label m-1 ps-2" for="bannerCheckbox" :class="{activeInput: statisticOperationAccepted}">Statisztikai célú sütik elfogadva</label>
                    <label v-if="!statisticOperationAccepted" class="form-check-label m-1 ps-2" for="bannerCheckbox"> Statisztikai célú sütik kikapcsolva</label>
                </div>
            </div>
            <div  v-if="marketingWindow" >
                <h2>Marketing célú sütik</h2>
                A marketing sütik weboldalakon átívelően követik nyomon a felhasználókat, például hirdetések megjelenítése, mindezt azért, hogy számukra releváns tartalmat mutassanak. (A Google-nek, Facebook-nak, Youtube-nak, Twitter-nek, Instagram-nak vannak ilyen sütijei.)
                <div class="text-start form-check form-switch mt-4">
                    <input class="form-check-input p-2 m-2" type="checkbox" id="bannerCheckbox" v-model="marketingOperationAccepted" :checked="marketingOperationAccepted" @click="switchMarketingOperationAcception">
                    <label v-if="marketingOperationAccepted" class="form-check-label m-1 ps-2" for="bannerCheckbox" :class="{activeInput: marketingOperationAccepted}"> Marketing célú sütik elfogadva</label>
                    <label v-if="!marketingOperationAccepted" class="form-check-label m-1 ps-2" for="bannerCheckbox"> Marketing célú sütik kikapcsolva</label>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col text-end">
                <button v-if="!acceptedAll" type="button" class="acceptAllBtn m-4" @click="acceptAllCookiesfromSettings">Összes süti elfogadása</button>
                <button v-if="acceptedAll" type="button" class="declineAllBtn m-4" @click="declineAllCookiesfromSettings">Összes süti kikapcsolása</button>
                <button type="button" class="acceptBtn m-4" @click="saveCookieSettings" data-bs-toggle="tooltip" data-bs-placement="top" title="A beállítások mentése erre a böngészőre vonatkozik">Beállítások elmentése</button>
            </div>
        </div>
       </div>
      
    </v-card>
  </v-dialog>
  <div class="sutiikonDiv">
    <img src="../../assets/kepek/cookie_icon.png" alt="cookieicon" class="sutiikon" @click="cookieSettingsOpen = true" data-bs-toggle="tooltip" data-bs-placement="top" title="Süti beállítások megnyitása">
  </div>
</template>

<style lang="sass" scoped>
.coockie
    z-index: 9999

input[type=checkbox]
    accent-color: green
    background-color: white
    font-size: 20px
input[type=checkbox]:checked
    accent-color: green
    background-color: green

.activeInput
    color: green
.acceptAllBtn
    background-color: green
    color: white
    padding-left: 0.75rem
    padding-right: 0.75rem
    padding-top: 0.35rem
    padding-bottom: 0.35rem
    line-heigh: 1.6
    cursor: pointer
    border-radius: 5px


.declineAllBtn
    background-color: red
    color: white
    padding-left: 0.75rem
    padding-right: 0.75rem
    padding-top: 0.35rem
    padding-bottom: 0.35rem
    line-heigh: 1.6
    cursor: pointer
    border-radius: 5px

.sutiikonDiv
    position: relative

.sutiikon
    position: fixed
    bottom: 0px
    left: 5px
    float: left
    z-index: 99999
    width: 70px
    cursor: pointer
</style>
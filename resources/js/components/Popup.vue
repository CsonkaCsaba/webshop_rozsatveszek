<script setup>
import { BannerPopupStore } from './store/BannerPopupStore';
import { CookieStore } from './store/CookieStore';
import { storeToRefs} from 'pinia';
const {cookieaktiv, cookieSettingsOpen} = storeToRefs(CookieStore())

const { closePreviewButtonPopup} = BannerPopupStore()
const { showPreviewPopup} = storeToRefs(BannerPopupStore())

const props = defineProps({
    hatterszin: {
        type: String,
        required: true
      },
      betuszin: {
        type: String,
        required: true
      },
      popupWithPhoto: {
        type: Boolean,
        required: true
      },
      kepUtvonal: {
        type: String,
        required: true
      },
      cim: {
        type: String,
        required: true
      },
      szoveg: {
        type: String,
        required: true
      },
      fotomutat: {
        type: Boolean,
        required: true
      },
      betutipus: {
        type: String,
        required: true
      },
      betuszin: {
        type: String,
        required: true
      },
      betustilus: {
        type: String,
        required: true
      },
      betumeret: {
        type: Number,
        required: true
      },
      isAdmin: {
        type: Boolean,
        required: true
      }
});
const emit = defineEmits(['modalStatus','hidePop']);

function modalStatus() {
     emit('modalStatus');
   }
function hidePop() {
    emit('hidePop');
}
let popupState = "";
let viewed = "";
let show = true;

function getCookie(name) {
    const value = document.cookie.split('; ').find(row => row.startsWith(name + '='));
    return value ? JSON.parse(decodeURIComponent(value.split('=')[1])) : null;
}

const PopupCookie = getCookie('hideThePopup');
if (PopupCookie) {
    popupState = PopupCookie.popupState;
    viewed = PopupCookie.viewed; 
}
if( popupState == "hided" && viewed == true){
    show = false;
}
</script>
<template>
     <v-dialog v-if="showPreviewPopup || show && !cookieaktiv && !cookieSettingsOpen" width="auto" v-model="showPreviewPopup" class="transition container-fluid popup">
                <div v-if="!isAdmin" class="vdialogclosebutton" @click="hidePop()" >X</div>
                <div v-if="isAdmin" class="vdialogclosebutton" @click="modalStatus()" >X</div>
                <v-card :style="{'background-color' : hatterszin, 'color': betuszin, 'font-family': betutipus, 'font-style': betustilus, 'font-size': betumeret+'px' } ">
                    <v-container class="container-fluid">
                        <div class="row">
                            <div class="col">
                                <br>
                                <img v-if="fotomutat || popupWithPhoto" :src="kepUtvonal" class="float-start m-4 modalkep img-fluid rounded mx-auto d-block"/>
                                <div class="mt-4">
                                    <h3 class="news-title mt-4" :style="{'color': betuszin, 'font-family': betutipus, 'font-style': betustilus, 'font-size': betumeret+'px'} "><b>{{cim}}</b></h3>
                                    <hr class="m-auto hr float-start"/><br>
                                    <p class="m-1"> {{szoveg}}</p> 
                                </div>
                                <v-card-actions>
                                            <button v-if="!isAdmin"  type="button" class="btn rozsaszingomb mt-3"  @click="hidePop()" data-bs-toggle="tooltip" data-bs-placement="bottom" title="A böngésző bezárása után a beállítás elveszhet." :style="{'color': betuszin, 'font-family': betutipus, 'font-style': betustilus, 'font-size': betumeret+'px' }">Bezár</button><br>
                                            <button v-if="isAdmin" type="button" class="btn rozsaszingomb mt-3"  @click="modalStatus()" data-bs-toggle="tooltip" data-bs-placement="bottom" title="A böngésző bezárása után a beállítás elveszhet." :style="{'color': betuszin, 'font-family': betutipus, 'font-style': betustilus, 'font-size': betumeret+'px' }">Bezár</button><br>
                                            
                                </v-card-actions>
                            </div>
                        </div>
                    </v-container>
                </v-card>
            </v-dialog>
</template>

<style lang="sass" scoped>
.popup
  z-index: 0

</style>
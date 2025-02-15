<script setup>
import axios from 'axios';
import {ref, onMounted, reactive } from 'vue';
import { storeToRefs } from 'pinia';
import { PostStore } from './store/PostStore'

const {posts, updateSuccessful, message, modalStatus} = storeToRefs(PostStore())
const { update, editStore, fetchStore, receiveEmit } = PostStore()
fetchStore();

</script>


<template>
    <div class="container fontcolor pb-8">
        <div class="justify-content-center text-center p-2">
            <div class="divider fontcolor"><span></span><span><font-awesome-icon :icon="['fas', 'shop']" /> CÉGADATOK</span><span></span></div>
            <img src="../../assets/kepek/desk.png" alt="desk" width="90" height="60"> 
        </div>
    <div>  
<!-- 
    <div class="container" v-if="updateSuccessful">
        <div class="alert alert-info alert-dismissible fade show" role="alert">
            <p>{{ uzenet }}</p>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"> </button>
        </div>
    </div> -->

    <ul class="mt-4">
        <ol v-for="post in posts" key="post.id">
        <form method="POST" @submit.prevent="update()" >
            <div class="d-flex flex-row justify-content-around">
                <div class="p-2">
                    <h5 class="fw-bold fs-5">Cím</h5>
                   
                    <input type="hidden" class="form-control" :placeholder="post.id" v-model="post.id" name="id"/>
                    <input type="hidden" class="form-control" :placeholder="post.nev" v-model="post.nev" name="nev"/>
                    <input type="hidden" class="form-control" :placeholder="post.bemutatkozasHu" v-model="post.bemutatkozasHu" name="bemutatkozasHu"/>
                    <input type="hidden" class="form-control" :placeholder="post.bemutatkozasEn" v-model="post.bemutatkozasEn" name="bemutatkozasEn"/>
                        <div class="col-12 mb-3">
                            <label class="form-label form-label-top" for="iranyitoszam">Irányítószám</label>
                            <input type="text" class="form-control" :placeholder="post.iranyitoszam" v-model="post.iranyitoszam" name="iranyitoszam"/>
                        </div>
                        <div class="col-12 mb-3">
                            <label class="form-label form-label-top" for="telepules">Település</label>
                            <input type="text" class="form-control" :placeholder="post.telepules" v-model="post.telepules" name="telepules"/>
                        </div>
                        <div class="col-12 mb-3">
                            <label class="form-label form-label-top" for="utca">Utca</label>
                            <input type="text" class="form-control" :placeholder="post.utca" v-model="post.utca" name="utca"/>
                        </div>
                        <div class="col-12 mb-3">
                            <label class="form-label form-label-top" for="hazszam">Házszám</label>
                            <input type="text" class="form-control" :placeholder="post.hazszam" v-model="post.hazszam" name="hazszam"/>
                        </div>
                </div>
                <div class="p-2">
                    <h5 class="fw-bold fs-5">Elérhetőség</h5>
                    <div class="col-12 mb-3">
                            <label class="form-label form-label-top" for="tel">Telefonszám</label>
                            <input type="text" class="form-control" :placeholder="post.tel" v-model="post.tel" name="tel"/>
                        </div>
                        <div class="col-12 mb-3">
                            <label class="form-label form-label-top" for="email">E-mail</label>
                            <input type="text" class="form-control" :placeholder="post.email" v-model="post.email" name="email"/>
                        </div>
                </div>
                    <div class="p-2">
                            <h5 class="fw-bold fs-5">Banki adatok</h5>
                            <div class="col-12 mb-3">
                                <label class="form-label form-label-top" for="bank">Bank neve</label>
                                <input type="text" class="form-control" :placeholder="post.bank" v-model="post.bank" name="bank"/>
                            </div>
                            <div class="col-12 mb-3">
                                <label class="form-label form-label-top" for="bankszamlaszam">Bankszámlaszám</label>
                                <input type="text" class="form-control" :placeholder="post.bankszamlaszam" v-model="post.bankszamlaszam" name="bankszamlaszam"/>
                            </div>
                            <div class="col-12 mb-3">
                                <label class="form-label form-label-top" for="iban">IBAN szám</label>
                                <input type="text" class="form-control" :placeholder="post.iban" v-model="post.iban" name="iban"/>
                            </div>
                            <div class="col-12 mb-3">
                                <label class="form-label form-label-top" for="swiftbic">SWIFT/BIC</label>
                                <input type="text" class="form-control" :placeholder="post.swiftbic" v-model="post.swiftbic" name="swiftbic"/>
                            </div>
                    </div>
                    <div class="p-2">
                        <h5 class="fw-bold fs-5">Egyéb</h5>
                        <div class="col-12 mb-3">
                            <label class="form-label form-label-top" for="adoszam">Adószám</label>
                            <input type="text" class="form-control" :placeholder="post.adoszam" v-model="post.adoszam" name="adoszam"/>
                        </div>
                        <div class="col-12 mb-3">
                            <label class="form-label form-label-top" for="cegjegyzekszam">Cégjegyzékszám</label>
                            <input type="text" class="form-control" :placeholder="post.cegjegyzekszam" v-model="post.cegjegyzekszam" name="cegjegyzekszam"/>
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-center mb-4">
                <button class="btn lilagombKicsi col-1 m-4" type="submit">Módosít
                    
                </button>
                </div>
            </form>
          </ol>
        </ul>
    </div>
</div>
<Modal v-model="modalStatus" :message="message" @modalStatus="receiveEmit" ></Modal>
</template>

<style lang="sass" scoped>
input
    background: #D9D9D9CC !important

</style>


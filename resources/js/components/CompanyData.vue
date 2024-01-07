<script setup>
import axios from 'axios';
import {ref, onMounted, reactive } from 'vue';
import { storeToRefs } from 'pinia';
import { PostStore } from './store/PostStore'

const {posts, id, nev, bemutatkozasHu, bemutatkozasEn, iranyitoszam, telepules, utca, hazszam, tel, email, adoszam, updateSuccessful, uzenet} = storeToRefs(PostStore())
const { update, editStore, fetchStore } = PostStore()
fetchStore();

</script>


<template>
    <div class="container fontcolor">
        <div class="justify-content-center text-center p-2">
            <div class="divider fontcolor"><span></span><span>CÉGADATOK</span><span></span></div>
        </div>

    <div>

    <div class="container" v-if="updateSuccessful">
        <div class="alert alert-info alert-dismissible fade show" role="alert">
            <p>{{ uzenet }}</p>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"> </button>
        </div>
    </div>

    <ul>
        <ol v-for="post in posts" key="post.id">
        <form method="POST" @submit.prevent="update()" >
            <div class="d-flex flex-row justify-content-around">
                <div class="p-2">
                    <h5>Cím</h5>
                   
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
                    <h5>Elérhetőség</h5>
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
                        <h5>Egyéb</h5>
                        <div class="col-12 mb-3">
                            <label class="form-label form-label-top" for="adoszam">Adószám</label>
                            <input type="text" class="form-control" :placeholder="post.adoszam" v-model="post.adoszam" name="adoszam"/>
                        </div>
                        <div class="col-12 mb-3">
                            <label class="form-label form-label-top" for="logo">Logó</label>
                            <input type="text" class="form-control" :placeholder="post.adoszam" v-model="post.adoszam" name="adoszam"/>
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-end">
                <button class="btn lilagombKicsi col-1" type="submit">Módosít
                    
                </button>
                </div>
            </form>
          </ol>
        </ul>
    </div>
</div>
</template>

<style lang="sass" scoped>
input
    background: #D9D9D9CC !important
</style>


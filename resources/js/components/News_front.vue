<script setup>
import { storeToRefs } from 'pinia';
import { NewsStore } from './store/NewsStore';
const  { news, modalStatus } = storeToRefs(NewsStore())

const { fetchNews} = NewsStore()
fetchNews();

</script>

<template>
<div class="tartalom pb-5">
    <div id="fejlec d-flex flex-column justify-content-center">
            <h2 class="pb-2 text-center">Legfrisebb híreink</h2>
            <hr class="m-auto">
        </div>
        <div class="container-fluid">
            <div class="row mt-3">
                <div class="col news-item m-4" v-for="ne in news[0]">
                    <div class="news-img">
                        <img :src="ne.photo.kepUtvonal" :alt="ne.photo.kepLeiras" class="img-fluid"/>
                    </div>
                    <div class="text-sec">
                        <div class="publisher-info d-flex align-item-center">
                            <div class="info">
                                <span class="publisher-date">{{ne.datum}}</span>
                            </div>
                        </div>
                        <h5 class="news-title">{{ne.cim}}</h5>
                        <button type="button" class="btn btn-vasarlas"  @click="modalStatus = true">Bővebben</button>
                </div>
                <v-dialog width="auto" v-model="modalStatus">
                <v-card>
                    <v-container>
                            <v-row>
                                <v-col>
                                    <img :src="ne.photo.kepUtvonal" :alt="ne.photo.kepLeiras" class=""/>
                                    <v-divider color="info" vertical></v-divider>
                                </v-col>
                                <v-col>
                                    <h3 class="news-title m-4">{{ne.cim}}</h3>
                                    <p class="m-1"> {{ne.datum}}</p> 
                                    <p class="m-1"> {{ne.leiras}}</p>
                                    <v-card-actions>
                                    <button type="button" class="btn btn-vasarlas mt-3" block @click="modalStatus = false">Bezár</button>
                                    </v-card-actions>
                                </v-col>
                            </v-row>
                    </v-container>
                </v-card>
            </v-dialog>
        </div>
    </div>
 </div>
</div>

</template>


<style lang="sass" scoped>

$extra-small: 320px
$small: 576px
$medium: 768px
$large: 992px
$extra-large: 1200px
$szurke_szoveg: #787878
$rozsaszin: #E4A0B7
.tartalom
    color: $szurke_szoveg
    //display: block

    #fejlec
        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25)
        font-family: Inria Serif

    hr
        border: solid 0.2rem $rozsaszin
        width: 10rem

    .heading-sec 
        margin: 3.75rem 0
        
        h1
            font-family: "Pirata One", cursive
            text-transform: capitalize
            color: #2d2d2d
            font-size: 48px
    .news-item 
        border-radius: 7px
        box-shadow: 0 0 20px 5px #00000008
        margin-bottom: 30px
        color: #2b2b2b
        display: block
        .news-img img 
            border-radius: 7px 7px 0 0
            height: 300px
            width: 100%
            object-fit: cover
        .news-title
            font-weight: bold
    
        .text-sec
            background-color: #fff
            padding: 27px 25px
            border-radius: 0 0 7px 7px
            border-bottom: $rozsaszin 2px solid
            
            h5 
                line-height: 28px
                margin-bottom: 1rem
            
            p
                font-size: 14px
                opacity: 70%
                margin-bottom: 22px

            .publisher-date 
                opacity: 70%
                font-size: 13px
            

</style>
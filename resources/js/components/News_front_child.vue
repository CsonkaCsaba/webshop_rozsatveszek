<script setup>
import { onServerPrefetch } from 'vue'
import { storeToRefs } from 'pinia';
import { NewsStore } from './store/NewsStore';
const store = NewsStore()
onServerPrefetch(async () => {
  await store.fetchData()
})

const  { news, modalStatus, modalElements } = storeToRefs(NewsStore())

const { fetchNews, modalOpen} = NewsStore();
fetchNews()
</script>

<template>
<div data-aos="fade-right" class="tartalom pb-5 pt-5">
    <div id="fejlec d-flex flex-column justify-content-center">
            <h2 class="pb-2 text-center">Legfrisebb híreink</h2>
            <hr class="m-auto">
    </div>
        <div class="container-fluid">
            <div class="row mt-3">
                <div class="col news-item m-3" v-for="ne in news[0]">
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
                        <button type="button" class="btn btn-vasarlas"  @click="modalOpen(ne.cim, ne.datum, ne.leiras, ne.photo.kepUtvonal)">Bővebben <font-awesome-icon :icon="['fas', 'angle-right']" class="fa-fw icon"/></button>
                </div>
                
        </div>
    </div>
    <v-dialog width="auto" v-model="modalStatus" class="transition">
            <v-card>
                <v-container class="container">
                    <div class="row">
                        <div class="">
                            <br>
                            <img :src="modalElements[3]" class="float-start m-4 modalkep img-fluid rounded mx-auto d-block"/>
                            <h3 class="news-title mt-4">{{modalElements[0]}}</h3>
                            <hr class="m-auto hr float-start"/><br>
                            <p class="m-1"> {{modalElements[1]}}</p> 
                            <span class="text modalszoveg">
                                {{modalElements[2]}}
                            </span>
                            <v-card-actions>
                                        <button type="button" class="btn rozsaszingomb mt-3" block @click="modalStatus = false">Bezár</button>
                            </v-card-actions>
                        </div>
                    </div>
                </v-container>
            </v-card>
    </v-dialog>
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
        &:hover
            box-shadow: rgba(149, 157, 165, 0.6) 0px 8px 24px
            transition: .5s ease

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
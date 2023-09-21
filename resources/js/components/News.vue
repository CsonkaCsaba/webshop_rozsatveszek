<template>
    <div class="tartalom pb-5">
        <div id="fejlec d-flex flex-column justify-content-center">
            <h2 class="pb-2 text-center">Legfrisebb híreink</h2>
            <hr class="m-auto">
        </div>
        <div class="container-fluid">
            <div class="row mt-3">
                <div class="col news-item">
                    <div class="news-img">
                        <img src="../../assets/kepek/news1.jpg" alt="news1" class="img-fluid"/>
                    </div>
                    <div class="text-sec">
                        <div class="publisher-info d-flex align-item-center">
                            <div class="info">
                                <span class="publisher-date">2024.02.25.</span>
                            </div>
                        </div>
                        <h5 class="news-title">Nőnapi akcióval köszöntjük a kedves hölgyeket!</h5>
                    </div>
                </div>
                <div class="col news-item">
                    <div class="news-img">
                        <img src="../../assets/kepek/news2.jpg" alt="news2" class="img-fluid"/>
                    </div>
                    <div class="text-sec">
                        <div class="publisher-info d-flex align-item-center">
                            <div class="info">
                                <span class="publisher-date">2023.06.15.</span>
                            </div>
                        </div>
                        <h5 class="news-title">Felvonulás a szőregi rózsaünnepen</h5>
                    </div>
                </div>
                <div class="col news-item">
                    <div class="news-img">
                        <img src="../../assets/kepek/news3.jpg" alt="news3" class="img-fluid"/>
                    </div>
                    <div class="text-sec">
                        <div class="publisher-info d-flex align-item-center">
                            <div class="info">
                                <span class="publisher-date">2022.10.15.</span>
                            </div>
                        </div>
                        <h5 class="news-title">Új sárga tearózsa kapható!</h5>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="container">
            <div class="row">
                <div class="col-md-4" v-for="news in newsList.slice(0, 6)" v-bind:key="news.id">
                    <router-link :to="`/${news.id}`" class="news-item">
                        <div class="news-img">
                            <img :src="news.jetpack_featured_media_url" alt="" class="img-fluid"/>
                        </div>
                        <div class="text-sec">
                            <h5 class="news-title" v-html="news.title.rendered"></h5>
                            <div class="publisher-info d-flex align-item-center">
                                <div class="info">
                                    <span class="publisher-date">{{ news.date }}</span>
                                </div>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
        </div> -->
    </div>
</template>

<script>

</script>

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
    display: block

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
            height: 230px
            width: 100%
            object-fit: cover
    
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
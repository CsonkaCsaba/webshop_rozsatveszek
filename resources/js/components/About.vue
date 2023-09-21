<template>
    <div class="tartalom pt-3 pt-sm-6 pt-md-7">
        <div id="fejlec d-flex flex-column justify-content-center">
            <h2 class="pb-2 text-center">Rólunk</h2>
            <hr class="m-auto">
            <h3 class="pt-2 text-center">Üdvözöljük webshopunkban!</h3>
        </div>
        <div id="szoveg" class="container container-fluid">
            <div id="part1" class="row mt-4 mt-sm-3 m-md-5 m-lg-3 m-xl-4 justify-content-sm-center justify-content-md-center">
                <div class="col col-12 col-sm-10 col-md-12">
                    <p>Családi vállalkozásunk nagy szeretettel és elkötelezettséggel foglalkozik rózsatermesztéssel.
                    Célunk, hogy ügyfeleinknek olyan rózsákat kínáljunk, amelyek nemcsak a szemet gyönyörködtetik, 
                     hanem hosszan tartó frissességet és illatot biztosítanak. Munkatársaink szakértelmének és 
                     gondoskodásának köszönhetően minden rózsa gondosan kiválasztott és gondozott, hogy a lehető 
                     legjobb minőséget nyújtsa.
                    </p>
                </div>
                <div class="col col-12 col-sm-10 col-md-10">
                    <img src="../../assets/kepek/rolunk1.jpg" class="img-fluid" alt="rolunk1">
                </div>
            </div>
            <div id="part2" class="row mt-4 m-sm-2 m-md-5 m-lg-3 m-xl-4 justify-content-center justify-content-sm-center justify-content-md-center">
                <div class="col col-10 col-sm-4 col-md-8 text-center">
                    <img src="../../assets/kepek/rolunk2.jpg" class="img-fluid mt-sm-auto mb-sm-auto" alt="rolunk2">
                </div>
                <div class="col mt-2 col-12 col-sm-6 col-md-12">
                    <p class="mt-md-2">Munkánk során arra törekszünk, hogy minőségi és gyönyörű rózsákat neveljünk,
                    amelyek a legkiválóbb minőséget képviselik.Vállalkozásunk büszke arra, hogy hosszú évek óta szolgálja ügyfeleinket,
                    és kiemelkedő minőséget nyújt a rózsák terén. Ügyfeleink elégedettsége az elsődleges célunk, ezért mindig 
                    törekszünk a legjobb szolgáltatást nyújtani. Bízunk benne, hogy vállalkozásunk elnyeri tetszését, és lehetőséget kapunk 
                    arra, hogy Önt is üdvözölhessük a vásárlóink körében. Ha további információra vagy kérdésekre van szüksége,
                    készséggel állunk rendelkezésére!
                    </p>
                </div>
            </div>
        </div>
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
    background-color: #f5f5f5
    display: block

    #fejlec
        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25)
        font-family: Inria Serif

    hr
        border: solid 0.2rem $rozsaszin
        width: 10rem

@media(max-width: $large)


@media(max-width: $extra-large)
    #szoveg
        max-width: 980px

        p
            font-size: 20px

@media(min-width: $extra-large)
    #szoveg
        p
            font-size: 22px


</style>
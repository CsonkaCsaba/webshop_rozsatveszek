
        <template>
            <div class="tartalom pb-4">
                <div id="fejlec d-flex flex-column justify-content-center">
                    <h2 class="pb-2 text-center pt-5 mt-5">Rólunk</h2>
                    <hr class="m-auto rolunkhr">
                    <h3 class="pt-2 text-center">Üdvözöljük webshopunkban!</h3>
                </div>
                <div id="szoveg" class="container-fluid pt-3">
                    <div id="part1" class="row mt-4 mt-sm-3 m-md-5 m-lg-3 m-xl-4 align-items-center">
                        <div data-aos="fade-right" class="col-12 col-sm-7">
                            <p class="about-title"><b>Családi vállalkozásunk</b></p>
                            <p class="about-text"> nagy szeretettel és elkötelezettséggel foglalkozik
                                rózsatermesztéssel.
                                Célunk, hogy ügyfeleinknek olyan rózsákat kínáljunk, amelyek nemcsak a szemet
                                gyönyörködtetik,
                                hanem hosszan tartó frissességet és illatot biztosítanak. Munkatársaink szakértelmének
                                és
                                gondoskodásának köszönhetően minden rózsa gondosan kiválasztott és gondozott, hogy a
                                lehető
                                legjobb minőséget nyújtsa.
                            </p>
                            <a href="termekek"><button type="button" class="btn btn-vasarlas">Termékeink<font-awesome-icon :icon="['fas', 'angle-right']" class="fa-fw icon"/></button></a>
                        </div>
                        <div data-aos="fade-left" class="col text-center my-auto">
                            <img src="../../assets/kepek/rolunk1.jpg" class="img-fluid mt-sm-auto mb-sm-auto rounded shadow"
                                alt="rolunk2">
                        </div>
                    </div>
                    <div id="part2"
                        class="row mt-4 m-sm-2 m-md-5 m-lg-3 m-xl-4 align-items-center">
                        <div data-aos="fade-right" class="col-12 col-sm-7 col-lg-4 text-center my-auto">
                            <img src="../../assets/kepek/rolunk2.jpg" class="img-fluid mt-sm-auto mb-sm-auto rounded shadow"
                                alt="rolunk2">
                        </div>
                        <div data-aos="fade-left" class="pt-3 col">
                            <p class="about-title"><b>Munkánk során</b></p>
                            <p class="mt-md-2 about-text">arra törekszünk, hogy minőségi és gyönyörű rózsákat
                                neveljünk,
                                amelyek a legkiválóbb minőséget képviselik. Vállalkozásunk büszke arra, hogy hosszú évek
                                óta szolgálja ügyfeleinket,
                                és kiemelkedő minőséget nyújt a rózsák terén. Ügyfeleink elégedettsége az elsődleges
                                célunk, ezért mindig
                                törekszünk a legjobb szolgáltatást nyújtani. Bízunk benne, hogy vállalkozásunk elnyeri
                                tetszését, és lehetőséget kapunk
                                arra, hogy Önt is üdvözölhessük a vásárlóink körében. Ha további információra vagy
                                kérdésekre van szüksége,
                                készséggel állunk rendelkezésére!
                            </p>
                            <a href="tanacsok"><button type="button" class="btn btn-vasarlas">Tanácsaink<font-awesome-icon :icon="['fas', 'angle-right']" class="fa-fw icon"/></button></a>
                        </div>
                    </div>
                </div>
            </div>
        </template>
       

<script setup>
import { onMounted, onUnmounted } from 'vue';

// Function to initialize AOS
function initializeAOS() {
  AOS.init({
    duration: 1000, // Animation duration in milliseconds
    once: false,    // Set to false to trigger animations on every scroll
  });
}

onMounted(() => {
  initializeAOS();

  // Refresh AOS when the window is scrolled
  const onScroll = () => {
    AOS.refresh();
  };

  window.addEventListener('scroll', onScroll);

  // Cleanup event listener on component unmount
  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll);
  });
});

</script>

<style lang="sass" scoped>
$extra-small: 320px
$small: 576px
$medium: 768px
$large: 992px
$extra-large: 1200px
$szurke_szoveg: #787878
$vilagos_szoveg: #f7f5f5
$rozsaszin: #E4A0B7

.rolunkhr
    color: #d95f88 
.tartalom
    color: #ffffff
    background: rgb(33,37,41)
    background: linear-gradient(360deg, rgba(33,37,41, 0.9) 81%, rgba(228,160,183, 0.8) 100%)
    display: block

    #fejlec
        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25)
        font-family: Inria Serif

    hr
        border: solid 0.2rem #ffffff
        width: 10rem
    img
        box-shadow: 10px 10px 5px #ffffff


@media((min-width: $small) and (max-width: $medium))
    .tartalom
        padding-top: 5rem

    .about-title
        font-size: 1.25rem

    .about-text
        font-size: 1.0rem

@media((min-width: $medium))
    .tartalom
        padding-top: 7rem
    
    .about-title
        font-size: 1.25rem

    .about-text
        font-size: 1.0rem

@media(min-width: $large)
    .about-title
        font-size: 1.5rem

    .about-text
        font-size: 1.25rem

</style>
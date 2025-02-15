<script setup>
function changeBackround(){
     var i = 0;
     var images = []; //array
     var time = 5000; // time in millie seconds

     //images
     images[0] = "url('img/caresse.webp')";
     images[1] = "url('img/lincoln.webp')";
     images[2] = "url('img/bianca.webp')";
     images[3] = "url('img/monica.webp')";
     images[4] = "url('img/golden.webp')";
     //function

     
     var el = document.getElementById('hatter');

     el.style.backgroundImage = images[0];
     images.forEach((image, index) => {
          setTimeout(() => {
               el.style.backgroundImage = images[index];
               el.style.transform = 'scale(1.5)';
          }, time);
          
     });
     
}

</script>

<template>
     <div class="simpleslide100 container-fluid" @mouseenter="changeBackround()">
		<div id="hatter" class="simpleslide100-item bg-img1"><div class="overlay"></div></div>
          
	</div>
     <div class="vh-100 h-100 bg-dark" >
          <div class="branding">
                <a href="/webshop_rozsatveszek/public/">
                    <img src="../../assets/kepek/rozsatveszek_logo_kicsi-removebg-preview.webp" alt="logo" class="m-3 logo">
                </a>
            </div>
            <div class="position-absolute top-0 end-0 mt-4 me-4">
               <a class="link" href="loginadmin" id="admin"><button type="button" class="btn btn-light p-2">Dolgozói belépés  <font-awesome-icon :icon="['fas', 'angle-right']" /></button></a>
          </div>
          <div class="align-middle position-absolute top-50 start-50 translate-middle">
               <h4 class="fw-bold  maintext">Webáruházunk karbantartás alatt áll<br></h4>
               <h4 class="text-white mt-4">Amennyiben értesülni szeretne a karbantartás befejezéséről, kérjük adja meg email címét:</h4>
               <form>
                    <div class="d-flex flex-inline">
                         <input class="s2-txt1 placeholder0 input100 trans-04 mt-4" type="text" name="email" placeholder="Email címe" required autofocus>
                         <button class="sendingBtn trans-04 mt-4"><font-awesome-icon :icon="['far', 'envelope']" /></button>
                    </div>
                    <input class="form-check-input mt-2" type="checkbox" value="" id="flexCheckDefault" required>
                         <label class="form-check-label text-white ms-2 mt-2" for="flexCheckDefault">
                               Elolvastam és elfogadom az adatkezelési szabályzatot.
                          </label>
               </form>
               <h4 class="text-white mt-4">Hamarosan jövünk! Köszönjük megértését és a türelmét! <br></h4>
          </div>
          
          <div class="position-absolute bottom-0 end-0 mb-4 me-4">
               <a class="link p-3 social text-white"><font-awesome-icon :icon="['fab', 'facebook']" /></a>
                <a class="link p-3 social text-white"><font-awesome-icon :icon="['fab', 'instagram']" /></a>
                <a class="link p-3 social text-white"><font-awesome-icon :icon="['fab', 'youtube']" /></a>
          </div>
     </div>
</template>

<style scoped lang="sass">
.simpleslide100 
     display: block
     position: fixed
     z-index: 0
     width: 100%
     height: 100%
     top: 0
     left: 0
     background-color: #000

.bg-img1 
     background-position: top
     background-repeat: no-repeat
     background-size: cover
     opacity: 0.8

.simpleslide100-item 
     display: block
     position: absolute
     width: 100%
     height: 100%
     top: 0
     left: 0

.overlay 
     width: 100%
     height: 100%
     background-color: rgba(0, 0, 0, 0.8)

.maintext
     font-family: PlayfairDisplay-BlackItalic
     font-size: 50px
     color: #fff
     line-height: 1.1
     font-style: italic
.logo
     z-index: 999
     position: relative
     max-width: 120px
     max-height: auto
     background-color: white
     border-radius: 15%

.link
     font-size: 150%

.s2-txt1
     font-family: Poppins-Medium
     font-size: 15px
     color: #fff
     line-height: 1.8

.input100 
     display: inline
     width: 35%
     height: 35%
     padding: 15px
     background-color: rgba(255, 255, 255, 0.4)
     transition: all 0.4s
     border: none
     &::placeholder
          color: white
          font-family: Poppins-Medium
.sendingBtn
     display: inline
     width: 80px
     height: 100%
     padding: 10px
     justify-content: center
     -ms-align-items: center
     align-items: center
#hatter
     background-image: url('img/bianca.webp')
     -moz-transition: all 3s ease
     -webkit-transition: all 3s ease
     transition: all 3s ease

</style>
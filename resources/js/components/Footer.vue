
<script>

</script>

    <template>
       
        <div>
            <div class="google-map">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2760.6048311213435!2d20.18591267536137!3d46.21831558280945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47448911b86082f7%3A0xd609714de957a1f3!2zU3plZ2VkLCBLaXMtU3rFkWzFkSB1LiAxMCwgNjc3MQ!5e0!3m2!1shu!2shu!4v1695311152683!5m2!1shu!2shu" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
    <div class="container-fluid p-4 m-0 text-center text-white bg-dark">
        <div class="row p-3 border-bottom border-secondary">
            <div class="col">
                <h4>Fiókom</h4>
                <a>Felhasználói fiók</a><br>
                <a>Kosár</a><br>
                <a>Pénztár</a><br>
                <a>Kijelentkezés</a>
            </div>
            <div class="col">
                <h4>Információ</h4>
                <a>Felhasználási feltételek</a><br>
                <a>Adatkezelési szabályzat</a><br>
                <a>Szállítási információk</a><br>
                <a>Sütik kezelése</a>
            </div>
            <div class="col">
                <h4>Kapcsolat</h4>
                <a>Cím: 6771, Szeged Kis-Szőlő u. 10</a><br>
                <a>Telefon: 06209505037</a><br>
                <a>Email: tamas.-@hotmail.com</a><br>
            </div>
        </div>
        <div class="row p-2">
            <div class="col">
                @2023 Minden jog fenntartva.
            </div>
            <div class="col">
                <a class="link p-3 social"><font-awesome-icon :icon="['fab', 'facebook']" /></a>
                <a class="link p-3 social"><font-awesome-icon :icon="['fab', 'instagram']" /></a>
                <a class="link p-3 social"><font-awesome-icon :icon="['fab', 'youtube']" /></a>
            </div>
        </div>
    </div>
    </div>

</template>


<style lang="sass" scoped>
.google-map
     padding-bottom: 50%
     position: relative
.google-map iframe 
     height: 100%
     width: 100%
     left: 0
     top: 0
     position: absolute

.social
    font-size: 28px
    cursor: pointer

</style>
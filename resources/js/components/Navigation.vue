<script setup>

import { ShoppingCart } from './store/ShoppingCart';
const cartData = ShoppingCart();

</script>

<script>

export default {
    data(){
        return{
            scrolledNav: null,
            mobile: null,
            mobileNav: null,
            windowWidth: null,
        }
    },
    created(){
        window.addEventListener('resize', this.checkScreen);
        
    },
    mounted(){
        window.addEventListener("scroll", this.updateScroll);
    },
    methods: {
        toggleMobileNav(){
            this.mobileNav = !this.mobileNav;            
        },

        updateScroll(){
            const scrollPosition = window.scrollY;
            if (scrollPosition > 10){
                this.scrolledNav =true;
                return;
            }
            this.scrolledNav = false;
        },

        checkScreen(){
            this.windowWidth = window.innerWidth;
            if(this.windowWidth <= 1050){
                this.mobile = true;
                return;
            }
            this.mobile = false;
            this.mobileNav = false;
        }
    }
}

</script>

<template>
       
    <BannerFront></BannerFront>
    <header :class="{ 'scrolled-nav': scrolledNav }" class="position-sticky mt-2">
        <nav>
            <div class="branding">
                <a href="/webshop_rozsatveszek/public/">
                    <img src="../../assets/kepek/rozsatveszek_logo_kicsi-removebg-preview.webp" alt="logo" class="m-3">
                </a>
            </div>
            <div class="d-flex flex-column">
                <div class="d-flex flex-row up">
                    <ul v-show="!mobile" class="navigation m-0 p-0 justify-content-start">
                        <li class="p-0 center"><font-awesome-icon :icon="['fas', 'phone']"/><a class="link p-2" href="tel:+36301234567">+36301234567</a></li>
                        <li class="p-0 center"><font-awesome-icon :icon="['fas', 'envelope']"/><a class="link p-2" href="mailto:info@info.hu">info@info.hu</a></li>
                    </ul>
                    <ul v-show="!mobile" class="navigation m-0 p-0 justify-content-end">
                        <li><font-awesome-icon :icon="['fas', 'magnifying-glass']" class="p-2 ikon-size"/></li>
                        <font-awesome-icon :icon="['fas', 'user']" class="p-1 ikon-size"/>
                        <li class="nav-item dropdown p-1 m-0">
                            <a class="dropdown-toggle ikon-size" role="button" data-bs-toggle="dropdown" aria-expanded="false"></a>
                            <ul class="dropdown-menu position-absolute dropdown-menu-right">
                                <li class="p-0"><a class="dropdown-item p-1" href="login" id="login">Bejelentkezés</a></li>  
                                <li class="p-0"><a class="dropdown-item p-1" href="register#" id="register">Regisztráció</a></li>
                                
                            </ul>
                        </li>
                        <li class="p-1 m-2">
                            <a href="kosar">
                                <div class="d-flex flex-row m-1 center align-items-center">
                                    <font-awesome-icon :icon="['fas', 'cart-shopping']" class="p-1 ikon-size"/>
                                    <div class="countItem">{{ cartData.countCartItems }}</div>
                                </div>
                            </a>
                        </li>
                        <!-- <li class="nav-item dropdown">
                            Nyelv
                            <a class="dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false"></a>
                            <ul class="dropdown-menu">
                                <li class="p-0 d-inline-block"><a class="dropdown-item p-1" href="#" id="hu"><span class="fi fi-hu m-1"></span>HU</a></li>
                                <li class="p-0 d-inline-block"><a class="dropdown-item p-1" href="#" id="en"><span class="fi fi-gb m-1"></span>EN</a></li>
                            </ul>
                        </li> -->
                    </ul>
                </div>                
                <ul v-show="!mobile" class="navigation border-top border-secondary p-0 down">
                    <li><a href="/webshop_rozsatveszek/public/">Kezdőlap</a></li> <!--átírandó-->
                    <li><a href="/webshop_rozsatveszek/public/?id=about">Rólunk</a></li>
                    <li><a href="/webshop_rozsatveszek/public/?id=hirek">Hírek</a></li>
                    <li><a href="galeria">Galéria</a></li>
                    <li><a href="termekek">Termékek</a></li>
                    <li><a href="kivansaglista">Kívánságlista</a></li>
                    <li><a href="/webshop_rozsatveszek/public/?id=kapcsolat">Kapcsolat</a></li>
                    <li><a href="tanacsok">Tanácsok</a></li>
                </ul>
            </div>
                           
            <div class="icon">
                <i @click="toggleMobileNav" v-show="mobile" :class="{ 'icon-active': mobileNav }"><font-awesome-icon :icon="['fas', 'bars']" class="p-3"/></i>
            </div>
            <transition name="mobile-nav">
                <ul v-show="mobileNav" class="dropdown-nav">
                    <li class="text-white"><font-awesome-icon :icon="['fas', 'phone']"/><a class="link p-1" href="tel:+36301234567">+36301234567</a></li>
                    <li class="text-white"><font-awesome-icon :icon="['fas', 'envelope']"/><a class="link p-1" href="mailto:info@info.hu">info@info.hu</a></li>
                    <li class="text-white"><font-awesome-icon :icon="['fas', 'magnifying-glass']" class="link p-1"/>Keresés</li>
                    <div class="container">
                        <div class="row">
                            <div class="col col-2">
                                <font-awesome-icon :icon="['fas', 'user']" class="p-1 m-0 text-white"/>
                            </div>
                            <div class="col col-2">
                                <li class="text-white nav-item dropdown m-0 p-0">
                                    <a class="text-white dropdown-toggle link" role="button" data-bs-toggle="dropdown" aria-expanded="false"></a>
                                    <ul class="dropdown-menu position-absolute dropdown-menu-right">
                                        <li class="p-0"><a class="dropdown-item p-1" href="login" id="login">Bejelentkezés</a></li>  
                                        <li class="p-0"><a class="dropdown-item p-1" href="register#" id="register">Regisztráció</a></li>
                                    </ul>
                                </li>
                            </div>
                            <div class="col col-8">
                                <li class="text-white pl-2 pt-0">
                                    <a href="kosar">
                                        <div class="d-flex flex-row m-1 center align-items-center">
                                            <font-awesome-icon :icon="['fas', 'cart-shopping']" class="p-1 ikon-size"/>
                                            <div class="countItem">{{ cartData.countCartItems }}</div>
                                        </div>
                                    </a>
                                </li>
                            </div>
                        </div>
                    </div>
                    <div class="container">
                        <div class="row">
                            <!-- <div class="col col-3 m-0 p-0">
                                <ul class="p-0">
                                    <li class="text-white nav-item dropdown m-0">Nyelv</li>
                                </ul>
                            </div> -->
                            <div class="col col-9">
                                <li class="text-white nav-item dropdown">
                                    <a class="dropdown-toggle link" role="button" data-bs-toggle="dropdown" aria-expanded="false"></a>
                                    <ul class="dropdown-menu">
                                        <li class="p-0 d-inline-block"><a class="dropdown-item p-1" href="#" id="hu"><span class="fi fi-hu m-1"></span>HU</a></li>
                                        <li class="p-0 d-inline-block"><a class="dropdown-item p-1" href="#" id="en"><span class="fi fi-gb m-1"></span>EN</a></li>
                                    </ul>
                                </li>
                            </div>
                        </div>
                    </div>
                    <li><a class="link" href="/webshop_rozsatveszek/public/">Kezdőlap</a></li><!--átírandó-->
                    <li><a href="/webshop_rozsatveszek/public/?id=about">Rólunk</a></li>
                    <li><a href="/webshop_rozsatveszek/public/?id=hirek">Hírek</a></li>
                    <li><a class="link" href="galeria">Galéria</a></li>
                    <li><a class="link" href="termekek">Termékek</a></li>
                    <li><a class="link" href="kivansaglista">Kívánságlista</a></li>
                    <li><a href="/webshop_rozsatveszek/public/?id=kapcsolat">Kapcsolat</a></li>
                    <li><a class="link" href="tanacsok">Tanácsok</a></li>
                </ul>
            </transition> <!--animációhoz-->
        </nav>
    </header>

</template>

<style lang="sass" scoped>

header
    z-index: 99
    width: 100%
    position: fixed
    top: 0
    transition: .5s ease all
    color: #656565
    align-items: center

    nav
        position: relative
        display: flex
        flex-direction: row
        padding: 12px 0
        width: 90%
        margin: 0 auto

        @media(min-width: 1140px)
            max-width: 1140px
    
    ul, .link
        font-weight: 500
        color: #656565
        list-style: none
        text-decoration: none
        

    li
        text-transform: uppercase
        padding: 16px
        margin-left: 16px
        

    .up li
        text-transform: none
    .link
        font-size: 14px
        transition: .5s ease all
        padding-bottom: 4px
        &:hover
            color: #E4A0B7
            border-color: #E4A0B7

    .branding
        display: flex
        align-items: center

        img
            width: 180px
            transition: .5s ease all
        
    .navigation
        display: flex
        align-items: center
        flex: 1
        justify-content: center
    .icon
        display: flex
        align-items: center
        position: absolute
        right: 24px
        height: 100%

        i
            cursor: pointer
            font-size: 40px
            transition: .8s ease all

    .dropdown-toggle
        color: #656565
    .dropdown-nav
        display: flex
        flex-direction: column
        position: fixed
        width: 100%
        max-width: 250px
        height: 100%
        background-color: #656565
        top: 0
        left: 0
        

        li
            margin-left: 0
            .link
                color: white
                &:hover
                    color: #E4A0B7
                    border-color: #E4A0B7
        
        svg
            font-size: 16px
            transition: .5s ease all
            &:hover
                color: #E4A0B7
                border-color: #E4A0B7
    
    .mobile-nav-enter-active,
    .mobile-nav-leave-active
        transition: 1s ease all

    .mobile-nav-enter-from,
    .mobile-nav-leave-to
        transform: translateX(-250px)

    .mobile-nav-enter-to
        transform: translateX(0)
        

.scrolled-nav
    background-color: #d3d3d3
    box-shadow: 0 4px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -0px rgba(0, 0, 0, 0.06)
    z-index: 99
    

    .navigation li
        padding: 0.5rem
        

    nav
        padding: 3px 0

        .branding
            img
                width: 120px
                box-shadow: 0 4px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -0px rgba(0, 0, 0, 0.06)

.countItem
    background: rgba(228, 160, 183, 0.47)
    border-radius: 20px
    padding: 1px 6px 1px 6px
    
.ikon-size
    font-size: 20px

</style>
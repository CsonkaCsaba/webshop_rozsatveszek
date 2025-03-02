import { defineStore } from 'pinia'
import axios from 'axios'
import {ref} from 'vue'


export let reload = ref(0);

export const CookieStore = defineStore("CookieStore",{
    state: () => {
      return {
        cookieaktiv: true,
        cookieSettingsOpen: false,
        defaultTextWindow: true,
        basicOperationWindow: false,
        statisticWindow: false,
        marketingWindow: false,
        basicOperationAccepted: true,
        statisticOperationAccepted: false,
        marketingOperationAccepted: false,
        acceptedAll: false
        }
        
    },
    getters: {

    },
    actions: {
        acceptAllCookies(){
            this.cookieaktiv = false
            this.cookieSettingsOpen = false
            this.basicOperationAccepted = true,
            this.statisticOperationAccepted = true,
            this.marketingOperationAccepted = true,
            this.acceptedAll = true

            const cookieData = {
                cookieConsentbasicOperation: this.basicOperationAccepted,
                statisticOperationAccepted: this.statisticOperationAccepted,
                marketingOperationAccepted: this.marketingOperationAccepted,
                saved: true
            };
            
            this.setCookieSettings('cookieSettings', cookieData, 1);
            
        },
        acceptAllCookiesfromSettings(){
            this.basicOperationAccepted = true,
            this.statisticOperationAccepted = true,
            this.marketingOperationAccepted = true,
            this.acceptedAll = true
            
        },
        declineAllCookiesfromSettings(){
            this.basicOperationAccepted = false,
            this.statisticOperationAccepted = false,
            this.marketingOperationAccepted = false
        },
        cookieSettings(){
            this.cookieSettingsOpen = true
            this.cookieaktiv = true
        },
        changeView(event){
            if(event.target.id == "basicOperationWindow"){
                this.basicOperationWindow = true;
                this.defaultTextWindow = false;
                this.statisticWindow = false;
                this.marketingWindow = false;

            } else if(event.target.id == "statisticWindow"){
                this.basicOperationWindow = false;
                this.defaultTextWindow = false;
                this.statisticWindow = true;
                this.marketingWindow = false;
            }
            else if (event.target.id == "marketingWindow"){
                this.basicOperationWindow = false;
                this.defaultTextWindow = false;
                this.statisticWindow = false;
                this.marketingWindow = true;
            }else {
                this.basicOperationWindow = false;
                this.defaultTextWindow = true;
                this.statisticWindow = false;
                this.marketingWindow = false;
            }
        },
        switchbasicOperationAcception(){
            this.basicOperationAccepted = !this.basicOperationAccepted
            if(this.basicOperationAccepted == false){
                let basic = confirm('Az alapműködést biztosító sütik olyan alapvető funkciókat segítenek, amelyek a technikai működéséhez elengedhetetlenül szükségesek, például az oldalon való navigáció, vagy a felhasználói igények, beállítások tárolása. A honlap ezek nélkül nem tud megfelelően működni! A kikapcsolás az OK gombra kattintással erősíthető meg.');
                if(basic){
                    this.basicOperationAccepted = false
                }else{
                    this.basicOperationAccepted = true
                }
            }
        },
        switchStatisticOperationAcception(){
            this.statisticOperationAccepted = !this.statisticOperationAccepted
        },
        switchMarketingOperationAcception(){
            this.marketingOperationAccepted = !this.marketingOperationAccepted
        },
        saveCookieSettings(){
            this.cookieaktiv = false
            this.cookieSettingsOpen = false

            const cookieData = {
                cookieConsentbasicOperation: this.basicOperationAccepted,
                statisticOperationAccepted: this.statisticOperationAccepted,
                marketingOperationAccepted: this.marketingOperationAccepted,
                saved: true
            };
            
            this.setCookieSettings('cookieSettings', cookieData, 30);


        },
        setCookieSettings(name, value, days){
            const expires = new Date(Date.now() + days * 864e5).toUTCString();
            document.cookie = name + '=' + encodeURIComponent(JSON.stringify(value)) + '; expires=' + expires + '; path=/';
        },
        deleteCookieSettings(name){
            document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
        },
        openSettings(){
            this.cookieSettingsOpen = true;
            let cookie = document.cookie;
            let readCookie = JSON.parse(this.getCookie('cookieSettings'));
            let cookieConsentbasicOperation = readCookie.cookieConsentbasicOperation;
            let statisticOperationAccepted = readCookie.statisticOperationAccepted;
            let marketingOperationAccepted = readCookie.marketingOperationAccepted;

            if(marketingOperationAccepted === false || statisticOperationAccepted === false || cookieConsentbasicOperation === false){
                this.acceptedAll = false;
            }
        },
        getCookie(name){
            return document.cookie.split("; ").reduce((r, v) => {
                const parts = v.split("=");
                return parts[0] === name ? decodeURIComponent(parts[1]) : r;
              }, "");
            }
        }    
        
        }
    )
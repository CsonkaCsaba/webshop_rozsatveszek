import { defineStore } from 'pinia'
import axios from 'axios';
import {ref } from 'vue'

export const UsersStore_Admin = defineStore("UsersStore_Admin",{
    state: () => {
        return {
            users: [],
            slicedUsers : [],
            currentPage:1,
            itemsPerPage: 10,
            totalUsers: 0,
            pagesShown: 5,
            startIndex: 0,
            endIndex: 10,
            showDown : true,
            showUp: false,
            loading: false,
            optionsStatus:[ 
                {"id": 1, "option":"Adminisztrátor"},
                {"id": 2, "option":"Bolt kezelő"}, 
                {"id": 3, "option":"Vásárló"},
                {"id":4, "option": "Regisztrált felhasználó"}
                ],
            optionsFinal:[],
            selectedValue: "",
            edit_id: null,
            input: "",
            regTime: "",
            regMonth: "",
            regYear: "",
            reload: 0,
            selectedValue: "",
            modalStatusAccept: false,
            message: "",
            modalStatus: false,
            loadedOnce: false,

        }
    },
    getters: {
            displayedUsers(){
                const startIndex = (this.currentPage * this.itemsPerPage) - this.itemsPerPage;
                const endIndex = startIndex + this.itemsPerPage; 
                this.slicedUsers = this.users.slice(startIndex, endIndex)
            },
    },
    actions: {
        async fetchUsers(){
            if(this.loadedOnce === true){
                return;
            }else {
                this.loading = true;
                let usersArray = [];
                await axios.get('api/users').then(function(response){
                    usersArray = response.data
                }).catch(error => {
                    if (error.response.status === 500) {
                        location.reload();
                        console.error('Internal Server Error: Please try again later.');
                    } 
                });
                
                for(const user of usersArray){
                    this.handleRegistrationDate(user);
                    if(user.vasarloId !== null && user.role !== "Adminisztrátor" && user.role !== "Bolt kezelő"){
                        user.role = "Vásárló"
                    }else if(user.vasarloId === null && user.role !== "Adminisztrátor" && user.role !== "Bolt kezelő"){
                        user.role = "Regisztrált felhasználó"
                    }
                    user.optionsFinal = this.optionsStatus.filter(option => option.option !== user.role);
                    this.users.push(user);
                }
                this.totalUsers = usersArray.length;
                this.slicedUsers = this.users.slice(this.startIndex, this.endIndex)
                localStorage.setItem('users', JSON.stringify(usersArray));
                this.loading = false;
                this.loadedOnce = true;
            }
        },
         orderUsersByIdASC(){
            this.slicedUsers.sort( function( a, b ){
                    return parseInt( a.id ) > parseInt( b.id ) ? 1 : -1;
            });
            this.showDown = false,
            this.showUp = true
        },
        orderUsersByIdDESC(){
            this.slicedUsers.sort( function( a, b ){
                    return parseInt( a.id ) < parseInt( b.id ) ? 1 : -1;
            });
            this.showDown = true,
            this.showUp = false
        },
        handlePageChange(){
            const startIndex = (this.currentPage * this.itemsPerPage) - this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage; 
            let localUsers = JSON.parse(localStorage.getItem('users')) 
                if(localUsers.length > 0){
                    this.slicedUsers = localUsers.slice(startIndex, endIndex)
                } else{
                    this.slicedUsers = this.users.slice(startIndex, endIndex)
                }
                    
        },
        onChange(id, event) {  
            let user = this.users.find(user=>user.id == id)
            if(user!= null){
                user.role = event.target.value
                user.optionsFinal = this.optionsStatus.filter(option => option.option !== event.target.value);
            }
            let localUsers = JSON.parse(localStorage.getItem('users')) 
                if(localUsers.length > 0){
                    for(const user of localUsers){  
                        if(user.id === id){
                            user.role = event.target.value
                            }
                    }
                    localStorage.setItem('users', JSON.stringify(this.users));
                } 
            this.edit_id = id;
        },
        inputChanged(){
            this.slicedUsers = this.users.filter((user) =>
                user.name.toLowerCase().includes(this.input.toLowerCase())
            ).slice(this.startIndex, this.endIndex);
        },
        show(role){
            const startIndex = (this.currentPage * this.itemsPerPage) - this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage; 
            this.slicedUsers = [];
            const slicedUsersFilter  = this.users.filter((user) =>
                user.role.toLowerCase().includes(role.toLowerCase())
            )
            localStorage.clear();
            localStorage.setItem('users', JSON.stringify(slicedUsersFilter));
            this.totalOrders = slicedUsersFilter.length;
            this.slicedUsers = slicedUsersFilter.slice(this.startIndex,this.endIndex);
            this.reload += 1
        },
        clearlist(){
            const startIndex = (this.currentPage * this.itemsPerPage) - this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage; 
            this.slicedUsers = this.users.slice(this.startIndex, this.endIndex);
            this.totalUsers = this.users.length;
            localStorage.clear();
            localStorage.setItem('users', JSON.stringify(this.users));
            this.reload += 1;
        },
        handleRegistrationDate(user){
            
            const spl = user.created_at.split('T');
            const registDate = spl[0];
            const regD = registDate.split('-');
            const regDay = parseInt(regD[2]);
            this.regMonth = regD[1];
            this.regYear = regD[0];
            user.registrationDate = registDate;
            if(spl[1] !== undefined){
                const splTime = spl[1].split('.');
                user.registrationTime = splTime[0];
            }
        },
        updateUser(id){
            this.edit_id = id;
            const user = this.users.find(user=>user.id == id);
            if(user != null){ 
                this.message = 'A módosítással email értesítést küldünk ki a felhasználónak. Biztosan mented a szerepkör módosítást?';
                this.modalStatusAccept = true;
            } else{
                this.message = 'Nem található a felhasználó! Kérjük frissítsd az oldalt és próbáld meg újra!';
                this.modalStatusAccept = true;
            }
        },
        saveUpdate(){
            this.loading = true;
            this.modalStatus = false;
            this.modalStatusAccept = false;
            const user = this.users.find(user=>user.id == this.edit_id);
            if(user != null){
                axios.put('api/users/'+this.edit_id, {
                        role: user.role,
                        email: user.email,
                        name: user.name
                    }).then(response => {
                        if(response.status == 200){
                            this.message = "A felhasználó szerepkörének módosítása sikeres!";
                            this.modalStatus = true;   
                        }
                  }).catch(console.error);
            }
            this.loading = false;
        },
        receiveEmit(){
            this.modalStatus = false;
            this.modalStatusAccept = false;
            
        },
        
    }
})
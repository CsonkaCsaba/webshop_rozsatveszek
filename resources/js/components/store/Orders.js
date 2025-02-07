import { defineStore } from 'pinia'
import axios from 'axios';
import {ref } from 'vue'


export let reload = ref(0);
export let slicedOrders =[]

export const OrdersStore = defineStore("OrdersStore",{
    state: () => {
      return {
        orders: [

        ],
        addresses:[

        ],
        addNewProduct: false,
        disableBtnAdd: false,
        message : "",
        modalStatus: false,
        modalStatusAccept: false,
        save: false,
        lastInsertproductId: 0,
        showDown : true,
        showUp: false,
        edit_id: null,
        selectedValue: "",
        optionsStatus:[ {"id": 1, "option":"Feldolgozás alatt"},
                        {"id": 2, "option":"Kiszállítás alatt"}, 
                        {"id": 3, "option":"Teljesítve"},
                        {"id": 4, "option":"Visszamondott"},
                        {"id": 5, "option":"Sikertelen kézbesítés"}],
        optionsFinal:[],
        updateSuccessful: false,
        accepted: false,
        currentPage:1,
        itemsPerPage: 10,
        totalOrders: 0,
        pagesShown: 1,
        startIndex: 0,
        endIndex: 10,
        loading: false,
        input: "",
        numberOfTheCurrentMonth: new Date().getMonth(),
        currentYear: new Date().getFullYear(),
        months: ['Január','Február','Március','Április','Május','Június','Július','Augusztus','Szeptember','Október','November','December'],
        salesSum: 0,
        deliveredSum: 0,
        deliverySum: 0,
        prepare: 0,
        canceled: 0,
        notDelivered: 0,
        transaction: 0,
        ordersSum: 0,
        firstOrderYear: null,
        lastOrderYear: null,
        messageAboutYear: "",
        daysInMonth: new Date(new Date().getFullYear(), new Date().getMonth()+1, 0).getDate(),
        prices: [],
        chartData: {
            labels: ['Január','Február','Március','Április','Május','Június','Július','Augusztus','Szeptember','Október','November','December'],
            datasets: [ { label: 'Rendelések összege havi bontásban (Ft)', data: [0,0,0,0,0,0,0,0,0,0,0,0], backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: '#5c5c5c ',
                borderWidth: 2,
                borderRadius: 8 } ],
           
        },
        chartOptions: {
        responsive: true,
        },
        chartDataPie : {
            labels: [],
            datasets: [
              {
                backgroundColor: ['rgba(75, 192, 192, 0.8)', 'rgba(239, 29, 138, 0.8)', 'rgba(62, 17, 40, 0.8)', 'rgba(42, 178, 168, 0.8)', 'rgba(148, 241, 234, 0.8)', 'rgba(3, 245, 227, 0.8)'],
                data: [0, 0]
              }
            ]
          },
        chartOptionsPie: {
        responsive: true,
        },
        chartDataLine : {
            labels: ['Január','Február','Március','Április','Május','Június','Július','Augusztus','Szeptember','Október','November','December'],
            datasets: [
            //   {
            //     label: 'My First Dataset',
            //     data: [65, 59, 80, 81, 56, 55, 40],
            //     borderColor: 'rgb(75, 192, 192)',
            //     tension: 0.1
            //   }
            ]
          },
        chartOptionsLine: {
        
        },
        termekek: [],
        orderYear: 2000,
        orderYears: [],
        orderMonth: "",
        data: [0,0,0,0,0,0,0,0,0,0,0,0],
        dataPie : [0,0,0,0,0,0,0,0,0,0,0,0],
        termekMennyiseg : [],
        reload: 0,
        bevetel: true,
        termek: false,
        mennyiseg: false,
        rendelesDb: [0,0,0,0,0,0,0,0,0,0,0,0],
        termekDb: [],
        forLabel: [],
        forData: [],
        newDataSet : {
                label: '',
                data: [0,0,0,0,0,0,0,0,0,0,0,0],
                borderColor: '',
                tension: 0.1
            }
        }
    },
    getters: {
        displayedOrders(){
            const startIndex = (this.currentPage * this.itemsPerPage) - this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage; 
            slicedOrders = this.orders.slice(startIndex, endIndex)
        },
        async fetchAddresses(){
            let cimek = [];
            await axios.get('api/rendelesekCim').then(function(response){
                    cimek = response.data
            });
            this.addresses.push(cimek);
        },

    },
    actions: {
        async fetchOrders(){
            this.loading = true;
            let rendelesek = [];
            try {
                    await axios.get('api/rendelesek').then(function(response){
                        rendelesek = response.data
                    });
                    this.data = this.chartData.datasets[0].data;
                    for(const rendeles of rendelesek){
                        this.handleOrderDate(rendeles);
                        
                        if (!this.orderYears.includes(this.orderYear)) {
                            this.orderYears.push(this.orderYear);
                        }
                        this.updateCharts(rendeles);
                        
                        rendeles.optionsFinal = this.optionsStatus.filter(option => option.option !== rendeles.allapot);
                        rendeles.OriginalStatus = rendeles.allapot;
                        rendeles.vegosszeg = 0;
                        for(const product of rendeles.termek) {
                            const db = product.pivot.mennyiseg;
                            const price = product.ar
                            product.subTotal = db * price
                            rendeles.vegosszeg += product.subTotal
                        }

                        this.orders.push(rendeles);
                    }   
                        this.firstOrderYear = Math.min(...this.orderYears);
                        this.lastOrderYear = Math.max(...this.orderYears);

                        localStorage.setItem('orders', JSON.stringify(rendelesek));
                        this.totalOrders = rendelesek.length;
                        this.pagesShown = Math.ceil(this.totalOrders/ this.itemsPerPage);
                        slicedOrders = this.orders.slice(this.startIndex, this.endIndex)
                 
                }
                 catch(error){
                    console.log(error.message)
                }
        },        
        addNewProductBtn(){
            this.addNewProduct = true
            this.disableBtnAdd = true;
            
        },
        createProduct(nev, szin, ar, keszlet, leiras){
            let formNewProduct = document.getElementById('addNewproductForm');

            this.nev = nev,
            this.szin = szin,
            this.ar = ar,
            this.keszlet = keszlet
            this.leiras = leiras

            const config = {
                headers: {
                    'content-type':'multipart/form-data'
                }
            }
            let formData = new FormData();

            if(this.file !== null){
                formData.append('file', this.file);
                
                let form_data = JSON.stringify({
                    nev : this.nev,
                    szin : this.szin,
                    ar : this.ar,
                    keszlet: this.keszlet,
                    leiras: this.leiras,
                  });

                  formData.append('form_data', form_data)
                 
                    axios.post('api/termekadmin/create',formData, config).then((response)=>{
                    if(response.status == 200){
                    this.lastInsertproductId = response.data.product_Id;
                    this.message = "Új termék létrehozása sikeres!";
                    this.modalStatus = true;
                    const formDataObj = {};
                    formData.forEach((value, key) => (formDataObj[key] = value));
                    let productPush = {
                        id: this.lastInsertproductId,
                        nevHu : this.nev,
                        szin : this.szin,
                        ar : this.ar,
                        keszlet: this.keszlet,
                        leiras: this.leiras,
                        img: "../public/img/uploads/"+formDataObj.file.name
                    }
                   this.products.push(productPush);
                   formNewProduct.reset();
                   this.disableBtnAdd = false
                   this.addNewProduct = false
                    }
                    }).catch(console.error) 
            }else {
                this.photoMessage = "Nem választott ki fájlt a feltöltéshez!";
                }

        }, deleteOrd(id){
            let order = this.orders.find(order=>order.id == id)
            if(order != null){ 
                this.edit_id = id;
                this.message = 'Biztosan véglegesen törlöd a rendelést?';
                this.modalStatusAccept = true;
            } else{
                this.message = 'A kiválasztott rendelés nem található a rendszerben!';
                this.modalStatusAccept = true;
            }
        },deleteOrder(){
            axios.delete('api/rendelesek/'+this.edit_id).then((response)=>{
            if(response.status == 200){
                let index = this.orders.findIndex(order=>order.id == this.edit_id);
                this.orders.splice(index, 1)
                this.modalStatusAccept = false,
                this.modalStatus = true;
                this.message = "A rendelést töröltük!";
                reload += 1;
            }
            }).catch(console.error)
        },

        receiveEmit(){
            this.modalStatus = false;
            this.modalStatusAccept = false;
            
        },
        orderOrdersByIdASC(){
            slicedOrders.sort( function( a, b ){
                  return parseInt( a.id ) > parseInt( b.id ) ? 1 : -1;
            });
            this.showDown = false,
            this.showUp = true
        },
        orderOrdersByIdDESC(){
            slicedOrders.sort( function( a, b ){
                  return parseInt( a.id ) < parseInt( b.id ) ? 1 : -1;
            });
            this.showDown = true,
            this.showUp = false
        },

        updateOrder(id){
            let order = this.orders.find(order=>order.id == id)
            if(order != null && order.allapot != order.OriginalStatus){ 
                this.message = 'A módosítással email értesítést küldünk ki az ügyfélnek. Biztosan mented a módosítást?';
                this.modalStatusAccept = true;
            } else{
                this.message = 'Nem történt módosítás az eredeti állapothoz képest!';
                this.modalStatusAccept = true;
            }
        },

        selectedStatus(){
            console.log(this.selectedStatus);
        },
        onChange(id, event) {
            let order = this.orders.find(order=>order.id == id)
            if(order!= null){
                order.allapot = event.target.value
                order.optionsFinal = this.optionsStatus.filter(option => option.option !== event.target.value);
            }
            let localOrders = JSON.parse(localStorage.getItem('orders')) 
                if(localOrders.length > 0){
                    for(const order of localOrders){  
                        if(order.id === id){
                            console.log(id, event.target.value)
                            order.allapot = event.target.value
                            }
                    }
                    localStorage.setItem('orders', JSON.stringify(this.orders));
                } 
            this.edit_id = id;
        },
        saveUpdate(){
            this.loading = true;
            this.modalStatus = false;
            this.modalStatusAccept = false;
            this.save = true;
            let order = this.orders.find(order=>order.id == this.edit_id)
            if(order!= null){
                order.OriginalStatus = order.allapot;
            let form_data_update = {
                id: this.edit_id,
                allapot: order.allapot,
                email: order.vasarlo.email,
                nev: order.vasarlo.nev

            }
                axios.put('api/rendelesek/'+this.edit_id, form_data_update).then((response)=>{
                if(response.status == 200){
                    this.message = "A rendelés állapotának módosítása sikeres!";
                    this.modalStatus = true;   
                }
                }).catch(console.error)

                if(form_data_update.allapot == "Visszamondott" || form_data_update.allapot =="Sikertelen kézbesítés"){
                    let order = this.orders.find(order=>order.id == this.edit_id);
                    for(const termek of order.termek){
                        let id = termek.id;
                        let mennyiseg = termek.pivot.mennyiseg;
                        let form_data_update = {
                            mennyiseg : mennyiseg
                        }
                        axios.put('api/termekadminmennyiseg/'+id, form_data_update).then((response)=>{

                        }).catch(console.error)
                    }
                }

            }
           
            this.loading = false;
        },
        handlePageChange(){
            const startIndex = (this.currentPage * this.itemsPerPage) - this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage; 
            let localOrders = JSON.parse(localStorage.getItem('orders')) 
                if(localOrders.length > 0){
                    slicedOrders = localOrders.slice(startIndex, endIndex)
                } else{
                    slicedOrders = this.orders.slice(startIndex, endIndex)
                }
            
        },
        inputChanged(){
                slicedOrders = this.orders.filter((order) =>
                order.vasarlo.nev.toLowerCase().includes(this.input.toLowerCase())
            ).slice(this.startIndex, this.endIndex);
        },
        minusYear(){
            this.currentYear -= 1;
            if(this.firstOrderYear > this.currentYear){
                this.messageAboutYear = "A legelső rendelés éve: " + this.firstOrderYear + ", korábbi adatok nem állnak rendelkezésre!"
                this.currentYear += 1;
            }else {
                this.emptyingTheVariables()
                for(const rendeles of this.orders){
                    this.updateCharts(rendeles);
                }
            }
        },
        plusYear(){
            this.currentYear += 1;
            if(this.lastOrderYear < this.currentYear){
                this.messageAboutYear = "Az utolsó rendelés éve: " + this.lastOrderYear + ", későbbi adatok nem állnak rendelkezésre!"
                this.currentYear -= 1;
            }else {
                this.emptyingTheVariables()
                
                for(const rendeles of this.orders){
                    this.updateCharts(rendeles);
                }

            }
        },
        updateBarChartData(data){
            if(this.bevetel === true){
                this.mennyiseg = false;
                this.termek = false;
                this.chartData.datasets[0].data = this.data;
                this.chartData.datasets[0].label = "Rendelések összege havi bontásban (Ft)";
                this.chartData.datasets[0].backgroundColor = "rgba(75, 192, 192, 0.2)"

            } else if(this.mennyiseg === true){
                this.bevetel = false ;
                this.termek = false;
                this.chartData.datasets[0].data = this.rendelesDb;
                this.chartData.datasets[0].label = "Rendelések száma havi bontásban (db)";
                this.chartData.datasets[0].backgroundColor = "rgba(239, 29, 138, 0.2)"

            }
            else if (this.termek === true){
                this.bevetel = false ;
                this.mennyiseg = false;
                this.termek = true;
            } else {
                this.chartData.datasets[0].data = data;
                
            }
            this.scroolBack();
            
        },
        updatePieChartData(){
            let countProduct = [];
            this.chartDataPie.labels = this.termekek;
            for (let value of Object.values(this.termekMennyiseg)) {
                    countProduct.push(parseInt(value.mennyiseg))
            }

            this.chartDataPie.datasets[0].data = countProduct
            this.scroolBack();
            
        },
        updateLineChartData(){
            let exist = false;
            let simpleLable = []
            this.addDatasetToLineChart();
           
            
         
            for(const data of this.chartDataLine.datasets){
                for(const lab of this.forLabel){
                    console.log(lab, data.label)
                    if(data.label == lab){
                        exist = true
                    }else{
                        simpleLable.push(lab)
                    }
                }
            }
            console.log(simpleLable)
            if(!exist){
                this.newDataSet.label = this.forLabel.toString()
                this.chartDataLine.datasets.push(this.newDataSet);
                
            }
            
            this.scroolBack();
            // console.log(this.newDataSet)
            // console.log(this.chartData)
            
        },
        updateCharts(rendeles){
            this.handleOrderDate(rendeles);
            if(this.orderYear == this.currentYear){
                this.ordersSum += 1;
                this.salesSum += parseInt(rendeles.vegosszeg);
                for(const termekert of rendeles.termek){ 
                    switch (this.orderMonth) {
                        case '01':
                            this.data[0] += parseInt(rendeles.vegosszeg);
                            this.rendelesDb[0] += 1;
                            this.termekDb.push({ termekNev: termekert.nevHu, mennyiseg: termekert.pivot.mennyiseg, honap: 0 })
                        break;
                        case '02':
                            this.data[1] += parseInt(rendeles.vegosszeg);
                            this.rendelesDb[1] += 1;
                            this.termekDb.push({ termekNev: termekert.nevHu, mennyiseg: termekert.pivot.mennyiseg, honap: 1 })
                        break;
                        case '03':
                            this.data[2] += parseInt(rendeles.vegosszeg);
                            this.rendelesDb[2] += 1;
                            this.termekDb.push({ termekNev: termekert.nevHu, mennyiseg: termekert.pivot.mennyiseg, honap: 2 })
                        break;
                        case '04':
                            this.data[3] += parseInt(rendeles.vegosszeg);
                            this.rendelesDb[3] += 1;
                            this.termekDb.push({ termekNev: termekert.nevHu, mennyiseg: termekert.pivot.mennyiseg, honap: 3 })
                            break;
                        case '05':
                            this.data[4] += parseInt(rendeles.vegosszeg);
                            this.rendelesDb[4] += 1;
                            this.termekDb.push({ termekNev: termekert.nevHu, mennyiseg: termekert.pivot.mennyiseg, honap: 4 })
                        break;
                        case '06':
                            this.data[5] += parseInt(rendeles.vegosszeg);
                            this.rendelesDb[5] += 1;
                            this.termekDb.push({ termekNev: termekert.nevHu, mennyiseg: termekert.pivot.mennyiseg, honap: 5 })
                        break;
                        case '07':
                            this.data[6] += parseInt(rendeles.vegosszeg);
                            this.rendelesDb[6] += 1;
                            this.termekDb.push({ termekNev: termekert.nevHu, mennyiseg: termekert.pivot.mennyiseg, honap: 6 })
                        break;
                        case '08':
                            this.data[7] += parseInt(rendeles.vegosszeg);
                            this.rendelesDb[7] += 1;
                            this.termekDb.push({ termekNev: termekert.nevHu, mennyiseg: termekert.pivot.mennyiseg, honap: 7 })
                        break;
                        case '09':
                            this.data[8] += parseInt(rendeles.vegosszeg);
                            this.rendelesDb[8] += 1;
                            this.termekDb.push({ termekNev: termekert.nevHu, mennyiseg: termekert.pivot.mennyiseg, honap: 8 })
                        break;
                        case '10':
                            this.data[9] += parseInt(rendeles.vegosszeg);
                            this.rendelesDb[9] += 1;
                            this.termekDb.push({ termekNev: termekert.nevHu, mennyiseg: termekert.pivot.mennyiseg, honap: 9 })
                        break;
                        case '11':
                            this.data[10] += parseInt(rendeles.vegosszeg);
                            this.rendelesDb[10] += 1;
                            this.termekDb.push({ termekNev: termekert.nevHu, mennyiseg: termekert.pivot.mennyiseg, honap: 10 })
                        break;
                        case '12':
                            this.data[11] += parseInt(rendeles.vegosszeg);
                            this.rendelesDb[11] += 1; 
                            this.termekDb.push({ termekNev: termekert.nevHu, mennyiseg: termekert.pivot.mennyiseg, honap: 11 })
                        break;    
                        default:
                        console.log('default swicth');
                    }

                    this.updateBarChartData(this.data);

                    switch (rendeles.allapot) {
                        case 'Feldolgozás alatt':
                            this.prepare += 1;
                        break;
                        case 'Kiszállítás alatt':
                            this.deliverySum += 1;
                        break;
                        case 'Teljesítve':
                        this.deliveredSum += 1;
                        break;
                        case 'Visszamondott':
                            this.canceled += 1;
                            break;
                        case 'Sikertelen kézbesítés':
                            this.notDelivered += 1;
                        break;
                        case 'Utalás ellenőrzése':
                            this.transaction += 1;
                        break;
                        default:
                        console.log('default swicth');
                    }

                
                        if (!this.termekek.includes(termekert.nevHu)) {
                            this.termekek.push(termekert.nevHu);
                        }
                        
                        const exists = Object.entries(this.termekMennyiseg).some(([key, value]) => value.termekNev === termekert.nevHu);
                        if(exists){
                            for(const termek of this.termekMennyiseg){    
                                if(termek.termekNev === termekert.nevHu){
                                    termek.mennyiseg += termekert.pivot.mennyiseg
                                }
                            }
                        } else {
                            this.termekMennyiseg.push({ termekNev: termekert.nevHu, mennyiseg: termekert.pivot.mennyiseg });
                        }  
                  }
                  
            }
            this.updatePieChartData();
            this.updateLineChartData();
            this.loading = false;
            this.reload += 1;
        },
        handleOrderDate(rendeles){
            
            const spl = rendeles.rogzitDatum.split('T');
            const rendelesDate = spl[0];
            const rendelesD = rendelesDate.split('-');
            const orderDay = parseInt(rendelesD[2]);
            this.orderMonth = rendelesD[1];
            this.orderYear = rendelesD[0];
            rendeles.rogzitDatum = rendelesDate;
        },
        emptyingTheVariables(){
            this.transaction = 0;
                this.deliveredSum = 0;
                this.deliverySum = 0;
                this.prepare = 0;
                this.canceled = 0;
                this.notDelivered = 0;
                this.ordersSum = 0;
                this.salesSum = 0;
                this.messageAboutYear = null;
                this.data = [0,0,0,0,0,0,0,0,0,0,0,0];
                this.dataPie = [0,0,0,0,0,0,0,0,0,0,0,0];
                this.chartData.datasets[0].data = [0,0,0,0,0,0,0,0,0,0,0,0];
                this.chartDataPie.datasets[0].data = [0,0,0,0,0,0,0,0,0,0,0,0];
                this.termekMennyiseg = [];
                this.termekek = [];
                this.rendelesDb = [0,0,0,0,0,0,0,0,0,0,0,0];
                
        },
        scroolBack(){
            document.getElementById("chartsDiv").scrollIntoView({
                behavior: 'smooth',
                inline: "nearest",
                block: "end"
              });
            //element.scrollTop = 880;
        },
        changeView(event){

            if(event.target.id == "bevetelek"){
                this.bevetel = true;
                this.mennyiseg = false;
                this.termek = false;
                this.chartData.datasets[0].data = this.data;
                this.chartData.datasets[0].label = "Rendelések összege havi bontásban (Ft)";
                this.chartData.datasets[0].backgroundColor = "rgba(75, 192, 192, 0.2)"
                this.reload += 1;
                this. scroolBack();

            } else if(event.target.id == "mennyiseg"){
                this.bevetel = false ;
                this.mennyiseg = true;
                this.termek = false;
                this.chartData.datasets[0].data = this.rendelesDb;
                this.chartData.datasets[0].label = "Rendelések száma havi bontásban (db)";
                this.chartData.datasets[0].backgroundColor = "rgba(239, 29, 138, 0.2)"
                this.reload += 1;
                this. scroolBack();

            }
            else if (event.target.id == "termekek"){
                this.bevetel = false ;
                this.mennyiseg = false;
                this.termek = true;
            }

        },
        addDatasetToLineChart(){
            
        let newColor = this.getRandomColor();
        this.newDataSet.borderColor = newColor;
            for(const element of this.termekDb){
            const exists = Object.entries(this.forData).some(([key, value]) => value.termekNev === element.termekNev && value.honap == element.honap);
            if(exists){
                for(const termek of this.forData){    
                    if(termek.termekNev == element.termekNev && termek.honap == element.honap){
                        termek.mennyiseg += element.mennyiseg
                    }
                }
            } else {
                this.forData.push({ termekNev: element.termekNev, mennyiseg: element.mennyiseg, honap: element.honap });
            }
            }
            for(const elem of this.forData){
                this.forLabel.findIndex(x => x == elem.termekNev) == -1 ? this.forLabel.push(elem.termekNev) : "";
                this.newDataSet.data[elem.honap] = elem.mennyiseg;
            }
       
        },
        getRandomColor() {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
              color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
          }
     }

})
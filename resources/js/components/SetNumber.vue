<script>
export default{
    name: 'SetNumber',
    props: {
        min: Number,
        max: Number,
        value: Number,
    },
    data(){
        return{
            num: this.value
        }
    },
    methods: {
        increment(){
            this.$refs.customNum.stepUp()
            this.num = this.$refs.customNum.value
        },
        decrement(){
            this.$refs.customNum.stepDown()
            this.num = this.$refs.customNum.value
        },
    }
}
</script>

<template>
    <div class="custom-num d-flex justify-content-center p-2" 
        :class="[maxReached && 'num-max', minReached && 'num-min']">
        <font-awesome-icon class="minusSign" :icon="['fas', 'minus']" @click="decrement" :style="[minReached && {'display':'none'}]"/>        
        <input 
            type="number"  
            class="num-input" 
            :min="min" 
            :max="max" 
            v-model="num"
            ref="customNum" />
        <font-awesome-icon class="plusSign" :icon="['fas', 'plus']" @click="increment"/>
    </div>
</template>

<style>

.custom-num{
    margin: 0.5em;
    width: fit-content;
    border-radius: 1em;
    align-items: center;
    background-color: #d1ecf1;
}

.num-input{
    font-size: 1em;
    text-align: center;
    background: none;
    border: none;
    font-weight: bold;
    width: 100%;
}

.num-input::-webkit-outer-spin-button,
.num-input::-webkit-inner-spin-button {
    display: none;
}

.plusSign, .minusSign{
    font-size: 1em;
    cursor: pointer;
}

.num-max, .num-min{
    padding-top: 0.8em;
    height: 5em;
    padding-bottom: 0;
}

</style>
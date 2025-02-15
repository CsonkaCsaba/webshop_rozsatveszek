<script setup>
const props = defineProps({
    hatterszin: {
        type: String,
        required: true
      },
      betuszin: {
        type: String,
        required: true
      },
      szoveg: {
        type: String,
        required: true
      },
      sebesseg: {
        type: Number,
        required: true
      },
      betutipus: {
        type: String,
        required: true
      },
      betuszin: {
        type: String,
        required: true
      },
      betustilus: {
        type: String,
        required: true
      },
      betumeret: {
        type: Number,
        required: true
      }

});

</script>

<template>
    <div class="position-absolute top-0 start-0 w-100 marquee" :style="{'background-color' : hatterszin, 'color': betuszin, 'font-family': betutipus, 'font-style': betustilus, 'font-size': betumeret +'px'}"><p class="p-3 mt-3" :style="{'animation-duration':sebesseg+'s'} ">{{ szoveg }}</p></div>
</template>
<style>
</style>
<style scoped>

</style>
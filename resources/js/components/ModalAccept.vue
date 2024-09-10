<script setup>
const props = defineProps({
    message: {
        type: String,
        required: true
      }
});

const emit = defineEmits(['modalStatus','saveUpdate']);
emit('modalStatus');
// emit('saveUpdate');

function modalStatus() {
     emit('modalStatus');
   }

function saveUpdate() {
     emit('saveUpdate');
   }

</script>
<template>
    <v-dialog  width="500" class="transition">
   
        <v-card class="rounded border border-1 p-4 align-items-center">
            <img src="../../assets/kepek/email.gif" alt="email" width="100" height="100">
        <v-card-text class="text-center">
            <h1>Figyelem!</h1>
          <h3 style="white-space: pre-line">{{ message }}</h3>
      </v-card-text>

      <v-card-actions>
        <div class="d-flex mx-auto">
          <button class="btn lilagombKicsi w100 me-4 px-4" @click="saveUpdate()"> Mentés </button>
          <button class="btn btn-primary w100 px-4" @click="modalStatus()"> MÉGSEM </button>
        </div>
      </v-card-actions>
      </v-card>
  </v-dialog>
</template>

<style lang="sass" scoped>

</style>
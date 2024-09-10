<script setup>
const props = defineProps({
    message: {
        type: String,
        required: true
      }
});

const emit = defineEmits(['modalStatus','saveUpdate', 'deleteOrder']);
emit('modalStatus');
// emit('saveUpdate');

function modalStatus() {
     emit('modalStatus');
   }

function saveUpdate() {
     emit('saveUpdate');
   }
function deleteOrder() {
  emit('deleteOrder');
}

</script>
<template>
    <v-dialog  width="500" class="transition">
   
        <v-card class="rounded border border-1 p-4 align-items-center">
            <img src="../../assets/kepek/warning.png" alt="email" width="100" height="100">
        <v-card-text class="text-center">
            <h1>Figyelem!</h1>
          <h3 style="white-space: pre-line">{{ message }}</h3>
      </v-card-text>

      <v-card-actions>
        <div class="d-flex mx-auto">
          <button v-if="message =='A módosítással email értesítést küldünk ki az ügyfélnek. Biztosan mented a módosítást?'" class="btn lilagombKicsi w100 me-4 px-4" @click="saveUpdate()"> Mentés </button>
          <button v-if="message =='Biztosan törlöd a rendelést?'" class="btn lilagombKicsi w100 me-4 px-4" @click="deleteOrder()"> Törlés </button>
          <button class="btn btn-primary w100 px-4" @click="modalStatus()"> MÉGSEM </button>
        </div>
      </v-card-actions>
      </v-card>
  </v-dialog>
</template>

<style lang="sass" scoped>

</style>
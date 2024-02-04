<script setup>
const props = defineProps({
    message: {
        type: String,
        required: true
      }
});


const emit = defineEmits(['modalStatus']);
emit('modalStatus');

function modalStatus() {
     emit('modalStatus');
   }

</script>
<template>

    <v-dialog  width="500">
      <v-card class="rounded border border-1 p-4 ">
      <v-card-text class="text-center">
          <h3>{{ message }}</h3>
      </v-card-text>
      <v-card-actions>
          <v-btn class="btn btn-primary" size="x-large" block @click="modalStatus()"> OK </v-btn>
      </v-card-actions>
      </v-card>
  </v-dialog>

</template>

<style lang="sass" scoped>


</style>
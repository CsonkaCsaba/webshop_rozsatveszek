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
    <v-dialog  width="500" class="transition">
      <v-card class="rounded border border-1 p-4 align-items-center">
        <img src="../../assets/kepek/done.gif" alt="done" width="100" height="100">
      <v-card-text class="text-center">
          <h3>{{ message }}</h3>
      </v-card-text>
      <v-card-actions>
        <div class="d-grid gap-2 col-6 mx-auto">
          <button class="btn lilagombKicsi w100" @click="modalStatus()"> OK </button>
        </div>
      </v-card-actions>
      </v-card>
  </v-dialog>
</template>

<style lang="sass" scoped>

</style>
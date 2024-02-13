<script setup>
import { NewsStore } from './store/NewsStore';
const { createNew, noFile, onChange} = NewsStore()

const props = defineProps({
    photoMessage: {
        type: String,
        required: true
      }
});

let cim;
let leiras;
</script>

<template>
<div class="container">
        <h3 class="d-flex justify-content-center"><font-awesome-icon :icon="['fas', 'plus']" /> Új hír hozzáadása </h3>
        <form method="POST" @submit.prevent="createNew(cim, leiras, uzletId=1)" id="addNewForm">
            <label for="cim" class="form-label form-label-top text-muted pt-2 mb-0">Cím</label>
            <div class="form-floating mb-3">
                <input type="text" class="form-control" name="cim" v-model="cim"/>
            </div>
            <label for="leiras" class="form-label form-label-top text-muted pt-2 mb-0">Leírás</label>
            <div class="form-floating">
            <textarea class="form-control" name="leiras" style="height: 180px" rows="8" cols="120" v-model="leiras"></textarea>
            </div>
            <p class="mt-4 form-label form-label-top text-muted pt-2 mb-0">Fotó hozzáadása</p>       
            <div class="form-floating mt-3 mb-3">
                <input type="file" @change="onChange" class="form-control-file" accept="image/*" name="photo"/>
                <p class="text-danger">{{ photoMessage }}</p>
            </div>
            <div class="form-floating">
                <button type="submit" class="btn lilagombKicsi mt-4"><font-awesome-icon :icon="['fas', 'plus']" class="fa-fw"/> Hír hozzáadása</button>
            </div>
        </form>
</div>

</template>
<style lang="sass" scoped>
</style>
<script setup>
import { NewsStore } from './store/NewsStore';
const { createNew, noFile, onChange} = NewsStore()

const props = defineProps({
    message: {
        type: String,
        required: true
      }
});

let cim;
let leiras;
</script>

<template>
<div class="container p-3">
        <h3 class="d-flex justify-content-center pb-4"><font-awesome-icon :icon="['fas', 'plus']" /> Új hír hozzáadása </h3>
        <form method="POST" @submit.prevent="createNew(cim, leiras, uzletId=1)" >
            <label for="cim" class="form-label form-label-top text-secondary">Cím</label>
            <div class="form-floating mb-3">
                <input type="text" class="form-control" name="cim" v-model="cim"/>
            </div>
            <label for="leiras" class="form-label form-label-top text-secondary">Leírás</label>
            <div class="form-floating">
            <textarea class="form-control" name="leiras" style="height: 120px" rows="4" cols="80" v-model="leiras"></textarea>
            </div>
            <p class="mt-4 form-label form-label-top text-secondary">Fotó hozzáadása</p>       
            <div class="form-floating mt-3 mb-3">
                <input type="file" @change="onChange" class="form-control-file" accept="image/*" name="photo"/>
                <p class="text-danger">{{ message }}</p>
            </div>
            <div class="form-floating">
                <button type="submit" class="btn lilagombKicsi mt-4 btn-lg"><font-awesome-icon :icon="['fas', 'plus']" class="fa-fw"/> Hír hozzáadása</button>
            </div>
        </form>
</div>

</template>
<style lang="sass" scoped>
</style>
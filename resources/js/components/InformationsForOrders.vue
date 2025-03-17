
<script setup>

</script>


<template>
<div class="d-inline-flex text-center justify-content-center align-items-center">
    
</div>
<div class="row m-4 text-dark bg-light rounded p-2 shadow-sm">
    <div class="col-12 ms-6 ">
        <p><font-awesome-icon :icon="['fas', 'circle-info']"/> <b>Súgó</b></p>
    </div>
    <div class="col-6 ms-6 border-end">
        <p class=""><font-awesome-icon  :icon="['fa', 'hourglass']" class="ps-2" color="#7a7d80"/><b> Feldolgozás alatt: </b><br> A vásárló utanvétes fizetési módot választva adta le a rendelését. Csomgolás után a termék(ek) átadhatóak a futárnak.</p>
        <p><font-awesome-icon :icon="['fas', 'question']" class="ps-2"/> <b> Utalás ellenőrzése: </b><br> A vásárló átutlásos fizetési módot választva adta le rendelését, ami ellenőrzésre vár. Ellenőrzés után a termék(ek) csomagolhatóak és átadható(ak) a futárnak.</p>
        <p><b><font-awesome-icon :icon="['fa', 'truck']" class="ps-2" color="#1679c9"/>  Kiszállítás alatt: </b><br> A megrendelt termék(ek) átadásra került(ek) a futárnak. A kiszállítási folyamat megkezdődött.</p>
    </div>
    <div class="col-6 ms-6 ">
        <p><font-awesome-icon :icon="['fa', 'check']" class="ps-2" color="#64c916"/> <b> Teljesítve: </b><br> A megrendelt terméke(ke)t a vásárló átvette a futártól. A kiszállítás terljesült.</p>
        <p><font-awesome-icon :icon="['fa', 'ban']" class="ps-2" color="#d41e1e"/> <b> Visszamondott: </b><br>A megrendelt terméke(ke)t a vásárló kiszállítás előtt visszamondta.</p>
        <p><font-awesome-icon :icon="['fa', 'xmark']" class="ps-2" color="#d41e1e"/><b> Sikertelen kézbesítés: </b><br>A megrendelt terméke(ke)t a vásárló nem vette át a futártól.</p>
    </div>
</div>
</template>

<style lang="sass" scoped>
.info
    cursor: pointer
</style>
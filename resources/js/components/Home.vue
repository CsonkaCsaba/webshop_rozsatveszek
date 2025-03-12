
<template>
                <Popup_Front></Popup_Front>
                <About id="about">
                </About>      
                <News_front_child id="hirek">
                </News_front_child>
                <Footer id="kapcsolat">
                </Footer>
</template>
   
<script setup>


window.addEventListener('DOMContentLoaded', function() {
  // Get the URL parameters
  const urlParams = new URLSearchParams(window.location.search);

  // Get the value of the 'id' parameter
  const divId = urlParams.get('id');

  // If 'id' parameter exists and it's not an empty string, scroll to the element with that ID
  if (divId && divId.trim() !== "") {
    const element = document.getElementById(divId);
    if (element) {
      // Using setTimeout to ensure scrolling happens after the page has fully loaded
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' }, true);
      }, 100);
    } else {
      console.log(`Element with ID ${divId} not found`);
    }
  } else {
    console.log('No valid ID parameter found in URL');
  }
});
</script>

<style lang="sass" scoped>
</style>
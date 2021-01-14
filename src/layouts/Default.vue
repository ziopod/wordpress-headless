<template>
  <div class="container">
    <Header/>
    <slot/>
  </div>
</template>
<script>
import Header from '@/components/Header.vue'
export default {
  components: {
    Header
  }
}
</script>
<style>
/* 
 * Les style complémentaire peuvent être ajoutés
 * dans les compsant ou dans le fichier `assets/css/styles.css`
 */

figure {
  margin: 0;
}
</style>
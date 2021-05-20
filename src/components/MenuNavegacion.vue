<template>
  <div id="menu" class="bg-dark col-md-3 h-100">
    <img src="https://www.hatchtemuco.com/img/LogoTransaparente.png" alt="logo hatch" class="img-fluid p-5">
    <nav class="nav flex-column">
      <router-link v-for="pagina in paginas" v-bind:key="pagina.id" v-bind:to="pagina.url" class="p-2 border border-white">{{pagina.nombre}}</router-link>
    </nav>
  </div>
</template>
<style scoped>
a{
  color: white;
  font-weight: 400;
}
a.router-link-active{
  background: rgba(241, 240, 240, 0.5);
  color: black;
}
</style>
<script>
//import ItemMenuNav from './ItemMenuNav.vue'
export default {
  name: 'MenuNavegacion',
  props: {
    paginas: Array
  },
  components:{
      //ItemMenuNav,
  }
}
</script>
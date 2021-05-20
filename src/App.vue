<template>
  <div class="row w-100 bg-light p-0 h-100">
    <menu-navegacion v-bind:paginas="paginas"></menu-navegacion>
    <div class="col-md-9 overflow-auto h-100 p-0">
      <router-view/>
    </div>    
  </div>
    
  
  
  
  
</template>
<script>
// @ is an alias to /src
import MenuNavegacion from '@/components/MenuNavegacion.vue'


export default {
  name: 'about',
  data (){
    return{
      msg:'MENSJAE DE PRUEBA',
      titulo_pagina: 'titulo pagina',
      paginas: [{'id':'2','nombre':'Inicio-vue','url':'/'},{'id':'1','nombre':'Inicio','url':'/about'},{'id':'1','nombre':'Proyectos','url':'/proyectos'},],
      estados: [{"id":"7","nombre":"Proyecto finalizado","imagen":"Imagen de finalizado"},{"id":"6","nombre":"Marketing","imagen":"Imagen de marketing"},{"id":"5","nombre":"Post venta web","imagen":"Imagen de postventa w"},{"id":"4","nombre":"Sitio web entregado","imagen":"Imagen de sitio entregado"},{"id":"3","nombre":"Implementacion","imagen":"Imagen de Implementacion"},{"id":"2","nombre":"diseño","imagen":"Imagen de diseño"},{"id":"1","nombre":"captacion","imagen":"imagen captacion"}]
    }
  },
  components: {
    MenuNavegacion
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

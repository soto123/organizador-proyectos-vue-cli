<template>
  <!-- Contenido de la seccion contenedor -->
  <div class="about row h-100 d-inline-block w-100 p-1">
    <div class="col-12 d-inline-block text-left pt-3"> <h1> INICIO </h1> </div>
    <tarjeta-dashboard v-bind:contador="contar_proyectos" class="d-inline-block ">proyectos</tarjeta-dashboard>
    <tarjeta-dashboard v-bind:contador="contar_usuarios" class="d-inline-block ">Tareas</tarjeta-dashboard>
    <tarjeta-dashboard v-bind:contador="contar_usuarios" class="d-inline-block ">usuarios</tarjeta-dashboard>
    <div class="col-12 text-left pt-3 pb-3">
      <label>Filtro:</label>
      <select v-model="filtro_proyectos_activo">
        <option value="0">Todas</option>
        <option v-for="estado in estados" v-bind:value="estado.id" v-bind:key="estado.id">{{estado.nombre}}</option>
      </select>
    </div>
    <div class="col-md-12 p-0">
      <table class="table table-striped">
        <thead>
          <tr><th scope="col">ID</th><th scope="col">Imagen</th><th scope="col">Nombre</th><th scope="col">Otro</th></tr>
        </thead>
        <tbody class="" id="contenido-tabla">						
          <dashboard-fila-proyecto v-for="proyecto in proyectos"  v-bind:key="proyecto.id" v-bind:proyecto="proyecto" v-bind:estados="estados" v-bind:filtro_proyectos_activo="filtro_proyectos_activo"></dashboard-fila-proyecto>
        </tbody>
      </table>
    </div>
  </div>
</template>


<script>
// @ is an alias to /src
import TarjetaDashboard from '../components/TarjetaDashboard.vue'
import DashboardFilaProyecto from '../components/DashboardFilaProyecto.vue'

export default {
  name: 'about',
  data (){
    return{
      msg:'MENSJAE DE PRUEBA',
      titulo_pagina: 'titulo pagina',
      filtro_proyectos_activo: 0,
      corsanywhere: 'https://cors-anywhere.herokuapp.com/',
      estados: Array,
      usuarios: Array,
      proyectos: Array,
      tareas: Array,
    }
  },
  props: {
    paginas: String
  },
  methods:{
    getDatos: function () {
      var data_proyectos = '';
      var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          // Typical action to be performed when the document is ready:
          data_proyectos = this.responseText;
				}
			};
			xhttp.open("GET", "http://proyectos.hatchtemuco.com/api/proyecto/", false);
			xhttp.send();
			this.proyectos = JSON.parse(data_proyectos);

      var data_estados = '';
      var xhttp2 = new XMLHttpRequest();
      xhttp2.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            data_estados = this.responseText;
        }
      };
      xhttp2.open("GET", "http://proyectos.hatchtemuco.com/api/estado/", false);
      xhttp2.send();
      this.estados = JSON.parse(data_estados);

      var data_usuarios = '';
      var xhttp3 = new XMLHttpRequest();
      xhttp3.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          // Typical action to be performed when the document is ready:
          data_usuarios = this.responseText;
        }
      };
      xhttp3.open("GET", "http://proyectos.hatchtemuco.com/api/usuario/1/tipo/0/", false);
      xhttp3.send();
      this.usuarios = JSON.parse(data_usuarios);

      var data_tareas = '';
      var xhttp_tareas = new XMLHttpRequest();
      xhttp_tareas.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          // Typical action to be performed when the document is ready:
          data_tareas = this.responseText;
        }
      };
      xhttp_tareas.open("GET", "http://proyectos.hatchtemuco.com/api/tarea/", false);
      xhttp_tareas.send();
      this.tareas = JSON.parse(data_tareas);
      //this.proyectos = [{"id":"20","nombre":"Studio Karun","imagen":"https://proyectos.hatchtemuco.com/img/logo-nueva-web.png","estado":"5"},{"id":"17","nombre":"RayCafeDelSur","imagen":"https://proyectos.hatchtemuco.com/img/logoRayCafedelSur.jpg","estado":"7"},{"id":"10","nombre":"FJL - arquitectos","imagen":"http://www.fjl.cl/wp-content/uploads/2020/11/NUEVO-LOGO-FJL.png","estado":"4"},{"id":"9","nombre":"Pintaraucania","imagen":"https://www.pintaraucania.cl/wp-content/uploads/2020/11/logo-blanco.png","estado":"7"},{"id":"8","nombre":"Vivero Sol y Tierra","imagen":"https://viverosolytierra.cl/wp-content/uploads/2019/03/cropped-2019-03-27-1-134x71.png","estado":"7"},{"id":"7","nombre":"Paillahue Pucon","imagen":"http://paillahuepucon.cl/wp-content/uploads/2020/09/placeholder.png","estado":"5"},{"id":"6","nombre":"AntunezKetterer","imagen":"https://antunezketterer.cl/wp-content/uploads/2020/09/sostenible-y-circular-1-min.jpg","estado":"7"},{"id":"5","nombre":"Tienda ecomemorable","imagen":"https://proyectos.hatchtemuco.com/img/Logo-Ecomemorable-Tienda.png","estado":"7"},{"id":"3","nombre":"Hatchtemuco","imagen":"https://www.hatchtemuco.com/img/logotipo.png","estado":"6"},{"id":"2","nombre":"Geosur - turismo","imagen":"https://geosurturismo.com/wp-content/uploads/2020/10/logo_geosur_a.png","estado":"7"}];
      //this.estados = [{"id":"7","nombre":"Proyecto finalizado","imagen":"Imagen de finalizado"},{"id":"6","nombre":"Marketing","imagen":"Imagen de marketing"},{"id":"5","nombre":"Post venta web","imagen":"Imagen de postventa w"},{"id":"4","nombre":"Sitio web entregado","imagen":"Imagen de sitio entregado"},{"id":"3","nombre":"Implementacion","imagen":"Imagen de Implementacion"},{"id":"2","nombre":"diseño","imagen":"Imagen de diseño"},{"id":"1","nombre":"captacion","imagen":"imagen captacion"}];
      //this.usuarios = [{"id":"1","nombre":"Borja Soto","imagen":"https://hatchtemuco.com/img/borja.jpg","correo":"borja@hatchtemuco.com","equipo":"0"},{"id":"2","nombre":"Constanza Garces","imagen":"https://hatchtemuco.com/img/user.png","correo":"constanza@hatchtemuco.com","equipo":"0"},{"id":"3","nombre":"David Sepulveda","imagen":"https://hatchtemuco.com/img/david.jpg","correo":"david@hatchtemuco.com","equipo":"0"},{"id":"4","nombre":"hatchtemuco","imagen":"https://hatchtemuco.com/img/profile-hatch.jpg","correo":"contacto@hatchtemuco.com","equipo":"0"},{"id":"18","nombre":"Benjamin Pardo","imagen":"https://hatchtemuco.com/img/david.jpg","correo":"benjamin@hatchtemuco.com","equipo":"0"}];
      //this.tareas = [{"id":"58","nombre":"Velocidad amatistashoes","proyecto":"20","prioridad":"10","estado":"0","comentario":"","equipo":"0"},{"id":"56","nombre":"Revisión esqueleto del sitio N°1","proyecto":"17","prioridad":"10","estado":"1","comentario":"","equipo":"0"},{"id":"55","nombre":"Creación y configuración de cuenta Flow (pasarel","proyecto":"17","prioridad":"20","estado":"1","comentario":"","equipo":"0"},{"id":"54","nombre":"Habilitar sitio web en construcción","proyecto":"17","prioridad":"20","estado":"1","comentario":"","equipo":"0"},{"id":"52","nombre":"Entrega de sitio web implementado","proyecto":"0","prioridad":"20","estado":"0","comentario":"","equipo":"0"},{"id":"51","nombre":"Entrega de la maqueta al cliente","proyecto":"10","prioridad":"20","estado":"1","comentario":"","equipo":"0"},{"id":"50","nombre":"Crear informe web","proyecto":"16","prioridad":"10","estado":"1","comentario":"Url del informe---","equipo":"0"},{"id":"49","nombre":" Crear diseños campaña enero","proyecto":"16","prioridad":"10","estado":"0","comentario":"","equipo":"0"},{"id":"48","nombre":"Solicitar insumos de productos","proyecto":"16","prioridad":"20","estado":"0","comentario":"","equipo":"0"},{"id":"47","nombre":"Mostrar mi portofolio","proyecto":"16","prioridad":"10","estado":"0","comentario":"","equipo":"0"},{"id":"46","nombre":"Entregar sitio web","proyecto":"6","prioridad":"10","estado":"1","comentario":"","equipo":"0"},{"id":"45","nombre":"Crear informe primera quincena diciembre","proyecto":"6","prioridad":"10","estado":"1","comentario":"","equipo":"0"},{"id":"44","nombre":"Generar insumos marketing diciembre","proyecto":"6","prioridad":"10","estado":"1","comentario":"","equipo":"0"},{"id":"43","nombre":"Planificar marketing diciembre","proyecto":"6","prioridad":"10","estado":"1","comentario":"","equipo":"0"},{"id":"42","nombre":"Implementar maqueta en web","proyecto":"6","prioridad":"10","estado":"1","comentario":"","equipo":"0"},{"id":"41","nombre":"Presentar maqueta a cliente","proyecto":"6","prioridad":"10","estado":"1","comentario":"","equipo":"0"},{"id":"40","nombre":"Crear maqueta sitio web","proyecto":"6","prioridad":"10","estado":"1","comentario":"","equipo":"0"},{"id":"39","nombre":"Solicitar insumos","proyecto":"6","prioridad":"10","estado":"1","comentario":"","equipo":"0"},{"id":"38","nombre":"Publicar sitio web","proyecto":"7","prioridad":"10","estado":"0","comentario":"","equipo":"0"},{"id":"37","nombre":"Presentar pagina final a cliente","proyecto":"7","prioridad":"10","estado":"0","comentario":"","equipo":"0"},{"id":"36","nombre":"Subir datos de las cabañas a la web","proyecto":"7","prioridad":"10","estado":"0","comentario":"","equipo":"0"},{"id":"35","nombre":"Conseguir datos de cada cabaña - web","proyecto":"7","prioridad":"10","estado":"0","comentario":"","equipo":"0"},{"id":"34","nombre":"Vincular correos corporativos","proyecto":"7","prioridad":"10","estado":"0","comentario":"","equipo":"0"},{"id":"33","nombre":"Enviar factura enero","proyecto":"8","prioridad":"10","estado":"1","comentario":"","equipo":"0"},{"id":"32","nombre":"crear informe 1era quincena enero","proyecto":"8","prioridad":"10","estado":"1","comentario":"","equipo":"0"},{"id":"31","nombre":"Diseñar insumos publicaciones Instagram enero","proyecto":"8","prioridad":"20","estado":"1","comentario":"","equipo":"0"},{"id":"30","nombre":"Imprimir tarjetas de presentación","proyecto":"8","prioridad":"20","estado":"1","comentario":"","equipo":"0"},{"id":"29","nombre":"Crear tarjetas de presentación","proyecto":"8","prioridad":"10","estado":"1","comentario":"","equipo":"0"},{"id":"28","nombre":"Reunión entrega web - inicio de postventa","proyecto":"0","prioridad":"30","estado":"0","comentario":"","equipo":"0"},{"id":"27","nombre":"Reunión web 1 - ajustes y retroalimentación","proyecto":"9","prioridad":"10","estado":"1","comentario":"","equipo":"0"},{"id":"26","nombre":"Implementar maqueta en web","proyecto":"9","prioridad":"20","estado":"1","comentario":"","equipo":"0"},{"id":"25","nombre":"Comprar Dominio (pintaraucania.cl)","proyecto":"9","prioridad":"10","estado":"1","comentario":"","equipo":"0"},{"id":"24","nombre":"Coordinar reunión validación de maqueta - fin di","proyecto":"9","prioridad":"20","estado":"1","comentario":"","equipo":"0"},{"id":"23","nombre":"Entrega plantilla web - PDF drive","proyecto":"9","prioridad":"20","estado":"1","comentario":"https:hatchtemuco.com","equipo":"0"},{"id":"22","nombre":"Reunión antecedentes - web - octubre","proyecto":"9","prioridad":"30","estado":"1","comentario":"","equipo":"0"},{"id":"21","nombre":"Crea logo","proyecto":"9","prioridad":"10","estado":"1","comentario":"Comentario de logo","equipo":"0"},{"id":"20","nombre":"Tarea nueva update","proyecto":"10","prioridad":"10","estado":"1","comentario":"Comentario","equipo":"0"},{"id":"18","nombre":"Planificar enero","proyecto":"8","prioridad":"20","estado":"1","comentario":"","equipo":"0"},{"id":"16","nombre":"Eliminar precio del sitio","proyecto":"7","prioridad":"10","estado":"1","comentario":"","equipo":"0"},{"id":"15","nombre":"Coordinar reunion","proyecto":"10","prioridad":"10","estado":"1","comentario":"","equipo":"0"},{"id":"14","nombre":"Prueba de notificacion tarea completa","proyecto":"3","prioridad":"10","estado":"1","comentario":"","equipo":"0"},{"id":"13","nombre":"Tarea de prueba nueva","proyecto":"10","prioridad":"10","estado":"1","comentario":"comntario nuevo","equipo":"0"},{"id":"12","nombre":"prueba notifdi","proyecto":"10","prioridad":"10","estado":"1","comentario":"Comentario","equipo":"0"},{"id":"11","nombre":"Tarea nueva de prueba","proyecto":"10","prioridad":"10","estado":"1","comentario":"","equipo":"0"},{"id":"10","nombre":"Termino del disño y exportacion de imagenesss","proyecto":"10","prioridad":"20","estado":"1","comentario":"Comentario termino diseño","equipo":"0"},{"id":"6","nombre":"Aliniera imagen de tal partes","proyecto":"10","prioridad":"10","estado":"1","comentario":"Comentario fjl alinear---","equipo":"0"},{"id":"5","nombre":"Crear galeria dinamica cabañas","proyecto":"7","prioridad":"10","estado":"1","comentario":"","equipo":"0"},{"id":"2","nombre":"Tarea geosur","proyecto":"2","prioridad":"10","estado":"1","comentario":"","equipo":"0"},{"id":"1","nombre":"Tarea 1","proyecto":"1","prioridad":"10","estado":"0","comentario":"","equipo":"0"}];
    }
  },
  computed:{
    contar_proyectos( ){
      return this.proyectos.length;
    },
    contar_tareas_pendientes( ){
      var counter = 0;
      for (var i = this.tareas.length - 1; i >= 0; i--) {
        if(this.tareas[i].estado == 0){
          counter++;
        }
      }
      return counter;
    },
    contar_usuarios( ){
      return this.usuarios.length;
    },
  },
  mounted: function () {
      this.getDatos();      
  },
  components: {
    TarjetaDashboard,
    DashboardFilaProyecto
  }
}
</script>
<style >

</style>

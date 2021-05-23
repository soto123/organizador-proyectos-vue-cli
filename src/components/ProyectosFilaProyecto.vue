<template>
    <tr >
        <td><img v-bind:src="proyecto.imagen" ></td>
        <td>{{proyecto.nombre}}</td>
        <td>{{get_estado_by_id(proyecto)}}</td>
        <td class="align-middle">
            <button type="button" class="btn btn-warning mr-3 mt-1 mb-1" data-toggle="modal" data-target="#proyectoModal" v-on:click="$emit('cargar_proyecto',proyecto)">Ver</button>
            <button type="button" class="btn btn-danger  mt-1 mb-1" v-on:click="$emit('eliminar_proyecto',proyecto)">Eliminar</button>
        </td>
    </tr>
</template>
<style scoped>
    img{
        max-width: 150px;
        max-height: 50px;
    }
</style>
<script>
export default {
    name: 'ProyectoFilaProyecto',
    props: {
        proyecto: Object,
        estados: Array,
        filtro_proyectos_activo: Number,
    },
    methods:{
        get_estado_by_id( item ){
            var texto = 'Estado desconocido';
            for (var i = this.estados.length - 1; i >= 0; i--) {
                if(this.estados[i]['id'] == item.estado ){
                    texto = this.estados[i].nombre;
                }
            }
            return texto;
        }
    },
}
</script>
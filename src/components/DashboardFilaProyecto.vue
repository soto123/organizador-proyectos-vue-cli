<template>
    <tr class="fila-proyecto" v-show="filtro_proyectos_activo == 0 || filtro_proyectos_activo == proyecto.estado">
        <th>{{proyecto.id}}</th>
        <td>{{proyecto.nombre}}</td>
        <td><img :src="proyecto.imagen" class="float-left"></td>
        <td>{{get_estado_by_id(proyecto)}}</td>
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
    name: 'DashboardFilaProyecto',
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
        },
    },
}
</script>
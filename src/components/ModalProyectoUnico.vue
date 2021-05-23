<template>
    <div class="modal fade" id="proyectoModal" tabindex="-1" aria-labelledby="proyectoModalLabel" aria-hidden="true">
        <div class="modal-xl modal-dialog modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title w-100" id="proyectoModalLabel">{{proyecto_seleccionado.nombre.toLocaleUpperCase()}}
                        <button class="btn btn-success float-right ml-2 mr-2" @click="cambiar_estado('editar_proyecto')" v-if="estado_pagina !== 'editar_proyecto'" >Editar proyecto</button>
                    <!--   
                        <button class="btn btn-danger float-right ml-2 mr-2" @click="cambiar_estado('ver_proyecto')" v-else>Cancelar</button>
                    -->
                        <button class="btn btn-success float-right" @click="cambiar_estado('añadir_tarea')" v-if="estado_pagina !== 'añadir_tarea'">Agregar tarea</button><button class="btn btn-danger float-right" @click="cambiar_estado('ver_proyecto')" v-else>Cancelar</button>
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    
                    <div class="contendor-add-tarea p-4 bg-light rounded border" v-if="estado_pagina === 'añadir_tarea'">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text">Tarea y prioridad</span>
                            </div>
                            <input type="text" aria-label="nombre-tarea" class="form-control col-8" v-model="nueva.nombre">
                            <select class="custom-select" id="inputGroupSelect01" v-model="nueva.prioridad">
                                <option selected>Elija prioridad</option>
                                <option value="10">Baja</option>
                                <option value="20">Normal</option>
                                <option value="30">Alta</option>
                            </select>
                        </div>
                        <div class="form-group pt-2">
                            <label for="exampleFormControlSelect2">Notificar al completar (seleccione mas de 1 con ctrl)</label>
                            <select multiple class="form-control" id="notificar_usuarios" v-model="notificar_usuarios">
                                <option v-for="item in usuarios" v-bind:key="item.id" :value="item.id"> {{item.nombre}} ( {{item.correo}} )</option>
                            </select>
                        </div>
                        <div class="form-group pt-2">
                            <button class="btn btn-success w-100" @click="agregar_tarea()">Enviar</button>
                        </div>
                        
                    </div>
                    
                    <div class="contendor-edit-proyecto p-4 mb-3 bg-light rounded border" v-if="estado_pagina === 'editar_proyecto'">
                        <div class=" input-group">
                            <input type="text" class="form-control" name="nombre_proyecto" v-model="proyecto_seleccionado_editado.nombre">
                            <select v-model="proyecto_seleccionado_editado.estado">
                                <option class="form-control custom-select" v-for="item in estados" v-bind:key="item.id" :value="item.id"> {{item.nombre}} </option>
                            </select>	
                        </div>
                        <div class="input-group pt-2 pb-2">
                            <button class="btn btn-primary w-100 " @click="actualizar_proyecto()">Guardar</button>
                        </div>
                    </div>
                    <!-- TABLA DE TAREAS -->
                    <div class="accordion row" id="accordionExample">
                        <div class="col-md-12">
                            <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                                <div class="card-body">
                                <table class="table table-striped">
                                    <thead>
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">prioridad</th>
                                        <th scope="col">estado</th>
                                        <th scope="col">Acciones</th>
                                    </tr>
                                    </thead>

                                    <tr v-for="item in tareas" v-bind:todo="item" v-bind:key="item.id" :class="item.estado == 0 ? 'incompleto' : 'text-muted font-italic bg-light'">
                                        <th>{{item.id}}</th>
                                        <td>{{item.nombre}}</td>
                                        <td> {{get_prioridad_by_id(item)}} </td>
                                        <td v-if="item.estado != 1">Incompleta</td>
                                        <td v-else>Completa</td>
                                        <td>
                                            <button class="btn btn-success" @click="editar_estado_tarea(1, item)" v-if="item.estado != 1">Completar</button>
                                            <button class="btn btn-info" @click="editar_estado_tarea(0, item)" v-else>Deshacer</button>
                                            <button class="btn btn-warning" @click="editar_tarea( item )">Editar</button>
                                            <button v-if="item.estado != 1" class="btn btn-danger" @click="eliminar_tarea(item)" >Eliminar</button>
                                            <button v-else class="btn btn-primary" data-toggle="modal" data-target="#comentarioModal" @click="cambiar_id_tarea_editada(item)">Comentar</button>
                                        </td>
                                    </tr>
                                </table>
                                <p v-if="tareas.length === 0">No hay tareas pendientes</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <!-- 
                    <button type="button" class="btn btn-primary" :class="[nuevo.imagen.length === 0 || nuevo.nombre.length === 0 ? 'disabled' : '']" :disabled="nuevo.imagen.length === 0 || nuevo.nombre.length=== 0" @click="agregar_proyecto()">Save changes</button>
                    -->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'ModalProyectoUnico',
    data (){
        return{
            //: {"id":"22","nombre":"Organizador de proyectos - VUE CLI","imagen":"imagen estado nuevo","estado":"0"},
            estado_pagina : 'ver_proyecto',
            nueva: {"id":-1,"nombre":"","proyecto":"0","prioridad":"10","estado":"0"},
            proyecto_seleccionado_editado: {"id":"22","nombre":"Organizador de proyectos - VUE CLI","imagen":"imagen estado nuevo","estado":"0"},
            notificar_usuarios: Array,
            //tareas: Array,
        }
    },
    props:{
        usuarios: Array,
        estados: Array,
        tareas: Array,
        proyecto_seleccionado: Object,
    },
    methods: {
        cambiar_estado : function( estado ){
            this.estado_pagina = estado;
            console.log("Cabmio estado modal "+this.estado_pagina);
        },
        agregar_tarea: function(){
            this.nueva.proyecto = this.proyecto_seleccionado.id;
            console.log(this.nueva,this.notificar_usuarios);
        },
        actualizar_proyecto: function(){//SOLUCIONAR PROBLEMA DE CONSULTAS "PATCH" EN EL SERVIDOR
            alert("Actualizar proyecto");
            console.log('ENVIAR CONSULTA AL SERVIDOR :',this.proyecto_seleccionado_editado);
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    console.log(this.responseText + "response");
                }
            };
            xhttp.open("PATCH", "http://proyectos.hatchtemuco.com/api/proyecto/"+this.proyecto_seleccionado.id+"/estado/"+this.proyecto_seleccionado_editado.estado+"/", false);
            xhttp.send();
            var xhttp2 = new XMLHttpRequest();
            xhttp2.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    console.log(this.responseText + "response");
                }
            };
            xhttp2.open("PATCH", "http://proyectos.hatchtemuco.com/api/proyecto/"+this.proyecto_seleccionado.id+"/nombre/"+this.proyecto_seleccionado_editado.nombre+"/", false);
            xhttp2.send();
            this.cambiar_estado('ver_proyecto');
            this.$emit('getDatos');
        },
        get_prioridad_by_id: function(item){
            return item.prioridad;
            
        },/*
        editar_estado_tarea: function(num, item){
            alert("Editar estado tarea"+num+item);
        },
        editar_tarea: function(item){
            alert("Editar tarea"+item);
        },
        cambiar_id_tarea_editada: function( item ){
            alert("Cambia id tarea editada"+item);
        },
        eliminar_tarea: function(item){
            alert("Eliminar tarea"+item);
        }
        */
    },
    mounted: function(){
        console.log(this.proyecto);
    }
}
</script>
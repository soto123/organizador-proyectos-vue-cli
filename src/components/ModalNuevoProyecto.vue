<template>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Añadir</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                        <label>Nombre</label>
                        <input type="text" name="nombre" class="w-100 border mb-4" v-model="nuevo.nombre">
                        <label>Imagen</label>
                        <input type="text" name="imagen" class="w-100 border mb-4" v-model="nuevo.imagen">
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" id="close-modal-nuevo-proyecto">Close</button>
                    <button type="button" class="btn btn-primary" :class="[nuevo.imagen.length === 0 || nuevo.nombre.length === 0 ? 'disabled' : '']" :disabled="nuevo.imagen.length === 0 || nuevo.nombre.length=== 0" @click="agregar_proyecto()">Save changes</button>
                </div>
            </div>
        </div>
        
    </div>
</template>
<script>

export default {
    name: 'ModalNuevoProyecto',
    data (){
        return{
            nuevo: {"nombre":"Estado nuevo","imagen":"imagen estado nuevo"} ,
        }
    },
    methods:{
        agregar_proyecto: function(){
            var bool = false;
            var formData = new FormData();
            formData.append("nombre", this.nuevo.nombre);
            formData.append("imagen", this.nuevo.imagen);
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    // Typical action to be performed when the document is ready:
                    bool = this.responseText;
                    console.log(this.responseText);
                }
            };
            xhttp.open("POST", "http://proyectos.hatchtemuco.com/api/proyecto/", false);
            xhttp.send(formData);
            if(bool  != false ){
                this.nuevo = {"nombre":"","imagen":""};
            }else{
                console.log("Error al guardar");
            }
            this.$emit('getDatos');
            document.getElementById("close-modal-nuevo-proyecto").click();
        },
    }
}
</script>
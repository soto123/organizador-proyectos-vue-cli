<template>
    <div class="col-md-4 pl-2 pr-2 tarjeta-dashboard">
        <div class="card bg-light">
            <div class="card-body">
            <h5 class="card-title">Total de <slot></slot>:</h5>
            <p class="card-text h3">{{contador}} activos.</p>
            <a href="#" class="btn btn-primary">Ver más...</a>
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'TarjetaDashboard',
  props: {
    contador: String
  },
  components: {
    
  }
}
</script>
<template>
    <li><a class="nav-link text-white border active" v-bind:href="pagina.url">{{pagina.nombre}}</a></li>
</template>
<script>
export default {
  name: 'ItemMenuNav',
  props: {
    pagina: String
  }
}
</script>
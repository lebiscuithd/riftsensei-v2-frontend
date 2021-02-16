<template>
  <v-app id="app">
    <Navbar/>
    <v-main class="backgroundDark">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar'
export default {
  components: { Navbar },
  name: 'App'
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #f2f2f2;
}
.v-application {
  font-family: 'Roboto', sans-serif;
}
</style>

<template>
  <v-app id="app">
    <Navbar/>
    <v-main class="blue-grey darken-4">
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
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #f2f2f2;
  margin-top: 60px;
}
</style>

<template>
  <UserDisplay msg="User Display"/>
</template>

<script>
import UserDisplay from './components/User.vue'

export default {
  name: 'App',
  components: {
    UserDisplay
  }
}
</script>

<style>
body {
  background-color: lightgrey;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

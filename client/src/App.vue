<template>

  <div id="app">
    <div id="nav">
      <router-link to="/">Boards</router-link> |
    </div>
    <router-view />
    <!--REVIEW What does this do?-->
  </div>
</template>

<script>
  export default {
    name: "App",
    mounted() { }
  };
</script>

<style>
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    background-color: rgb(171, 236, 233);
  }

  #nav {
    padding: 30px;
  }

  #nav a {
    font-weight: bold;
    color: #42b983;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }
</style>
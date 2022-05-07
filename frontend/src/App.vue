<template>
  <!--<nav>
    <router-link to="/">Login</router-link> | 
    <router-link to="/about">About</router-link>
  </nav>-->

  <router-view/>
</template>

<script>
//import RegisterLoginView from '../src/views/RegisterLoginView.vue'
export default {
    components: {
      //RegisterLoginView
    }
}
</script>

<style lang="scss">
html, body {
  margin: 0;
  padding: 0;
}

/*nav {
  display: flex;
  padding-right: 10px ;
  justify-content: flex-end;
  padding: 10px;
}*/
/*#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}*/
</style>

<template>
  <div id="nav"></div>
  <router-view />
</template>

<style>
* {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  overflow: hidden;
}

#nav {
  margin: 0;
  padding: 30px;
  background-color: black;
}

button {
  width: 100px;
  padding: 0.8rem;
  border-radius: 5px;
  border: none;
  font-weight: 700;
  cursor: pointer;
}
</style>

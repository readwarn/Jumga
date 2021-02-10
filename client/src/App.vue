<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap');
*{
  margin: 0;
  box-sizing: border-box;
}
#app {
  font-family: 'PT Sans', sans-serif;
  height: 100vh;
}
div#app input,div#app textarea,div#app select,div#app option{
   font-size: 16px;
}
</style>

<template>
  <div id="app">
    store里面的age：{{$store.state.age}}
    <br />
    <button @click="$store.state.age = 100">点击</button>
    getters里面的mgAge：{{$store.getters.mgAge}}
    <div @click="change">点击更改</div>
    <div @click="asyncChange">异步更改</div>
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    change() {
      this.$store.commit("syncChange", 2);
    },
    asyncChange() {
      this.$store.dispatch("syncChange", 2);
    }
  },
  mounted() {
    console.log(this.$store);
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

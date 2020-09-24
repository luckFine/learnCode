<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'Home',
  components: {
    
  },
  setup(props,context){
    console.log(props)
    console.log(context)
    console.log(this)
  }
}
</script>

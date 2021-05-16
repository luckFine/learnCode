<template lang='html'>
    <div>
        <ul class="nav">
          <router-link to='/home' tag="li">home</router-link>
          <router-link to='/market' tag="li">market</router-link>
        </ul>
        <router-view class='view'></router-view>
    </div>
</template>
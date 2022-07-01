<script setup lang="ts">
import { useMouse } from '@vueuse/core';
const { x, y } = useMouse();
</script>

<template>
  <div>
    <img alt="Vue logo"
         src="../assets/logo.png" />
    <HelloWorld msg='Hello Vue 3 + TypeScript + Vite'
                }></HelloWorld>
    <h3>Mouse: {{x}} x {{y}}</h3>
  </div>
</template>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>

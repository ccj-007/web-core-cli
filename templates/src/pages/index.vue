<script setup lang="ts">
import { useMouse } from '@vueuse/core';

const { x, y } = useMouse();
</script>

<template>
  <button>我是index ！！1</button>
  <h1> 测试 vueUse 的鼠标坐标 </h1>
  <h3>Mouse: {{x}} x {{y}}</h3>
  <a-button>Add</a-button>
  <usePinia></usePinia>
</template>

<style>
</style>

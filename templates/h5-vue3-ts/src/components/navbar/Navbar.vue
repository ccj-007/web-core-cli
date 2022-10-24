<template>
  <div class="fixed top-[0] left-[0] w-[100%] h-[44px] flex items-center">
    <div class="w-[15vw]" @click="handleClick"> left </div>
    <div class="text-16 w-[70vw] font-bold">navbar</div>
    <div class="w-[15vw]"></div>
  </div>
</template>
  
<script setup lang='ts'>
const handleClick = () => {
    console.log('clicked');
};
</script>

<style>
</style>
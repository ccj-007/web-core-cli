 <script lang="ts" setup>
import { useUserStore } from '@/store/user';

const userStore = useUserStore();
userStore.updateName('登录界面');
</script>
    
<template>
  <div>{{ userStore.name }}</div>
</template>


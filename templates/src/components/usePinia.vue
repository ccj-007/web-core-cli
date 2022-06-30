 <template>
     <div>{{ userStore.name }}</div>
   </template>

 <script lang="ts" setup>
import { useUserStore } from '@/store/user';

const userStore = useUserStore();

userStore.updateName('李四');
</script>

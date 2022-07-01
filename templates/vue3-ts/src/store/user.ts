import { defineStore } from 'pinia';

export const useUserStore = defineStore({
    id: 'user', // id必填，且需要唯一
    state: () => {
        return {
            name: '跳转中.....',
        };
    },
    actions: {
        updateName(name: string) {
            setTimeout(() => {
                this.name = name;
            }, 3000);
        },
    },
});

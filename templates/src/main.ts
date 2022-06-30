import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import { Button, message } from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

// 创建vue实例
const app = createApp(App);
// 挂载pinia
app.use(store);

app.use(router);

app.use(Button);
// 挂载实例
app.mount('#app');

app.config.globalProperties.$message = message;

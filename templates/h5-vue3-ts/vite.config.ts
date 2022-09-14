import { UserConfigExport } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import { viteVConsole } from 'vite-plugin-vconsole';

const path = require('path');

interface ConfigEnv {
    command: 'build' | 'serve';
    mode: 'production' | 'development' | 'test';
}

export default ({ command, mode }: ConfigEnv): UserConfigExport => {
    return {
        resolve: {
            //设置别名
            alias: {
                '@': path.resolve(__dirname, 'src'),
            },
        },
        plugins: [
            vue(),
            viteVConsole({
                entry: path.resolve('src/main.ts'),
                localEnabled: command === 'serve',
                enabled: mode !== 'development',
                config: {
                    maxLogNumber: 1000,
                    theme: 'dark',
                },
            }),
            Components({
                resolvers: [AntDesignVueResolver()],
            }),
        ],
        server: {
            port: 8080, //启动端口
            hmr: {
                host: '127.0.0.1',
            },
            // 设置 https 代理
            proxy: {
                '/api': {
                    target: 'your https address',
                    changeOrigin: true,
                    rewrite: (path: string) => path.replace(/^\/api/, ''),
                },
            },
        },
    };
};

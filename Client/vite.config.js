import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    // build: {
    //     outDir: 'dist', // Matches CRA's build folder
    // },
    // server: {
    //     port: 3000,
    //     open: true,
    // },
});
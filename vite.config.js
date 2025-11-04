import react from '@vitejs/plugin-react';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            src: path.resolve(__dirname, './src'),
        },
    },
    test: {
        environment: 'jsdom',
        exclude: ['node_modules/**', 'playwrightTests/**/*'],
        globals: true,
        setupFiles: './src/setupTests.js',
    },
});

import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './playwrightTests/',
    testMatch: '**/*.spec.js',
    testIgnore: ['**/src/utils/tests/**'],
    timeout: 30 * 1000,
    retries: 0,
    use: {
        headless: true,
        baseURL: 'http://localhost:5173',
        trace: 'off',
        video: 'retain-on-failure',
    },
});

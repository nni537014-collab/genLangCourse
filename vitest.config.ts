import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        // Keeps tests isolated and clean
        globals: false,
        environment: 'node',
    },
});

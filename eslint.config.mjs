import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.recommended,
    {
        rules: {
            // Add your custom rule overrides here (e.g., "no-explicit-any": "warn")
        }
    }
);

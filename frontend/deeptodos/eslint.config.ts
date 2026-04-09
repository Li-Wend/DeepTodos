import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
    extends: [js.configs.recommended],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },
  {
    ignores: [
      // 文件夹
      'dist/**',
      'build/**',
      'coverage/**',
      'node_modules/**',
      '.git/**',
      'src/client/**',

      // 特定文件类型
      '**/*.min.js',
      '**/*.bundle.js',

      // 特定文件夹中的特定文件
      'src/generated/**/*.ts',
      'assets/vendor/**',

      // 测试文件
      '**/*.spec.js',
      '**/*.test.js',
      '**/__tests__/**',

      // 配置文件
      '**/webpack.config.js',
      '**/vite.config.ts',
    ],
  },
]);

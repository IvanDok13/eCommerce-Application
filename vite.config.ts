import { defineConfig } from 'vite';

export default defineConfig({
  css: {
    modules: {
      localsConvention: 'camelCase',
      generateScopedName: '[local]',
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/mixins.scss"; @import "./src/styles/placeholders.scss";`,
      },
    },
  },
  base: '',
});

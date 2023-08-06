import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: './src',
  build: {
    outDir: '../dist',
    minify: false,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        module1: resolve(__dirname, 'src/modulo1.html'),
        module2: resolve(__dirname, 'src/modulo2.html'),
        module3: resolve(__dirname, 'src/modulo3.html'),
        module4: resolve(__dirname, 'src/modulo4.html'),
        module5: resolve(__dirname, 'src/modulo5.html'),
        sync: resolve(__dirname, 'src/sync.html'),
        moduleNovedades: resolve(__dirname, 'src/modulo-novedades.html'),
      },
    },
  },
});

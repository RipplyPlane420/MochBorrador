import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        hermosillo: resolve(__dirname, 'sucursales/hermosillo.html'),
        guadalajara: resolve(__dirname, 'sucursales/guadalajara.html'),
        aguascalientes: resolve(__dirname, 'sucursales/aguascalientes.html'),
      },
    },
  },
  server: {
    port: 3000
  }
});


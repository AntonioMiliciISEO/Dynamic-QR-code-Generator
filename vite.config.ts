
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    // assetsInlineLimit: 0 forza Vite a non incorporare le immagini come stringhe Base64
    // ma a salvarle come file separati nella cartella 'assets'.
    assetsInlineLimit: 0,
    target: 'esnext'
  }
});

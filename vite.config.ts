
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Replace 'baroda-cars-demo' with your repository name
export default defineConfig({
  plugins: [react()],
  base: '/baroda-cars-demo/', 
  build: {
    outDir: 'dist',
  }
});

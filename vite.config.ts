import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    // Load env file based on `mode` in the current working directory.
    // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
    // Fix: Cast process to any to handle missing Node types for cwd()
    const cwd = (process as any).cwd();
    const env = loadEnv(mode, cwd, '');

    return {
      // This is the CRITICAL line for GitHub Pages deployment in a subfolder
      base: '/peches-des-yeux/',
      
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        // Ensures process.env.API_KEY is available in your client-side code
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY || process.env.API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY || process.env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          // Fix: Use cwd instead of __dirname to avoid errors in ESM/TS environments
          '@': path.resolve(cwd, '.'),
        }
      }
    };
});
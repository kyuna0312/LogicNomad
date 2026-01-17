import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Enable React Fast Refresh
      fastRefresh: true,
      // Optimize JSX runtime
      jsxRuntime: 'automatic',
    }),
    tailwindcss(),
  ],
  base: '/LogicNomad/', // For GitHub Pages deployment
  resolve: {
    alias: {
      '@logicnomad/engine': path.resolve(__dirname, '../../packages/engine/src'),
      '@logicnomad/engine/flowgraph': path.resolve(__dirname, '../../packages/engine/src/flowgraph'),
      '@logicnomad/engine/executor': path.resolve(__dirname, '../../packages/engine/src/executor'),
    },
  },
  optimizeDeps: {
    include: ['@logicnomad/engine', 'react', 'react-dom', 'reactflow', 'zustand'],
    esbuildOptions: {
      target: 'es2020',
    },
  },
  build: {
    target: 'es2020',
    minify: 'esbuild', // Faster than terser
    sourcemap: false, // Disable sourcemaps in production for smaller bundle
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor chunks
          'react-vendor': ['react', 'react-dom', 'react/jsx-runtime'],
          'flow-vendor': ['reactflow'],
          'state-vendor': ['zustand'],
        },
        // Optimize chunk names
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
  },
  server: {
    fs: {
      allow: ['..'],
    },
  },
})

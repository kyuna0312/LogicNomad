// @ts-nocheck - Skip type checking for monorepo vite type conflicts
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
  ] as any, // Type assertion to fix monorepo vite type conflict
  base: '/LogicNomad/', // For GitHub Pages deployment
  resolve: {
    alias: {
      '@logicnomad/engine': path.resolve(__dirname, '../../packages/engine/src'),
      '@logicnomad/engine/flowgraph': path.resolve(__dirname, '../../packages/engine/src/flowgraph'),
      '@logicnomad/engine/executor': path.resolve(__dirname, '../../packages/engine/src/executor'),
    },
  },
  optimizeDeps: {
    include: ['@logicnomad/engine', 'react', 'react-dom', 'reactflow', 'zustand', '@apollo/client', 'graphql'],
    esbuildOptions: {
      target: 'es2020',
    },
  },
  build: {
    target: 'es2020',
    minify: 'esbuild', // Faster than terser
    sourcemap: process.env.NODE_ENV === 'production' ? false : true, // Disable sourcemaps in production
    cssMinify: true, // Minify CSS
    cssCodeSplit: true, // Split CSS into separate files
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Split vendor chunks more intelligently
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react/jsx-runtime')) {
              return 'react-vendor';
            }
            if (id.includes('reactflow')) {
              return 'flow-vendor';
            }
            if (id.includes('zustand')) {
              return 'state-vendor';
            }
            if (id.includes('@apollo/client') || id.includes('graphql')) {
              return 'graphql-vendor';
            }
            // Other node_modules go into a separate chunk
            return 'vendor';
          }
        },
        // Optimize chunk names
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
        // Optimize chunk size
        compact: true,
      },
    },
    // Report compressed size
    reportCompressedSize: true,
    // Chunk size warning limit (600KB)
    chunkSizeWarningLimit: 600,
    // Tree shaking
    treeshake: {
      moduleSideEffects: false,
      preset: 'recommended',
    },
  },
  server: {
    fs: {
      allow: ['..'],
    },
  },
})

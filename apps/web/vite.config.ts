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
  base: process.env.NODE_ENV === 'production' ? '/LogicNomad/' : '/', // Only use base path in production
  resolve: {
    alias: {
      '@logicnomad/engine': path.resolve(__dirname, '../../packages/engine/src'),
      '@logicnomad/engine/flowgraph': path.resolve(__dirname, '../../packages/engine/src/flowgraph'),
      '@logicnomad/engine/executor': path.resolve(__dirname, '../../packages/engine/src/executor'),
    },
  },
  optimizeDeps: {
    include: [
      '@logicnomad/engine',
      'react',
      'react-dom',
      'reactflow',
      'zustand',
      '@apollo/client',
      'graphql',
      '@chakra-ui/react',
      '@emotion/react',
      '@emotion/styled',
      'framer-motion',
    ],
    esbuildOptions: {
      target: 'es2020',
    },
    // Force optimization of Chakra UI
    force: false,
  },
  build: {
    target: 'es2020',
    minify: 'esbuild', // Faster than terser
    // Disable sourcemaps in dev to prevent React DevTools errors
    // Sourcemaps are only needed for production debugging
    sourcemap: false, // Disable sourcemaps to prevent React DevTools parsing errors
    cssMinify: true, // Minify CSS
    cssCodeSplit: true, // Split CSS into separate files
    // Reduce chunk size warnings threshold
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Split vendor chunks more intelligently for better caching
          // Order matters - check more specific patterns first to avoid circular dependencies
          if (id.includes('node_modules')) {
            // Chakra UI and emotion (large but stable, check before react)
            if (id.includes('@chakra-ui') || id.includes('@emotion') || id.includes('framer-motion')) {
              return 'ui-vendor';
            }
            // ReactFlow (check before react)
            if (id.includes('reactflow')) {
              return 'flow-vendor';
            }
            // GraphQL (check before react)
            if (id.includes('@apollo/client') || id.includes('graphql')) {
              return 'graphql-vendor';
            }
            // State management (check before react)
            if (id.includes('zustand')) {
              return 'state-vendor';
            }
            // React core (check last to avoid circular deps)
            if (id.includes('react') || id.includes('react-dom') || id.includes('react/jsx-runtime')) {
              return 'react-vendor';
            }
            // Other node_modules go into a separate chunk
            return 'vendor';
          }
          // Split internal packages for better caching and lazy loading
          if (id.includes('@logicnomad/engine')) {
            // Further split engine by subpath for better tree shaking
            if (id.includes('/flowgraph')) {
              return 'engine-flowgraph';
            }
            if (id.includes('/executor')) {
              return 'engine-executor';
            }
            return 'engine';
          }
          if (id.includes('@logicnomad/flowgraph')) {
            return 'flowgraph';
          }
          if (id.includes('@logicnomad/ui')) {
            return 'ui-components';
          }
          if (id.includes('@logicnomad/reactflow')) {
            return 'reactflow-extended';
          }
          // Split pages for better code splitting
          if (id.includes('/pages/')) {
            const pageName = id.match(/pages\/([^/]+)/)?.[1];
            if (pageName) {
              return `page-${pageName}`;
            }
          }
          // Split large components
          if (id.includes('/components/game/')) {
            return 'components-game';
          }
          if (id.includes('/components/problem/')) {
            return 'components-problem';
          }
        },
        // Optimize chunk names
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
        // Optimize chunk size
        compact: true,
        // Better minification
        generatedCode: {
          constBindings: true,
        },
      },
    },
    // Report compressed size
    reportCompressedSize: true,
    // Tree shaking
    treeshake: {
      moduleSideEffects: false,
      preset: 'recommended',
      propertyReadSideEffects: false,
      tryCatchDeoptimization: false,
    },
  },
  server: {
    fs: {
      allow: ['..'],
    },
  },
  // Suppress console warnings for known issues
  logLevel: 'warn', // Reduce noise from source map warnings
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// CRA-compatible Vite setup:
// - `envPrefix` keeps the existing REACT_APP_* variables working, so .env
//   files and code referencing them need no renaming (read via import.meta.env).
// - `build.outDir: 'build'` matches firebase.json hosting ("public": "build").
// - dev server on port 3000 to match the old `react-scripts start` default.
export default defineConfig({
  plugins: [react()],
  envPrefix: ['VITE_', 'REACT_APP_'],
  // CRA stores JSX in .js files. esbuild's default loader for .js is plain JS
  // (which rejects JSX), so teach it to treat src/*.js as JSX. The React plugin
  // already configures the automatic JSX runtime, so no React import is needed.
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.jsx?$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: { '.js': 'jsx' },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'build',
  },
})

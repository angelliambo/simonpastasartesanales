import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  // Map VITE_ variables and NODE_ENV to process.env for runtime compatibility
  const processEnvDefine: Record<string, string> = {};
  Object.keys(env).forEach((key) => {
    if (key.startsWith('VITE_') || key === 'NODE_ENV') {
      processEnvDefine[`process.env.${key}`] = JSON.stringify(env[key]);
    }
  });

  return {
    plugins: [
      tanstackRouter({
        autoCodeSplitting: true,
      }),
      react(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@shared': path.resolve(__dirname, '../../shared/src'),
        '@design-sys': path.resolve(__dirname, '../../shared/src/design-sys'),
        '@factory/shared': path.resolve(__dirname, '../../shared/src'),
      },
    },
    define: {
      ...processEnvDefine,
    },
    server: {
      port: 3000,
      open: true,
      proxy: {
        '/api': {
          target: 'http://localhost:5000',
          changeOrigin: true,
        },
      },
    },
    build: {
      outDir: 'build',
      emptyOutDir: true,
      sourcemap: mode === 'development',
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/') || id.includes('node_modules/react-router-dom/')) {
              return 'vendor-react';
            }
            if (id.includes('node_modules/antd/') || id.includes('node_modules/@ant-design/')) {
              return 'vendor-antd';
            }
            if (id.includes('node_modules/styled-components/')) {
              return 'vendor-styled';
            }
            if (id.includes('node_modules/@reduxjs/') || id.includes('node_modules/react-redux/')) {
              return 'vendor-redux';
            }
          },
        },
      },
    },
  };
});

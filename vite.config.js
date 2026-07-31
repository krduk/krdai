import { defineConfig } from 'vite';

export default defineConfig({
  // GitHub Pagesでサブディレクトリ（例: https://<username>.github.io/kentAI/）で公開する場合に対応
  base: './',
  build: {
    outDir: 'dist',
  }
});

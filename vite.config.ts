import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  root: path.resolve(__dirname, './packages/visualized-compiler'),
  plugins: [reactRefresh()]
})

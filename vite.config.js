import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import dotenv from 'dotenv';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  define: {
    'USERNAME': `"${process.env.VITE_REACT_USERNAME}"`,
    'PASSWORD': `"${process.env.VITE_REACT_PASSWORD}"`,
    'CURRENCY_URL': `"${process.env.VITE_CURRENCY_URL}"`,
    'COUNTRIES_URL': `"${process.env.VITE_COUNTRIES_URL}"`,
    'CONVERSTION_URL': `"${process.env.VITE_CONVERSION_URL}"`
  },
});

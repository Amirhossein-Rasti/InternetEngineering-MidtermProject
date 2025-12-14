import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from 'path';

export default defineConfig({
    plugins: [tailwindcss()],
    base: '/InternetEngineering-MidtermProject/',
     build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        login: resolve(__dirname, 'login.html')
      }
    }
}
});


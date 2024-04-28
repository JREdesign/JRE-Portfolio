import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Configura el directorio de salida para los archivos de producción
    outDir: 'dist',

    // Otras configuraciones de compilación pueden ser añadidas aquí
    // Por ejemplo, puedes configurar 'minify' para 'true' para minificar los archivos de salida
    minify: true,

    // Ajusta el modo de construcción para eliminar código de depuración en producción
    sourcemap: false,

    // Configuraciones adicionales para optimizar el rendimiento de tu aplicación
    rollupOptions: {
      output: {
        // Divide tu código en varios chunks para mejorar la carga
        manualChunks: id => {
          if (id.includes('node_modules')) {
            // divide dependencias de node_modules en un chunk separado
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    }
  }
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  // El hosting todavía no está decidido, así que el proyecto se mantiene
  // exportable a estático: sin middleware y sin rutas dinámicas de servidor.
  // Para generar el sitio estático basta con añadir `output: "export"` aquí y
  // `unoptimized: true` en `images`.
  images: {
    formats: ["image/avif", "image/webp"],
    // Las fotos de producto son PNG recortados sobre fondo transparente; estos
    // cortes cubren desde la miniatura de card hasta la galería de la ficha.
    imageSizes: [96, 128, 200, 256, 320, 420],
    deviceSizes: [640, 828, 1080, 1200, 1920],
  },
};

export default nextConfig;

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  // devtools: { enabled: true },
  devServer: {
    port: 8080,
  },
  pages: true,

  modules: ["@vite-pwa/nuxt"],

  app: {
    head: {
      htmlAttrs: {
        lang: "id",
      },
      link: [
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css",
          integrity:
            "sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg==",
          crossorigin: "anonymous",
          referrerpolicy: "no-referrer",
        },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png",
        },
        {
          rel: "manifest",
          href: "/site.webmanifest",
        },
      ],
      // meta: [
      //   { charset: "utf-8" },
      //   {
      //     name: "viewport",
      //     content: "width=device-width, initial-scale=1.0",
      //   },
      //   {
      //     name: "description",
      //     content:
      //       "Aplikasi penyaji tips, trik, dan solusi inovatif untuk mengatasi masalah bug dan konfigurasi dalam pengembangan software. Didesain khusus untuk developer pemula yang ingin belajar lebih mudah dan efisien.",
      //   },
      //   {
      //     name: "keywords",
      //     content:
      //       "javascript, website, developer, pemula, bug, error, cara, trik",
      //   },
      //   {
      //     name: "author",
      //     content: "Yuri S. Ostrovsky",
      //   },
      //   {
      //     name: "robots",
      //     content: "index, follow",
      //   },
      //   {
      //     property: "og:title",
      //     content: "senimentari blog: jurnal perjalanan belajar",
      //   },
      //   {
      //     property: "og:description",
      //     content:
      //       "Kumpulan artikel yang berisi tips, trik, dan panduan konfigurasi serta debug pada pengembangan software",
      //   },
      //   {
      //     property: "og:type",
      //     content: "article",
      //   },
      //   {
      //     property: "og:url",
      //     content: "https://senimentari-blog.vercel.app/",
      //   },
      //   {
      //     property: "og:image",
      //     content: "https://senimentari-blog.vercel.app/images/logo-blog.webp",
      //   },
      //   {
      //     name: "twitter:card",
      //     content: "summary_large_image",
      //   },
      //   {
      //     name: "twitter:title",
      //     content: "senimentari blog: jurnal perjalanan belajar",
      //   },
      //   {
      //     name: "twitter:description",
      //     content:
      //       "Aplikasi penyaji tips, trik, dan solusi inovatif untuk mengatasi masalah bug dan konfigurasi dalam pengembangan software.",
      //   },
      //   {
      //     name: "twitter:image",
      //     content: "https://senimentari-blog.vercel.app/images/logo-blog.webp",
      //   },
      // ],
    },
  },

  pwa: {
    manifest: {
      name: "Tes Mata Pintar",
      short_name: "Tes Mata Pintar",
      theme_color: "#ffffff",
      description: "Aplikasi peemberi layanan tes mata gratis.",
      start_url: "/",
      icons: [
        {
          src: "image/android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "image/android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
      ],
    },
    workbox: {
      navigateFallback: "/",
      importScripts: ["/sw.js"],
      globPatterns: ["**/*.{js,css,html,png,svg,jpg,woff2}"],
    },
    strategies: "generateSW",
    devOptions: {
      enabled: true,
      type: "module",
    },
  },
});

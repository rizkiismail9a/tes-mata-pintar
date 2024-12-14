// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  // devtools: { enabled: true },
  devServer: {
    port: 8080,
  },

  runtimeConfig: {
    public: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      dbUri: process.env.DB_URL,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messageSenderId: process.env.MESSAGE_SENDER_ID,
      appId: process.env.APP_ID,
    },
  },

  plugins: [
    {
      src: "~/plugins/vee-validate.js",
    },
  ],

  pages: true,

  css: ["~/assets/css/main.css"],

  modules: ["@vite-pwa/nuxt", "@pinia/nuxt"],

  app: {
    head: {
      title: "Tes Mata Pintar",
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
      meta: [
        { charset: "utf-8" },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1.0",
        },
        {
          name: "description",
          content:
            "Tes Mata Pintar adalah aplikasi PWA gratis yang membantu kamu melakukan tes rabun dan buta warna secara mudah. Dikembangkan oleh mahasiswa UNSIA sebagai tugas ICT Literacy.",
        },
        {
          name: "keywords",
          content:
            "tes mata pintar, tes rabun, tes buta warna, aplikasi gratis, PWA, kesehatan mata, ICT Literacy",
        },
        {
          name: "author",
          content:
            "Kelompok 7 Mahasiswa UNSIA IF103 2024/25 kelas ICT Literacy",
        },
        {
          name: "robots",
          content: "index, follow",
        },
        {
          property: "og:title",
          content: "Tes Mata Pintar: Tes Mata Online Gratis",
        },
        {
          property: "og:description",
          content:
            "Tes Mata Pintar adalah aplikasi PWA gratis yang membantu kamu melakukan tes rabun dan buta warna secara mudah. Dikembangkan oleh mahasiswa UNSIA sebagai tugas ICT Literacy.",
        },
        {
          property: "og:type",
          content: "website",
        },
        {
          property: "og:url",
          content: "https://tes-mata-pintar.vercel.app/",
        },
        {
          property: "og:image",
          content: "https://tes-mata-pintar.vercel.app/icon/logo-tmp.png",
        },
        {
          name: "twitter:card",
          content: "summary_large_image",
        },
        {
          name: "twitter:title",
          content: "Tes Mata Pintar: Tes Mata Online Gratis",
        },
        {
          name: "twitter:description",
          content:
            "Tes Mata Pintar adalah aplikasi PWA gratis yang membantu kamu melakukan tes rabun dan buta warna secara mudah. Dikembangkan oleh mahasiswa UNSIA sebagai tugas ICT Literacy.",
        },
        {
          name: "twitter:image",
          content: "https://tes-mata-pintar.vercel.app/icon/logo-tmp.png",
        },
      ],
    },
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
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
    strategies: "injectManifest",
    devOptions: {
      enabled: true,
      type: "module",
    },
  },
});

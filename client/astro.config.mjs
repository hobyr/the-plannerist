// @ts-check
import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  image: {
    remotePatterns: [{ protocol: "https", hostname: "**.strapiapp.com" }, { protocol: "http" }],
  },
  adapter: netlify(),
});

// @ts-check
import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import partytown from '@astrojs/partytown';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  image: {
    remotePatterns: [{ protocol: "https", hostname: "**.strapiapp.com" }, { protocol: "http" }],
  },
  adapter: netlify(),
  site: "https://theplannerist.com",
  integrations: [partytown({ config: { forward: ['dataLayer.push'] } }), sitemap()],
});

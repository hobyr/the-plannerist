// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
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
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Google Sans Flex",
      cssVariable: "--font-google-sans-flex",
      weights: [400, 500, 600],
    }, 
    {
      provider: fontProviders.fontsource(),
      name: "Instrument Serif",
      cssVariable: "--font-instrument-serif",
      weights: [200, 300, 400, 500, 600],
    },
    {
      provider: fontProviders.fontsource(),
      name: "Outfit",
      cssVariable: "--font-outfit",
      weights: [200, 300, 400, 500]
    },
  ],
});

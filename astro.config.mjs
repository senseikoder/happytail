import { defineConfig } from 'astro/config';
import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
   site: "https://happytailgrooming.com/",
   output: 'hybrid',
   adapter: netlify({
      cacheOnDemandPages: true,
   }),
});

/**
 * Most adjustments must be made in `./src/_config/*`
 */

/**
 * Configures Eleventy with various settings, collections, plugins, filters, shortcodes, and more.
 * Hint VS Code for eleventyConfig autocompletion.
 * © Henry Desroches - https://gist.github.com/xdesro/69583b25d281d055cd12b144381123bf
 * @param {import("@11ty/eleventy/src/UserConfig")} eleventyConfig -
 * @returns {Object} -
 */

// register dotenv for process.env.* variables to pickup
import dotenv from 'dotenv';
dotenv.config();

// add yaml support
import yaml from 'js-yaml';

//  config import
import {getEnPosts, getEsPosts, onlyMarkdown, tagList} from './src/_config/collections.js';
import events from './src/_config/events.js';
import filters from './src/_config/filters.js';
import plugins from './src/_config/plugins.js';
import shortcodes from './src/_config/shortcodes.js';
import { EleventyI18nPlugin } from "@11ty/eleventy";

export default async function (eleventyConfig) {
  eleventyConfig.addWatchTarget('./src/assets/**/*.{css,js,svg,png,jpeg}');
  eleventyConfig.addWatchTarget('./src/_includes/**/*.{webc}');
  eleventyConfig.addWatchTarget("./src/chapters/**/*.md");
  
  // --------------------- layout aliases
  eleventyConfig.addLayoutAlias('base', 'base.njk');
  eleventyConfig.addLayoutAlias('page', 'page.njk');
  eleventyConfig.addLayoutAlias('post', 'post.njk');
  eleventyConfig.addLayoutAlias('tags', 'tags.njk');
  
  //	---------------------  Collections
  // eleventyConfig.addCollection('allPosts', getAllPosts);
  eleventyConfig.addCollection('getEnPosts', getEnPosts);
  eleventyConfig.addCollection('getEsPosts', getEsPosts);
  eleventyConfig.addCollection('onlyMarkdown', onlyMarkdown);
  eleventyConfig.addCollection('tagList', tagList);
  
  // ---------------------  Plugins
  eleventyConfig.addPlugin(plugins.htmlConfig);
  eleventyConfig.addPlugin(plugins.cssConfig);
  eleventyConfig.addPlugin(plugins.jsConfig);
  eleventyConfig.addPlugin(plugins.drafts);
  eleventyConfig.addPlugin(EleventyI18nPlugin, {
		// any valid BCP 47-compatible language tag is supported
		defaultLanguage: "en", // Required, this site uses "en"
    errorMode: "allow-fallback",
	});

  eleventyConfig.addPlugin(plugins.EleventyRenderPlugin);
  eleventyConfig.addPlugin(plugins.rss);
  eleventyConfig.addPlugin(plugins.syntaxHighlight);

  eleventyConfig.addPlugin(plugins.webc, {
    components: ['./src/_includes/webc/*.webc'],
    useTransform: true
  });

  // ---------------------  bundle
  eleventyConfig.addBundle('css', {hoist: true});

  // 	--------------------- Library and Data
  eleventyConfig.setLibrary('md', plugins.markdownLib);
  eleventyConfig.addDataExtension('yaml', contents => yaml.load(contents));

  // --------------------- Filters
  eleventyConfig.addFilter('toIsoString', filters.toISOString);
  eleventyConfig.addFilter('formatDate', filters.formatDate);
  eleventyConfig.addFilter('markdownFormat', filters.markdownFormat);
  eleventyConfig.addFilter('splitlines', filters.splitlines);
  eleventyConfig.addFilter('striptags', filters.striptags);
  eleventyConfig.addFilter('shuffle', filters.shuffleArray);
  eleventyConfig.addFilter('alphabetic', filters.sortAlphabetically);
  eleventyConfig.addFilter('slugify', filters.slugifyString);
  eleventyConfig.addFilter('filterByLang', filters.filterByLang);

  // --------------------- Shortcodes
  eleventyConfig.addShortcode('svg', shortcodes.svgShortcode);
  eleventyConfig.addAsyncShortcode('image', shortcodes.imageShortcode);
  eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`);

  // --------------------- Events ---------------------
  if (process.env.ELEVENTY_RUN_MODE === 'serve') {
    eleventyConfig.on('eleventy.after', events.svgToJpeg);
  }

  // --------------------- Passthrough File Copy

  // -- same path
  ['src/assets/fonts/', 'src/assets/images/template', 'src/assets/og-images'].forEach(path =>
    eleventyConfig.addPassthroughCopy(path)
  );

  eleventyConfig.addPassthroughCopy({
    // -- to root
    'src/assets/images/favicon/*': '/',

    // -- node_modules
    'node_modules/lite-youtube-embed/src/lite-yt-embed.{css,js}': `assets/components/`
  });

  // Add these passthrough copies
  eleventyConfig.addPassthroughCopy("src/assets/images");
  eleventyConfig.addPassthroughCopy("src/assets/fonts");

  // --------------------- Build Settings
  eleventyConfig.setDataDeepMerge(true);

  // Add collection for ordered report pages
  eleventyConfig.addCollection("orderedReport", function(collectionApi) {
    return collectionApi.getFilteredByGlob("./src/**/chapters/report/*.md")
      .sort((a, b) => {
        // First sort by language (en/es)
        const langA = a.inputPath.includes("/en/") ? "en" : "es";
        const langB = b.inputPath.includes("/en/") ? "en" : "es";
        if (langA !== langB) return langA.localeCompare(langB);
        
        // Then sort by order
        return (a.data.order || 9999) - (b.data.order || 9999);
      });
  });

  // --------------------- general config
  return {
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dir: {
      output: 'dist',
      input: 'src',
      includes: '_includes',
      layouts: '_layouts'
    }
  };
}

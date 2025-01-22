/** All blog posts as a collection. */
export const getEnPosts = collection => {
  return collection.getFilteredByGlob('./src/en/chapters/**/*.md');
};

export const getEsPosts = collection => {
  return collection.getFilteredByGlob('./src/es/chapters/**/*.md');
};

/** All markdown files as a collection for sitemap.xml */
export const onlyMarkdown = collection => {
  return collection.getFilteredByGlob('./src/**/*.{md,njk}');
};

/** All tags from all posts as a collection - excluding custom collections */
export const tagList = collection => {
  const tagsSet = new Set();
  collection.getAll().forEach(item => {
    if (!item.data.tags) return;
    item.data.tags.filter(tag => !['posts', 'docs', 'all'].includes(tag)).forEach(tag => tagsSet.add(tag));
  });
  return Array.from(tagsSet).sort();
};

module.exports = function (eleventyConfig) {
  // assets, the booking tool and the editor are copied through untouched
  eleventyConfig.addPassthroughCopy({ "assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "static": "." });

  // Content the editor manages as lists. A section renders only when it has entries.
  const yaml = require("js-yaml");
  eleventyConfig.addDataExtension("yml", (contents) => yaml.load(contents));

  eleventyConfig.addCollection("projects", (c) =>
    c.getFilteredByGlob("src/content/projects/*.md").sort((a, b) => (b.data.year || 0) - (a.data.year || 0)));
  eleventyConfig.addCollection("team", (c) =>
    c.getFilteredByGlob("src/content/team/*.md").sort((a, b) => (a.data.order || 99) - (b.data.order || 99)));
  eleventyConfig.addCollection("jobs", (c) =>
    c.getFilteredByGlob("src/content/careers/*.md").filter((j) => j.data.open !== false));

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};

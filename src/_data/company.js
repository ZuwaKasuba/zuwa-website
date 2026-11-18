// The editor writes content/settings/company.yml; Eleventy reads it from here.
const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");
module.exports = () =>
  yaml.load(fs.readFileSync(path.join(__dirname, "../content/settings/company.yml"), "utf8"));

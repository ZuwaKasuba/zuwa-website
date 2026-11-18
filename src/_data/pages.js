// The editor writes src/content/pages/<page>.yml; every template reads its own
// set through {{ pg.<field> }}, resolved from the page's `active` value.
const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");
const dir = path.join(__dirname, "../content/pages");
module.exports = () =>
  Object.fromEntries(
    fs.readdirSync(dir)
      .filter((f) => f.endsWith(".yml"))
      .map((f) => [f.replace(/\.yml$/, ""), yaml.load(fs.readFileSync(path.join(dir, f), "utf8"))])
  );

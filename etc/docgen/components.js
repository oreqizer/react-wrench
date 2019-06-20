// @noflow
const fsx = require("fs-extra");
const path = require("path");

const utils = require("./utils");

const SRC = path.join(__dirname, "../../src");
const COMPONENTS = path.join(SRC, "components");

function getComponentDoc(component) {
  const PATH = path.join(COMPONENTS, component, "README.md");
  if (!fsx.existsSync(PATH)) {
    return "";
  }

  const readme = String(fsx.readFileSync(PATH));
  return utils.getComponentDoc(component, readme);
}

const getList = component => `* [${component}](#${component.toLowerCase()})`;

function componentsDocs() {
  const components = fsx
    .readdirSync(COMPONENTS)
    .filter(component => fsx.existsSync(path.join(COMPONENTS, component, "README.md")));

  const list = components.map(getList).join("\n");
  const docs = components.map(getComponentDoc).join("\n");

  const doc = [
    "# Components",
    "",
    "Located in `react-wrench/lib/components/<component>`.",
    "",
    "**List:**",
    "",
    list,
    "",
    docs,
  ].join("\n");

  return doc;
}

module.exports = componentsDocs;

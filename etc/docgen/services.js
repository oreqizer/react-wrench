/* eslint-disable fp/no-throw */
const fsx = require("fs-extra");
const path = require("path");
const R = require("ramda");

const utils = require("./utils");

const SRC = path.join(__dirname, "../../src");
const LIB = path.join(__dirname, "../../lib");
const SRC_SERVICES = path.join(SRC, "services");
const LIB_SERVICES = path.join(LIB, "services");
const SRC_COMPONENTS = path.join(SRC, "components");

const NL = "\n";

const capitalize = R.compose(
  R.join(""),
  R.juxt([
    R.compose(
      R.toUpper,
      R.head,
    ),
    R.tail,
  ]),
);

function getServiceInitDoc(service) {
  const name = `Init${capitalize(service)}`;
  const PATH = path.join(SRC_COMPONENTS, name);
  if (!fsx.existsSync(PATH)) {
    return "";
  }

  const README = path.join(PATH, "README.md");
  if (!fsx.existsSync(README)) {
    throw new Error(`Every service's 'Init' component must have a README.md! Missing: ${name}`);
  }

  return `See [${name}](./components#${name.toLowerCase()}) for initializing the service.`;
}

function getWhatDoc(service, what) {
  const PATH = path.join(SRC_SERVICES, service, `${what}.md`);
  if (!fsx.existsSync(PATH)) {
    return ""; // A private service
  }

  const TYPES = path.join(LIB_SERVICES, service, `${what}.d.ts`);
  if (!fsx.existsSync(TYPES)) {
    throw new Error(
      `Every documented service must have a '${what}.d.ts'! Missing: ${what} in ${service}`,
    );
  }

  const readme = String(fsx.readFileSync(PATH));

  const types = utils.getDeclarationFile(TYPES);
  const doc = utils.getReadme(readme);

  return [
    `### ${capitalize(what)}`,
    "",
    "**Import:**",
    "```ts",
    `import * as ${what} from "react-wrench/lib/services/${service}/${what}";`,
    "```",
    "",
    types,
    "",
    doc,
    "",
  ].join("\n");
}

function getFlatServiceDoc(service) {
  const README = path.join(SRC_SERVICES, `${service}.md`);
  const TYPES = path.join(LIB_SERVICES, `${service}.d.ts`);

  const types = utils.getDeclarationFile(TYPES);
  const doc = utils.getReadme(String(fsx.readFileSync(README)));

  return [
    `## ${capitalize(service)}`,
    "",
    "**Import:**",
    "```ts",
    `import * as ${service} from "react-wrench/lib/services/${service}";`,
    "```",
    "",
    types,
    "",
    doc,
    "",
  ].join("\n");
}

function getServiceDoc(service) {
  const PATH = path.join(SRC_SERVICES, service);

  const flat = service.match(/\.ts$/) && service.replace(".ts", "");
  if (fsx.existsSync(path.join(SRC_SERVICES, `${flat}.md`))) {
    return getFlatServiceDoc(flat);
  }

  const readme = String(fsx.readFileSync(path.join(PATH, "README.md")));
  const docs = fsx
    .readdirSync(PATH)
    .map(what => what.match(/^(\w+)\.ts$/)) // only .ts files
    .filter(Boolean)
    .map(match => getWhatDoc(service, match[1]))
    .filter(Boolean)
    .join("\n");

  const maybeInit = getServiceInitDoc(service);

  return [
    `## ${capitalize(service)}`,
    "",
    utils.getReadme(readme),
    maybeInit ? NL + maybeInit + NL : "",
    docs,
  ].join("\n");
}

const getList = service => `* [${capitalize(service)}](#${service.toLowerCase()})`;

function servicesDocs() {
  const services = fsx.readdirSync(SRC_SERVICES).filter(service => !service.match(/\.md?$/));

  const docs = services
    .map(getServiceDoc)
    .filter(Boolean)
    .join("\n");
  const list = services
    .map(service => service.replace(".ts", ""))
    .map(getList)
    .join("\n");

  return [
    "# Services",
    "",
    "Located in `react-wrench/lib/services/<service>`.",
    "",
    "**List:**",
    "",
    list,
    "",
    docs,
  ].join("\n");
}

module.exports = servicesDocs;

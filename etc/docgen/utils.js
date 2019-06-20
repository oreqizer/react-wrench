// @noflow
/* eslint-disable fp/no-throw */
const fsx = require("fs-extra");
const path = require("path");

const SRC = path.join(__dirname, "../../src");
const LIB = path.join(__dirname, "../../lib");
const SRC_COMPONENTS = path.join(SRC, "components");
const LIB_COMPONENTS = path.join(LIB, "components");
const STORIES = path.join(__dirname, "../../stories");

const STORYBOOK_URL = "https://oreqizer.github.io/react-wrench/storybook/";

const getReadme = readme =>
  readme
    .split("\n")
    .filter(line => !line.match(/^#{1,2} \w+/)) // remove big headings
    .join("\n")
    .trim(); // trim that shit

const getStory = name => {
  if (name.match(/^Init/)) {
    return ""; // No story for init components
  }

  if (!fsx.existsSync(path.join(STORIES, `${name}.stories.tsx`))) {
    throw new Error(`Documented features need a '.stories.tsx' in 'stories/'! Missing: ${name}`);
  }

  return `${STORYBOOK_URL}?selectedKind=${name}`;
};

const getImports = file =>
  String(fsx.readFileSync(file))
    .split("\n")
    .map(line => line.match(/^import \w+ from "(\.\/)?(\.\.\/)+(\w+)";$/)) // another component
    .filter(Boolean)
    .map(match => path.join(SRC_COMPONENTS, match[3]));

const getFilesWithImports = (folder, files) =>
  files
    .filter(file => file.match(/^[a-zA-Z]+(\.jsx?)?$/))
    .map(file => path.join(folder, file))
    .reduce(
      (acc, file) =>
        file.match(/.*\.jsx?$/)
          ? acc.concat(file).concat(
              getImports(file)
                .filter(f => fsx.existsSync(f))
                .map(f => getFilesWithImports(f, fsx.readdirSync(f)))
                .reduce((a, next) => a.concat(next), []),
            )
          : acc.concat(getFilesWithImports(file, fsx.readdirSync(file))),
      [],
    );

const getContextNeeds = folder =>
  getFilesWithImports(folder, fsx.readdirSync(folder)) // eslint-disable-line fp/no-mutating-methods
    .map(file => String(fsx.readFileSync(file)))
    .join("")
    .split("\n")
    .map(line => line.match(/^import .* from .*\/services\/(\w+)\/context";$/))
    .filter(Boolean)
    .map(match => match[1])
    .sort()
    .reduce((acc, next) => (acc.includes(next) ? acc : acc.concat(next)), [])
    .map(context => `* [${context}](./services#${context.toLowerCase()})`)
    .join("\n");

function getDeclarationFile(file) {
  if (!fsx.existsSync(file)) {
    throw new Error(`Documented features need a '.d.ts' file! Missing: ${file}`);
  }

  const text = String(fsx.readFileSync(file))
    .split("\n")
    .filter(line => !line.match(/^import/)) // remove imports
    .join("\n")
    .trim(); // trim that shit

  return ["**Types:**", "```ts", text, "```"].join("\n");
}

function getComponentDoc(name, readme) {
  const folder = path.join(SRC_COMPONENTS, name);

  const doc = getReadme(readme);
  const story = getStory(name);
  const props = getDeclarationFile(path.join(LIB_COMPONENTS, name, "index.d.ts"));
  const contexts = getContextNeeds(folder);

  return [
    [
      `### ${name}`,
      "",
      "**Import:**",
      "```ts",
      `import ${name} from "react-wrench/lib/components/${name}";`,
      "```",
      "",
      props,
      "",
    ].join("\n"),
    story && `\n[Storybook](${story}).\n`,
    contexts && `\n**Context needs:**\n${contexts}\n`,
    doc && `\n${doc}\n`,
  ].join("");
}

module.exports = {
  getReadme,
  getDeclarationFile,
  getComponentDoc,
};

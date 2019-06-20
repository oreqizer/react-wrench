#!/usr/bin/env node
const fsx = require("fs-extra");
const path = require("path");

const ROOT = path.join(__dirname, "../..");

const BEGIN = `## Setup

* \`yarn add react-wrench\`

Then install peer dependencies for features you want to use, no need to install them all!
`;

const END = `## Documentation

[Changelog](https://github.com/react-wrench/blob/master/CHANGELOG.md).

* [Components](./components.md) - well... components 🤷
* [Services](./services.md) - Relay utilities, fetch, cookies and storage...

All types are generated during compilation.
`;

function root() {
  const pkg = fsx.readJsonSync(path.join(ROOT, "package.json"));

  const peerdeps = Object.keys(pkg.peerDependencies)
    .map(dep => `* \`${dep}: ${pkg.peerDependencies[dep]}\``)
    .join("\n");

  return `${BEGIN}
**Peer dependencies:**
${peerdeps};

${END}`;
}

module.exports = root;

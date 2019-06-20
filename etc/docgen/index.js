#!/usr/bin/env node
const fsx = require("fs-extra");
const path = require("path");

const root = require("./root");
const components = require("./components");
const services = require("./services");

const ROOT = path.join(__dirname, "../..");
const DOCS = path.join(ROOT, "docs");

fsx.outputFileSync(path.join(DOCS, "index.md"), root());
fsx.outputFileSync(path.join(DOCS, "components.md"), components());
fsx.outputFileSync(path.join(DOCS, "services.md"), services());

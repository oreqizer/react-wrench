import * as React from "react";
import { storiesOf } from "@storybook/react";

import ClientOnly from "../src/components/ClientOnly";

storiesOf("Toggle", module).add("default", () => (
  // @ts-ignore
  <ClientOnly>¯\_(ツ)_/¯</ClientOnly>
));

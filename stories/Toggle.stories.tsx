import * as React from "react";
import { storiesOf } from "@storybook/react";

import Toggle from "../src/components/Toggle";

storiesOf("Toggle", module)
  .add("default", () => (
    // @ts-ignore
    <Toggle>
      {({ open, onToggle }) => (
        <>
          <h3>{open ? "Open" : "Closed"}</h3>
          <button type="button" onClick={onToggle}>
            Toggle
          </button>
        </>
      )}
    </Toggle>
  ))
  .add("initial", () => (
    // @ts-ignore
    <Toggle initial>
      {({ open, onToggle }) => (
        <>
          <h3>{open ? "Open" : "Closed"}</h3>
          <button type="button" onClick={onToggle}>
            Toggle
          </button>
        </>
      )}
    </Toggle>
  ));

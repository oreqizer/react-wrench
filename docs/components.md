# Components

Located in `react-wrench/lib/components/<component>`.

**List:**

* [ClientOnly](#clientonly)
* [Toggle](#toggle)

### ClientOnly

**Import:**
```ts
import ClientOnly from "react-wrench/lib/components/ClientOnly";
```

**Types:**
```ts
declare type Props = {
    children: React.ReactNode;
    loader?: React.ReactNode;
};
declare const ClientOnly: React.FunctionComponent<Props>;
export default ClientOnly;
```

[Storybook](https://oreqizer.github.io/react-wrench/storybook/?selectedKind=ClientOnly).

Renders only on the **client**, not on the **server**. Useful for wrapping stuff that would normally break during SSR.

### Toggle

**Import:**
```ts
import Toggle from "react-wrench/lib/components/Toggle";
```

**Types:**
```ts
declare type Arg = {
    open: boolean;
    onToggle: () => void;
};
declare type Props = {
    children: (arg: Arg) => React.ReactNode;
    initial?: boolean;
};
declare const Toggle: ({ children, initial }: Props) => React.ReactNode;
export default Toggle;
```

[Storybook](https://oreqizer.github.io/react-wrench/storybook/?selectedKind=Toggle).

Useful for toggling something on/off.

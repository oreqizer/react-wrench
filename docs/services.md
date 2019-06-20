# Services

Located in `react-wrench/lib/services/<service>`.

**List:**

* [Fetch](#fetch)
* [Relay](#relay)
* [Session](#session)

## Fetch

Utilities for the global `fetch` function.

### Handlers

**Import:**
```ts
import * as handlers from "react-wrench/lib/services/fetch/handlers";
```

**Types:**
```ts
export declare function handleError(res: Response): Promise<Response>;
export declare function handleJSON<T>(res: Response): Promise<T>;
```



### Headers

**Import:**
```ts
import * as headers from "react-wrench/lib/services/fetch/headers";
```

**Types:**
```ts
export declare const JSON_GET: {
    Accept: string;
};
export declare const JSON_SEND: {
    "Content-Type": string;
};
export declare const JSON_BOTH: {
    "Content-Type": string;
    Accept: string;
};
```



## Relay

**Import:**
```ts
import * as relay from "react-wrench/lib/services/relay";
```

**Types:**
```ts
export declare const commitMutation: <R extends OperationType>(environment: Environment, config: Pick<MutationConfig<R>, "variables" | "optimisticResponse" | "optimisticUpdater" | "updater" | "uploadables" | "configs" | "mutation">) => Promise<R["response"]>;
```

Utilities for working with **Relay**.

## Session

Utilities for handling session data.

### Cookies

**Import:**
```ts
import * as cookies from "react-wrench/lib/services/session/cookies";
```

**Types:**
```ts
declare type Options = {
    expires?: number | Date;
    domain?: string;
    path?: string;
    secure?: boolean;
};
export declare const load: (key: string) => string | null;
export declare const save: (key: string, value: string, opts?: Options | undefined) => void;
export declare const remove: (key: string, opts?: Options | undefined) => void;
export {};
```



### Local

**Import:**
```ts
import * as local from "react-wrench/lib/services/session/local";
```

**Types:**
```ts
export declare const load: (key: string) => string | null;
export declare const save: (key: string, value: string) => void;
export declare const remove: (key: string) => void;
```



### Session

**Import:**
```ts
import * as session from "react-wrench/lib/services/session/session";
```

**Types:**
```ts
export declare const load: (key: string) => string | null;
export declare const save: (key: string, value: string) => void;
export declare const remove: (key: string) => void;
```



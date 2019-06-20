# Contributing

Follow the folder structure:

* `src/components/MyComponent/index.ts` - components, include `README.md` and a story for docs
* `src/services/service.ts` - simple services, include `service.md` for docs
* `src/services/service/subservice.ts` - multipart services, include `README.md` for service overview, `subservice.md` for details on the subservice

## Tests

Everything should be **tested 100%!**

* `jest` for stuff, `enzyme` for components
* no snapshots
* test all input combinations, branches, edge cases, statements

## Docs

Write meaningful READMEs, include `stories/MyComponent.stories.tsx` for components.

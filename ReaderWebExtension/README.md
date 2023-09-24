# Used techonlogy
- React
- TypeScript
- Webpack
- Babel
- ESLint
- Prettier
- Webextension-polyfill

## Background worker
- src/background/background.ts
- Runs in the background of the extension and monitors the required values.

## Content script
- src/content/content.ts
- Script injected into the currently loaded page. It can also communicate with the background worker.

## Application [extension]
- src/*
- The app itself. It should not be mixed with background and content scripts. The application is written in React.
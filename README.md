# avl-boilerplate
Boilerplate for AVL web projects.

## Setup

```bash
npm install
```

## Run

```bash
npm run serve
```

## Run with Electron

```bash
npm run electron
```

## Build Electron binaries

```bash
npm run electron-build
```

Binaries will be generated inside _bin_.

## Note on JavaScript libraries

For simplicity, optional library CDN includes can be uncommented in _index.html_. To avoid problems as libraries age, we link to specific versions. Since many of our apps require network access to run, this scenario should be sufficient.

In the future, we may decide that it is necessary to move to a more sophistocated setup using something like [Browserify](http://browserify.org/). This scenario would allow for offline apps and faster load times.

## Attribution

Borrows heavily from [HTML5 Boilerplate](https://github.com/h5bp/html5-boilerplate).

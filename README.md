# monaco-xeda-input-example

Monaco editor for XEDA input files.

## componets

- `packages/monaco-xeda-input`: monaco editor for XEDA input files

- `packages/tree-sitter-xeda-input`: tree-sitter parser for XEDA input files

- `packages/xeda-lsp`: language server for XEDA input files. **This part is ill-designed. May just work in single-editor environment.**

- `packages/xeda-molstar-viewer`: molstar viewer for XEDA input files

## dev environment

```console
$ npm install
$ npm run watch
```

open another console:

```console
$ npm run dev
```

## usage

Read `index.html`, `src/index.ts`, `vite.config.ts` and `package.json` for details.

The monaco editor is attached to the `editor` div, and the molstar viewer is attached to the `viewer` div.

## credit:

- https://github.com/microsoft/monaco-editor

- https://microsoft.github.io/language-server-protocol/

- https://github.com/tree-sitter/tree-sitter

- https://github.com/TypeFox/monaco-languageclient

- https://github.com/molstar/molstar Citation is required!

- https://www.fusejs.io/

## contribution

Personal project. Contribution is **NOT** welcomed.

## license

This repository is licensed under LGPL 3.0
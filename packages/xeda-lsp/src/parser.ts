import Parser from "web-tree-sitter";

// https://github.com/tree-sitter/tree-sitter/tree/master/lib/binding_web
export async function initParser(): Promise<Parser> {
    await Parser.init({
        locateFile(_scriptName: string, _scriptDirectory: string) {

            return new URL("/node_modules/web-tree-sitter/tree-sitter.wasm", import.meta.url).href;
        },
    });
    const parser = new Parser();
    const lang = await Parser.Language.load(new URL('/node_modules/tree-sitter-xeda-input/tree-sitter-XEDA.wasm', import.meta.url).href);
    parser.setLanguage(lang);
    return parser;
}


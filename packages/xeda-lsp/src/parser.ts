import Parser from "web-tree-sitter";

// https://github.com/tree-sitter/tree-sitter/tree/master/lib/binding_web
export async function initParser(): Promise<Parser> {
    await Parser.init({
        locateFile(_scriptName: string, _scriptDirectory: string) {

            return `/node_modules/web-tree-sitter/tree-sitter.wasm`;
        },
    });
    const parser = new Parser();
    const lang = await Parser.Language.load('/node_modules/tree-sitter-xeda-input/tree-sitter-XEDA.wasm');
    parser.setLanguage(lang);
    return parser;
}


import Parser from "web-tree-sitter";
import * as LSP from 'vscode-languageserver/browser';
import * as IUtil from './util/tree-sitter';

export enum tokenTypes {
    namespace,
    class,
    enum,
    interface,
    struct,
    typeParameter,
    type,
    parameter,
    variable,
    property,
    enumMember,
    decorator,
    event,
    function,
    method,
    macro,
    label,
    comment,
    string,
    keyword,
    number,
    regexp,
    operator
}

const token_type_to_number: Map<string, tokenTypes> = new Map([
    ['ctr_start_token', tokenTypes.comment],
    ['end_token', tokenTypes.comment],
    ['ctr_keyword', tokenTypes.variable],
    ['ctr_value', tokenTypes.label],
    ['geo_start_token', tokenTypes.comment],
    ['atom_name', tokenTypes.string],
    ['coordinate', tokenTypes.number],
    ['eda_start_token', tokenTypes.comment],
    ['eda_keyword', tokenTypes.variable],
    ['eda_value', tokenTypes.label],
]);

function* add_token() {
    let r: number[] = [];
    let last_line: number = 0;
    let last_char: number = 0;
    while (true) {
        let node: Parser.SyntaxNode | undefined = yield;
        if (node === undefined) {
            return r;
        }

        let line: number = node.startPosition.row;
        let char: number = node.startPosition.column;
        let length: number = node.endIndex - node.startIndex;
        let delta_line: number = line - last_line;
        if (delta_line !== 0) {
            last_char = 0;
        }
        let delta_char: number = char - last_char;
        let token_type: tokenTypes | undefined = token_type_to_number.get(node.type);

        if (token_type === undefined) {
            continue;
        }

        last_line = line;
        last_char = char;
        r.push(...[delta_line, delta_char, length, token_type, 0]);

    }
}

export async function get_semantic_tokens(root_tree: Parser.Tree): Promise<LSP.SemanticTokens> {
    let generator = add_token();
    generator.next();
    IUtil.forEach(root_tree.rootNode, (node) => {
        if (node.namedChildCount !== 0) {
            return;
        }
        generator.next(node);
    })
    let r = generator.next(undefined).value!

    return {
        data: r
    };
}
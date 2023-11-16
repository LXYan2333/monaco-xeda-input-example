import Parser from "web-tree-sitter";
import * as IFI from './input_file_info';
import { TextDocument } from 'vscode-languageserver-textdocument';
import * as LSP from 'vscode-languageserver/browser';
import * as IUtil from './tree-sitter';

export abstract class Token {
    name: string;
    node: Parser.SyntaxNode;
    root_node: Parser.SyntaxNode;
    input_file_info: IFI.input_file_info;

    constructor(name: string, node: Parser.SyntaxNode, root_node: Parser.SyntaxNode, input_file_info: IFI.input_file_info) {
        this.name = name;
        this.node = node;
        this.root_node = root_node;
        this.input_file_info = input_file_info;
    }


}

export abstract class OneLineToken extends Token {
    get_diagnostic(): LSP.Diagnostic[] {
        let r: LSP.Diagnostic[] = [];
        if (this.node.startPosition.row !== this.node.endPosition.row
            && !((this.node.endPosition.row - this.node.startPosition.row === 1) && (this.node.endPosition.column === 0))) {
            r.push({
                range: IUtil.range(this.node),
                severity: LSP.DiagnosticSeverity.Error,
                code: 'wrong-param',
                source: 'XEDA diagnose',
                message: `This keyword/parameter should be in one line.`
            });
        }
        return r;
    };
}
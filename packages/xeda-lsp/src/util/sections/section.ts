import Parser from "web-tree-sitter";
import * as LSP from 'vscode-languageserver/browser';
import * as IUtil from '../tree-sitter';
import { get_completion_info, keywords_list } from "./ctr/keywords";

export abstract class Section implements get_completion_info {
    node: Parser.SyntaxNode;

    abstract completion_info: string[];

    constructor(node: Parser.SyntaxNode) {
        this.node = node;
    }

    get_completion_info(): LSP.CompletionItem[] {
        let r: LSP.CompletionItem[] = [];
        this.completion_info.forEach(e => r.push(
            {
                label: e
            }
        ));
        return r;
    }

}

export class CtrSection extends Section{
    completion_info: string[] = [...keywords_list];
}
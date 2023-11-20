import Parser from 'web-tree-sitter';
import * as KW from '../ctr/keywords';
import * as IFI from '../../input_file_info';
import Fuse from 'fuse.js';
import { OneLineToken } from '../../token';
import * as LSP from 'vscode-languageserver/browser';
import * as IUtil from '../../tree-sitter';

export const eda_keywords_list: string[] = ['nmol', 'method', 'matom', 'mmult', 'mcharge'];

export class Nmol extends KW.OneInt {
    range: KW.int_range = '>=0';
    markdown_hover_info: string = `## NMOL

Number of monomers.`;

    constructor(name: string, node: Parser.SyntaxNode, root_node: Parser.SyntaxNode, input_file_info: IFI.input_file_info) {
        super(name, node, root_node, input_file_info);
        if (this.get_diagnostic().length === 0) {
            this.input_file_info.nmol = this.content;
        }
    }
}

export class EdaMethod extends KW.OneString {
    allowed_param: string[] = IFI.eda_method_string_list;
    completion_info: string[] = IFI.eda_method_string_list;
    fuse: Fuse<string> = new Fuse(this.allowed_param);
    markdown_hover_info: string = `## METHOD

Algorithms used for EDA evaluation. Available options are:

- EXACT: Coulumb and exchange terms are computed directly. (default).

- FAST: Coulumb and exchange terms are computed with RIJ-COSK algorithm.

### Note

\`METHOD=FAST\` is faster for large system with huge basis sets. For pure functional (such as PBE and BLYP), \`METHOD=FAST\` is highly recommended.`;

    constructor(name: string, node: Parser.SyntaxNode, root_node: Parser.SyntaxNode, input_file_info: IFI.input_file_info) {
        super(name, node, root_node, input_file_info);
        let text = this.node.children[2]?.text.toLowerCase();
        if (IFI.eda_method_string_list.includes(text)) {
            this.input_file_info.eda_method = text as IFI.eda_method;
        }
    }
}

abstract class MultiParam extends KW.Keyword {
    get_diagnostic(): LSP.Diagnostic[] {
        let r: LSP.Diagnostic[] = super.get_diagnostic();

        if (this.node.childCount < 3) {
            r.push({
                range: IUtil.range(this.node),
                severity: LSP.DiagnosticSeverity.Error,
                code: 'wrong-param',
                source: 'XEDA diagnose',
                message: `${this.name.toUpperCase()} should have at least 1 parameter!`
            });
        }

        return r;
    }
}

abstract class MultiInt extends MultiParam {
    abstract range: KW.int_range;
    completion_info: string[] = [];
    // content 成员可能为 NaN
    content: number[] = [];

    get_diagnostic(): LSP.Diagnostic[] {
        let r: LSP.Diagnostic[] = super.get_diagnostic();
        let r_number: number[] = [];

        // 跳出检查，避免 text undefined
        if (r.length !== 0) {
            return r;
        }

        for (let i = 2; i < this.node.childCount; i++) {
            let text = this.node.child(i)!.text;
            let number = Number(text);
            r_number.push(number);
            if (!Number.isInteger(number)) {
                r.push({
                    range: IUtil.range(this.node.child(i)!),
                    severity: LSP.DiagnosticSeverity.Error,
                    code: 'wrong-param',
                    source: 'XEDA diagnose',
                    message: `Parameter for ${this.name.toUpperCase()} should be an integer!`
                });
                continue;
            }
            switch (this.range) {
                case '>0':
                    if (number <= 0) {
                        r.push({
                            range: IUtil.range(this.node.child(i)!),
                            severity: LSP.DiagnosticSeverity.Error,
                            code: 'wrong-param',
                            source: 'XEDA diagnose',
                            message: `Parameter for ${this.name.toUpperCase()} should be larger than 0!`
                        });
                    }
                    break;
                case '>=0':
                    if (number < 0) {
                        r.push({
                            range: IUtil.range(this.node.child(i)!),
                            severity: LSP.DiagnosticSeverity.Error,
                            code: 'wrong-param',
                            source: 'XEDA diagnose',
                            message: `Parameter for ${this.name.toUpperCase()} should be larger than or equal to 0!`
                        });
                    }
                    break;
                case '<0':
                    if (number >= 0) {
                        r.push({
                            range: IUtil.range(this.node.child(i)!),
                            severity: LSP.DiagnosticSeverity.Error,
                            code: 'wrong-param',
                            source: 'XEDA diagnose',
                            message: `Parameter for ${this.name.toUpperCase()} should be smaller than 0!`
                        });
                    }
                    break;
                case '<=0':
                    if (number > 0) {
                        r.push({
                            range: IUtil.range(this.node.child(i)!),
                            severity: LSP.DiagnosticSeverity.Error,
                            code: 'wrong-param',
                            source: 'XEDA diagnose',
                            message: `Parameter for ${this.name.toUpperCase()} should be smaller than or equal to 0!`
                        });
                    }
                    break;

                default:
                    break;
            }
        }

        this.content = r_number;

        return r;
    }
}

export class Matom extends MultiInt {
    range: KW.int_range = '>0';
    markdown_hover_info: string = `## MATOM
    
A list giving the number of atoms in each monomer. The ordering of atoms in \`$GEO\` section should be the same as the ordering of monomers. The sum of the MATOM list must be equal to the total number in the supermolecule. Numbers should be seperated by space.`

    constructor(name: string, node: Parser.SyntaxNode, root_node: Parser.SyntaxNode, input_file_info: IFI.input_file_info) {
        super(name, node, root_node, input_file_info);
        if (this.get_diagnostic().length === 0) {
            this.input_file_info.matom = this.content;
        }
    }
}

export class Mmult extends MultiInt {
    range: KW.int_range = 'any';
    markdown_hover_info: string = `## MMULT

A list giving the multiplicity of each monomer. A positive integer means α spin, a negative integer means β spin. Numbers should be seperated by space.
    
### Tip

The summation of \`MMULT\` should be equal to the total multiplicity specified in \`NMUL=n\`. For example, if an ethane molecule is separated into two neutral CH₃ groups, MMULT should be specified as \`MMULT=2 -2\` or \`MMULT=-2 2\`.`;

    constructor(name: string, node: Parser.SyntaxNode, root_node: Parser.SyntaxNode, input_file_info: IFI.input_file_info) {
        super(name, node, root_node, input_file_info);
        if (this.get_diagnostic().length === 0) {
            this.input_file_info.mmult = this.content;
        }
    }
}

export class Mcharge extends MultiInt {
    range: KW.int_range = 'any';
    markdown_hover_info: string = `## MCHARGE
    
A list giving the charge of each monomer. The sum of the charges in the monomers must be equal to the total charge of the supermolecule as specified in \`CHARGE=n\`. Numbers should be seperated by space.`;

    constructor(name: string, node: Parser.SyntaxNode, root_node: Parser.SyntaxNode, input_file_info: IFI.input_file_info) {
        super(name, node, root_node, input_file_info);
        if (this.get_diagnostic().length === 0) {
            this.input_file_info.mcharge = this.content;
        }
    }
}
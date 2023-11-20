import * as LSP from 'vscode-languageserver/browser';
import Parser from 'web-tree-sitter';
import * as IUtil from '../../tree-sitter';
import { TextDocument } from 'vscode-languageserver-textdocument';
import Fuse from 'fuse.js';
import * as IFI from '../../input_file_info';
import { OneLineToken } from '../../token';

export const keywords_list: string[] = ['method', 'basis', 'charge', 'nmul', 'dft', 'max_iter']

export const no_param_list: string[] = []

export type int_range = '>0' | '>=0' | '<0' | '<=0' | '>1' | 'any'

export interface get_completion_info {
    node: Parser.SyntaxNode;
    completion_info: string[];
    get_completion_info(): LSP.CompletionItem[];
}

export abstract class Keyword extends OneLineToken implements get_completion_info {
    abstract markdown_hover_info: string;
    abstract completion_info: string[];

    get_hover_info(): LSP.Hover {
        return { contents: { kind: LSP.MarkupKind.Markdown, value: this.markdown_hover_info }, range: IUtil.range(this.node.children[0] ?? this.node) }
    };

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

abstract class NoParam extends Keyword {
    get_diagnostic(): LSP.Diagnostic[] {

        let r: LSP.Diagnostic[] = super.get_diagnostic();

        if (this.node.childCount !== 1) {
            r.push({
                range: IUtil.range(this.node),
                severity: LSP.DiagnosticSeverity.Error,
                code: 'wrong-param',
                source: 'XEDA diagnose',
                message: `${this.name.toUpperCase()} have no parameter.`
            });
        }
        return r;
    }
}

abstract class OneParam extends Keyword {
    get_diagnostic(): LSP.Diagnostic[] {
        let r: LSP.Diagnostic[] = super.get_diagnostic();

        if (this.node.childCount < 3) {
            r.push({
                range: IUtil.range(this.node),
                severity: LSP.DiagnosticSeverity.Error,
                code: 'wrong-param',
                source: 'XEDA diagnose',
                message: `${this.name.toUpperCase()} should have 1 parameter, but ${this.node.namedChildCount - 1} parameter are given!`
            });
        }


        if (this.node.childCount > 3) {
            r.push({
                range: IUtil.range(this.node),
                severity: LSP.DiagnosticSeverity.Error,
                code: 'wrong-param',
                source: 'XEDA diagnose',
                message: `${this.name.toUpperCase()} should have only 1 parameter, but ${this.node.namedChildCount - 1} parameters are given!`
            });
        }

        return r;
    }
}

export abstract class OneInt extends OneParam {
    abstract range: int_range;
    content: number;
    completion_info: string[] = [];

    constructor(name: string, node: Parser.SyntaxNode, root_node: Parser.SyntaxNode, input_file_info: IFI.input_file_info) {
        super(name, node, root_node, input_file_info);
        this.content = Number(this.node.children[2]?.text);
    }

    get_diagnostic(): LSP.Diagnostic[] {

        let r: LSP.Diagnostic[] = super.get_diagnostic();

        // 跳出检查，避免 text undefined
        if (r.length !== 0) {
            return r;
        }

        // NaN 和浮点数检查
        if (!Number.isInteger(this.content)) {
            r.push({
                range: IUtil.range(this.node.children[2]),
                severity: LSP.DiagnosticSeverity.Error,
                code: 'wrong-param',
                source: 'XEDA diagnose',
                message: `Parameter for ${this.name.toUpperCase()} should be an integer!`
            });
            return r;
        }
        r.push(...this.check_range());
        return r;
    }

    check_range(): LSP.Diagnostic[] {
        let r: LSP.Diagnostic[] = [];
        switch (this.range) {
            case '>0':
                if (this.content <= 0) {
                    r.push({
                        range: IUtil.range(this.node.children[2]),
                        severity: LSP.DiagnosticSeverity.Error,
                        code: 'wrong-param',
                        source: 'XEDA diagnose',
                        message: `Parameter for ${this.name.toUpperCase()} should be larger than 0!`
                    });
                }
                break;
            case '>=0':
                if (this.content < 0) {
                    r.push({
                        range: IUtil.range(this.node.children[2]),
                        severity: LSP.DiagnosticSeverity.Error,
                        code: 'wrong-param',
                        source: 'XEDA diagnose',
                        message: `Parameter for ${this.name.toUpperCase()} should be larger than or equal to 0!`
                    });
                }
                break;
            case '<0':
                if (this.content >= 0) {
                    r.push({
                        range: IUtil.range(this.node.children[2]),
                        severity: LSP.DiagnosticSeverity.Error,
                        code: 'wrong-param',
                        source: 'XEDA diagnose',
                        message: `Parameter for ${this.name.toUpperCase()} should be smaller than 0!`
                    });
                }
                break;
            case '<=0':
                if (this.content > 0) {
                    r.push({
                        range: IUtil.range(this.node.children[2]),
                        severity: LSP.DiagnosticSeverity.Error,
                        code: 'wrong-param',
                        source: 'XEDA diagnose',
                        message: `Parameter for ${this.name.toUpperCase()} should be smaller than or equal to 0!`
                    });
                }
                break;
            case '>1':
                if (this.content <= 1) {
                    r.push({
                        range: IUtil.range(this.node.children[2]),
                        severity: LSP.DiagnosticSeverity.Error,
                        code: 'wrong-param',
                        source: 'XEDA diagnose',
                        message: `Parameter for ${this.name.toUpperCase()} should be larger than 1!`
                    });
                }
                break;
            default:
                break;
        }
        return r;
    }
}

export class Charge extends OneInt {
    range: int_range = 'any';
    markdown_hover_info: string = `## CHARGE

Total charge of the supermolecule. Default is 0, meaning the neutral molecule or radical.`;

    constructor(name: string, node: Parser.SyntaxNode, root_node: Parser.SyntaxNode, input_file_info: IFI.input_file_info) {
        super(name, node, root_node, input_file_info);
        this.input_file_info.charge = this.content;
    }
}

export class Nmul extends OneInt {
    range: int_range = '>0';
    markdown_hover_info: string = `## NMUL

Spin multiplicity of the supermolecule, 1 for singlet, 2 for doublet and so on. Default is 1.`;

    constructor(name: string, node: Parser.SyntaxNode, root_node: Parser.SyntaxNode, input_file_info: IFI.input_file_info) {
        super(name, node, root_node, input_file_info);
        this.input_file_info.nmul = this.content;
    }
}

export class Max_Iter extends OneInt {
    range: int_range = '>0';
    markdown_hover_info: string = `## MAX_ITER
    
Maximum number of iterations. Default value is 50.`;

    constructor(name: string, node: Parser.SyntaxNode, root_node: Parser.SyntaxNode, input_file_info: IFI.input_file_info) {
        super(name, node, root_node, input_file_info);
        this.input_file_info.max_iter = this.content;
    }
}



export abstract class OneString extends OneParam {
    abstract allowed_param: string[];
    abstract fuse: Fuse<string>;
    constructor(name: string, node: Parser.SyntaxNode, root_node: Parser.SyntaxNode, input_file_info: IFI.input_file_info) {
        super(name, node, root_node, input_file_info);
    }

    get_diagnostic(): LSP.Diagnostic[] {
        let r: LSP.Diagnostic[] = super.get_diagnostic();

        // 跳出检查，避免 text undefined
        if (r.length !== 0) {
            return r;
        }
        let text = this.node.children[2]?.text;
        let is_valid_text = this.allowed_param.includes(text.toLowerCase());
        if (!is_valid_text) {
            let fuse_search_result = this.fuse.search(text);
            let message = `"${text}" is not a valid parameter for ${this.name.toUpperCase()}!
${fuse_search_result.length === 0 ? '' : `Did you mean ${fuse_search_result[0].item.toUpperCase()}?`}`
            r.push({
                range: IUtil.range(this.node.children[2]),
                severity: LSP.DiagnosticSeverity.Error,
                code: 'wrong-param',
                source: 'XEDA diagnose',
                message: message
            })
        }

        return r;
    }
}

export class Method extends OneString {
    allowed_param: string[] = IFI.method_sting_list;
    fuse = new Fuse(this.allowed_param, { isCaseSensitive: false });
    completion_info: string[] = IFI.method_sting_list;
    markdown_hover_info: string = `## METHOD

Computational method used in the calculation. Available methods are:

- RHF: Restricted Hartree-Fock

- UHF: Unrestricted Hartree-Fock

- ROHF: Restricted Open-shell Hartree-Fock

### Note

Basically, the same method will be used for both supermolecules and each monomer. For example, if \`METHOD=UHF\` is specified, UHF computations will be proceeded for both supermolecule and each monomer.

Specially, if the supermolecule is singlet while some monomers are open-shell molecules/fragments, \`METHOD=RHF\` will make the program run RHF computation for supermolecule but ROHF for monomers.

This keyword is essential even DFT is specified. See the DFT keyword for details.`;


    constructor(name: string, node: Parser.SyntaxNode, root_node: Parser.SyntaxNode, input_file_info: IFI.input_file_info) {
        super(name, node, root_node, input_file_info);
        let text = this.node.children[2]?.text.toLowerCase();
        if (this.allowed_param.includes(text)) {
            this.input_file_info.method = text as IFI.method;
        }
    }
}

export class Basis extends OneString {
    allowed_param: string[] = IFI.basis_stirng_list;
    fuse = new Fuse(this.allowed_param, { isCaseSensitive: false });
    completion_info: string[] = IFI.basis_stirng_list;
    markdown_hover_info: string = `## BASIS

Specify the basis set for the computation. Currently supported basis sets are listed below.

### Pople’s basis sets

(with * for polarization functions and + for diffusion functions)

- 3-21G

- 6-31G

- 6-311G

### Dunning-type correction consistent basis sets

(with prefix aug- for diffusion functions)

- cc-pVDZ

- cc-pVTZ

- cc-pVQZ

### Def2 basis sets

- def2-SVP

- def2-SVPP

- def2-TZVP

- def2-TZVPP

- def2-QZVP

- def2-QZVPP

- def2-QZVPD`;


    constructor(name: string, node: Parser.SyntaxNode, root_node: Parser.SyntaxNode, input_file_info: IFI.input_file_info) {
        super(name, node, root_node, input_file_info);
        let text = this.node.children[2]?.text.toLowerCase();
        if (this.allowed_param.includes(text)) {
            this.input_file_info.basis = text as IFI.basis;
        }
    }
}

export class Dft extends OneString {
    allowed_param: string[] = IFI.dft_string_list;
    fuse = new Fuse(this.allowed_param, { isCaseSensitive: false });
    completion_info: string[] = IFI.dft_string_list;
    markdown_hover_info: string = `## DFT

The name of density functional.

| **Keyword** | **Functional**                        |
|-------------|---------------------------------------|
| BLYP        | BLYP                                  |
| B3LYP       | B3LYP                                 |
| B3LYP-D3    | B3LYP with D3 dispersion correction   |
| B3LYP-D3BJ  | B3LYP with D3BJ dispersion correction |
| CAM-B3LYP   | CAM-B3LYP                             |
| PBE         | PBE                                   |
| PBE0        | Hybrid PBE with 25% HF exchange       |
| M06-2X      | M06-2X                                |
| wB97XD      | ωB97X-D                               |`;

    constructor(name: string, node: Parser.SyntaxNode, root_node: Parser.SyntaxNode, input_file_info: IFI.input_file_info) {
        super(name, node, root_node, input_file_info);
        let text = this.node.children[2]?.text.toLowerCase();
        if (this.allowed_param.includes(text)) {
            this.input_file_info.dft = text as IFI.dft;
        }
    }
}


// export class OneStringReg extends OneParam {
//     allowed_param: RegExp[];
//     constructor(name: string, node: Parser.SyntaxNode, root_node: Parser.SyntaxNode, allowed_param: RegExp[]) {
//         super(name, node, root_node);
//         this.allowed_param = allowed_param;
//     }

//     check_param(): LSP.Diagnostic[] {
//         let r: LSP.Diagnostic[] = super.check_param(document);

//         // 跳出检查，避免 text undefined
//         if (r.length !== 0) {
//             return r;
//         }
//         let text = this.node.children[2]?.text;
//         let is_valid_text = this.allowed_param.some(reg => reg.test(text));
//         if (!is_valid_text) {
//             let message = `"${text.toUpperCase()}" is not a valid parameter for ${this.name.toUpperCase()}!`
//             r.push({
//                 range: IUtil.range(this.node.children[2]),
//                 severity: LSP.DiagnosticSeverity.Error,
//                 code: 'wrong-param',
//                 source: 'XEDA diagnose',
//                 message: message
//             })
//         }

//         return r;
//     }
// }

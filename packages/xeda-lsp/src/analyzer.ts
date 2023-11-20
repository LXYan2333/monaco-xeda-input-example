import * as LSP from 'vscode-languageserver/browser';
import { TextDocument } from 'vscode-languageserver-textdocument';
import Parser from 'web-tree-sitter';
import * as IUtil from './util/tree-sitter';
import * as KW from './util/sections/ctr/keywords';
import Fuse from 'fuse.js';
import * as IFI from './util/input_file_info';
import { AtomAndCoordiante } from './util/sections/geo/atom_and_coordinates';
import * as EKW from './util/sections/eda/eda_keywords';
import * as SE from './util/sections/section';
import { multiplicity } from './util/multiplicity_check';

export default class Analyzer {
    private parser: Parser;
    private keywords_list: string[];
    private ctr_fuse: Fuse<string> = new Fuse(KW.keywords_list, { isCaseSensitive: false });
    private eda_fuse: Fuse<string> = new Fuse(EKW.eda_keywords_list, { isCaseSensitive: false });
    input_file_info: IFI.input_file_info = new IFI.input_file_info();
    tree: Parser.Tree | undefined;
    hover_info_list: KW.Keyword[] = [];
    completion_info_list: KW.get_completion_info[] = [];

    // private uriToAnalyzedDocument: Record<string, AnalyzedDocument | undefined> = {}

    public constructor(parser: Parser) {
        this.parser = parser;
        this.keywords_list = KW.keywords_list;
    }

    public analyze(document: TextDocument): LSP.Diagnostic[] {
        this.hover_info_list = [];
        this.completion_info_list = []
        this.input_file_info = new IFI.input_file_info();

        const diagnostics: LSP.Diagnostic[] = [];
        const fileContent = document.getText();

        const tree = this.parser.parse(fileContent);
        this.tree = tree;
        const lines = fileContent.split('\n');

        const diagnostic_source = 'XEDA diagnose'

        // 语法错误
        {
            IUtil.forEach(tree.rootNode, (node) => {
                if (node.type === 'ERROR') {
                    diagnostics.push({
                        range: IUtil.range(node),
                        severity: LSP.DiagnosticSeverity.Error,
                        code: 'syntax-error',
                        source: 'XEDA diagnose',
                        message: 'Syntax error',
                    })

                }
                return node.hasError();
            })
        }

        // $CTR
        let parsed_keywords: KW.Keyword[] = [];
        let ctr_section = tree.rootNode.children.filter((node) => node.type === 'ctr_section');
        ctr: {

            // $CTR 部分缺失
            if (ctr_section.length === 0) {
                diagnostics.push({
                    range: { start: { line: 0, character: 0 }, end: { line: 0, character: 0 } },
                    severity: LSP.DiagnosticSeverity.Error,
                    code: 'syntax-error',
                    source: 'XEDA diagnose',
                    message: '$CTRL section missing',
                });
                break ctr;
            }

            this.completion_info_list.push(new SE.CtrSection(ctr_section[0]));


            IUtil.childOfType(IUtil.childOfType(ctr_section[0], ['ctr_item_list'])[0], ['ctr_item']).forEach(ctr_item => {
                let text = ctr_item.children[0].text.toLowerCase();
                // 关键字是否合法？
                if (KW.keywords_list.includes(text)) {
                    // 关键词重复
                    let duplicated_item_index = parsed_keywords.map(node => node.node.children[0].text.toLowerCase()).indexOf(text);
                    if (duplicated_item_index !== -1) {
                        diagnostics.push({
                            range: IUtil.range(ctr_item),
                            relatedInformation: [{
                                location: {
                                    uri: document.uri,
                                    range: IUtil.range(parsed_keywords[duplicated_item_index].node)
                                }, message: `Previously found ${text.toUpperCase()} keyword here.`
                            }],
                            severity: LSP.DiagnosticSeverity.Error,
                            code: 'keyword-duplicated',
                            source: 'XEDA diagnose',
                            message: `${text.toUpperCase()} duplicated!`,
                        })
                    } else {
                        // 关键字合法
                        if (KW.no_param_list.includes(text)) {
                            // parsed_keywords.push(new KW.NoParam(text, ctr_item, tree.rootNode, this.input_file_info));
                        } else {
                            let origin = this.completion_info_list.filter(e => e.node.equals(ctr_section[0]))[0].completion_info;
                            this.completion_info_list.filter(e => e.node.equals(ctr_section[0]))[0].completion_info = origin.filter(e => e !== text);
                            switch (text) {
                                case ('method'):
                                    parsed_keywords.push(new KW.Method(text, ctr_item, tree.rootNode, this.input_file_info));
                                    break;
                                case ('basis'):
                                    // parsed_keywords.push(new KW.OneStringReg('basis', ctr_item, tree.rootNode, [/^3-21\+{0,2}g\*{0,2}$/i, /^6-311?\+{0,2}g\*{0,2}$/i, /^(?:aug-)?cc-pv[dtq]z$/i, /^def2-svpp?$/i, /^def2-tzvpp?$/i, /^def2-qzvp(?:p|d)?$/i]));
                                    parsed_keywords.push(new KW.Basis('basis', ctr_item, tree.rootNode, this.input_file_info))
                                    break;
                                case ('charge'):
                                    parsed_keywords.push(new KW.Charge('charge', ctr_item, tree.rootNode, this.input_file_info));
                                    break;
                                case ('nmul'):
                                    parsed_keywords.push(new KW.Nmul('nmul', ctr_item, tree.rootNode, this.input_file_info));
                                    break;
                                case ('dft'):
                                    parsed_keywords.push(new KW.Dft('dft', ctr_item, tree.rootNode, this.input_file_info));
                                    break;
                                case ('max_iter'):
                                    parsed_keywords.push(new KW.Max_Iter('max_iter', ctr_item, tree.rootNode, this.input_file_info));
                                    break;
                            }
                        }
                    }
                } else {
                    // 关键字不合法
                    let fuse_search_result = this.ctr_fuse.search(text);
                    diagnostics.push({
                        range: IUtil.range(ctr_item),
                        severity: LSP.DiagnosticSeverity.Error,
                        code: 'invalid-keyword',
                        source: 'XEDA diagnose',
                        message: `Unknown keyword ${text.toUpperCase()}!
${fuse_search_result.length === 0 ? '' : `Did you mean ${fuse_search_result[0].item.toUpperCase()}?`}`,
                    });
                }
            })

            // 未指明 DFT 方法时，提示使用 HF 方法
            if (!parsed_keywords.some(keyword => keyword.name === 'dft')) {
                diagnostics.push({
                    range: {
                        start: IUtil.range(ctr_section[0]).start, end: {
                            line: IUtil.range(ctr_section[0]).start.line,
                            character: Number.MAX_SAFE_INTEGER
                        }
                    },
                    severity: LSP.DiagnosticSeverity.Hint,
                    code: 'Hartree_Fock_method_is_used',
                    source: 'XEDA diagnose',
                    message: 'DFT keyword is not specified, Hartree-Fock method will be used by default.',
                });
            }

            // 必要的关键字是否存在？
            ['method', 'basis'].forEach(keyword => {

                if (!parsed_keywords.some(node => node.name === keyword)) {
                    diagnostics.push({
                        range: {
                            start: IUtil.range(ctr_section[0]).start, end: {
                                line: IUtil.range(ctr_section[0]).start.line,
                                character: Number.MAX_SAFE_INTEGER
                            }
                        },
                        severity: LSP.DiagnosticSeverity.Error,
                        code: `missing-${keyword}`,
                        source: 'XEDA diagnose',
                        message: `${keyword.toUpperCase()} keyword is not specified.`,
                    });
                }
            })

            parsed_keywords.forEach(keyword => {
                diagnostics.push(...keyword.get_diagnostic());
            })

        }// $CTR

        // $GEOM
        let atom_and_coordiantes_list: AtomAndCoordiante[] = []
        geom: {
            let geo_section = tree.rootNode.children.filter((node) => node.type === 'geo_section');

            // $GEO 部分缺失
            if (geo_section.length === 0) {
                diagnostics.push({
                    range: { start: { line: 0, character: 0 }, end: { line: 0, character: 0 } },
                    severity: LSP.DiagnosticSeverity.Error,
                    code: 'syntax-error',
                    source: 'XEDA diagnose',
                    message: '$GEOM section missing',
                });
                break geom;
            }

            IUtil.childOfType(IUtil.childOfType(geo_section[0], ['geo_item_list'])[0], ['geo_item']).forEach(
                geo_item => {
                    atom_and_coordiantes_list.push(new AtomAndCoordiante('', geo_item, tree.rootNode, this.input_file_info));
                }
            );
            atom_and_coordiantes_list.forEach(e => {
                diagnostics.push(...e.get_diagnostic());
            });
        }// $GEOM

        // $EDA
        let eda_keywords: KW.Keyword[] = [];
        eda: {
            let eda_section = tree.rootNode.children.filter((node) => node.type === 'eda_section');

            // $EDA 部分缺失
            if (eda_section.length === 0) {
                diagnostics.push({
                    range: { start: { line: 0, character: 0 }, end: { line: 0, character: 0 } },
                    severity: LSP.DiagnosticSeverity.Information,
                    code: 'syntax-error',
                    source: 'XEDA diagnose',
                    message: '$EDA section missing, single point energy calculation will be performed.',
                });
                break eda;
            }

            this.input_file_info.have_eda_section = true;

            IUtil.childOfType(IUtil.childOfType(eda_section[0], ['eda_item_list'])[0], ['eda_item']).forEach(
                eda_item => {
                    let text = eda_item.children[0].text.toLowerCase();
                    let duplicated_item_index = eda_keywords.map(node => node.node.children[0].text.toLowerCase()).indexOf(text);
                    if (duplicated_item_index !== -1) {
                        diagnostics.push({
                            range: IUtil.range(eda_item),
                            relatedInformation: [{
                                location: {
                                    uri: document.uri,
                                    range: IUtil.range(eda_keywords[duplicated_item_index].node)
                                }, message: `Previously found ${text.toUpperCase()} keyword here.`
                            }],
                            severity: LSP.DiagnosticSeverity.Error,
                            code: 'keyword-duplicated',
                            source: 'XEDA diagnose',
                            message: `Keyword ${text.toUpperCase()} duplicated!`,
                        })
                        return;
                    }
                    if (EKW.eda_keywords_list.includes(text)) {
                        switch (text) {
                            case ('nmol'):
                                eda_keywords.push(new EKW.Nmol('nmol', eda_item, tree.rootNode, this.input_file_info));
                                break;
                            case ('method'):
                                eda_keywords.push(new EKW.EdaMethod('method', eda_item, tree.rootNode, this.input_file_info))
                                break;
                            case ('matom'):
                                eda_keywords.push(new EKW.Matom('matom', eda_item, tree.rootNode, this.input_file_info))
                                break;
                            case ('mmult'):
                                eda_keywords.push(new EKW.Mmult('mmult', eda_item, tree.rootNode, this.input_file_info))
                                break;
                            case ('mcharge'):
                                eda_keywords.push(new EKW.Mcharge('mcharge', eda_item, tree.rootNode, this.input_file_info))
                                break;
                            default:
                                break;
                        }
                    } else {
                        let fuse_search_result = this.eda_fuse.search(text);
                        diagnostics.push({
                            range: IUtil.range(eda_item),
                            severity: LSP.DiagnosticSeverity.Error,
                            code: 'invalid-keyword',
                            source: 'XEDA diagnose',
                            message: `Unknown keyword ${text.toUpperCase()}! ${fuse_search_result.length === 0 ? '' : `Did you mean ${fuse_search_result[0].item.toUpperCase()}?`}`,
                        });
                    }
                }
            );
            eda_keywords.forEach(
                keyword => {
                    diagnostics.push(...keyword.get_diagnostic());
                }
            );

            // 必要的关键字是否存在？
            let need_break = false;
            ['nmol', 'method', 'matom', 'mmult', 'mcharge'].forEach(keyword => {

                if (!eda_keywords.some(node => node.name === keyword)) {
                    diagnostics.push({
                        range: {
                            start: IUtil.range(eda_section[0]).start, end: {
                                line: IUtil.range(eda_section[0]).start.line,
                                character: Number.MAX_SAFE_INTEGER
                            }
                        },
                        severity: LSP.DiagnosticSeverity.Error,
                        code: `missing-${keyword}`,
                        source: 'XEDA diagnose',
                        message: `${keyword.toUpperCase()} keyword is not specified.`,
                    });
                    need_break = true;
                }
            })
            if (need_break) {
                break eda;
            }

            // 若任一 EDA 相关参数未初始化则跳过
            if (this.input_file_info.nmol === undefined
                // || this.input_file_info.eda_method === undefined
                || this.input_file_info.matom.length === 0
                || this.input_file_info.mmult.length === 0
                || this.input_file_info.mcharge.length === 0) {
                break eda;
            }

            // EDA 单体原子数之和是否等于超分子的原子数？
            if (this.input_file_info.geom.length !== this.input_file_info.matom.reduce((a, b) => a + b)) {
                diagnostics.push({
                    range: IUtil.range(eda_keywords.filter(e => e.name === 'matom')[0].node),
                    severity: LSP.DiagnosticSeverity.Error,
                    code: 'wrong-matom',
                    source: 'XEDA diagnose',
                    message: `There are ${this.input_file_info.matom.join('+')}=${this.input_file_info.matom.reduce((a, b) => a + b)} atoms in the monomers, but ${this.input_file_info.geom.length} atoms in the supermolecule.`,
                });
            }

            // matom 中分子数是否与 nmol 相等？
            if (this.input_file_info.matom.length !== this.input_file_info.nmol) {
                let monomer_count = this.input_file_info.matom.length;
                diagnostics.push({
                    range: IUtil.range(eda_keywords.filter(e => e.name === 'matom')[0].node),
                    severity: LSP.DiagnosticSeverity.Error,
                    code: 'wrong-matom',
                    source: 'XEDA diagnose',
                    message: `There ${monomer_count === 1 ? 'is' : 'are'} ${monomer_count} monomer${monomer_count === 1 ? '' : 's'} in the MATOM keyword, but ${this.input_file_info.nmol} monomers is specified by the NMOL keyword.`,
                });
            }

            // mmult 中分子数是否与 nmol 相等？
            if (this.input_file_info.mmult.length !== this.input_file_info.nmol) {
                let monomer_count = this.input_file_info.mmult.length;
                diagnostics.push({
                    range: IUtil.range(eda_keywords.filter(e => e.name === 'mmult')[0].node),
                    severity: LSP.DiagnosticSeverity.Error,
                    code: 'wrong-mmult',
                    source: 'XEDA diagnose',
                    message: `There ${monomer_count === 1 ? 'is' : 'are'} ${monomer_count} monomer${monomer_count === 1 ? '' : 's'} in the MMULT keyword, but ${this.input_file_info.nmol} monomers is specified by the NMOL keyword.`,
                });
            }

            // mcharge 中分子数是否与 nmol 相等？
            if (this.input_file_info.mcharge.length !== this.input_file_info.nmol) {
                let monomer_count = this.input_file_info.mcharge.length;
                diagnostics.push({
                    range: IUtil.range(eda_keywords.filter(e => e.name === 'mcharge')[0].node),
                    severity: LSP.DiagnosticSeverity.Error,
                    code: 'wrong-mcharge',
                    source: 'XEDA diagnose',
                    message: `There ${monomer_count === 1 ? 'is' : 'are'} ${monomer_count} monomer${monomer_count === 1 ? '' : 's'} in the MCHARGE keyword, but ${this.input_file_info.nmol} monomers is specified by the NMOL keyword.`,
                });
            }

            // 单体电荷之和是否与超分子相等？
            try {
                let all_monomer_charge = this.input_file_info.mcharge.reduce((a, b) => a + b);
                let supermolecule_charge = this.input_file_info.charge;
                if (!isNaN(all_monomer_charge) && !isNaN(supermolecule_charge) && all_monomer_charge !== supermolecule_charge) {
                    diagnostics.push({
                        range: IUtil.range(eda_keywords.filter(e => e.name === 'mcharge')[0].node),
                        severity: LSP.DiagnosticSeverity.Error,
                        code: 'wrong-mcharge',
                        source: 'XEDA diagnose',
                        message: `The sum of the charges of all the monomers is ${all_monomer_charge}, but the charge of the supermolecule is ${supermolecule_charge}.`,
                    })
                }
            } catch (e) {
                console.log(e);
            }

            let spin_count: { α_spin_electron_count: number, β_spin_electron_count: number }[] = [];
            for (let i = 0; i < this.input_file_info.nmol; i++) {
                try {
                    let atom_and_coordinate_list = this.input_file_info.geom.slice(
                        this.input_file_info.matom.slice(0, i).reduce((a, b) => a + b, 0),
                        this.input_file_info.matom.slice(0, i + 1).reduce((a, b) => a + b, 0)
                    );
                    let nuclear_charge = atom_and_coordiantes_list.map(e => IFI.get_atom_nuclear_charge(e.atom!)).reduce((a, b) => a + b);
                    this.input_file_info.monomer_list.push({
                        index: i,
                        atom_and_coordinate_list: atom_and_coordinate_list,
                        atom_count: this.input_file_info.matom[i],
                        charge: this.input_file_info.mcharge[i],
                        mult: this.input_file_info.mmult[i],
                        nuclear_charge: nuclear_charge
                    });
                    // 单体的电荷和自旋多重度是否正确？
                    let check_result = multiplicity(nuclear_charge, this.input_file_info.mcharge[i], this.input_file_info.mmult[i]);
                    if (check_result === false) {
                        diagnostics.push({
                            range: IUtil.range(eda_keywords.filter(e => e.name === 'mmult')[0].node.children[i + 2]),
                            severity: LSP.DiagnosticSeverity.Error,
                            code: 'wrong-multiplicity',
                            source: 'XEDA diagnose',
                            message: `The charge and multiplicity of monomer ${i + 1} is not valid!`,
                        });
                        spin_count.push({ α_spin_electron_count: NaN, β_spin_electron_count: NaN });
                    } else {
                        spin_count.push(check_result);
                    }
                } catch (e) {
                    this.cowsayOops();
                    console.log(e);
                }
            }

            // 单体的单电子数之和是否等于超分子的单电子数？
            try {
                let all_monomer_α_spin_electron_count = spin_count.map(e => e.α_spin_electron_count).reduce((a, b) => a + b);
                let all_monomer_β_spin_electron_count = spin_count.map(e => e.β_spin_electron_count).reduce((a, b) => a + b);
                let all_unpaired_electron_count = Math.abs(all_monomer_α_spin_electron_count + all_monomer_β_spin_electron_count);
                if (!isNaN(all_unpaired_electron_count) && this.input_file_info.nmul !== all_unpaired_electron_count + 1) {
                    diagnostics.push({
                        range: IUtil.range(eda_keywords.filter(e => e.name === 'mmult')[0].node),
                        severity: LSP.DiagnosticSeverity.Error,
                        code: 'wrong-nmul',
                        source: 'XEDA diagnose',
                        message: `There ${all_unpaired_electron_count === 1 ? 'is' : 'are'} ${all_unpaired_electron_count} unpaired electron${all_unpaired_electron_count === 1 ? '' : 's'} in all the monomers, but there ${this.input_file_info.nmul - 1 === 1 ? 'is' : 'are'} ${this.input_file_info.nmul - 1} unpaired electron in the supermolecule according to the NMUL keyword.`,
                    });
                }
            } catch (e) {
                this.cowsayOops();
                console.log(e);
            }

        }// EDA

        this.hover_info_list.push(...parsed_keywords, ...eda_keywords);
        this.completion_info_list.push(...parsed_keywords, ...eda_keywords);

        // 体系的自旋多重度是否正确？
        try {
            if (multiplicity(this.input_file_info.nuclear_charge, this.input_file_info.charge, this.input_file_info.nmul) === false) {
                diagnostics.push({
                    range: IUtil.range(parsed_keywords.filter(e => e.name === 'nmul')[0].node),
                    severity: LSP.DiagnosticSeverity.Error,
                    code: 'wrong-multiplicity',
                    source: 'XEDA diagnose',
                    message: `The charge and multiplicity of the supermolecule is not valid!`,
                })
            }
        } catch (e) {
            this.cowsayOops();
            console.log(e);
        }

        // 是否使用了正确的HF方法？
        try {
            if (this.input_file_info.nmul !== 1 && this.input_file_info.method?.toLowerCase() === 'rhf') {
                diagnostics.push({
                    range: IUtil.range(parsed_keywords.filter(e => e.name === 'method')[0].node),
                    severity: LSP.DiagnosticSeverity.Error,
                    code: 'wrong-method',
                    source: 'XEDA diagnose',
                    message: `RHF method cannot be used in a system with unpaired electrons!`,
                });
            }
        } catch (e) {
            console.log(e);
        }


        // console.log(this.input_file_info);
        return diagnostics
    }

    /**
     * Find the full word at the given point.
     */
    public wordAtPoint(uri: string, line: number, column: number): string | null {
        const node = this.nodeAtPoint(uri, line, column)

        if (!node || node.childCount > 0 || node.text.trim() === '') {
            return null
        }

        return node.text.trim()
    }

    public wordAtPointFromTextPosition(
        params: LSP.TextDocumentPositionParams,
    ): string | null {
        return this.wordAtPoint(
            params.textDocument.uri,
            params.position.line,
            params.position.character,
        )
    }

    /**
     * Find the node at the given point.
     */
    private nodeAtPoint(
        uri: string,
        line: number,
        column: number,
    ): Parser.SyntaxNode | null {
        // const tree = this.uriToAnalyzedDocument[uri]?.tree

        // if (!tree?.rootNode) {
        //     // Check for lacking rootNode (due to failed parse?)
        //     return null
        // }

        // return tree.rootNode.descendantForPosition({ row: line, column })
        return null;
    }

    /**
     *  _________________________
     * < Oops! Something's wrong >
     *  -------------------------
     *         \   ^__^
     *          \  (oo)\_______
     *             (__)\       )\/\
     *                 ||----w |
     *                 ||     ||
     */
    private cowsayOops(): void {
        console.log(` _________________________
< Oops! Something's wrong >
 -------------------------
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`);
        return;
    }
}
import Analyzer from "./analyzer";
import * as LSP from 'vscode-languageserver/browser';
import { TextDocument } from 'vscode-languageserver-textdocument'
import { initParser } from "./parser";
import { get_semantic_tokens, tokenTypes } from "./semantic_token";
// import { Linter, LintingResult } from './shellcheck'
import * as IUtil from './util/tree-sitter';
import { isPositionIncludedInRange } from "./util/range";

export default class XEDAServer {
    private analyzer: Analyzer;
    private clientCapabilities: LSP.ClientCapabilities;
    private connection: LSP.Connection;
    private documents: LSP.TextDocuments<TextDocument> = new LSP.TextDocuments(TextDocument);
    private reader: LSP.BrowserMessageReader;
    private writer: LSP.BrowserMessageWriter;
    // private linter:Linter



    private constructor(
        analyzer: Analyzer,
        capabilities: LSP.ClientCapabilities,
        connection: LSP.Connection,
        messageReader: LSP.BrowserMessageReader,
        messageWriter: LSP.BrowserMessageWriter
    ) {
        this.clientCapabilities = capabilities;
        this.analyzer = analyzer;
        this.connection = connection;
        this.reader = messageReader;
        this.writer = messageWriter;

        // this.reader.listen(e => {
        //     // @ts-ignore
        //     if (e.method === 'onCursorChangePosition') {
        //         // @ts-ignore
        //         this.onCursorMove(e.params, messageWriter)
        //     }
        // });
    }

    /**
     * 由于构造函数不可 async，使用此方法初始化
     */
    public static async initialize(
        connection: LSP.Connection,
        initParams: LSP.InitializeParams,
        messageReader: LSP.BrowserMessageReader,
        messageWriter: LSP.BrowserMessageWriter
    ): Promise<XEDAServer> {
        const parser = await initParser();
        const analyzer = new Analyzer(parser);

        const server = new XEDAServer(analyzer, initParams.capabilities, connection, messageReader, messageWriter);

        return server
    }

    /**
     * Register handlers for the events from the Language Server Protocol that we
     * care about.
     */
    public register(connection: LSP.Connection): void {
        let currentDocument: TextDocument | null = null

        this.documents.listen(connection)

        this.documents.onDidChangeContent(({ document }) => {
            // The content of a text document has changed. This event is emitted
            // when the text document first opened or when its content has changed.
            currentDocument = document
            this.analyzeAndLintDocument(document)
        })

        // Register all the handlers for the LSP events.
        connection.onHover(this.onHover.bind(this))

        connection.onCodeLens(this.code_lens.bind(this));

        connection.languages.semanticTokens.on(this.semantic_tokens.bind(this));

        connection.onCompletion(this.completion.bind(this));

        this.reader.listen(e => {
            // @ts-ignore
            if (e.method === 'onCursorChangePosition') {
                // @ts-ignore
                this.onCursorMove(e.param);
            }
        })

    }

    public async completion(params: LSP.CompletionParams): Promise<LSP.CompletionItem[]> {
        let r: LSP.CompletionItem[] = [];
        try {
            this.analyzer.analyze(this.documents.get(params.textDocument.uri)!);
            let character = params.position.character;
            if (character >= 0) {
                let node = this.analyzer.tree!.rootNode.descendantForPosition({
                    row: params.position.line,
                    column: params.position.character - 1
                });
                let choosed_node = IUtil.findParent(node, n => this.analyzer.completion_info_list.some(e => e.node.equals(n)));
                // console.log(choosed_node)
                r.push(... this.analyzer.completion_info_list.find(e => e.node.equals(choosed_node!))!.get_completion_info());
            }
        } catch (e) {
            console.log(e)
        }
        return r;
    }

    public async semantic_tokens(params: LSP.SemanticTokensParams): Promise<LSP.SemanticTokens> {
        let tree = this.analyzer.tree;
        if (tree === undefined) {
            return { data: [] };
        }
        return get_semantic_tokens(tree);
    }

    /**
     * create code lens for each monomer
     */
    public async code_lens(params: LSP.CodeLensParams): Promise<LSP.CodeLens[]> {
        let r: LSP.CodeLens[] = [];
        this.analyzer.analyze(this.documents.get(params.textDocument.uri)!);
        try {
            this.analyzer.input_file_info.monomer_list.forEach((monomer, i) => {
                r.push({
                    range: {
                        start: {
                            line: monomer.atom_and_coordinate_list[0].node.startPosition.row,
                            character: monomer.atom_and_coordinate_list[0].node.startPosition.column
                        },
                        end: {
                            line: monomer.atom_and_coordinate_list[0].node.startPosition.row,
                            character: monomer.atom_and_coordinate_list[0].node.startPosition.column
                        }
                    },
                    command: { title: `Monomer ${i + 1} has ${monomer.atom_count} atom${monomer.atom_count === 1 ? '' : 's'}`, command: '' }
                })
            });
        } catch (e) {
            console.log(e);
        }
        return r;
    }

    /**
     * Analyze and lint the given document.
     */
    public async analyzeAndLintDocument(document: TextDocument) {
        const { uri } = document
        // Load the tree for the modified contents into the analyzer:
        let diagnostics = this.analyzer.analyze(document)

        // // Run ShellCheck diagnostics:
        // if (this.linter) {
        //     try {
        //         const sourceFolders = this.workspaceFolder ? [this.workspaceFolder] : []
        //         const { diagnostics: lintDiagnostics, codeActions } = await this.linter.lint(
        //             document,
        //             sourceFolders,
        //             this.config.shellcheckArguments,
        //         )
        //         diagnostics = diagnostics.concat(lintDiagnostics)
        //         this.uriToCodeActions[uri] = codeActions
        //     } catch (err) {
        //         logger.error(`Error while linting: ${err}`)
        //     }
        // }

        this.connection.sendDiagnostics({ uri, version: document.version, diagnostics })
        this.onCursorMove();
    }

    /**
     * The parts of the Language Server Protocol that we are currently supporting.
     */
    public capabilities(): LSP.ServerCapabilities {
        return {
            // For now we're using full-sync even though tree-sitter has great support
            // for partial updates.
            textDocumentSync: LSP.TextDocumentSyncKind.Full,
            hoverProvider: true,
            codeLensProvider: {
                resolveProvider: false
            },
            semanticTokensProvider: {
                legend: {
                    // 丑陋的 TS enum 反射
                    tokenTypes: Object.keys(tokenTypes).filter(e => isNaN(Number(e))),
                    tokenModifiers: []
                },
                range: false,
                full: true
            },
            completionProvider: {
                // triggerCharacters: ['='],
                completionItem: {
                    labelDetailsSupport: false
                }
            },
        }
    }

    private async onHover(
        params: LSP.TextDocumentPositionParams,
    ): Promise<LSP.Hover | null> {
        let r = null;

        try {
            this.analyzer.analyze(this.documents.get(params.textDocument.uri)!);
            let node = this.analyzer.tree!.rootNode.descendantForPosition({
                row: params.position.line,
                column: params.position.character
            });
            let choosed_node = IUtil.findParent(node, n => this.analyzer.hover_info_list.some(e => e.node.equals(n)));
            // 新加 Hover info 需要注意这里的逻辑，这里的逻辑为了实现只有鼠标在 keyword 的等号前面时才显示 hover info，让仅光标在 keyword 的第一个子节点才添加 hover info,
            // 可能对未来新加的有严重影响。
            // （确实逻辑写得不好……应该把keyword类进一步划分的）
            if (choosed_node) {
                if (choosed_node.children[0] && isPositionIncludedInRange(params.position, IUtil.range(choosed_node!.children[0]))
                    || choosed_node.childCount === 0) {
                    let keyword = this.analyzer.hover_info_list.find(e => e.node.equals(choosed_node!));
                    r = keyword!.get_hover_info();
                }
            }
        } catch (e) {
            console.log(e)
        }

        return r;
    }

    private async onCursorMove(param?: { line: number, character: number }): Promise<null> {
        let monomer_list: string[] = [];
        let highlight_index = -1;
        if (this.analyzer.input_file_info.have_eda_section) {
            this.analyzer.input_file_info.monomer_list.forEach((monomer, i) => {
                let xyz: string = `${monomer.atom_count}\n\n`;
                try {
                    monomer.atom_and_coordinate_list.forEach(atom => {
                        if (param && param.line === atom.node.startPosition.row) {
                            highlight_index = i;
                        }
                        if (isNaN(atom.x) || isNaN(atom.y) || isNaN(atom.z)) {
                            return
                        };
                        xyz += `${atom.name} ${atom.x} ${atom.y} ${atom.z}\n`;
                    });
                } catch (e) {
                    console.log(e);
                }
                monomer_list.push(xyz);
            });
        } else {
            let xyz: string = `${this.analyzer.input_file_info.geom.length}\n\n`;

            this.analyzer.input_file_info.geom.forEach(atom => {
                if (isNaN(atom.x) || isNaN(atom.y) || isNaN(atom.z)) {
                    return
                };
                xyz += `${atom.name} ${atom.x} ${atom.y} ${atom.z}\n`;
            });
            monomer_list.push(xyz);
        }
        this.writer.write(
            // @ts-ignore
            { jsonrpc: '2.0', method: 'set_monomers_and_highlight', param: { monomer_list: monomer_list, highlight_index: highlight_index } })

        return null;
    }
}
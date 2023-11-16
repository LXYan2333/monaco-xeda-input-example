import { TextDocument } from 'vscode-languageserver-textdocument';
import * as LSP from 'vscode-languageserver/browser';

export type LintingResult = {
    diagnostics: LSP.Diagnostic[]
    codeActions: Record<string, LSP.CodeAction | undefined>
}

// export class Linter{
//     public async lint(
//         document: TextDocument,
//         sourcePaths: string[],
//         additionalShellCheckArguments: string[] = [],
//     ): Promise<LintingResult> {
        
//     }
// }
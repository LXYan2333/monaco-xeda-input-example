import { editor } from 'monaco-editor';
import { MonacoLanguageClient, initServices, useOpenEditorStub } from 'monaco-languageclient';
import { BrowserMessageReader, BrowserMessageWriter } from 'vscode-languageserver-protocol/browser.js';
import { CloseAction, ErrorAction, MessageTransports } from 'vscode-languageclient';
import { createConfiguredEditor } from 'vscode/monaco';
import { ExtensionHostKind, registerExtension } from 'vscode/extensions';
import getConfigurationServiceOverride, { updateUserConfiguration } from '@codingame/monaco-vscode-configuration-service-override';
import getEditorServiceOverride from '@codingame/monaco-vscode-editor-service-override';
import getKeybindingsServiceOverride from '@codingame/monaco-vscode-keybindings-service-override';
import getThemeServiceOverride from '@codingame/monaco-vscode-theme-service-override';
import getTextmateServiceOverride from '@codingame/monaco-vscode-textmate-service-override';
import { LogLevel } from 'vscode/services';
import '@codingame/monaco-vscode-theme-defaults-default-extension';
import { Uri } from 'vscode';

import { buildWorkerDefinition } from 'monaco-editor-workers';
buildWorkerDefinition('./workers/', new URL('', window.location.href).href, false);

const languageId = 'xeda';

const setup_and_run = async (elem: HTMLElement, editorText: string, fontFamily: string) => {
    // use this to demonstrate all possible services made available by the monaco-vscode-api
    await initServices({
        userServices: {
            ...getThemeServiceOverride(),
            ...getTextmateServiceOverride(),
            ...getConfigurationServiceOverride(Uri.file('/workspace')),
            ...getEditorServiceOverride(useOpenEditorStub),
            ...getKeybindingsServiceOverride()
        },
        debugLogging: true,
        logLevel: LogLevel.Info
    });

    console.log('Setting up XEDA client configuration ...');
    const extension = {
        name: 'XEDA LSP',
        publisher: 'LXYan2333',
        version: '1.0.0',
        engines: {
            vscode: '*'
        },
        contributes: {
            languages: [{
                id: languageId,
                extensions: [
                    `.inp`
                ],
                aliases: [
                    languageId
                ],
                // configuration: './statemachine-configuration.json'
            }],
            // grammars: [{
            //     language: languageId,
            //     scopeName: 'source.statemachine',
            //     path: './statemachine-grammar.json'
            // }],
            keybindings: [{
                key: 'ctrl+p',
                command: 'editor.action.quickCommand',
                when: 'editorTextFocus'
            }, {
                key: 'ctrl+shift+c',
                command: 'editor.action.commentLine',
                when: 'editorTextFocus'
            }]
        }
    };
    const { registerFileUrl } = registerExtension(extension, ExtensionHostKind.LocalProcess, {});
    // registerFileUrl('/statemachine-configuration.json', new URL('../../node_modules/langium-statemachine-dsl/language-configuration.json', window.location.href).href);
    // registerFileUrl('/statemachine-grammar.json', new URL('../../node_modules/langium-statemachine-dsl/syntaxes/statemachine.tmLanguage.json', window.location.href).href);

    updateUserConfiguration(`{
    "editor.fontSize": 14,
    "editor.fontFamily": "${fontFamily}",
    "workbench.colorTheme": "Default Light Modern"
}`);

    // const exampleStatemachineUrl = new URL('./src/langium/example.statemachine', window.location.href).href;
    // const editorText = "123 LXYan2333";

    const editorOptions = {
        model: editor.createModel(editorText, languageId, Uri.parse('/workspace/xeda_input')),
        automaticLayout: true
    };
    let r = createConfiguredEditor(elem, editorOptions);

    function createLanguageClient(transports: MessageTransports): MonacoLanguageClient {
        return new MonacoLanguageClient({
            name: 'XEDA Client',
            clientOptions: {
                // use a language id as a document selector
                documentSelector: [{ language: languageId }],
                // disable the default error handler
                errorHandler: {
                    error: () => ({ action: ErrorAction.Continue }),
                    closed: () => ({ action: CloseAction.DoNotRestart })
                }
            },
            // create a language client connection to the server running in the web worker
            connectionProvider: {
                get: () => {
                    return Promise.resolve(transports);
                }
            }
        });
    }

    const worker = new Worker(new URL('/node_modules/xeda-lsp/out/main.js', import.meta.url), {
        type: 'module',
        name: 'XEDA LSP worker'
    });
    const reader = new BrowserMessageReader(worker);
    const writer = new BrowserMessageWriter(worker);
    const languageClient = createLanguageClient({ reader, writer });
    languageClient.start();
    reader.onClose(() => languageClient.stop());

    return { editor: r, connection: { reader: reader, writer: writer } };
};


/**
 * @param elem 要嵌入的 HTML 元素。should be empty (not contain other dom nodes). The editor will read the size of domElement.
 * @param editorText 要展示的文本内容
 * @returns 编辑器实例的`Promise`。在`.then`中，通过 `.getModel().getValue()` 异步获取编辑器内容
 */
export async function attach_monaco_to(elem: HTMLElement, editorText: string, fontFamily: string): Promise<{ editor: editor.IStandaloneCodeEditor, connection: { reader: BrowserMessageReader, writer: BrowserMessageWriter } }> {
    console.log("init");
    return setup_and_run(elem, editorText, fontFamily);
}

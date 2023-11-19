import * as LSP from "vscode-languageserver/browser";
import XEDAServer from "./server";

declare const self: DedicatedWorkerGlobalScope;

const messageReader = new LSP.BrowserMessageReader(self);
const messageWriter = new LSP.BrowserMessageWriter(self);

const connection = LSP.createConnection(messageReader, messageWriter);

connection.onInitialize(
    async (params: LSP.InitializeParams): Promise<LSP.InitializeResult> => {
        const server = await XEDAServer.initialize(connection, params, messageReader, messageWriter);
        server.register(connection)
        return {
            capabilities: server.capabilities(),
        }
    },
)

connection.listen();

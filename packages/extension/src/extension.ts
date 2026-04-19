import * as vscode from 'vscode';
import { GeminiCliHandler } from './core/api/providers/gemini-cli';
import { SidebarProvider } from './core/webview/SidebarProvider';

export function activate(context: vscode.ExtensionContext) {
  console.log('Gemini-Cline Extension Activated');

  const sidebarProvider = new SidebarProvider(context.extensionUri);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(SidebarProvider.viewType, sidebarProvider)
  );

  // Register command to start a new task
  const disposable = vscode.commands.registerCommand('gemini-cline.plusButtonClicked', async () => {
    const prompt = await vscode.window.showInputBox({ 
      prompt: "What task would you like me to tackle?",
      placeHolder: "Describe your objective..."
    });
    
    if (!prompt) return;

    const config = vscode.workspace.getConfiguration('gemini-cline');
    const geminiCliPath = config.get<string>('geminiCliPath') || "gemini";

    const handler = new GeminiCliHandler({
      geminiCliPath,
      ask: async (type, text) => {
        if (sidebarProvider.view) {
           sidebarProvider.view.webview.postMessage({ type: 'ask', askType: type, text });
        }

        if (type === 'tool') {
           const selection = await vscode.window.showInformationMessage(
             `Gemini CLI wants to execute a tool: ${text}`,
             'Approve', 'Deny'
           );
           return { response: selection === 'Approve' ? 'yesButtonClicked' : 'noButtonClicked' };
        } else {
           const response = await vscode.window.showInputBox({ prompt: text });
           return { text: response || "", response: response ? 'messageResponse' : 'noButtonClicked' };
        }
      },
      say: async (type, text) => {
        if (sidebarProvider.view) {
          sidebarProvider.view.webview.postMessage({ type: 'say', sayType: type, text });
        }
      }
    });

    const stream = handler.createMessage("You are an expert AI coding assistant.", [{ role: "user", content: prompt }]);
    for await (const chunk of stream) {
      if (chunk.type === 'text') {
        if (sidebarProvider.view) {
          sidebarProvider.view.webview.postMessage({ type: 'partialMessage', text: chunk.text });
        }
      }
    }
  });

  context.subscriptions.push(disposable);
}

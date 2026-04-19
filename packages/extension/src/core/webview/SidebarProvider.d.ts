import * as vscode from 'vscode';
export declare class SidebarProvider implements vscode.WebviewViewProvider {
  private readonly _extensionUri;
  static readonly viewType = 'gemini-cline.SidebarProvider';
  private _view?;
  constructor(_extensionUri: vscode.Uri);
  get view(): vscode.WebviewView | undefined;
  resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken,
  ): void;
  private _getHtmlForWebview;
}

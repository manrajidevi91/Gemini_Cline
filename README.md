# Gemini-Cline

![Gemini-Cline Integration](/docs/assets/gemini-cline-banner.png)

**Gemini-Cline** is a powerful monorepo unifying the **Gemini CLI** backend with a **Cline-inspired VS Code Extension**. This integrated environment provides an autonomous AI coding agent directly within your editor, utilizing Gemini 3.1 Pro and Gemini's Model Context Protocol (MCP) tool ecosystem.

By bridging the extensible terminal-first engine of Gemini CLI with the rich, reactive chat interface of Cline, this project delivers the most direct, agentic path from your prompt to production code.

---

## 🚀 Key Features

* **Unified Monorepo Architecture**: Both the AI backend (`packages/cli`, `packages/core`) and the frontend extension (`packages/extension`) live in the same repository for synchronized development.
* **Cline-Inspired Webview UI**: A native-feeling, React-based sidebar chat interface inside VS Code.
* **JSON-RPC Bridge**: Bidirectional communication via `GeminiCliBridge`, allowing the CLI to stream markdown, request tool approvals, and ask follow-up questions directly through the VS Code UI.
* **Automated Tool Execution**: The agent can run terminal commands, manage files, read workspaces, and execute API calls, all subject to your approval settings.
* **One-Click Local Setup**: Fully automated batch scripting to build, package, and install the extension locally.

---

## 📦 Project Structure

```text
Gemini-Cline/
├── packages/
│   ├── cli/                      # The Gemini CLI executable and entry points
│   ├── core/                     # Core agent logic, LLM providers, and tool execution
│   ├── extension/                # The VS Code Extension Host
│   │   ├── src/                  # Extension lifecycle and Bridge handlers
│   │   ├── webview-ui/           # React/Vite-based Chat Interface (Webview)
│   │   └── package.json          # Extension manifest
│   ├── ... (other CLI packages)
├── scripts/                      # Build and packaging automation 
├── run.bat                       # Master installation & setup script
└── package.json                  # Root workspace configuration
```

---

## 🛠️ Installation & Setup (Local Development)

The repository includes a master build script that automates the entire setup process. 

**Prerequisites:**
- **Node.js** >= 20.0.0
- **VS Code** installed with the `code` CLI available in your PATH.

### 1. Build and Install via Script
Run the automated batch script from the project root:
```cmd
.\run.bat
```
This script sequentially performs:
1. `npm install` across the root workspace.
2. `npm run build` to compile the CLI backend and Extension Host (`tsc`).
3. Compiles the Vite/React Webview UI.
4. Packages the extension (`@vscode/vsce`) into `gemini-cline.vsix`.
5. Automatically installs the extension into your local VS Code instance.

### 2. Manual Debugging
If you prefer debugging through the IDE:
1. Open the project in VS Code.
2. Run `npm install` and `npm run build` at the root.
3. Navigate to the Run and Debug view (`Ctrl+Shift+D`).
4. Select the **"Extension"** launch configuration and press `F5` to open the Extension Development Host.

---

## ⚙️ Configuration

Once the extension is installed, ensure it is pointing to the local CLI build. 
Open your VS Code `settings.json` and configure:

```json
{
  "gemini-cline.geminiCliPath": "node ${workspaceFolder}/packages/cli/dist/main.js"
}
```
*Note: The `run.bat` script handles basic workspace configurations for you.*

---

## 🔐 Authentication

Gemini-Cline requires authentication to use the Gemini API. You can authenticate exactly as you would with the standard Gemini CLI:

**Option 1: OAuth (Sign in with Google)**
```bash
gemini
```
*(Choosing Sign in with Google provides a generous free tier of 60 requests/min and limits up to 1M context window).*

**Option 2: API Key**
Alternatively, fetch an API key from Google AI Studio and expose it in your environment:
```bash
export GEMINI_API_KEY="YOUR_API_KEY"
```

## 🤝 Architecture Details

The integration is powered by the `GeminiCliHandler` inside the extension package. When a user sends a message via the Webview UI, the handler:
1. Spawns the compiled Gemini CLI binary as a background process (`gemini chat --interactive-approval --output-format stream-json`).
2. Taps into `stdout` to parse continuous JSON-RPC strings emitted by the CLI.
3. Routes UI update events (e.g., text streaming, tool executions) to the React Webview.
4. Intercepts permission requests (e.g., executing a bash command) and visualizes them as "Approve/Deny" modals in the UI. User responses are fed back into the CLI's `stdin`.

---

## 📄 License & Legal

This project extends the official open-source Gemini CLI (Apache 2.0).
- **License**: [Apache License 2.0](LICENSE)
- **Security**: [Security Policy](SECURITY.md)

---
<p align="center">
  Built by the open source community, integrating standard Gemini CLI capability directly into your editor workflow.
</p>
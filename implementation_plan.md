# Gemini-Cline VS Code Extension — Implementation Plan

Build a VS Code extension that combines Cline's human-in-the-loop UI paradigm with Gemini CLI as the execution backend, enabling dual-model agentic workflows with native Google OAuth authentication.

## User Review Required

> [!IMPORTANT]
> **Fork-based Architecture**: This plan proposes forking the Cline repo (`manrajidevi91/cline`) as the base, then surgically replacing the LLM provider layer with a Gemini CLI bridge. This is significantly faster than building from scratch because Cline already has ~90% of the UI, tool approval, diff viewer, and session management infrastructure.

> [!WARNING]
> **Gemini CLI Headless API Limitations**: Gemini CLI's `--output-format stream-json` provides structured JSONL events (`init`, `message`, `tool_use`, `tool_result`, `result`), but does **not** support interactive stdin-based tool approval. The PRD's `{"type":"tool_response","id":"...","approved":true}` protocol does not exist in upstream Gemini CLI. We have two options:
> 1. **Option A (Recommended for Alpha)**: Run Gemini CLI with `--yolo` (auto-approve all tools) and build approval gates in the VS Code extension layer by intercepting `tool_use` events and replaying modified prompts.
> 2. **Option B (Full PRD compliance)**: Fork Gemini CLI (`manrajidevi91/gemini-cli-ide`) and add an interactive JSON-RPC protocol to `packages/core` that supports stdin-based tool approval. This is the long-term path but significantly more work.

> [!CAUTION]
> **Dual CLI Subprocess Model**: Running two separate CLI processes (one for planning, one for coding) doubles memory usage (~200MB each on Node 20). Consider starting with a single-process model that uses `--model` flag switching, and only split to dual-process if context isolation issues arise.

---

## Proposed Changes

### Phase 1: Project Scaffold & Repository Setup

#### [NEW] `gemini-cline/` — Forked from `manrajidevi91/cline`

Clone the Cline repository into the workspace. Rename the extension identity:

- `package.json`: Change `name` → `gemini-cline`, `displayName` → `Gemini Cline`, `publisher` → updated
- Remove all Anthropic/OpenAI/OpenRouter provider dependencies (`@anthropic-ai/sdk`, `openai`, `@aws-sdk/*`, etc.)
- Add `@google/gemini-cli` as a dev dependency for type reference
- Update `activationEvents`, `contributes.commands`, `contributes.views` for Gemini-Cline branding
- Add new configuration properties: `geminiCline.cliPath`, `geminiCline.defaultModel`, `geminiCline.planningModel`, `geminiCline.codingModel`, `geminiCline.autoApprovePatterns`

---

### Phase 2: Gemini CLI Bridge Layer

This is the core innovation — replacing Cline's direct API calls with Gemini CLI subprocess management.

#### [NEW] `src/core/gemini-bridge/GeminiCliBridge.ts`
The central process manager that spawns and communicates with Gemini CLI.

```typescript
// Key responsibilities:
// 1. Spawn `gemini -p <prompt> --output-format stream-json` for each request
// 2. Parse JSONL stream into typed events (init, message, tool_use, tool_result, result)
// 3. Emit structured events to the extension core via EventEmitter
// 4. Handle process lifecycle (spawn, crash, restart)
// 5. Manage workspace context via --cwd and --include-directories flags
```

| Method | Description |
|--------|-------------|
| `spawn(prompt, options)` | Spawns a new CLI process with given prompt and model flags |
| `parseJsonlStream(stream)` | Transforms stdout readline into typed `GeminiEvent` objects |
| `sendInput(text)` | Writes to stdin for interactive sessions (future) |
| `kill()` | Gracefully terminates the CLI process |
| `onEvent(type, handler)` | Typed event listener for `init`, `message`, `tool_use`, `tool_result`, `result`, `error` |

#### [NEW] `src/core/gemini-bridge/types.ts`
Type definitions for Gemini CLI JSONL event protocol:

```typescript
interface GeminiInitEvent { type: 'init'; sessionId: string; model: string; }
interface GeminiMessageEvent { type: 'message'; role: 'user'|'assistant'; content: string; }
interface GeminiToolUseEvent { type: 'tool_use'; id: string; tool: string; args: Record<string, any>; }
interface GeminiToolResultEvent { type: 'tool_result'; id: string; output: string; error?: string; }
interface GeminiResultEvent { type: 'result'; response: string; stats: { tokens: number; latency: number; }; }
interface GeminiErrorEvent { type: 'error'; message: string; code?: number; }
type GeminiEvent = GeminiInitEvent | GeminiMessageEvent | GeminiToolUseEvent | GeminiToolResultEvent | GeminiResultEvent | GeminiErrorEvent;
```

#### [NEW] `src/core/gemini-bridge/GeminiCliLocator.ts`
Discovers the local Gemini CLI installation:

- Check `geminiCline.cliPath` setting first
- Then `which gemini` / `where gemini` (platform-aware)
- Then `npx @google/gemini-cli` fallback
- Validate version ≥ 0.40.0 via `gemini --version`
- Report clear error if CLI not found

#### [NEW] `src/core/gemini-bridge/GeminiAuthBridge.ts`
Handles authentication state:

- Check existing auth via `gemini auth status --output-format json`
- Trigger OAuth flow via `gemini auth login` (opens browser)
- Check for `GEMINI_API_KEY` env var as fallback
- Store auth preference in VS Code settings
- Monitor quota via stats from `result` events

---

### Phase 3: Dual-Model Session Router

#### [NEW] `src/core/session/DualModelRouter.ts`
Manages the planning/coding mode paradigm:

```typescript
interface SessionMode {
  mode: 'planning' | 'coding';
  model: string;           // e.g., 'gemini-2.5-flash-preview-04-17' or 'gemini-2.5-pro'
  systemPrompt: string;    // Mode-specific system instructions
  conversationHistory: GeminiEvent[];
  workingDirectory: string;
}
```

| Feature | Implementation |
|---------|---------------|
| Mode switching | UI toggle sends `mode_switch` message → Router switches `--model` flag on next CLI spawn |
| Context isolation | Separate `conversationHistory` arrays per mode; option for shared file context |
| Plan handoff | Planning mode output saved as `@PLAN.md`; coding mode auto-ingests via prompt injection |
| Auto-routing | Optional: classify prompt intent via keyword heuristics (`"plan"`, `"architect"` → planning; `"implement"`, `"fix"` → coding) |

#### [MODIFY] `src/core/controller/` — Cline's existing controller
Replace `ApiHandler`/`ApiStream` abstractions with `GeminiCliBridge`:

- `ClineProvider.ts` → `GeminiClineProvider.ts`: Replace `buildApiHandler()` with `new GeminiCliBridge()`
- `messageHandler.ts`: Map Gemini JSONL events to Cline's existing message flow (thinking → tool_call → tool_result → response)
- Remove `src/services/api/` directory entirely (direct API providers)

---

### Phase 4: Tool Approval Interceptor

#### [NEW] `src/core/tools/ToolApprovalInterceptor.ts`

Since Gemini CLI doesn't support interactive tool approval via stdin, we implement a pre-execution gate:

**Strategy (Alpha — Option A):**
1. Run CLI with `--yolo` flag (auto-approve all tools)
2. Intercept `tool_use` events from JSONL stream
3. For destructive tools (`write_file`, `run_command`, `shell`), pause the event stream and display approval UI
4. On approve: let CLI continue (it's already executing)
5. On reject: kill the CLI process, revert changes via git, restart with modified prompt excluding the rejected action
6. For file writes: capture before/after state and present VS Code diff viewer

**Strategy (Beta — Option B with CLI fork):**
1. Add stdin JSON-RPC protocol to Gemini CLI core
2. CLI emits `tool_use` and waits for `tool_response` on stdin
3. Extension sends `{"type":"tool_response","id":"...","approved":true|false}` 
4. Full bidirectional communication

#### [MODIFY] `webview-ui/` — Reuse Cline's approval UI
Cline already has excellent tool approval modals with:
- Diff previews for file changes
- Terminal command previews
- Approve/Reject/Modify buttons
- Batch approval for non-destructive tools

We keep this UI intact but rewire it to the `ToolApprovalInterceptor` instead of Cline's internal tool executor.

---

### Phase 5: Webview UI Adaptation

#### [MODIFY] `webview-ui/src/` — Cline's React webview

**Keep intact (minimal changes):**
- Chat interface with message bubbles
- Tool approval modals and diff viewer
- Session history sidebar
- File/folder `@`-mention autocomplete
- Checkpoint/restore workspace

**Modify:**
- `components/ModelSelector/`: Replace multi-provider dropdown with Gemini-specific model picker + planning/coding mode toggle
- `components/StatusBar/`: Show Gemini free-tier quota (requests remaining today) from CLI stats
- `components/ChatInput/`: Add `/mode planning` and `/mode coding` slash commands; add `@plan` context injection
- `pages/Settings/`: Remove API key management for Anthropic/OpenRouter/OpenAI; add Gemini OAuth sign-in button and CLI path configuration
- Color scheme: Update from Cline blue/purple to Gemini blue/teal gradient

#### [MODIFY] `webview-ui/src/services/`
- Replace `ApiService` calls with `GeminiClineProvider` message passing via `vscode.postMessage`

---

### Phase 6: Authentication & Quota UI

#### [NEW] `src/services/auth/GeminiAuthService.ts`
- Checks auth status on extension activation
- Stores auth method preference (`oauth` | `api_key`) in VS Code secrets
- For OAuth: invokes `gemini auth login`, monitors for success via `gemini auth status`
- For API Key: stores `GEMINI_API_KEY` in VS Code secrets, injects into CLI env
- Displays quota status in status bar item

#### [NEW] `src/services/auth/QuotaTracker.ts`
- Parses `stats` from `GeminiResultEvent` after each request
- Tracks daily request count locally
- Shows remaining quota in status bar: "🟢 847/1000 requests today"
- Warning at 80%: "🟡 200 remaining"
- Exhausted: "🔴 Quota exhausted — resets at midnight PT"

---

### Phase 7: File Sync & Workspace Integration

#### [MODIFY] `src/integrations/` — Reuse Cline's existing integrations

Cline already has robust workspace integration:
- `terminal/`: Shell integration for running commands — **keep as-is** but also route through CLI
- `editor/`: Diff viewer, file change tracking — **keep as-is**
- `workspace/`: File watchers, checkpoint system — **keep as-is**

#### [NEW] `src/integrations/gemini/GeminiFileSync.ts`
- Monitors files changed by Gemini CLI (via `tool_result` events with file paths)
- Triggers VS Code file refresh for changed files
- Feeds into existing checkpoint system for workspace snapshots

---

## Directory Structure (Final)

```
gemini-cline/
├── src/
│   ├── core/
│   │   ├── gemini-bridge/        # [NEW] CLI process management
│   │   │   ├── GeminiCliBridge.ts
│   │   │   ├── GeminiCliLocator.ts
│   │   │   ├── GeminiAuthBridge.ts
│   │   │   └── types.ts
│   │   ├── session/              # [NEW] Dual-model routing
│   │   │   └── DualModelRouter.ts
│   │   ├── tools/                # [NEW] Tool approval interceptor
│   │   │   └── ToolApprovalInterceptor.ts
│   │   └── controller/          # [MODIFIED] From Cline
│   │       └── GeminiClineProvider.ts
│   ├── services/
│   │   ├── auth/                 # [NEW] Auth & quota
│   │   │   ├── GeminiAuthService.ts
│   │   │   └── QuotaTracker.ts
│   │   └── ...                   # [MODIFIED] Remove API providers
│   ├── integrations/
│   │   ├── gemini/               # [NEW] File sync
│   │   │   └── GeminiFileSync.ts
│   │   ├── terminal/             # [KEPT] From Cline
│   │   ├── editor/               # [KEPT] From Cline
│   │   └── workspace/            # [KEPT] From Cline
│   ├── shared/                   # [KEPT] From Cline
│   ├── extension.ts              # [MODIFIED] Entry point
│   └── ...
├── webview-ui/                   # [MODIFIED] Cline's React UI
│   └── src/
│       ├── components/
│       │   ├── ModelSelector/    # [MODIFIED] Gemini mode toggle
│       │   ├── ChatInput/        # [MODIFIED] Slash commands
│       │   ├── StatusBar/        # [MODIFIED] Quota display
│       │   └── ...               # [KEPT] Approval, diff, history
│       └── ...
├── assets/                       # [MODIFIED] Gemini-Cline branding
├── package.json                  # [MODIFIED] Dependencies & commands
├── tsconfig.json                 # [KEPT]
└── esbuild.mjs                   # [KEPT]
```

---

## Open Questions

> [!IMPORTANT]
> **Q1: Tool Approval Strategy** — Should we start with Option A (auto-approve + post-hoc intercept) for the alpha release, or invest immediately in Option B (CLI fork with interactive protocol)? Option A is faster to build but has a worse UX for destructive actions since the CLI has already executed by the time we show the approval dialog.

> [!IMPORTANT]
> **Q2: Dual-Process vs. Single-Process** — Should planning and coding modes run as separate CLI processes (better context isolation but 2× memory) or a single process with `--model` flag switching (shared context, more efficient)?

> [!WARNING]
> **Q3: Cline License Compliance** — Cline is Apache 2.0 licensed. We should retain all copyright notices and clearly attribute the fork. Should we also upstream any improvements back to the Cline repo?

> [!IMPORTANT]
> **Q4: Gemini CLI Version Pinning** — The JSONL output format may change between CLI versions. Should we pin to a specific version (e.g., ≥0.40.0) and validate on extension activation, or should we be version-agnostic?

---

## Phased Delivery Timeline

| Phase | Deliverable | Estimated Effort |
|-------|------------|-----------------|
| **Phase 1** | Project scaffold, deps, branding | 1 day |
| **Phase 2** | CLI Bridge (spawn, parse, events) | 2-3 days |
| **Phase 3** | Dual-Model Router | 1-2 days |
| **Phase 4** | Tool Approval Interceptor (Option A) | 2 days |
| **Phase 5** | Webview UI adaptation | 2-3 days |
| **Phase 6** | Auth & Quota | 1-2 days |
| **Phase 7** | File Sync & Integration | 1 day |
| **Testing & Polish** | E2E testing, docs, marketplace prep | 2-3 days |
| **Total** | **Alpha Release** | **~12-17 days** |

---

## Verification Plan

### Automated Tests
- **Unit tests**: GeminiCliBridge JSON parsing, DualModelRouter mode switching, QuotaTracker arithmetic
- **Integration tests**: Spawn real Gemini CLI in headless mode, verify event stream parsing
- **E2E tests**: VS Code extension host tests — activate extension, send prompt, verify webview response

### Manual Verification
1. Install globally: `gemini` CLI verified working with OAuth
2. Open VS Code, activate extension from sidebar
3. Send prompt in planning mode → verify model routing
4. Switch to coding mode → verify model changes
5. Trigger file write → verify approval dialog appears
6. Check status bar quota counter
7. Test OAuth re-authentication flow
8. Test error recovery after CLI crash

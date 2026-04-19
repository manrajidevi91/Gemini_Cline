import { useState, useEffect } from "react"

// @ts-ignore
const vscode = window.acquireVsCodeApi ? window.acquireVsCodeApi() : { postMessage: () => {} };

const App = () => {
  const [messages, setMessages] = useState<{role: string, content: string}[]>([])
  const [input, setInput] = useState("")

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const message = event.data;
      switch (message.type) {
        case 'partialMessage':
          setMessages(prev => {
            const last = prev[prev.length - 1];
            if (last && last.role === 'assistant') {
              return [...prev.slice(0, -1), { ...last, content: last.content + message.text }];
            } else {
              return [...prev, { role: 'assistant', content: message.text }];
            }
          });
          break;
        case 'say':
          setMessages(prev => [...prev, { role: 'system', content: `[${message.sayType}] ${message.text}` }]);
          break;
        case 'ask':
          setMessages(prev => [...prev, { role: 'system', content: `QUESTION: ${message.text}` }]);
          break;
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const sendMessage = () => {
    if (!input.trim()) return
    setMessages(prev => [...prev, { role: "user", content: input }])
    vscode.postMessage({ type: "newTask", text: input })
    setInput("")
  }

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh', 
      boxSizing: 'border-box',
      padding: '10px',
      fontFamily: 'var(--vscode-font-family)',
      fontSize: 'var(--vscode-font-size)',
      backgroundColor: 'transparent'
    }}>
      <div style={{ 
        flex: 1, 
        overflowY: 'auto', 
        marginBottom: '10px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ 
            padding: '10px', 
            borderRadius: '6px', 
            backgroundColor: msg.role === 'user' ? 'var(--vscode-button-secondaryBackground)' : 'var(--vscode-editor-background)',
            border: '1px solid var(--vscode-widget-border)',
            alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
            maxWidth: '85%'
          }}>
             <div style={{ fontWeight: 'bold', fontSize: '0.8em', marginBottom: '4px', opacity: 0.7 }}>
               {msg.role.toUpperCase()}
             </div>
             <div>{msg.content}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <textarea 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          placeholder="Ask Gemini anything..."
          style={{ 
            flex: 1, 
            padding: '8px', 
            borderRadius: '4px',
            backgroundColor: 'var(--vscode-input-background)',
            color: 'var(--vscode-input-foreground)',
            border: '1px solid var(--vscode-input-border)',
            resize: 'none',
            outline: 'none'
          }}
          rows={2}
        />
        <button 
          onClick={sendMessage}
          style={{
            padding: '8px 16px',
            backgroundColor: 'var(--vscode-button-background)',
            color: 'var(--vscode-button-foreground)',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default App
```

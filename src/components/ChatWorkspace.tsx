import React, { useState } from 'react';
import { sendChatMessage, ChatResponse, LanguageType, SessionMode } from '../services/api';
import { EscalationCard } from './EscalationCard';
import { EvidenceDrawer } from './EvidenceDrawer';
import { TraceDrawer } from './TraceDrawer';

// ChatWorkspace: Pre-Care & Post-Care chat + visible mode banner

interface Props {
  session: {
    sessionId: string;
    email: string;
    language: LanguageType;
    mode: SessionMode;
    treatmentName?: string;
    isPatient?: boolean;
  };
  onReset: () => void;
}

interface MessageItem {
  id: string;
  sender: 'user' | 'bot';
  text: string;
}

export const ChatWorkspace: React.FC<Props> = ({ session, onReset }) => {
  const [messages, setMessages] = useState<MessageItem[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: `Hello! I am Sakhi. I see you are preparing for / recovering from ${session.treatmentName || 'your treatment'}. How can I support you right now?`
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [lastResponse, setLastResponse] = useState<ChatResponse | null>(null);
  const [showEvidence, setShowEvidence] = useState(false);
  const [showTrace, setShowTrace] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input;
    setInput('');
    setMessages(prev => [...prev, { id: `u-${Date.now()}`, sender: 'user', text: userText }]);
    setLoading(true);

    try {
      const response = await sendChatMessage({
        session_id: session.sessionId,
        user_email: session.email,
        message: userText,
        language: session.language,
        mode: session.mode,
        treatment_name: session.treatmentName,
        is_patient: session.isPatient
      });

      setLastResponse(response);
      setMessages(prev => [...prev, { id: `b-${Date.now()}`, sender: 'bot', text: response.reply }]);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Please check backend server';
      setMessages(prev => [...prev, {
        id: `err-${Date.now()}`,
        sender: 'bot',
        text: `Error connecting to care companion: ${errorMessage}`
      }]);
    } finally {
      setLoading(false);
    }
  };

  const isPostCare = session.mode === 'post_care';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Mode Banner */}
      <div style={{
        padding: '12px 16px',
        borderRadius: '8px',
        background: isPostCare ? '#fef3c7' : '#e0e7ff',
        border: isPostCare ? '1px solid #fde68a' : '1px solid #c7d2fe',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <strong style={{ textTransform: 'uppercase', fontSize: '12px', color: isPostCare ? '#b45309' : '#3730a3' }}>
            Active Mode: {session.mode.replace('_', ' ')}
          </strong>
          <span style={{ fontSize: '13px', marginLeft: '12px', color: '#475569' }}>
            Patient: {session.email} | Procedure: {session.treatmentName} | Language: {session.language}
          </span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setShowEvidence(true)}
            style={{ padding: '4px 10px', fontSize: '12px', borderRadius: '4px', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer' }}
          >
            Evidence ({lastResponse?.sources.length || 0})
          </button>
          <button
            onClick={() => setShowTrace(true)}
            style={{ padding: '4px 10px', fontSize: '12px', borderRadius: '4px', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer' }}
          >
            Trace Log
          </button>
          <button
            onClick={onReset}
            style={{ padding: '4px 10px', fontSize: '12px', borderRadius: '4px', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer' }}
          >
            End Session
          </button>
        </div>
      </div>

      {/* Escalation Card if triggered */}
      {lastResponse && lastResponse.escalation_status !== 'NONE' && (
        <EscalationCard
          status={lastResponse.escalation_status}
          message={lastResponse.reply}
        />
      )}

      {/* Messages Scroll Area */}
      <div style={{
        background: '#fff',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        padding: '20px',
        minHeight: '380px',
        maxHeight: '500px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
        {messages.map(m => (
          <div
            key={m.id}
            style={{
              alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '75%',
              background: m.sender === 'user' ? '#2563eb' : '#f1f5f9',
              color: m.sender === 'user' ? '#fff' : '#0f172a',
              padding: '12px 16px',
              borderRadius: '12px',
              fontSize: '14px',
              lineHeight: '1.5',
              whiteSpace: 'pre-wrap'
            }}
          >
            {m.text}
          </div>
        ))}
        {loading && (
          <div style={{ alignSelf: 'flex-start', color: '#64748b', fontSize: '13px', fontStyle: 'italic' }}>
            Sakhi is reflecting with clinical guardrails...
          </div>
        )}
      </div>

      {/* Chat Input */}
      <form onSubmit={handleSend} style={{ display: 'flex', gap: '8px' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question about your care or symptoms..."
          style={{ flex: 1, padding: '12px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{ padding: '12px 24px', borderRadius: '8px', background: '#2563eb', color: '#fff', border: 'none', fontWeight: 600, cursor: 'pointer' }}
        >
          Send
        </button>
      </form>

      {/* Side Drawers */}
      {showEvidence && (
        <EvidenceDrawer
          sources={lastResponse?.sources || []}
          knowledgeGap={lastResponse?.knowledge_gap || false}
          onClose={() => setShowEvidence(false)}
        />
      )}

      {showTrace && (
        <TraceDrawer
          trace={lastResponse?.trace}
          onClose={() => setShowTrace(false)}
        />
      )}
    </div>
  );
};

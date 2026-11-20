import React, { useState } from 'react';
import { OnboardingView } from './components/OnboardingView';
import { IntakeCard } from './components/IntakeCard';
import { ChatWorkspace } from './components/ChatWorkspace';
import { ClinicianInboxView } from './components/ClinicianInboxView';
import { LanguageType, SessionMode } from './services/api';

export default function App() {
  const [session, setSession] = useState<{
    sessionId: string;
    email: string;
    language: LanguageType;
    mode: SessionMode;
    treatmentName?: string;
    isPatient?: boolean;
    stage: 'onboarding' | 'intake' | 'chat' | 'clinician';
  }>({
    sessionId: `sess-${Date.now()}`,
    email: '',
    language: 'en',
    mode: 'pre_care',
    stage: 'onboarding'
  });

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', minHeight: '100vh', background: '#f8fafc', color: '#1e293b' }}>
      <header style={{ padding: '16px 24px', background: '#ffffff', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: '#0f172a' }}>Sakhi (సఖి)</h1>
          <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>AI Care Companion & Clinical Safety Router</p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setSession(s => ({ ...s, stage: s.stage === 'clinician' ? 'chat' : 'clinician' }))}
            style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#f1f5f9', cursor: 'pointer', fontSize: '13px' }}
          >
            {session.stage === 'clinician' ? 'Back to Patient View' : 'Clinician Inbox View'}
          </button>
        </div>
      </header>

      <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '24px 16px' }}>
        {session.stage === 'onboarding' && (
          <OnboardingView
            onComplete={(email, language, mode) => {
              setSession(s => ({ ...s, email, language, mode, stage: 'intake' }));
            }}
          />
        )}

        {session.stage === 'intake' && (
          <IntakeCard
            mode={session.mode}
            onComplete={(isPatient, treatmentName) => {
              setSession(s => ({ ...s, isPatient, treatmentName, stage: 'chat' }));
            }}
          />
        )}

        {session.stage === 'chat' && (
          <ChatWorkspace
            session={session}
            onReset={() => setSession(s => ({ ...s, stage: 'onboarding' }))}
          />
        )}

        {session.stage === 'clinician' && (
          <ClinicianInboxView />
        )}
      </main>
    </div>
  );
}

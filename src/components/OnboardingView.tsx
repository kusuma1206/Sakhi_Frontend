import React, { useState } from 'react';
import { LanguageType, SessionMode } from '../services/api';

// OnboardingView: Email login, language (English/Telugu/Tinglish), mode choice

interface Props {
  onComplete: (email: string, language: LanguageType, mode: SessionMode) => void;
}

export const OnboardingView: React.FC<Props> = ({ onComplete }) => {
  const [email, setEmail] = useState('');
  const [language, setLanguage] = useState<LanguageType>('en');
  const [mode, setMode] = useState<SessionMode>('pre_care');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(email, language, mode);
  };

  return (
    <div style={{ maxWidth: '480px', margin: '40px auto', background: '#fff', padding: '32px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
      <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>Welcome to Sakhi</h2>
      <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px' }}>Your empathetic companion through pre-treatment preparation and post-care recovery.</p>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Patient Email / Identifier</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="patient@example.com"
            required
            style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as LanguageType)}
            style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px' }}
          >
            <option value="en">English</option>
            <option value="te">తెలుగు (Telugu)</option>
            <option value="tinglish">Tinglish (Telugu in English Script)</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Care Phase / Mode</label>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value as SessionMode)}
            style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px' }}
          >
            <option value="pre_care">Pre-Care (Preparation & Fasting/Doc Guidance)</option>
            <option value="post_care">Post-Care (Recovery & Triage Monitoring)</option>
          </select>
        </div>

        <button
          type="submit"
          style={{ marginTop: '12px', padding: '12px', borderRadius: '6px', background: '#2563eb', color: '#fff', border: 'none', fontWeight: 600, cursor: 'pointer' }}
        >
          Continue to Care Intake
        </button>
      </form>
    </div>
  );
};

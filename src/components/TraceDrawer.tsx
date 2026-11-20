import React from 'react';
import { TraceInfo } from '../services/api';

// TraceDrawer: Masked input, route, red-flag status & guardrail trace

interface Props {
  trace?: TraceInfo;
  onClose: () => void;
}

export const TraceDrawer: React.FC<Props> = ({ trace, onClose }) => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      width: '400px',
      height: '100vh',
      background: '#fff',
      boxShadow: '-4px 0 16px rgba(0,0,0,0.1)',
      padding: '24px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 1000
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' }}>
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700 }}>Audit & Safety Trace</h3>
        <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer' }}>×</button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', marginTop: '16px', fontSize: '13px' }}>
        {!trace ? (
          <p style={{ color: '#64748b' }}>No trace details available for the latest message.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <strong style={{ display: 'block', color: '#64748b', fontSize: '12px' }}>PII-MASKED INPUT:</strong>
              <div style={{ background: '#f1f5f9', padding: '8px 12px', borderRadius: '6px', marginTop: '4px', wordBreak: 'break-word' }}>
                {trace.masked_input}
              </div>
            </div>

            <div>
              <strong style={{ display: 'block', color: '#64748b', fontSize: '12px' }}>RESOLVED ROUTE / MODE:</strong>
              <span style={{ display: 'inline-block', marginTop: '4px', fontWeight: 600, color: '#2563eb' }}>
                {trace.route}
              </span>
            </div>

            <div>
              <strong style={{ display: 'block', color: '#64748b', fontSize: '12px' }}>RED-FLAG DETECTED:</strong>
              <span style={{ display: 'inline-block', marginTop: '4px', fontWeight: 600, color: trace.red_flag_detected ? '#dc2626' : '#16a34a' }}>
                {trace.red_flag_detected ? 'YES - ESCALATION TRIGGERED' : 'NO - NORMAL FLOW'}
              </span>
            </div>

            <div>
              <strong style={{ display: 'block', color: '#64748b', fontSize: '12px' }}>GUARDRAIL APPLIED:</strong>
              <span style={{ display: 'inline-block', marginTop: '4px', fontWeight: 600, color: trace.guardrail_applied ? '#d97706' : '#16a34a' }}>
                {trace.guardrail_applied ? 'YES (Sanitization / Disclaimer Attached)' : 'NO (Compliant Output)'}
              </span>
            </div>

            <div>
              <strong style={{ display: 'block', color: '#64748b', fontSize: '12px' }}>ESCALATION STATE:</strong>
              <span style={{ display: 'inline-block', marginTop: '4px', fontWeight: 600 }}>
                {trace.escalation_status}
              </span>
            </div>

            {trace.latency_ms && (
              <div>
                <strong style={{ display: 'block', color: '#64748b', fontSize: '12px' }}>ORCHESTRATION LATENCY:</strong>
                <span style={{ display: 'inline-block', marginTop: '4px' }}>
                  {trace.latency_ms} ms
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

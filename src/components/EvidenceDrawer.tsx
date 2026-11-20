import React from 'react';
import { EvidenceSource } from '../services/api';

// EvidenceDrawer: Sources, knowledge-gap abstention & limitations

interface Props {
  sources: EvidenceSource[];
  knowledgeGap: boolean;
  onClose: () => void;
}

export const EvidenceDrawer: React.FC<Props> = ({ sources, knowledgeGap, onClose }) => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      width: '380px',
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
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700 }}>Grounding Evidence</h3>
        <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer' }}>×</button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', marginTop: '16px' }}>
        {knowledgeGap && (
          <div style={{ background: '#fef3c7', border: '1px solid #fde68a', borderRadius: '6px', padding: '12px', marginBottom: '16px', fontSize: '13px', color: '#92400e' }}>
            <strong>Knowledge Gap Flagged:</strong> The assistant refrained from speculative advice due to insufficient verified medical guidelines for this exact query.
          </div>
        )}

        {sources.length === 0 ? (
          <p style={{ color: '#64748b', fontSize: '14px' }}>No specific retrieval chunks attached to the latest turn.</p>
        ) : (
          sources.map((src, i) => (
            <div key={i} style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px', marginBottom: '12px', background: '#f8fafc' }}>
              <span style={{ fontSize: '11px', color: '#2563eb', fontWeight: 700, textTransform: 'uppercase' }}>{src.source_id}</span>
              <h4 style={{ margin: '4px 0 6px', fontSize: '14px', fontWeight: 600 }}>{src.title}</h4>
              <p style={{ margin: 0, fontSize: '13px', color: '#475569', lineHeight: '1.4' }}>{src.snippet}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

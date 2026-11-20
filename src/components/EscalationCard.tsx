import React from 'react';
import { EscalationStatus } from '../services/api';

// EscalationCard: Warning guidance + CREATED / DELIVERED / ACKNOWLEDGED status

interface Props {
  status: EscalationStatus;
  message: string;
}

export const EscalationCard: React.FC<Props> = ({ status, message }) => {
  const getBadgeStyle = () => {
    switch (status) {
      case 'ACKNOWLEDGED':
        return { background: '#dcfce7', color: '#15803d', border: '1px solid #86efac' };
      case 'DELIVERED':
        return { background: '#fef3c7', color: '#b45309', border: '1px solid #fde68a' };
      case 'CREATED':
      default:
        return { background: '#fee2e2', color: '#b91c1c', border: '1px solid #fca5a5' };
    }
  };

  return (
    <div style={{
      background: '#fff1f2',
      border: '1px solid #fecdd3',
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '8px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <h3 style={{ margin: 0, fontSize: '15px', color: '#be123c', fontWeight: 700 }}>
          ⚠️ Critical Clinical Alert & Escalation
        </h3>
        <span style={{
          fontSize: '11px',
          fontWeight: 700,
          padding: '2px 8px',
          borderRadius: '4px',
          ...getBadgeStyle()
        }}>
          STATUS: {status}
        </span>
      </div>
      <p style={{ margin: 0, fontSize: '13px', color: '#4c0519', lineHeight: '1.4' }}>
        {message}
      </p>
      <div style={{ marginTop: '8px', fontSize: '12px', color: '#9f1239' }}>
        <em>Synthetic Emergency Bridge: Clinic triage desk notified. Immediate patient care takes precedence.</em>
      </div>
    </div>
  );
};

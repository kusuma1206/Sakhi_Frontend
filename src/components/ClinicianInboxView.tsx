import React, { useState } from 'react';
import { EscalationStatus } from '../services/api';

// ClinicianInboxView: Minimal synthetic clinician review & acknowledge view

interface TriageTicket {
  id: string;
  patientEmail: string;
  symptom: string;
  time: string;
  status: EscalationStatus;
}

export const ClinicianInboxView: React.FC = () => {
  const [tickets, setTickets] = useState<TriageTicket[]>([
    {
      id: 'TCK-101',
      patientEmail: 'patient.redacted@demo.com',
      symptom: 'Post-op persistent fever with chills and wound redness',
      time: '10:25 AM',
      status: 'DELIVERED'
    },
    {
      id: 'TCK-102',
      patientEmail: 'caregiver.masked@demo.com',
      symptom: 'Chest tightness noted during pre-care prep',
      time: '10:32 AM',
      status: 'CREATED'
    }
  ]);

  const handleAcknowledge = (id: string) => {
    setTickets(prev => prev.map(t => t.id === id ? { ...t, status: 'ACKNOWLEDGED' } : t));
  };

  return (
    <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '24px' }}>
      <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '6px' }}>Synthetic Clinician Escalation Queue</h2>
      <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '20px' }}>
        Live view of escalations flagged by Sakhi deterministic red-flag rules.
      </p>

      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
        <thead>
          <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', textAlign: 'left' }}>
            <th style={{ padding: '10px' }}>Ticket ID</th>
            <th style={{ padding: '10px' }}>Patient</th>
            <th style={{ padding: '10px' }}>Trigger / Symptom</th>
            <th style={{ padding: '10px' }}>Time</th>
            <th style={{ padding: '10px' }}>Status</th>
            <th style={{ padding: '10px' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map(t => (
            <tr key={t.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
              <td style={{ padding: '12px 10px', fontWeight: 600 }}>{t.id}</td>
              <td style={{ padding: '12px 10px', color: '#64748b' }}>{t.patientEmail}</td>
              <td style={{ padding: '12px 10px' }}>{t.symptom}</td>
              <td style={{ padding: '12px 10px', color: '#64748b' }}>{t.time}</td>
              <td style={{ padding: '12px 10px' }}>
                <span style={{
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontSize: '11px',
                  fontWeight: 700,
                  background: t.status === 'ACKNOWLEDGED' ? '#dcfce7' : '#fee2e2',
                  color: t.status === 'ACKNOWLEDGED' ? '#15803d' : '#b91c1c'
                }}>
                  {t.status}
                </span>
              </td>
              <td style={{ padding: '12px 10px' }}>
                {t.status !== 'ACKNOWLEDGED' ? (
                  <button
                    onClick={() => handleAcknowledge(t.id)}
                    style={{ padding: '4px 10px', borderRadius: '4px', background: '#2563eb', color: '#fff', border: 'none', cursor: 'pointer' }}
                  >
                    Acknowledge
                  </button>
                ) : (
                  <span style={{ color: '#15803d', fontWeight: 600 }}>Reviewed</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

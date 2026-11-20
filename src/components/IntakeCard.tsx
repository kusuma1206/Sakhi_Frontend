import React, { useState } from 'react';
import { SessionMode } from '../services/api';

// IntakeCard: Turn-1 2-question check (is_patient + treatment_name)

interface Props {
  mode: SessionMode;
  onComplete: (isPatient: boolean, treatmentName: string) => void;
}

export const IntakeCard: React.FC<Props> = ({ mode, onComplete }) => {
  const [isPatient, setIsPatient] = useState(true);
  const [treatmentName, setTreatmentName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(isPatient, treatmentName.trim() || 'General Consultation');
  };

  return (
    <div style={{ maxWidth: '480px', margin: '40px auto', background: '#fff', padding: '32px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
      <span style={{ fontSize: '12px', fontWeight: 700, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        Step 2: Care Intake ({mode.replace('_', ' ')})
      </span>
      <h2 style={{ fontSize: '20px', fontWeight: 600, margin: '8px 0 16px' }}>Help Us Personalize Your Experience</h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
            Are you the patient or a caregiver?
          </label>
          <div style={{ display: 'flex', gap: '16px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', cursor: 'pointer' }}>
              <input
                type="radio"
                name="is_patient"
                checked={isPatient}
                onChange={() => setIsPatient(true)}
              />
              I am the patient
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', cursor: 'pointer' }}>
              <input
                type="radio"
                name="is_patient"
                checked={!isPatient}
                onChange={() => setIsPatient(false)}
              />
              Caregiver / Family member
            </label>
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
            What is the treatment or procedure name?
          </label>
          <input
            type="text"
            value={treatmentName}
            onChange={(e) => setTreatmentName(e.target.value)}
            placeholder="e.g. Endoscopy, Laparoscopy, General Surgery"
            style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }}
          />
        </div>

        <button
          type="submit"
          style={{ marginTop: '12px', padding: '12px', borderRadius: '6px', background: '#2563eb', color: '#fff', border: 'none', fontWeight: 600, cursor: 'pointer' }}
        >
          Enter Companion Chat
        </button>
      </form>
    </div>
  );
};

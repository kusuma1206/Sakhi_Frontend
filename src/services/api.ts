// Services - Centralized API calls for Sakhi

export type LanguageType = 'en' | 'te' | 'tinglish';
export type SessionMode = 'pre_care' | 'post_care';
export type EscalationStatus = 'NONE' | 'CREATED' | 'DELIVERED' | 'ACKNOWLEDGED' | 'CLINIC_UNAVAILABLE';

export interface EvidenceSource {
  source_id: string;
  title: string;
  snippet: string;
}

export interface TraceInfo {
  masked_input: string;
  route: SessionMode;
  red_flag_detected: boolean;
  guardrail_applied: boolean;
  escalation_status: EscalationStatus;
  latency_ms?: number;
}

export interface ChatRequest {
  session_id: string;
  user_email?: string;
  message: string;
  language: LanguageType;
  mode: SessionMode;
  treatment_name?: string;
  is_patient?: boolean;
}

export interface ChatResponse {
  reply: string;
  mode: SessionMode;
  language: LanguageType;
  escalation_status: EscalationStatus;
  sources: EvidenceSource[];
  knowledge_gap: boolean;
  trace?: TraceInfo;
}

export interface HealthResponse {
  status: string;
  version: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export async function checkHealth(): Promise<HealthResponse> {
  const res = await fetch(`${API_BASE_URL}/health`);
  if (!res.ok) {
    throw new Error(`Health check failed with status ${res.status}`);
  }
  return res.json();
}

export async function sendChatMessage(req: ChatRequest): Promise<ChatResponse> {
  const res = await fetch(`${API_BASE_URL}/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(req)
  });

  if (!res.ok) {
    throw new Error(`Chat API error: ${res.statusText}`);
  }

  return res.json();
}

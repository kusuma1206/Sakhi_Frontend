# Sakhi Frontend (`sakhi-frontend`)

Patient and clinician frontend for Sakhi AI Care Companion, supporting Pre-Care / Post-Care guidance, multilingual chat, deterministic escalation cards, evidence grounding drawer, and synthetic clinician inbox.

## Primary Owners
* **Sudheer**: UI / UX Components, Workspaces, Responsive Design
* **Abhi**: Deployment, Environment Configuration (`VITE_API_BASE_URL`), CORS wiring

---

## API Contract

All backend API requests are directed to `VITE_API_BASE_URL` (`services/api.ts`).

### 1. `GET /health`
```json
{
  "status": "ok",
  "version": "0.1.0"
}
```

### 2. `POST /chat`
**Request Payload:**
```json
{
  "session_id": "string",
  "user_email": "string | null",
  "message": "string",
  "language": "en | te | tinglish",
  "mode": "pre_care | post_care",
  "treatment_name": "string | null",
  "is_patient": true
}
```

**Response Payload:**
```json
{
  "reply": "string",
  "mode": "pre_care | post_care",
  "language": "en | te | tinglish",
  "escalation_status": "NONE | CREATED | DELIVERED | ACKNOWLEDGED | CLINIC_UNAVAILABLE",
  "sources": [
    {
      "source_id": "string",
      "title": "string",
      "snippet": "string"
    }
  ],
  "knowledge_gap": false,
  "trace": {
    "masked_input": "string",
    "route": "pre_care | post_care",
    "red_flag_detected": false,
    "guardrail_applied": false,
    "escalation_status": "NONE",
    "latency_ms": 120.0
  }
}
```

---

## Getting Started
```bash
npm install
cp .env.example .env
npm run dev
```

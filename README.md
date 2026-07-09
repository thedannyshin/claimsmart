# ClaimSmart — FailSafe Insurance

Design prototype for the ClaimSmart AI Assistant MVP deliverables.

## Deliverables

| Screen | Route |
|--------|-------|
| Product landing page | `/` |
| Authentication gate (SSO) | `/login` |
| Chat UI (desktop + mobile) | `/assistant` |
| FNOL initiation flow (3 steps) | `/assistant/fnol` |

### Components

- **Disclaimer** — persistent banner + inline variants on every AI response
- **ConfidenceScore** — percentage display beneath assistant messages
- **ChatBubble / ChatInput** — conversational interface with suggested prompts

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). Use **Continue as Sarah Mitchell (demo)** on the login screen to access the assistant.

## Flow

1. Landing page → Get started
2. SSO login gate (required before first interaction)
3. Chat assistant with disclaimer banner, confidence scores, and mock responses
4. File a claim → 3-step FNOL flow → confirmation

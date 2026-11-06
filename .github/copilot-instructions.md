# TTV Maastricht – Copilot instructions
- This is a Nuxt 3 static site deployed to Azure Static Web Apps Free. Keep all public pages prerenderable.
- Every user-facing change must support Dutch (`/`) and English (`/en`) and keep language parity.
- Membership fees and training hours must match the 2026–2027 club documents; do not invent schedules or fees.
- The privacy policy is sourced from `data/privacy-nl.json` and `data/privacy-en.json`. Never silently rewrite legal text. Ask for approval before changing privacy policy.
- Registration data is personal data. Never log request bodies, commit secrets, or send personal data to analytics. Validate server-side and protect the endpoint from abuse.
- `api/src/functions/register.js` sends the JSON attachment via Azure Communication Services; do not expose ACS credentials to client code.
- For minors, require guardian identity and explicit consent. Newsletter and photo permissions are separate optional checkboxes.
- Before merging: verify `npm run generate`, review both locales, verify form and API contract.

# AI Agent Instructions for MediTech Patient Dashboard Portal

## Purpose
This file guides AI coding agents (e.g., Copilot, Cursor, Claude) to work productively in this codebase.

## Key Conventions
- Use React functional components and hooks
- All API calls go through `src/services/api.js` (Axios)
- Email/OTP logic is in `src/services/emailService.js`
- Protected API endpoints require `x-api-secretkey` header (see `.env`)
- OTP flows differ for registration and login (see respective components)
- Use modular CSS for component styles

## Agent Tasks
- When adding new protected APIs, update `.env` (`REACT_APP_API_SECRET_APIS`)
- For new features, create a folder/component in `src/components/`
- For UI changes, update CSS in the relevant component or shared file
- For new email templates, add to `emailService.js`
- Always check `.env` for secrets and endpoint config

## Example: Add Protected API
1. Add endpoint to `REACT_APP_API_SECRET_APIS` in `.env`
2. Use `api.post/get/...` in `api.js` — header will be injected automatically

## Example: Add OTP Flow
- Use `sendOtpEmail` for email logic
- Use `OtpValidation` or `LoginOtpValidation` for modal UI

## References
- `README.md` for project overview
- `src/services/api.js` for API logic
- `src/services/emailService.js` for email/OTP logic

---
For further conventions, see `.github/copilot-instructions.md` if present.

# Copilot Instructions for MediTech Patient Dashboard Portal

## Project Overview
- React SPA for patient healthcare management
- Modular feature-based components (auth, dashboard, layout, common)
- API and email logic in `src/services/`
- Protected API endpoints require `x-api-secretkey` header (see `.env`)
- OTP flows differ for registration and login

## Key Conventions
- Use React functional components and hooks
- All API calls via `src/services/api.js` (Axios)
- Email/OTP logic in `src/services/emailService.js`
- Modular CSS for component styles
- Use `.env` for secrets and endpoint config

## Developer Workflows
- Add new protected APIs to `.env` (`REACT_APP_API_SECRET_APIS`)
- For new features, create a folder/component in `src/components/`
- For UI changes, update CSS in the relevant component or shared file
- For new email templates, add to `emailService.js`

## Examples
- **Add Protected API:**
  1. Add endpoint to `.env`
  2. Use `api.post/get/...` in `api.js` — header will be injected automatically
- **Add OTP Flow:**
  - Use `sendOtpEmail` for email logic
  - Use `OtpValidation` or `LoginOtpValidation` for modal UI

## References
- `README.md` for project overview
- `src/services/api.js` for API logic
- `src/services/emailService.js` for email/OTP logic
- `.env` for secrets and endpoint config

---
For further conventions, see `AGENT.md` and `README.md`.

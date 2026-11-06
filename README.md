# TTV Maastricht v2 – NL/EN concept

Nuxt 3 static website with Dutch and English routes, club information, registration form and privacy statement based on supplied 2026–2027 DOCX documents.

## Run
`npm install` then `npm run dev`. Build static output: `npm run generate` -> `.output/public`. Deploy Azure Static Web Apps with `app_location: /`, `output_location: .output/public`, `api_location: api`.

## Routes
- `/`, `/inschrijven`, `/privacy`
- `/en`, `/en/register`, `/en/privacy`

## Backend
The Azure Function at `api/src/functions/register.js` sends a JSON attachment to the secretary using Azure Communication Services Email. Configure `ACS_CONNECTION_STRING`, `ACS_SENDER`, `REGISTRATION_RECIPIENT` in Azure application settings. The email is NOT operational until these settings and the email sender domain are configured. Do not place credentials in Nuxt public config.

## Privacy / production checklist
- Review legal wording in both policies with the board/privacy adviser; source documents contain claims about cookies and retention that may not match the new website or current law.
- Review the optional gender/nationality fields for data minimisation; the original paper forms include them.
- Confirm parental authorization workflow (checkbox alone does not prove identity), email retention and mailbox access; email attachments contain personal data.
- Add robust anti-abuse measures (CAPTCHA/Turnstile or equivalent and throttling) before public launch; honeypot alone is insufficient.
- Confirm Friday evening schedule: listed only in English source document; not published in this concept.
- Consider separate privacy notice for online registration and email processing, and version/time stamp retention.
- Review and test delivery failures, accessibility, translated content, and static deployment.

## Copilot
See `.github/copilot-instructions.md`. Example: `Update both Dutch and English membership fee descriptions for the new season, without changing privacy policy or registration API; create a PR and show the diff.`


## V3 visuele update (november 2026)
- De door de vereniging aangeleverde foto van de vernieuwde zaal is opgenomen als geoptimaliseerde WebP (`public/images/vernieuwde-sportzaal.webp`).
- Homepage NL/EN opnieuw vormgegeven met fotohero, trainingsoverzicht, tarieven, locatie en proeftraining.
- Vrijdag verwijderd uit alle gepubliceerde trainingsoverzichten; woensdag 19:00–20:30 beginnerstraining toegevoegd op basis van de nieuwste verenigingsinformatie.
- Controleer de woensdagtraining vóór publicatie nog op eventuele incidentele wijzigingen.
- Geen nieuwe externe trackers of databases toegevoegd. Het bestaande formulier en de privacyverklaringen blijven ongewijzigd.


## V4: kleuren en originele zaalafbeelding

De website gebruikt een gedempt palet (saliegroen, diep groen, tafelblauw en warme neutralen). De foto in `public/images/vernieuwde-sportzaal-origineel.jpg` is een ongewijzigde kopie van het aangeleverde JPEG-bestand. De homepage toont deze zonder filter, gradient-overlay of bewerkte afbeeldingsvariant. De weergave gebruikt `background-size: contain` en `object-fit: contain`, zodat er geen uitsnede nodig is.

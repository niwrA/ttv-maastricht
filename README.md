# TTV Maastricht v2 – NL/EN concept

Nuxt 3 static website with Dutch and English routes, club information, registration form and privacy statement based on supplied 2026–2027 DOCX documents.

## Run
`npm install` then `npm run dev`. Build static output: `npm run generate` -> `.output/public`. Deploy Azure Static Web Apps with `app_location: /` and `output_location: .output/public`.

## Routes
- `/`, `/inschrijven`, `/privacy`
- `/en`, `/en/register`, `/en/privacy`

## Membership application email
The form opens a new email draft addressed to the secretary. It puts the application in the message body as a clearly labeled, plain-text list of fields, which is easy to review, copy into a spreadsheet, or process with an AI assistant. The applicant can also print or save a copy as a PDF from the browser. The site does not send or store the application. The applicant must review the draft and click Send; if no email app opens, the page shows the details for manual copying. Set up a default email handler on the device before relying on the mail link.

## Privacy / production checklist
- Review legal wording in both policies with the board/privacy adviser; source documents contain claims about cookies and retention that may not match the new website or current law.
- Review the optional gender/nationality fields for data minimisation; the original paper forms include them.
- Confirm parental authorization workflow (checkbox alone does not prove identity), email retention and mailbox access; application emails contain personal data.
- Confirm Friday evening schedule: listed only in English source document; not published in this concept.
- Consider separate privacy notice for online registration and email processing, and version/time stamp retention.
- Verify the email-app handoff on desktop and mobile, plus accessibility, translated content, and static deployment.

## Copilot
See `.github/copilot-instructions.md`. Example: `Update both Dutch and English membership fee descriptions for the new season, without changing the privacy policy; create a PR and show the diff.`


## V3 visuele update (november 2026)
- De door de vereniging aangeleverde foto van de vernieuwde zaal is opgenomen als geoptimaliseerde WebP (`public/images/vernieuwde-sportzaal.webp`).
- Homepage NL/EN opnieuw vormgegeven met fotohero, trainingsoverzicht, tarieven, locatie en proeftraining.
- Vrijdag verwijderd uit alle gepubliceerde trainingsoverzichten; woensdag 19:00–20:30 beginnerstraining toegevoegd op basis van de nieuwste verenigingsinformatie.
- Controleer de woensdagtraining vóór publicatie nog op eventuele incidentele wijzigingen.
- Geen nieuwe externe trackers of databases toegevoegd. Het bestaande formulier en de privacyverklaringen blijven ongewijzigd.


## V4: kleuren en originele zaalafbeelding

De website gebruikt een gedempt palet (saliegroen, diep groen, tafelblauw en warme neutralen). De foto in `public/images/vernieuwde-sportzaal-origineel.jpg` is een ongewijzigde kopie van het aangeleverde JPEG-bestand. De homepage toont deze zonder filter, gradient-overlay of bewerkte afbeeldingsvariant. De weergave gebruikt `background-size: contain` en `object-fit: contain`, zodat er geen uitsnede nodig is.

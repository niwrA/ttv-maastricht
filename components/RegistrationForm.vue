<script setup lang="ts">
const {en,t,path}=useSiteLocale()
useSeoMeta({title:computed(()=>t('Inschrijven | TTV Maastricht','Register | TTV Maastricht'))})
const form=reactive({firstName:'',initials:'',lastName:'',email:'',phone:'',birthDate:'',nationality:'',address:'',postalCode:'',city:'',gender:'',guardianName:'',guardianEmail:'',guardianConsent:false,membershipAgreement:false,privacyAcknowledged:false,photoConsent:false})
const state=ref('idle')
const errorMessage=ref('')
const emailBody=ref('')
const recipient='secretaristtvmaastricht@outlook.com'
const minor=computed(()=>{
  if(!form.birthDate)return false
  const d=new Date(form.birthDate),today=new Date()
  let age=today.getFullYear()-d.getFullYear()
  if(today.getMonth()<d.getMonth()||(today.getMonth()===d.getMonth()&&today.getDate()<d.getDate()))age--
  return age<18
})
function submit(){
  errorMessage.value=''
  const details=form
  const yes=en.value?'Yes':'Ja'
  const no=en.value?'No':'Nee'
  const notProvided=en.value?'Not provided':'Niet opgegeven'
  const gender=en.value?({male:'Male',female:'Female',other:'Other'}[details.gender]||notProvided):({male:'Man',female:'Vrouw',other:'Anders'}[details.gender]||notProvided)
  const lines=en.value?[
    'TTV Maastricht membership application',
    'I would like to apply for membership of TTV Maastricht. My details are:',
    `Received: ${new Date().toLocaleString('en-GB')}`,
    '',
    'APPLICANT',
    `Preferred name: ${details.firstName}`,
    `Initials: ${details.initials||notProvided}`,
    `Family name: ${details.lastName}`,
    `Gender: ${gender}`,
    `Date of birth: ${details.birthDate}`,
    `Nationality: ${details.nationality||notProvided}`,
    `Address: ${details.address}`,
    `Postal code: ${details.postalCode}`,
    `City: ${details.city}`,
    `Phone: ${details.phone}`,
    `Email: ${details.email}`,
    ...(minor.value?['','PARENT OR GUARDIAN',`Name: ${details.guardianName}`,`Email: ${details.guardianEmail}`]:[]),
    '',
    'CONFIRMATIONS',
    `Membership information read: ${details.membershipAgreement?yes:no}`,
    `Privacy policy read: ${details.privacyAcknowledged?yes:no}`,
    `Parent/guardian consent: ${minor.value?(details.guardianConsent?yes:no):'Not applicable'}`,
    `Photo publication consent: ${details.photoConsent?yes:no}`,
    'Privacy policy version: 2026-2027',
    'Membership terms version: 2026-2027',
  ]:[
    'Lidmaatschapsaanvraag TTV Maastricht',
    'Hierbij geef ik mij op als lid van TTV Maastricht. Mijn gegevens zijn:',
    `Ontvangen op: ${new Date().toLocaleString('nl-NL')}`,
    '',
    'AANVRAGER',
    `Roepnaam: ${details.firstName}`,
    `Voorletters: ${details.initials||notProvided}`,
    `Achternaam: ${details.lastName}`,
    `Geslacht: ${gender}`,
    `Geboortedatum: ${details.birthDate}`,
    `Nationaliteit: ${details.nationality||notProvided}`,
    `Adres: ${details.address}`,
    `Postcode: ${details.postalCode}`,
    `Woonplaats: ${details.city}`,
    `Telefoon: ${details.phone}`,
    `E-mailadres: ${details.email}`,
    ...(minor.value?['','OUDER OF VOOGD',`Naam: ${details.guardianName}`,`E-mailadres: ${details.guardianEmail}`]:[]),
    '',
    'BEVESTIGINGEN',
    `Lidmaatschapsinformatie gelezen: ${details.membershipAgreement?yes:no}`,
    `Privacyverklaring gelezen: ${details.privacyAcknowledged?yes:no}`,
    `Toestemming ouder/voogd: ${minor.value?(details.guardianConsent?yes:no):'Niet van toepassing'}`,
    `Toestemming publicatie beeldmateriaal: ${details.photoConsent?yes:no}`,
    'Versie privacyverklaring: 2026-2027',
    'Versie lidmaatschapsvoorwaarden: 2026-2027',
  ]
  emailBody.value=lines.join('\n')
  const subject=`${en.value?'Membership application':'Lidmaatschapsaanvraag'} TTV Maastricht - ${details.lastName}, ${details.firstName}`
  state.value='draft'
  window.location.href=`mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody.value)}`
}
async function copyDetails(){
  try{await navigator.clipboard.writeText(emailBody.value);errorMessage.value=''}
  catch{errorMessage.value=t('Kopieren is niet gelukt. Selecteer en kopieer het overzicht hieronder handmatig.','Copying failed. Select and copy the details below manually.')}
}
</script>

<template>
  <main class="registration-page"><div class="shell registration-layout">
    <div class="registration-intro">
      <div class="kicker">/ {{t('WORD LID','JOIN THE CLUB')}}</div>
      <h1>{{t('Welkom bij','Welcome to')}}<br><em>TTV Maastricht.</em></h1>
      <p>{{t('Kom gerust eerst een paar keer gratis proefspelen. Klaar om lid te worden? Vul dan dit formulier in.','You are welcome to try a few free sessions first. Ready to join? Complete this form.')}}</p>
      <div class="registration-note">
        <b>{{t('Contributie 2026–2027','Membership fees 2026–2027')}}</b>
        <p>{{t('Jeugd € 130 · Senioren € 175 · 65+ € 165 per jaar. Kwartaalbetaling mogelijk met € 2 toeslag per kwartaal.','Juniors € 130 · Adults € 175 · 65+ € 165 per year. Quarterly payment available with a € 2 fee per quarter.')}}</p>
        <p>{{t('Verenigingsjaar: 1 juli t/m 30 juni. Opzeggen schriftelijk minimaal één maand voor het einde van het verenigingsjaar.','Club year: 1 July to 30 June. Cancellation in writing at least one month before the end of the club year.')}}</p>
        <p>{{t('Na je aanvraag controleert de secretaris je gegevens en stuurt de contributiefactuur handmatig per e-mail. Je betaalt dus nog niet via deze site. Controleer de factuur en neem bij vragen of bezwaar contact op voordat je betaalt.','After you apply, the secretary will review your details and send the membership invoice manually by email. You will not pay on this website. Check the invoice and contact us with questions or concerns before paying.')}}</p>
      </div>
    </div>
    <div class="form-card">
      <div v-if="state==='draft'" class="success">
        <h2>{{t('Je e-mailconcept staat klaar','Your email draft is ready')}}</h2>
        <p>{{t('Controleer de gegevens in je e-mailprogramma en klik op Versturen. De aanvraag is pas ontvangen nadat je de e-mail hebt verstuurd. De secretaris controleert je gegevens en stuurt de contributiefactuur handmatig.','Review the details in your email app and click Send. Your application is received only after you send the email. The secretary will review your details and send the membership invoice manually.')}}</p>
        <button type="button" class="btn btn-dark" @click="copyDetails">{{t('Kopieer aanvraaggegevens','Copy application details')}}</button>
        <p v-if="errorMessage" class="error" role="alert">{{errorMessage}}</p>
        <details class="registration-json"><summary>{{t('Toon overzicht om handmatig te kopieren','Show details to copy manually')}}</summary><pre style="white-space:pre-wrap;overflow-wrap:anywhere">{{emailBody}}</pre></details>
        <NuxtLink :to="path('home')" class="btn btn-dark">{{t('Terug naar de homepage','Back to homepage')}}</NuxtLink>
      </div>
      <form v-else @submit.prevent="submit">
        <h2>{{t('Lidmaatschapsaanvraag','Membership application')}}</h2>
        <p class="form-subtitle">{{t('Velden met * zijn verplicht.','Fields marked * are required.')}}</p>
        <div class="form-grid">
          <label>{{t('Roepnaam','Preferred first name')}} *<input v-model.trim="form.firstName" required maxlength="100" autocomplete="given-name"></label>
          <label>{{t('Voorletters','Initials')}}<input v-model.trim="form.initials" maxlength="30"></label>
          <label>{{t('Achternaam','Family name')}} *<input v-model.trim="form.lastName" required maxlength="100" autocomplete="family-name"></label>
          <label>{{t('Geslacht (optioneel)','Gender (optional)')}}<select v-model="form.gender"><option value="">{{t('Niet opgegeven','Not specified')}}</option><option value="male">{{t('Man','Male')}}</option><option value="female">{{t('Vrouw','Female')}}</option><option value="other">{{t('Anders','Other')}}</option></select></label>
          <label>{{t('Geboortedatum','Date of birth')}} *<input v-model="form.birthDate" type="date" required></label>
          <label>{{t('Nationaliteit','Nationality')}}<input v-model.trim="form.nationality" maxlength="80"></label>
          <label class="full">{{t('Straat en huisnummer','Street and house number')}} *<input v-model.trim="form.address" required maxlength="180" autocomplete="street-address"></label>
          <label>{{t('Postcode','Postal code')}} *<input v-model.trim="form.postalCode" required maxlength="15" autocomplete="postal-code"></label>
          <label>{{t('Woonplaats','City')}} *<input v-model.trim="form.city" required maxlength="100" autocomplete="address-level2"></label>
          <label>{{t('Telefoon','Phone')}} *<input v-model.trim="form.phone" required type="tel" maxlength="30" autocomplete="tel"></label>
          <label>{{t('E-mailadres','Email address')}} *<input v-model.trim="form.email" required type="email" maxlength="254" autocomplete="email"></label>
          <template v-if="minor">
            <label>{{t('Naam ouder/voogd','Parent/guardian name')}} *<input v-model.trim="form.guardianName" required maxlength="150"></label>
            <label>{{t('E-mail ouder/voogd','Parent/guardian email')}} *<input v-model.trim="form.guardianEmail" required type="email" maxlength="254"></label>
          </template>
        </div>
        <div class="consents">
          <p><NuxtLink :to="path('privacy')" target="_blank" rel="noopener">{{t('Lees de volledige privacyverklaring (opent in nieuw tabblad)','Read the full privacy policy (opens in a new tab)')}} ↗</NuxtLink></p>
          <label class="check"><input v-model="form.membershipAgreement" type="checkbox" required><span>{{t('Ik bevestig dat ik de lidmaatschapsinformatie hierboven heb gelezen en wil lid worden. *','I confirm that I have read the membership information above and wish to join. *')}}</span></label>
          <label class="check"><input v-model="form.privacyAcknowledged" type="checkbox" required><span>{{t('Ik heb de privacyverklaring gelezen. *','I have read the privacy policy. *')}}</span></label>
          <label v-if="minor" class="check"><input v-model="form.guardianConsent" type="checkbox" required><span>{{t('Ik ben de ouder/voogd en geef toestemming voor deze lidmaatschapsaanvraag. *','I am the parent/guardian and consent to this membership application. *')}}</span></label>
          <label class="check"><input v-model="form.photoConsent" type="checkbox"><span>{{t('Ik geef optioneel toestemming voor publicatie van herkenbaar beeldmateriaal.','I optionally consent to publication of identifiable photos or videos.')}}</span></label>
        </div>
        <button class="btn btn-dark submit">{{t('Open e-mail om aanvraag te versturen','Open email to send application')}} ↗</button>
        <p class="small-print">{{t('Je e-mailprogramma wordt geopend met een overzicht van de aanvraaggegevens. De site verstuurt of bewaart je gegevens niet.','Your email app opens with an overview of the application details. The site does not send or store your details.')}}</p>
      </form>
    </div>
  </div></main>
</template>

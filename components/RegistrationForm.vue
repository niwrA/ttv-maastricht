<script setup lang="ts">
const {en,t,path}=useSiteLocale()
useSeoMeta({title:computed(()=>t('Inschrijven | TTV Maastricht','Register | TTV Maastricht'))})
const form=reactive({firstName:'',initials:'',lastName:'',email:'',phone:'',birthDate:'',nationality:'',address:'',postalCode:'',city:'',gender:'',guardianName:'',guardianEmail:'',guardianConsent:false,membershipAgreement:false,privacyAcknowledged:false,photoConsent:false,website:''})
const state=ref('idle')
const errorMessage=ref('')
const minor=computed(()=>{
  if(!form.birthDate)return false
  const d=new Date(form.birthDate),today=new Date()
  let age=today.getFullYear()-d.getFullYear()
  if(today.getMonth()<d.getMonth()||(today.getMonth()===d.getMonth()&&today.getDate()<d.getDate()))age--
  return age<18
})
async function submit(){
  state.value='sending';errorMessage.value=''
  try{
    await $fetch('/api/register',{method:'POST',body:{...form,locale:en.value?'en':'nl',privacyVersion:'2026-2027',membershipTermsVersion:'2026-2027'}})
    state.value='success'
  }catch(e:any){
    state.value='error'
    errorMessage.value=e?.data?.message||t('Versturen mislukt. Probeer later opnieuw.','Submission failed. Please try again later.')
  }
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
      <div v-if="state==='success'" class="success">
        <h2>{{t('Bedankt voor je aanmelding!','Thank you for your application!')}}</h2>
        <p>{{t('De secretaris controleert je gegevens en stuurt de contributiefactuur handmatig per e-mail. Je betaalt nu nog niets.','The secretary will review your details and send the membership invoice manually by email. No payment is due now.')}}</p>
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
          <label class="check"><input v-model="form.membershipAgreement" type="checkbox" required><span>{{t('Ik dien hiermee mijn aanvraag voor lidmaatschap in en bevestig dat ik kennis heb genomen van de contributie, het verenigingsjaar en de opzegtermijn hierboven. *','I am applying for membership and confirm that I have read the membership fees, club year and cancellation notice above. *')}}</span></label>
          <label class="check"><input v-model="form.privacyAcknowledged" type="checkbox" required><span>{{t('Ik heb de privacyverklaring gelezen. *','I have read the privacy policy. *')}}</span></label>
          <label v-if="minor" class="check"><input v-model="form.guardianConsent" type="checkbox" required><span>{{t('Ik ben de ouder/voogd en geef toestemming voor deze lidmaatschapsaanvraag. *','I am the parent/guardian and consent to this membership application. *')}}</span></label>
          <label class="check"><input v-model="form.photoConsent" type="checkbox"><span>{{t('Ik geef optioneel toestemming voor publicatie van herkenbaar beeldmateriaal.','I optionally consent to publication of identifiable photos or videos.')}}</span></label>
        </div>
        <div class="honey" aria-hidden="true"><label>Website<input v-model="form.website" tabindex="-1" autocomplete="off"></label></div>
        <p v-if="state==='error'" class="error" role="alert">{{errorMessage}}</p>
        <button class="btn btn-dark submit" :disabled="state==='sending'">{{state==='sending'?t('Verzenden…','Sending…'):t('Verstuur lidmaatschapsaanvraag','Submit membership application')}} ↗</button>
        <p class="small-print">{{t('Concept: e-mailservice en beveiliging moeten vóór publicatie worden ingesteld.','Draft: email delivery and security must be configured before publishing.')}}</p>
      </form>
    </div>
  </div></main>
</template>

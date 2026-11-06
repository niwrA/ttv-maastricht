import { app } from '@azure/functions';
import { EmailClient } from '@azure/communication-email';
import { z } from 'zod';
import { randomUUID } from 'node:crypto';

const schema = z.object({firstName:z.string().trim().min(1).max(100),initials:z.string().max(30).default(''),lastName:z.string().trim().min(1).max(100),email:z.string().email().max(254),phone:z.string().trim().min(1).max(30),birthDate:z.string().regex(/^\d{4}-\d{2}-\d{2}$/),nationality:z.string().max(80).default(''),gender:z.enum(['','male','female','other']).default(''),address:z.string().trim().min(1).max(180),postalCode:z.string().trim().min(1).max(15),city:z.string().trim().min(1).max(100),guardianName:z.string().max(150).default(''),guardianEmail:z.union([z.literal(''),z.string().email()]).default(''),guardianConsent:z.boolean(),membershipAgreement:z.literal(true),privacyAcknowledged:z.literal(true),photoConsent:z.boolean(),locale:z.enum(['nl','en']),privacyVersion:z.literal('2026-2027'),membershipTermsVersion:z.literal('2026-2027'),website:z.string().default('')}).strict();
app.http('register', { methods: ['POST'], authLevel: 'anonymous', route: 'register', handler: async (request, context) => {
  let raw;
  try { raw = await request.json(); } catch { return { status:400, jsonBody:{message:'Ongeldige JSON'} }; }
  const parsed = schema.safeParse(raw);
  if (!parsed.success) return { status:400, jsonBody:{message:'Controleer de ingevulde gegevens.'} };
  const input = parsed.data;
  const dob=new Date(input.birthDate+'T00:00:00Z'); const now=new Date();
  if(Number.isNaN(dob.getTime())||dob>now||dob.getUTCFullYear()<1900) return {status:400,jsonBody:{message:'Invalid date of birth'}};
  let age=now.getUTCFullYear()-dob.getUTCFullYear(); if(now.getUTCMonth()<dob.getUTCMonth()||(now.getUTCMonth()===dob.getUTCMonth()&&now.getUTCDate()<dob.getUTCDate())) age--;
  if(age<18&&(!input.guardianConsent||!input.guardianName.trim()||!input.guardianEmail)) return {status:400,jsonBody:{message:'Parent/guardian consent required'}};
  if (input.website) return { status:200, jsonBody:{ok:true} }; // honeypot
  const connection = process.env.ACS_CONNECTION_STRING;
  const sender = process.env.ACS_SENDER;
  const recipient = process.env.REGISTRATION_RECIPIENT || 'secretaristtvmaastricht@outlook.com';
  if (!connection || !sender) { context.error('Email configuration missing'); return {status:503,jsonBody:{message:'Aanmelden is tijdelijk niet beschikbaar.'}}; }
  const { website, ...data } = input;
  const registration = { schemaVersion:2, registrationId:randomUUID(), submittedAt:new Date().toISOString(), ...data };
  const attachment = Buffer.from(JSON.stringify(registration,null,2),'utf8').toString('base64');
  try {
    const client = new EmailClient(connection);
    const poller = await client.beginSend({ senderAddress:sender, recipients:{to:[{address:recipient}]},
      content:{subject:`Nieuwe TTV Maastricht inschrijving - ${registration.registrationId}`,
        plainText:`Nieuwe lidmaatschapsaanvraag ontvangen.\n\nNaam: ${data.firstName} ${data.lastName}\nE-mail: ${data.email}\nAanvraag en contributievoorwaarden bevestigd: ${data.membershipAgreement ? 'ja' : 'nee'}\n\nDe aanmelding verwacht een handmatige factuur. De volledige gegevens staan in de JSON-bijlage.`},
      attachments:[{name:'inschrijving.json',contentType:'application/json',contentInBase64:attachment}]
    });
    const result = await poller.pollUntilDone();
    if (result?.status !== 'Succeeded') throw new Error('Email send not successful');
    return {status:200,jsonBody:{ok:true}};
  } catch (error) { context.error('Registration delivery failed',error?.message); return {status:502,jsonBody:{message:'Versturen is niet gelukt. Probeer het later opnieuw.'}}; }
}});

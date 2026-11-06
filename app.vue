<script setup lang="ts">
const {en,t,path}=useSiteLocale()
const route=useRoute()
useHead({
  htmlAttrs:{lang:computed(()=>en.value?'en':'nl')},
  link:[{rel:'icon',type:'image/svg+xml',href:'/favicon.svg'}]
})
const languagePath=computed(()=>(
  {
    '/':'/en','/en':'/',
    '/nieuws/open-dag-jeugd-2026':'/en/news/youth-open-day-2026','/en/news/youth-open-day-2026':'/nieuws/open-dag-jeugd-2026',
    '/nieuws/zaalrenovatie-2026':'/en/news/hall-renovation-2026','/en/news/hall-renovation-2026':'/nieuws/zaalrenovatie-2026',
    '/nieuws/folder-ttv-maastricht':'/en/news/ttv-maastricht-brochure','/en/news/ttv-maastricht-brochure':'/nieuws/folder-ttv-maastricht',
    '/nieuws/ttv-maastricht-in-de-limburger':'/en/news/ttv-maastricht-in-de-limburger','/en/news/ttv-maastricht-in-de-limburger':'/nieuws/ttv-maastricht-in-de-limburger',
    '/training':'/en/training','/en/training':'/training',
    '/over-de-club':'/en/about','/en/about':'/over-de-club',
    '/bestuur':'/en/board','/en/board':'/bestuur',
    '/proefspelen':'/en/try-it','/en/try-it':'/proefspelen',
    '/inschrijven':'/en/register','/en/register':'/inschrijven',
    '/privacy':'/en/privacy','/en/privacy':'/privacy'
  }[route.path] || (en.value ? '/' : '/en')
))
</script>

<template>
  <div>
    <header class="site-header">
      <div class="shell nav">
        <NuxtLink :to="path('home')" class="brand" :aria-label="t('TTV Maastricht homepage','TTV Maastricht home page')">
          <img src="/images/ttv-maastricht-logo.svg" alt="TTV Maastricht">
        </NuxtLink>
        <nav :aria-label="t('Hoofdnavigatie','Main navigation')">
          <NuxtLink class="nav-link" active-class="active" :to="path('training')">{{t('Trainingstijden','Training times')}}</NuxtLink>
          <NuxtLink class="nav-link" active-class="active" :to="path('club')">{{t('Over de club','About the club')}}</NuxtLink>
          <NuxtLink class="nav-link" active-class="active" :to="path('practical')">{{t('Proefspelen & kosten','Try it & fees')}}</NuxtLink>
          <NuxtLink class="nav-cta" :to="path('register')">{{t('Lid worden','Join us')}} ↗</NuxtLink>
          <NuxtLink class="language-link" :to="languagePath" :aria-label="en?'Nederlands':'English'">{{en?'NL':'EN'}}</NuxtLink>
        </nav>
      </div>
    </header>
    <NuxtPage />
    <footer>
      <div class="shell foot">
        <div><img class="footer-logo" src="/images/ttv-maastricht-logo.svg" alt="TTV Maastricht"><p>{{t('Een plek voor sport, plezier en ontmoeting.','A place for sport, fun and connection.')}}</p></div>
        <div><span>Contact</span><a href="mailto:secretaristtvmaastricht@outlook.com">secretaristtvmaastricht@outlook.com</a></div>
        <div><span>{{t('Ontdek','Explore')}}</span><NuxtLink :to="path('register')">{{t('Lid worden','Join us')}}</NuxtLink><NuxtLink :to="path('board')">{{t('Bestuursleden','Board members')}}</NuxtLink><NuxtLink :to="path('privacy')">{{t('Privacyverklaring','Privacy policy')}}</NuxtLink></div>
        <ShareLinks />
      </div>
      <div class="shell foot-bottom">© {{new Date().getFullYear()}} TTV Maastricht · Concept</div>
    </footer>
  </div>
</template>

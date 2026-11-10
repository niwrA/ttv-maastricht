<script setup lang="ts">
useSeoMeta({title:'Geslaagde open dag voor de jeugd | TTV Maastricht',description:'Op 25 oktober maakten jongeren tijdens een gezellige open dag kennis met tafeltennis en zeven leuke activiteiten bij TTV Maastricht.'})
const photos=[
  {src:'/images/nieuws/open-dag-jeugd-2026/20261025_142220.jpg',alt:'Deelnemers doen samen een tafeltennisspel'},
  {src:'/images/nieuws/open-dag-jeugd-2026/20261025_142432.jpg',alt:'Een deelnemer probeert een tafeltennisactiviteit uit'},
  {src:'/images/nieuws/open-dag-jeugd-2026/20261025_143221.jpg',alt:'Een deelnemer doet mee aan een activiteit tijdens de open dag'},
  {src:'/images/nieuws/open-dag-jeugd-2026/20261025_144538.jpg',alt:'Jeugdspelers en begeleiders spelen samen in de zaal'},
  {src:'/images/nieuws/open-dag-jeugd-2026/20261025_145625-1.jpg',alt:'Overzicht van deelnemers en activiteiten in de TTV Maastricht sportzaal'}
]
</script>
<template><main class="article-page"><article class="shell article-shell">
  <NuxtLink to="/#clubnieuws" class="article-back">← Terug naar het clubnieuws</NuxtLink>
  <header class="article-header"><div class="kicker">/ JEUGD Â· 25 OKTOBER 2026</div><h1>Geslaagde open dag voor de jeugd</h1><p class="article-lead">Een gezellige middag om kennis te maken met tafeltennis, nieuwe mensen te ontmoeten en samen plezier te maken.</p></header>
  <figure class="article-cover"><img src="/images/nieuws/open-dag-jeugd-2026/20261025_140609.jpg" alt="Deelnemers verzamelen bij de start van de open dag" fetchpriority="high"><figcaption>De deelnemers komen samen bij de start van de middag.</figcaption></figure>
  <div class="article-body">
    <p>Op zondag 25 oktober organiseerde TTV Maastricht een open dag voor jeugd tot en met 18 jaar. Het doel was om op een gezellige manier kennis te maken met tafeltennis.</p>
    <p>Bij binnenkomst kregen de deelnemers een stempelkaart en konden ze alvast meedoen met rond-de-tafel. Om 14.00 uur werd de middag officieel geopend en gingen de activiteiten van start. Met hun stempelkaart konden de deelnemers langs zeven activiteiten gaan die allemaal iets met tafeltennis te maken hadden. Van gooispelletjes en een parcours tot een blaasbaan en zelfs een tafeltennisrobot: er was van alles te proberen!</p>
    <p>Iedereen was fanatiek bezig om een zo hoog mogelijke score te behalen. Wie de stempelkaart vol had, kon vrij spelen. Daar werd volop gebruik van gemaakt, en dat ging al hartstikke goed! Ondertussen leerden de deelnemers elkaar kennen en werd er veel gelachen. Precies waar deze middag om draaide: samen plezier maken en ontdekken hoe leuk tafeltennis is.</p>
    <p>Bedankt aan alle deelnemers en iedereen die heeft meegeholpen om er zoâ€™n gezellige middag van te maken. We kijken terug op een geslaagde middag en hopen jullie snel weer te zien op onze vereniging!</p>
  </div>
  <section class="article-gallery" aria-labelledby="article-gallery-title"><div class="kicker">/ EEN KIJKJE IN DE MIDDAG</div><h2 id="article-gallery-title">Open dag in beeld<span class="accent-dot">.</span></h2><div class="article-gallery-grid"><figure v-for="photo in photos" :key="photo.src"><img :src="photo.src" :alt="photo.alt" loading="lazy"><figcaption>{{photo.alt}}</figcaption></figure></div></section>
  <ShareLinks :article="true" /><div class="article-end"><NuxtLink to="/proefspelen" class="btn btn-lime">Ook eens proberen? <span aria-hidden="true">↗</span></NuxtLink><NuxtLink to="/#clubnieuws" class="article-back">← Terug naar het clubnieuws</NuxtLink></div>
</article></main></template>

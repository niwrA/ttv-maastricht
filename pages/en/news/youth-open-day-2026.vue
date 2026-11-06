<script setup lang="ts">
useSeoMeta({title:'A fun open day for young players | TTV Maastricht',description:'On 25 October, young people discovered table tennis and enjoyed seven fun activities at TTV Maastricht.'})
const photos=[
  {src:'/images/nieuws/open-dag-jeugd-2026/20261025_142220.jpg',alt:'Participants trying a table tennis game together'},
  {src:'/images/nieuws/open-dag-jeugd-2026/20261025_142432.jpg',alt:'A participant tries one of the table tennis activities'},
  {src:'/images/nieuws/open-dag-jeugd-2026/20261025_143221.jpg',alt:'A participant takes part in an activity during the open day'},
  {src:'/images/nieuws/open-dag-jeugd-2026/20261025_144538.jpg',alt:'Young players and volunteers playing together in the hall'},
  {src:'/images/nieuws/open-dag-jeugd-2026/20261025_145625-1.jpg',alt:'An overview of participants and activities in the TTV Maastricht sports hall'}
]
</script>
<template><main class="article-page"><article class="shell article-shell">
  <NuxtLink to="/en#clubnews" class="article-back">← Back to club news</NuxtLink>
  <header class="article-header"><div class="kicker">/ YOUTH · 25 OCTOBER 2026</div><h1>A fun open day for young players</h1><p class="article-lead">A friendly afternoon to discover table tennis, meet new people and have fun together.</p></header>
  <figure class="article-cover"><img src="/images/nieuws/open-dag-jeugd-2026/20261025_140609.jpg" alt="Participants gathering at the start of the open day" fetchpriority="high"><figcaption>Participants gathering at the start of the afternoon.</figcaption></figure>
  <div class="article-body">
    <p>On Sunday 25 October, TTV Maastricht hosted an open day for young people up to the age of 18. The aim was to introduce them to table tennis in a fun and relaxed way.</p>
    <p>When they arrived, participants received a stamp card and could join in with round-the-table. At 2 p.m. the afternoon was officially opened and the activities began. The stamp card took participants around seven activities, all inspired by table tennis. From throwing games and an obstacle course to a blow-the-ball lane and even a table tennis robot, there was plenty to try!</p>
    <p>Everyone was eager to get the highest score possible. Once they had filled their stamp cards, participants could play freely. Lots of them took the opportunity, and they were already doing brilliantly! Along the way, participants got to know one another and shared plenty of laughs. That was exactly what the afternoon was about: having fun together and discovering how enjoyable table tennis can be.</p>
    <p>Thank you to all the participants and everyone who helped make it such a lovely afternoon. We look back on a successful event and hope to see you again at our club soon!</p>
  </div>
  <section class="article-gallery" aria-labelledby="article-gallery-title"><div class="kicker">/ A LOOK AT THE AFTERNOON</div><h2>Open day in pictures<span class="accent-dot">.</span></h2><div class="article-gallery-grid"><figure v-for="photo in photos" :key="photo.src"><img :src="photo.src" :alt="photo.alt" loading="lazy"><figcaption>{{photo.alt}}</figcaption></figure></div></section>
  <div class="article-end"><NuxtLink to="/en/try-it" class="btn btn-lime">Want to try it? <span aria-hidden="true">↗</span></NuxtLink><NuxtLink to="/en#clubnews" class="article-back">← Back to club news</NuxtLink></div>
</article></main></template>

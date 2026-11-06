<script setup lang="ts">
const props=withDefaults(defineProps<{article?:boolean}>(),{article:false})
const {en,t}=useSiteLocale()
const currentUrl=ref('')
const pageTitle=ref('')
const copied=ref(false)
const canUseNativeShare=ref(false)
const route=useRoute()
const facebookUrl=computed(()=>currentUrl.value?`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl.value)}`:undefined)
const whatsappUrl=computed(()=>currentUrl.value?`https://wa.me/?text=${encodeURIComponent(`${pageTitle.value} ${currentUrl.value}`)}`:undefined)
const emailUrl=computed(()=>currentUrl.value?`mailto:?subject=${encodeURIComponent(pageTitle.value)}&body=${encodeURIComponent(currentUrl.value)}`:undefined)

function refreshShareTarget(){
  currentUrl.value=props.article?window.location.href:new URL(en.value?'/en/':'/',window.location.origin).href
  pageTitle.value=props.article?document.title:t('TTV Maastricht | Tafeltennis in Maastricht','TTV Maastricht | Table tennis in Maastricht')
}

onMounted(()=>{
  refreshShareTarget()
  canUseNativeShare.value=typeof navigator.share==='function'
})

watch(()=>[route.fullPath,en.value],()=>nextTick(refreshShareTarget))

async function shareNative(){
  if(!currentUrl.value||!navigator.share)return
  try{await navigator.share({title:pageTitle.value,url:currentUrl.value})}catch(error:any){
    if(error?.name!=='AbortError')console.error('Could not share this page.',error)
  }
}

async function copyLink(){
  if(!currentUrl.value)return
  try{
    if(navigator.clipboard?.writeText){
      await navigator.clipboard.writeText(currentUrl.value)
    }else{
      const input=document.createElement('textarea')
      input.value=currentUrl.value
      input.style.position='fixed'
      input.style.opacity='0'
      document.body.appendChild(input)
      input.select()
      const copiedToClipboard=document.execCommand('copy')
      input.remove()
      if(!copiedToClipboard)throw new Error('Copy command was unavailable.')
    }
    copied.value=true
    window.setTimeout(()=>copied.value=false,2200)
  }catch(error){
    console.error('Could not copy the page link.',error)
  }
}
</script>

<template>
  <section class="share-panel" :class="{'share-panel-article':props.article,'share-panel-site':!props.article}" :aria-label="t('Deelopties','Sharing options')">
    <h2>{{props.article?t('Deel dit bericht','Share this article'):t('Deel de website','Share the website')}}</h2>
    <div class="share-actions">
      <button v-if="canUseNativeShare" type="button" @click="shareNative">{{t('Delen…','Share…')}}</button>
      <a v-if="facebookUrl" :href="facebookUrl" target="_blank" rel="noopener noreferrer">Facebook</a>
      <a v-if="whatsappUrl" :href="whatsappUrl" target="_blank" rel="noopener noreferrer">WhatsApp</a>
      <a v-if="emailUrl" :href="emailUrl">E-mail</a>
      <button type="button" @click="copyLink">{{copied?t('Link gekopieerd','Link copied'):t('Kopieer link','Copy link')}}</button>
    </div>
    <p v-if="copied" class="share-status" role="status">{{t('De link staat op je klembord.','The link has been copied to your clipboard.')}}</p>
  </section>
</template>

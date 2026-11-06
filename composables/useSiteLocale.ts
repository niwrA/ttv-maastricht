export const useSiteLocale = () => {
  const route=useRoute()
  const en=computed(()=>route.path.startsWith('/en'))
  const t=(nl:string,english:string)=>en.value?english:nl
  const path=(name:'home'|'training'|'club'|'practical'|'register'|'privacy')=>en.value
    ?({home:'/en',training:'/en/training',club:'/en/about',practical:'/en/try-it',register:'/en/register',privacy:'/en/privacy'}[name])
    :({home:'/',training:'/training',club:'/over-de-club',practical:'/proefspelen',register:'/inschrijven',privacy:'/privacy'}[name])
  return {en,t,path}
}

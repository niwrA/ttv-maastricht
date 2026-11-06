export const useSiteLocale = () => {
  const route=useRoute()
  const en=computed(()=>route.path.startsWith('/en'))
  const t=(nl:string,english:string)=>en.value?english:nl
  const path=(name:'home'|'training'|'club'|'board'|'practical'|'register'|'privacy')=>en.value
    ?({home:'/en',training:'/en/training',club:'/en/about',board:'/en/board',practical:'/en/try-it',register:'/en/register',privacy:'/en/privacy'}[name])
    :({home:'/',training:'/training',club:'/over-de-club',board:'/bestuur',practical:'/proefspelen',register:'/inschrijven',privacy:'/privacy'}[name])
  return {en,t,path}
}

const KEY = 'admin_worker_url'

export const storage = {
  getUrl(){
    try{ return localStorage.getItem(KEY) || '' }catch{ return '' }
  },
  setUrl(url){
    try{
      if(url) localStorage.setItem(KEY, url)
      else localStorage.removeItem(KEY)
    }catch{}
  }
}

const ensureBase = (base) => {
  if(!base) throw new Error('Worker URL 미지정')
  return base.replace(/\/$/, '')
}

const commonHeaders = (token) => ({
  'Content-Type':'application/json',
  'x-admin-token': token || '',
})

const handle = async (res) => {
  if(!res.ok){
    let msg = `HTTP ${res.status}`
    try{
      const data = await res.json()
      if(data?.error) msg += ` – ${data.error}`
    }catch{}
    throw new Error(msg)
  }
  const txt = await res.text()
  try{ return txt ? JSON.parse(txt) : null }catch{ return txt }
}

export async function queueMessage(base, token, { body, send_after }){
  const url = `${ensureBase(base)}/admin/queue`
  const res = await fetch(url, {
    method:'POST',
    headers: commonHeaders(token),
    body: JSON.stringify({ body, ...(send_after ? { send_after } : {}) })
  })
  return handle(res)
}

export async function runNow(base, token){
  const url = `${ensureBase(base)}/run`
  const res = await fetch(url, { method:'GET', headers: commonHeaders(token) })
  return handle(res)
}

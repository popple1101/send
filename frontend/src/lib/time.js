// datetime-local(로컬) → ISO UTC
export function toIsoUtcFromLocal(localStr){
  if(!localStr) return undefined
  const d = new Date(localStr)    // 로컬 기준 파싱
  return d.toISOString()          // UTC 직렬화
}

// now 기본값 for datetime-local
export function nowLocalInputValue(addMinutes=0){
  const d = new Date(Date.now()+addMinutes*60_000)
  const pad = n => String(n).padStart(2,'0')
  const yyyy=d.getFullYear(), mm=pad(d.getMonth()+1), dd=pad(d.getDate())
  const hh=pad(d.getHours()), mi=pad(d.getMinutes())
  return `${yyyy}-${mm}-${dd}T${hh}:${mi}`
}

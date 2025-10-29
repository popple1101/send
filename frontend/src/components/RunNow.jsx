import { useState } from "react";
import { runNow } from "../api";

export default function RunNow({ baseUrl, token }) {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const onRun = async () => {
    setMsg("");
    setLoading(true);
    try {
      await runNow(baseUrl, token);
      setMsg("즉시 처리 OK (개발용). 운영에서는 Cron 사용 권장.");
    } catch (err) {
      setMsg(err.message || String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="panel">
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <button onClick={onRun} disabled={loading}>
          /run 즉시 처리
        </button>
        <span className="badge">주의: 운영에선 비활성화</span>
      </div>
      {msg && (
        <div
          className={`toast ${msg.startsWith("HTTP") ? "error" : "success"}`}
          style={{ marginTop: 12 }}
        >
          {msg}
        </div>
      )}
    </div>
  );
}

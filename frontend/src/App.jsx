import { useState } from "react";
import TopBar from "./components/TopBar";
import QueueForm from "./components/QueueForm";
import RunNow from "./components/RunNow";

const envBase = import.meta.env.VITE_WORKER_URL || "";

export default function App() {
  const [baseUrl, setBaseUrl] = useState(envBase);
  const [token, setToken] = useState("");

  return (
    <div className="container">
      <h1 style={{ margin: "6px 0 16px", letterSpacing: ".2px" }}>
        SENS Outbox Admin
      </h1>
      <TopBar
        baseUrl={baseUrl}
        setBaseUrl={setBaseUrl}
        token={token}
        setToken={setToken}
      />
      <QueueForm baseUrl={baseUrl} token={token} />
      <div style={{ height: 8 }} />
      <RunNow baseUrl={baseUrl} token={token} />
      <hr />
      <p style={{ color: "var(--muted)", fontSize: 13, lineHeight: 1.6 }}>
        • CORS: 백엔드 <code>Access-Control-Allow-Origin</code>에
        http://localhost:5173 등 허용 원본 추가
        <br />
        • 민감정보: 번호 등은 서버에서만 취급, 응답/로그 노출 금지
        <br />• 운영: <code>/run</code> 비활성화하고 Cloudflare Cron(예:{" "}
        <code>*/5 * * * *</code>)으로 돌리기
      </p>
    </div>
  );
}

import { useState, useEffect } from "react";
import { storage } from "../lib/storage";

export default function TopBar({ baseUrl, setBaseUrl, token, setToken }) {
  const [rememberUrl, setRememberUrl] = useState(true);

  useEffect(() => {
    const saved = storage.getUrl();
    if (!baseUrl && saved) setBaseUrl(saved);
  }, []);

  useEffect(() => {
    if (rememberUrl) storage.setUrl(baseUrl);
  }, [baseUrl, rememberUrl]);

  return (
    <div className="panel" style={{ marginBottom: 16 }}>
      <div className="row" style={{ alignItems: "end" }}>
        <div>
          <label>Worker URL</label>
          <input
            placeholder="https://your-worker.workers.dev"
            value={baseUrl}
            onChange={(e) => setBaseUrl(e.target.value)}
            autoComplete="off"
          />
          <div style={{ marginTop: 6 }}>
            <label
              style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
            >
              <input
                type="checkbox"
                checked={rememberUrl}
                onChange={(e) => setRememberUrl(e.target.checked)}
              />
              <span className="badge">URL 저장 (토큰은 미저장)</span>
            </label>
          </div>
        </div>
        <div>
          <label>
            Admin Token <span className="badge">헤더 x-admin-token</span>
          </label>
          <input
            type="password"
            placeholder="발급 토큰 입력"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  );
}

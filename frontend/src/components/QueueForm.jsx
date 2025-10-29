import { useState } from "react";
import { queueMessage } from "../api";
import { nowLocalInputValue, toIsoUtcFromLocal } from "../lib/time";

export default function QueueForm({ baseUrl, token }) {
  const [body, setBody] = useState("");
  const [sendAfterLocal, setSendAfterLocal] = useState(nowLocalInputValue());
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);
    if (!body.trim()) {
      setError("문자 본문을 입력하세요.");
      return;
    }
    try {
      setLoading(true);
      const send_after = toIsoUtcFromLocal(sendAfterLocal);
      const res = await queueMessage(baseUrl, token, {
        body: body.trim(),
        send_after,
      });
      setResult(res || { ok: true });
    } catch (err) {
      setError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="panel">
      <form onSubmit={onSubmit}>
        <label>문자 본문</label>
        <textarea
          placeholder="[데모] 문자 테스트"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <div className="row">
          <div>
            <label>
              발송 시각 (로컬) <span className="badge">미지정시 now</span>
            </label>
            <input
              type="datetime-local"
              value={sendAfterLocal}
              onChange={(e) => setSendAfterLocal(e.target.value)}
            />
          </div>
          <div style={{ display: "flex", alignItems: "end" }}>
            <button className="primary" type="submit" disabled={loading}>
              큐 적재
            </button>
          </div>
        </div>
      </form>

      {result && <div className="toast success">큐 생성 완료 ✅</div>}
      {error && <div className="toast error">{error}</div>}
    </div>
  );
}

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";

// Only fingerprints of the four withdrawn shared answer editions are stored here.
// Browser transcripts have message IDs, but no reliable shared-library row ID.
const reviewedAnswers = [
  {
    length: 3021, checksum: 3102349730, sha256: "f975735f57f741f74410b6bf077fd4148b61fa00d29603ecf327bf04f2c149de",
    correction: "In bleeding trauma with brain injury, the resuscitation strategy depends on whether haemorrhage or brain injury dominates. Blood pressure targets also depend on injury severity and age.",
    topic: "Trauma and emergency anaesthesia", path: "/clinical/trauma-emergency",
  },
  {
    length: 1899, checksum: 1808332580, sha256: "8a51ee6385fc43c4e3e74ebdedd63a1c8a32e6437bcdd1cf8359adc3a6a28e25",
    correction: "In adult major trauma with active bleeding, NICE starts plasma and red cells at 1:1. Platelet replacement depends on the clinical situation, bleeding site and local major haemorrhage protocol.",
    topic: "Transfusion and coagulation", path: "/intensive-care/transfusion-coagulation",
  },
  {
    length: 4524, checksum: 1734844378, sha256: "f2f4043c83029c5b0b86415e7987e2fa835ab8c2d22c38561205afa598695447",
    correction: "In liver transplantation, interpret coagulation tests alongside clinical bleeding before giving plasma. In major traumatic bleeding, monitor ionised calcium and maintain it in the normal range.",
    topic: "Transfusion and coagulation", path: "/intensive-care/transfusion-coagulation",
  },
  {
    length: 1495, checksum: 2275907503, sha256: "a50aeb7326971b74a8f1ad48e6411d89188ee0c3ab2351f08dd08c488ef01aca",
    correction: "In the convention used here, phase 0 is inspiration and phase I is the early expiratory dead-space segment.",
    topic: "Capnography", path: "/physics/capnography",
  },
];

function reviewCandidate(text: string) {
  let body = text.trim();
  // The original cached-reply template could wrap a shared answer with a dated
  // question header and footer. Keep any horizontal rules inside the answer.
  const prefix = "**This question is already in the shared Ask AnaesthesiaCore library**";
  const footer = "\n\n---\n\n_If this isn't quite what you meant, rephrase the question to get a fresh answer._";
  if (body.startsWith(prefix) && body.endsWith(footer)) {
    const separator = '_":\n\n---\n\n';
    const start = body.indexOf(separator);
    if (start >= 0) body = body.slice(start + separator.length, -footer.length).trim();
  }
  const review = reviewedAnswers.find((entry) => entry.length === body.length);
  return review ? { body, review } : undefined;
}

// If Web Crypto is unavailable, an independent lightweight checksum lets
// unrelated same-length messages through. Only a possible match is withheld.
function legacyChecksum(body: string) {
  let hash = 2166136261;
  for (let i = 0; i < body.length; i++) hash = Math.imul(hash ^ body.charCodeAt(i), 16777619);
  return hash >>> 0;
}

type Verification = "match" | "different" | "unavailable";

export function SavedAskAnswerReview({ text, children }: { text: string; children: ReactNode }) {
  const candidate = useMemo(() => reviewCandidate(text), [text]);
  const [checked, setChecked] = useState<{ body: string; result: Verification }>();

  useEffect(() => {
    if (!candidate) return;
    let current = true;
    async function verify(body: string, review: (typeof reviewedAnswers)[number]) {
      let result: Verification;
      try {
        const hash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(body));
        const digest = Array.from(new Uint8Array(hash), (byte) => byte.toString(16).padStart(2, "0")).join("");
        result = digest === review.sha256 ? "match" : "different";
      } catch {
        result = legacyChecksum(body) === review.checksum ? "unavailable" : "different";
      }
      if (current) setChecked({ body, result });
    }
    void verify(candidate.body, candidate.review);
    return () => { current = false; };
  }, [candidate]);

  if (!candidate) return <>{children}</>;
  const result = checked?.body === candidate.body ? checked.result : undefined;
  if (result === "different") return <>{children}</>;
  if (!result) return <p role="status">Checking this saved answer…</p>;
  if (result === "unavailable") {
    return <p>This browser could not check this saved answer against the clinical corrections. <Link to="/curriculum">Browse the curriculum</Link>.</p>;
  }
  return (
    <div>
      <p><strong>Clinical correction to this saved answer</strong></p>
      <p>{candidate.review.correction}</p>
      <Link to={candidate.review.path}>{candidate.review.topic}</Link>
    </div>
  );
}

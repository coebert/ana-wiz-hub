import { Navigate, useLocation } from "react-router-dom";

/** Keep bookmarks and audit links to the former cost topics usable. */
export function IcuCostLegacyRedirect({ anchor }: { anchor: string }) {
  const { hash, search } = useLocation();
  return <Navigate replace to={`/intensive-care/icu-costs${search}${hash || `#${anchor}`}`} />;
}
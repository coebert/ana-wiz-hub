import { Navigate, useLocation } from "react-router-dom";

/** Preserve bookmarks to the former staffing page. */
export default function IcuStaffingByCountryTopic() {
  const { hash, search } = useLocation();
  return <Navigate replace to={`/intensive-care/icu-staffing-ratios${search}${hash || "#country-summary"}`} />;
}

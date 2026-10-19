import { classifyVisitors, type VisitorEvidence } from "./visitor-classification";

export type SurveyAnswer = "person" | "automated" | "prefer_not";
export interface SurveyResponse {
  visitor_id: string;
  answer: SurveyAnswer | null;
}

export function summariseSurvey(visits: ReadonlyArray<VisitorEvidence>, responses: ReadonlyArray<SurveyResponse>) {
  const classes = classifyVisitors(visits);
  return (["likelyHuman", "automated", "unknown"] as const).map(group => {
    const ids = classes[group];
    const rows = new Map(responses.filter(row => ids.has(row.visitor_id)).map(row => [row.visitor_id, row]));
    const answers = [...rows.values()];
    const responded = answers.filter(row => row.answer !== null).length;
    return { group, visitors: ids.size, invited: rows.size, responded,
      people: answers.filter(row => row.answer === "person").length,
      automated: answers.filter(row => row.answer === "automated").length,
      preferNot: answers.filter(row => row.answer === "prefer_not").length,
      responseRate: rows.size ? 100 * responded / rows.size : null };
  });
}
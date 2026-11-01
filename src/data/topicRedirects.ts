/** Exact legacy aliases; canonical teaching pages remain subject to all checks. */
export const topicRedirects = [
  { file: "IcuStaffingByUnitTopic.tsx", path: "/intensive-care/icu-staffing-by-unit", target: "/intensive-care/icu-staffing-ratios", anchor: "unit-summary", canonicalFile: "IcuStaffingRatiosTopic.tsx" },
  { file: "IcuStaffingByCountryTopic.tsx", path: "/intensive-care/icu-staffing-by-country", target: "/intensive-care/icu-staffing-ratios", anchor: "country-summary", canonicalFile: "IcuStaffingRatiosTopic.tsx" },
  { file: "IcuCostTimelineTopic.tsx", path: "/intensive-care/icu-cost-timeline", target: "/intensive-care/icu-costs", anchor: "cost-timeline", canonicalFile: "IcuCostsTopic.tsx" },
  { file: "IcuCostByConditionTopic.tsx", path: "/intensive-care/icu-cost-by-condition", target: "/intensive-care/icu-costs", anchor: "cost-conditions", canonicalFile: "IcuCostsTopic.tsx" },
  { file: "IcuCostByCountryTopic.tsx", path: "/intensive-care/icu-cost-by-country", target: "/intensive-care/icu-costs", anchor: "cost-countries", canonicalFile: "IcuCostsTopic.tsx" },
] as const;

export const isTopicRedirectFile = (file: string) => topicRedirects.some(alias => `src/pages/topics/${alias.file}` === file);
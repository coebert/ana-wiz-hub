import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { DrugReferenceRow, DrugSource, DrugTdm } from "./types";

const LIST_COLUMNS =
  "slug,name,drug_class,synonyms,indication_oneliner,key_warning,requires_tdm";

const FULL_COLUMNS = `${LIST_COLUMNS},adult_bolus_dose,infusion_range,presentation,mechanism_of_action,pharmacokinetics,preparation,dosing,monitoring,side_effects,contraindications,interactions,tdm,sources`;

export type DrugListItem = Pick<
  DrugReferenceRow,
  "slug" | "name" | "drug_class" | "synonyms" | "indication_oneliner" | "key_warning" | "requires_tdm"
>;

function asSources(value: unknown): DrugSource[] {
  return Array.isArray(value) ? (value as DrugSource[]) : [];
}

function asTdm(value: unknown): DrugTdm | null {
  if (!value || typeof value !== "object") return null;
  const tdm = value as DrugTdm;
  return Array.isArray(tdm.targets) && tdm.targets.length > 0 ? tdm : null;
}

/** Loads the whole library index (name, class, one-liner, monitoring flag). */
export function useDrugList() {
  const [drugs, setDrugs] = useState<DrugListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      const { data, error: err } = await supabase
        .from("drugs")
        .select(LIST_COLUMNS)
        .order("name");
      if (!active) return;
      if (err) setError(err.message);
      else setDrugs((data ?? []) as DrugListItem[]);
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, []);

  return { drugs, loading, error };
}

/** Loads one full monograph, including sources and monitoring data. */
export function useDrugEntry(slug: string | undefined) {
  const [drug, setDrug] = useState<DrugReferenceRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    let active = true;
    setLoading(true);
    (async () => {
      const { data, error: err } = await supabase
        .from("drugs")
        .select(FULL_COLUMNS)
        .eq("slug", slug)
        .maybeSingle();
      if (!active) return;
      if (err) setError(err.message);
      else if (data) {
        const row = data as Record<string, unknown>;
        setDrug({
          ...(row as unknown as DrugReferenceRow),
          sources: asSources(row.sources),
          tdm: asTdm(row.tdm),
        });
      } else {
        setDrug(null);
      }
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, [slug]);

  return { drug, loading, error };
}

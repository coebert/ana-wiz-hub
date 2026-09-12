import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowLeft,
  Search,
  Layers,
  Syringe,
  Activity,
  ShieldAlert,
  TrendingDown,
  FlaskConical,
  Gauge,
} from "lucide-react";
import { PageSection } from "@/components/layout/PageSection";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { icuDrugMechanismGroups } from "@/data/icuDrugMechanisms";
import { icuDrugDoseGroups } from "@/data/icuDrugDoses";
import { icuDrugSafetyGroups } from "@/data/icuDrugSafety";
import { icuDrugPharmacokinetics } from "@/data/pk";
import { icuDrugPharmacodynamics } from "@/data/pd";
import {
  icuDrugWithdrawal,
  withdrawalRiskLabel,
  type WithdrawalRisk,
} from "@/data/icuDrugWithdrawal";

const riskBadgeClass: Record<WithdrawalRisk, string> = {
  high: "border-destructive/40 bg-destructive/10 text-destructive",
  moderate: "border-icu/40 bg-icu/10 text-icu",
  low: "border-border bg-muted text-muted-foreground",
  none: "border-border bg-muted text-muted-foreground",
};

const doseByName = new Map(icuDrugDoseGroups.flatMap((g) => g.drugs).map((d) => [d.drug, d]));
const safetyBySlug = new Map(icuDrugSafetyGroups.flatMap((g) => g.drugs).map((d) => [d.slug, d]));

interface DrugCard {
  slug: string;
  name: string;
  groupId: string;
  groupTitle: string;
  drugClass: string;
  mechanism: string;
  metabolismNarrative: string;
  adverseEffects: string;
  topicIds?: string[];
  dose?: ReturnType<typeof doseByName.get>;
  safety?: ReturnType<typeof safetyBySlug.get>;
  pk?: (typeof icuDrugPharmacokinetics)[string];
  pd?: (typeof icuDrugPharmacodynamics)[string];
  withdrawal?: (typeof icuDrugWithdrawal)[string];
  searchText: string;
}

const drugCards: DrugCard[] = icuDrugMechanismGroups.flatMap((group) =>
  group.drugs.map<DrugCard>((d) => {
    const dose = doseByName.get(d.drug);
    const safety = safetyBySlug.get(d.slug);
    const pk = icuDrugPharmacokinetics[d.slug];
    const pd = icuDrugPharmacodynamics[d.slug];
    const withdrawal = icuDrugWithdrawal[d.slug];
    const searchText = [
      d.drug,
      d.slug,
      d.drugClass,
      group.title,
      d.pharmacodynamics,
      d.metabolism,
      d.adverseEffects,
      dose?.dose,
      dose?.route,
      dose?.indications,
      dose?.paediatricDose,
      dose?.neonatalDose,
      pk?.halfLife,
      pk?.clearance,
      pk?.metabolicPathway,
      pd?.therapeuticWindow,
      pd?.titrationTarget,
      safety?.alert,
      ...(safety?.interactions ?? []),
      ...(safety?.contraindications ?? []),
      ...(safety?.monitoring ?? []),
      withdrawal?.why,
      ...(withdrawal?.taper ?? []),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return {
      slug: d.slug,
      name: d.drug,
      groupId: group.id,
      groupTitle: group.title,
      drugClass: d.drugClass,
      mechanism: d.pharmacodynamics,
      metabolismNarrative: d.metabolism,
      adverseEffects: d.adverseEffects,
      topicIds: d.topicIds,
      dose,
      safety,
      pk,
      pd,
      withdrawal,
      searchText,
    };
  }),
);

const groupOptions = icuDrugMechanismGroups.map((g) => ({ id: g.id, title: g.title }));

const Field = ({ label, value }: { label: string; value?: string }) =>
  value ? (
    <p className="text-sm leading-relaxed text-muted-foreground">
      <span className="font-medium text-foreground">{label}: </span>
      {value}
    </p>
  ) : null;

const Block = ({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Activity;
  title: string;
  children: React.ReactNode;
}) => (
  <div className="rounded-lg border border-border bg-muted/30 p-4">
    <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
      <Icon className="h-4 w-4 text-icu" aria-hidden="true" />
      {title}
    </h4>
    <div className="space-y-2">{children}</div>
  </div>
);

const Bullets = ({ items }: { items?: string[] }) =>
  items && items.length ? (
    <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted-foreground">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  ) : null;

const IcuDrugCards = () => {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("drug") ?? "");
  const [activeGroup, setActiveGroup] = useState<string>("all");

  const targetSlug = searchParams.get("slug");
  useEffect(() => {
    if (!targetSlug) return;
    const el = document.getElementById(`card-${targetSlug}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [targetSlug]);

  const cards = useMemo(() => {
    const q = search.trim().toLowerCase();
    return drugCards
      .filter((c) => activeGroup === "all" || c.groupId === activeGroup)
      .filter((c) => !q || c.searchText.includes(q));
  }, [search, activeGroup]);

  return (
    <PageSection>
      <Helmet>
        <title>ICU Drug Cards | Class, Dosing, PK & Safety | AnaesthesiaCore</title>
        <meta
          name="description"
          content="Complete drug cards for the adult ICU formulary: class, mechanism, dose-response, adult and paediatric dosing, pharmacokinetics, safety, monitoring and withdrawal guidance."
        />
        <link rel="canonical" href="https://anaesthesiacore.app/intensive-care/drug-cards" />
      </Helmet>

      <Button asChild variant="ghost" size="sm" className="mb-4 -ml-2">
        <Link to="/intensive-care">
          <ArrowLeft className="mr-1 h-4 w-4" aria-hidden="true" />
          Intensive care
        </Link>
      </Button>

      <header className="mb-6">
        <div className="mb-2 flex items-center gap-2 text-icu">
          <Layers className="h-5 w-5" aria-hidden="true" />
          <span className="text-sm font-medium uppercase tracking-wide">ICU pharmacology</span>
        </div>
        <h1 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">ICU Drug Cards</h1>
        <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">
          One card per drug for the whole adult ICU formulary — class and mechanism, dose–response and
          titration target, adult, paediatric and neonatal dosing, pharmacokinetics with clearance and
          organ-failure handling, interactions, contraindications, monitoring and how to stop the drug
          safely. Revision aid only: check the BNF, the SPC and local critical care guidelines before
          prescribing.
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          Related:{" "}
          <Link to="/intensive-care/drug-doses" className="font-medium text-icu underline-offset-4 hover:underline">
            dosing table
          </Link>
          ,{" "}
          <Link to="/intensive-care/drug-mechanisms" className="font-medium text-icu underline-offset-4 hover:underline">
            mechanisms &amp; kinetics
          </Link>
          ,{" "}
          <Link to="/intensive-care/drug-safety" className="font-medium text-icu underline-offset-4 hover:underline">
            drug safety
          </Link>
          ,{" "}
          <Link to="/intensive-care/interaction-checker" className="font-medium text-icu underline-offset-4 hover:underline">
            interaction checker
          </Link>{" "}
          and the{" "}
          <Link to="/intensive-care/calculator" className="font-medium text-icu underline-offset-4 hover:underline">
            infusion calculator
          </Link>{" "}
          ·{" "}
          <Link to="/intensive-care/paediatric-pharmacokinetics" className="font-medium text-icu underline-offset-4 hover:underline">
            Paediatric pharmacokinetics
          </Link>
          .
        </p>
      </header>

      <div className="mb-6 space-y-3">
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search drug, class, indication, interaction or withdrawal advice"
            className="pl-9"
            aria-label="Search ICU drug cards"
          />
        </div>
        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
          <Button
            size="sm"
            variant={activeGroup === "all" ? "default" : "outline"}
            onClick={() => setActiveGroup("all")}
            className="shrink-0"
          >
            All groups
          </Button>
          {groupOptions.map((g) => (
            <Button
              key={g.id}
              size="sm"
              variant={activeGroup === g.id ? "default" : "outline"}
              onClick={() => setActiveGroup(g.id)}
              className="shrink-0"
            >
              {g.title}
            </Button>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          Showing {cards.length} of {drugCards.length} drug cards
        </p>
      </div>

      {cards.length === 0 ? (
        <p className="rounded-lg border border-border bg-muted/30 p-6 text-sm text-muted-foreground">
          No drug matches that search. Try a class (e.g. “vasopressor”), an indication (e.g. “status
          epilepticus”) or a monitoring term (e.g. “anti-Xa”).
        </p>
      ) : (
        <div className="space-y-6">
          {cards.map((c) => {
            const risk = c.withdrawal?.risk;
            return (
              <article
                key={c.slug}
                id={`card-${c.slug}`}
                className="scroll-mt-28 rounded-xl border border-border bg-card p-5 shadow-sm"
              >
                <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h2 className="font-serif text-xl font-bold text-foreground">{c.name}</h2>
                    <p className="text-sm text-muted-foreground">{c.drugClass}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline" className="border-icu/40 bg-icu/10 text-icu">
                      {c.groupTitle}
                    </Badge>
                    {risk && risk !== "none" && (
                      <Badge variant="outline" className={riskBadgeClass[risk]}>
                        Withdrawal: {withdrawalRiskLabel[risk]}
                      </Badge>
                    )}
                  </div>
                </div>

                {c.safety?.alert && (
                  <p className="mb-4 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm font-medium text-destructive">
                    {c.safety.alert}
                  </p>
                )}

                <div className="grid gap-4 lg:grid-cols-2">
                  <Block icon={Activity} title="Mechanism and pharmacodynamics">
                    <p className="text-sm leading-relaxed text-muted-foreground">{c.mechanism}</p>
                    <Field label="Dose–response" value={c.pd?.doseResponse} />
                    <Field label="Therapeutic window" value={c.pd?.therapeuticWindow} />
                    <Field label="Titrate against" value={c.pd?.titrationTarget} />
                    <Field label="Tolerance / rebound" value={c.pd?.tolerance} />
                  </Block>

                  <Block icon={Syringe} title="Dosing">
                    {c.dose ? (
                      <>
                        <Field label="Adult" value={c.dose.dose} />
                        <Field label="Route" value={c.dose.route} />
                        <Field label="Frequency" value={c.dose.frequency} />
                        <Field label="Indications" value={c.dose.indications} />
                        <Field label="Child" value={c.dose.paediatricDose} />
                        <Field label="Neonate" value={c.dose.neonatalDose} />
                        <Field label="Notes" value={c.dose.notes} />
                        <Field label="Paediatric cautions" value={c.dose.paediatricNotes} />
                      </>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        See the dosing table for this drug.
                      </p>
                    )}
                  </Block>

                  <Block icon={Gauge} title="Pharmacokinetics">
                    {c.pk ? (
                      <>
                        <Field label="Onset" value={c.pk.onset} />
                        <Field label="Duration" value={c.pk.duration} />
                        <Field label="Half-life" value={c.pk.halfLife} />
                        <Field label="Volume of distribution" value={c.pk.volumeOfDistribution} />
                        <Field label="Protein binding" value={c.pk.proteinBinding} />
                        <Field label="Clearance" value={c.pk.clearance} />
                        <Field label="Metabolism" value={c.pk.metabolicPathway} />
                        <Field label="Active metabolites" value={c.pk.activeMetabolites} />
                        <Field label="Elimination" value={c.pk.elimination} />
                        <Field label="Organ impairment" value={c.pk.organImpairment} />
                        <Field label="During infusion" value={c.pk.infusionBehaviour} />
                      </>
                    ) : (
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {c.metabolismNarrative}
                      </p>
                    )}
                  </Block>

                  <Block icon={ShieldAlert} title="Safety">
                    {c.pd?.doseRelatedEffects?.length ? (
                      <>
                        <p className="text-sm font-medium text-foreground">Dose-related effects</p>
                        <Bullets items={c.pd.doseRelatedEffects} />
                      </>
                    ) : null}
                    {c.safety?.interactions?.length ? (
                      <>
                        <p className="text-sm font-medium text-foreground">Interactions</p>
                        <Bullets items={c.safety.interactions} />
                      </>
                    ) : null}
                    {c.safety?.contraindications?.length ? (
                      <>
                        <p className="text-sm font-medium text-foreground">Contraindications and cautions</p>
                        <Bullets items={c.safety.contraindications} />
                      </>
                    ) : null}
                    {c.safety?.monitoring?.length ? (
                      <>
                        <p className="text-sm font-medium text-foreground">Monitoring</p>
                        <Bullets items={c.safety.monitoring} />
                      </>
                    ) : null}
                    {!c.safety && (
                      <p className="text-sm leading-relaxed text-muted-foreground">{c.adverseEffects}</p>
                    )}
                  </Block>

                  {c.withdrawal && (
                    <Block icon={TrendingDown} title="Stopping and withdrawal">
                      <Field label="Risk" value={withdrawalRiskLabel[c.withdrawal.risk]} />
                      <Field label="Why" value={c.withdrawal.why} />
                      <Field label="Offset" value={c.withdrawal.offset} />
                      <p className="text-sm font-medium text-foreground">Tapering</p>
                      <Bullets items={c.withdrawal.taper} />
                      <p className="text-sm font-medium text-foreground">Monitoring the wean</p>
                      <Bullets items={c.withdrawal.monitoring} />
                      <Field label="If withdrawal declares itself" value={c.withdrawal.rescue} />
                    </Block>
                  )}

                  <Block icon={FlaskConical} title="Go deeper">
                    <div className="flex flex-wrap gap-2">
                      <Button asChild size="sm" variant="outline">
                        <Link to={`/intensive-care/drug-doses?drug=${encodeURIComponent(c.name)}`}>
                          Dosing table
                        </Link>
                      </Button>
                      <Button asChild size="sm" variant="outline">
                        <Link to={`/intensive-care/drug-mechanisms?slug=${c.slug}`}>
                          Mechanism &amp; kinetics
                        </Link>
                      </Button>
                      <Button asChild size="sm" variant="outline">
                        <Link to={`/intensive-care/drug-safety?slug=${c.slug}&drug=${encodeURIComponent(c.name)}`}>
                          Safety page
                        </Link>
                      </Button>
                      <Button asChild size="sm" variant="outline">
                        <Link to={`/intensive-care/drug-comparison?a=${c.slug}`}>Compare</Link>
                      </Button>
                      <Button asChild size="sm" variant="outline">
                        <Link to={`/intensive-care/interaction-checker?a=${c.slug}`}>Interactions</Link>
                      </Button>
                    </div>
                  </Block>
                </div>
              </article>
            );
          })}
        </div>
      )}

      <p className="mt-8 rounded-lg border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
        Doses assume an adult of about 70 kg with normal organ function unless stated. Always confirm
        against the BNF/BNFc, the summary of product characteristics, your smart-pump library and local
        critical care guidelines, and involve pharmacy for unlicensed or specialist use.
      </p>
    </PageSection>
  );
};

export default IcuDrugCards;

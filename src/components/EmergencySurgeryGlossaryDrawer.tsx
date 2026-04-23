import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Badge } from "@/components/ui/badge";

interface GlossaryTerm {
  term: string;
  expansion: string;
  definition: string;
  examTakeaway: string;
  tags: string[];
}

const TERMS: GlossaryTerm[] = [
  {
    term: "NELA",
    expansion: "National Emergency Laparotomy Audit",
    definition:
      "UK-wide audit (since 2013) of process and outcome standards for adults undergoing emergency laparotomy, publishing annual reports against defined care-bundle metrics.",
    examTakeaway:
      "Quote NELA Year 9 (2023): 30-day mortality ~9%; consultant surgeon AND anaesthetist required for high-risk (predicted mortality ≥5%) cases; CT within 1 hour for suspected sepsis/perforation.",
    tags: ["Final", "FFICM"],
  },
  {
    term: "NCEPOD",
    expansion: "National Confidential Enquiry into Patient Outcome and Death",
    definition:
      "Body that produced the 4-tier classification (Immediate, Urgent, Expedited, Elective) used to prioritise surgical timing and resource allocation.",
    examTakeaway:
      "Know all 4 categories with target times and a clinical example for each. Immediate (1) = resuscitation simultaneous with surgery (ruptured AAA); Urgent (2) = within hours (perforated viscus).",
    tags: ["Primary", "Final", "FFICM"],
  },
  {
    term: "P-POSSUM",
    expansion: "Portsmouth — Physiological and Operative Severity Score for the enUmeration of Mortality and morbidity",
    definition:
      "Two-part scoring system combining 12 physiological variables with 6 operative variables to predict 30-day morbidity and mortality after general surgery.",
    examTakeaway:
      "Tends to OVER-predict mortality in low-risk patients and UNDER-predict in the very highest risk. Used historically; NELA risk calculator now preferred for emergency laparotomy.",
    tags: ["Final", "FFICM"],
  },
  {
    term: "SORT",
    expansion: "Surgical Outcome Risk Tool",
    definition:
      "Pre-operative risk model derived from NCEPOD data using 6 variables (ASA, urgency, high-risk specialty, surgical severity, cancer, age) to predict 30-day mortality.",
    examTakeaway:
      "Useful as a quick pre-op screen to flag high-risk patients (>5% predicted mortality) for consultant input, HDU/ICU planning and shared decision-making conversations.",
    tags: ["Final"],
  },
  {
    term: "Sepsis-6",
    expansion: "UK Sepsis Trust care bundle",
    definition:
      "Six interventions to deliver within 1 hour of recognising sepsis: high-flow oxygen, blood cultures, IV antibiotics, IV fluids, serum lactate, and accurate urine output measurement.",
    examTakeaway:
      "Surviving Sepsis 2021 emphasises antibiotics within 1 hour for septic shock and balanced crystalloid 30 mL/kg. In emergency laparotomy, source control (surgery) IS part of resuscitation — do not delay.",
    tags: ["Primary", "Final", "FFICM"],
  },
];

export const EmergencySurgeryGlossaryDrawer = () => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <BookOpen className="h-4 w-4" />
          Glossary
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[85vh]">
        <div className="mx-auto w-full max-w-3xl">
          <DrawerHeader>
            <DrawerTitle className="font-serif text-2xl">Emergency Surgery Glossary</DrawerTitle>
            <DrawerDescription>
              Quick reference for tools, scores and bundles cited in this topic — with exam-style takeaways.
            </DrawerDescription>
          </DrawerHeader>

          <div className="px-4 pb-4 space-y-4 overflow-y-auto">
            {TERMS.map((t) => (
              <article
                key={t.term}
                className="rounded-lg border border-border bg-card p-4 space-y-2"
              >
                <header className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-foreground">{t.term}</h3>
                    <p className="text-xs text-muted-foreground italic">{t.expansion}</p>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {t.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-[10px]">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </header>

                <p className="text-sm text-foreground leading-relaxed">{t.definition}</p>

                <div className="rounded-md bg-clinical/10 border border-clinical/30 p-3">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-clinical mb-1">
                    Exam takeaway
                  </p>
                  <p className="text-sm text-foreground leading-relaxed">{t.examTakeaway}</p>
                </div>
              </article>
            ))}
          </div>

          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

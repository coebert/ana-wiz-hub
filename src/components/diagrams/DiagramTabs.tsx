import { ReactNode } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export interface DiagramTab {
  /** Stable tab id */
  value: string;
  /** Short label shown in the tab strip */
  label: string;
  /** Optional one-line caption shown above the diagram body */
  caption?: string;
  /** The diagram (or any node) rendered when the tab is active */
  content: ReactNode;
}

interface DiagramTabsProps {
  /** Heading rendered above the tab strip (e.g. "Coronary territory mapping") */
  title: string;
  /** Optional intro paragraph */
  description?: string;
  tabs: DiagramTab[];
  /** Tab to open by default — defaults to the first */
  defaultValue?: string;
}

/**
 * A scrollable, tabbed container that lets several related diagrams share a
 * single card. Use it to consolidate a topic page when there would otherwise
 * be too many stacked diagrams competing for attention.
 */
export const DiagramTabs = ({ title, description, tabs, defaultValue }: DiagramTabsProps) => {
  if (tabs.length === 0) return null;
  const initial = defaultValue ?? tabs[0].value;

  return (
        <section className="bg-card rounded-xl border border-border p-4 md:p-6">
      <div className="mb-4">
        <h3 className="text-base md:text-lg font-semibold text-foreground">{title}</h3>
        {description ? (
          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{description}</p>
        ) : null}
      </div>

      <Tabs defaultValue={initial} className="w-full">
        <ScrollArea className="w-full whitespace-nowrap">
          <TabsList className="h-auto flex-wrap justify-start gap-1 bg-muted/60 p-1">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value} className="text-xs md:text-sm">
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="mt-4 focus-visible:ring-0">
            {tab.caption ? (
              <p className="text-xs md:text-sm text-muted-foreground mb-3 italic">{tab.caption}</p>
            ) : null}
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
};

export default DiagramTabs;

import { useEffect, useState, useCallback } from "react";
import { RefreshCw, X } from "lucide-react";
import { setUpdateHandler, applyUpdate } from "@/lib/version-check";
import { Button } from "@/components/ui/button";

export function UpdateBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setUpdateHandler(() => setVisible(true));
    return () => setUpdateHandler(null);
  }, []);

  const handleRefresh = useCallback(() => {
    void applyUpdate();
  }, []);

  const handleDismiss = useCallback(() => {
    setVisible(false);
  }, []);

  if (!visible) return null;

  return (
    <div className="sticky top-14 z-40 w-full bg-primary/10 border-b border-primary/20 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-2">
        <p className="text-sm text-foreground">
          A new version of AnaesthesiaCore is available.
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <Button
            size="sm"
            onClick={handleRefresh}
            className="h-8 gap-1.5 text-xs"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Refresh now
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleDismiss}
            className="h-8 px-2 text-muted-foreground hover:text-foreground"
            aria-label="Dismiss update banner"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { HelpCircle, ChevronDown } from "lucide-react";

const MicHelpPanel = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-lg border border-border bg-muted/20">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-2 px-3 py-2 text-left"
        aria-expanded={open}
      >
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground">
          <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
          Mic not working? Enable permissions
        </span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="px-3 pb-3 pt-1 space-y-3 text-xs text-foreground leading-relaxed">
          <p className="text-muted-foreground">
            The viva uses your browser's built-in speech recognition. The page must be on{" "}
            <span className="font-medium text-foreground">https://</span> and you must grant
            microphone access.
          </p>

          <div>
            <p className="font-semibold text-foreground mb-1">iOS Safari (iPhone / iPad)</p>
            <ol className="list-decimal pl-4 space-y-0.5 text-muted-foreground">
              <li>Tap the <span className="font-medium text-foreground">"aA"</span> icon in the address bar → <span className="font-medium text-foreground">Website Settings</span>.</li>
              <li>Set <span className="font-medium text-foreground">Microphone</span> to <span className="font-medium text-foreground">Allow</span>.</li>
              <li>If still blocked: <span className="font-medium text-foreground">Settings app → Safari → Microphone</span> and allow this site.</li>
              <li>Note: live dictation works best in iOS 14.5+. If "Start answering" does nothing, try Chrome on desktop instead.</li>
            </ol>
          </div>

          <div>
            <p className="font-semibold text-foreground mb-1">Android Chrome</p>
            <ol className="list-decimal pl-4 space-y-0.5 text-muted-foreground">
              <li>Tap the <span className="font-medium text-foreground">lock / tune icon</span> left of the URL → <span className="font-medium text-foreground">Permissions</span>.</li>
              <li>Set <span className="font-medium text-foreground">Microphone</span> to <span className="font-medium text-foreground">Allow</span>, then reload the page.</li>
              <li>If blocked system-wide: <span className="font-medium text-foreground">Android Settings → Apps → Chrome → Permissions → Microphone → Allow</span>.</li>
            </ol>
          </div>

          <div>
            <p className="font-semibold text-foreground mb-1">Desktop Chrome / Edge</p>
            <ol className="list-decimal pl-4 space-y-0.5 text-muted-foreground">
              <li>Click the <span className="font-medium text-foreground">lock / tune icon</span> left of the URL → <span className="font-medium text-foreground">Site settings</span>.</li>
              <li>Set <span className="font-medium text-foreground">Microphone</span> to <span className="font-medium text-foreground">Allow</span> and reload.</li>
              <li>Check the OS too: <span className="font-medium text-foreground">macOS → System Settings → Privacy & Security → Microphone</span>, or <span className="font-medium text-foreground">Windows → Settings → Privacy → Microphone</span> — make sure your browser is enabled.</li>
              <li>Close other apps that might be holding the mic (Zoom, Teams, Meet).</li>
            </ol>
          </div>

          <p className="text-muted-foreground">
            Firefox and Safari on Mac have limited support for live speech recognition — Chrome or
            Edge give the best result.
          </p>
        </div>
      )}
    </div>
  );
};

export default MicHelpPanel;

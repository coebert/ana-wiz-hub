import {
  Component,
  Suspense,
  useEffect,
  useState,
  type ErrorInfo,
  type ReactNode,
} from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { diagramSnapshotRegistry } from "@/components/diagrams/__snapshot-registry.generated";

/**
 * Dev-only sandbox route used by the visual snapshot test suite.
 *
 *   /dev/diagram-snapshot/:name        → mount one diagram by registry key
 *   /dev/diagram-snapshot               → JSON index of available names
 *
 * The page injects a stylesheet that freezes CSS animations / transitions
 * and signals readiness via `document.body[data-snapshot-ready="true"]`
 * after two animation frames so Playwright can wait deterministically.
 *
 * Diagrams that throw when mounted with no props are caught by the local
 * error boundary and reported as `data-snapshot-status="error"` so the
 * spec can `test.skip` them instead of erroring the run.
 */

class DiagramErrorBoundary extends Component<
  { children: ReactNode; onError: (msg: string) => void },
  { error: Error | null }
> {
  state = { error: null as Error | null };
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  componentDidCatch(error: Error, _info: ErrorInfo) {
    this.props.onError(error.message);
  }
  render() {
    if (this.state.error) {
      return (
        <div
          data-snapshot-error
          style={{ padding: 24, fontFamily: "monospace", fontSize: 12 }}
        >
          render error: {this.state.error.message}
        </div>
      );
    }
    return this.props.children;
  }
}

const FREEZE_CSS = `
  *, *::before, *::after {
    animation-duration: 0s !important;
    animation-delay: 0s !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0s !important;
    transition-delay: 0s !important;
    caret-color: transparent !important;
  }
  html, body { background: #ffffff !important; }
`;

function useSnapshotReady(status: "loading" | "ready" | "error") {
  useEffect(() => {
    document.body.dataset.snapshotStatus = status;
    if (status === "loading") {
      document.body.dataset.snapshotReady = "false";
      return;
    }
    // Two RAFs so layout + any post-mount measurement effects have settled.
    let frame2 = 0;
    const frame1 = requestAnimationFrame(() => {
      frame2 = requestAnimationFrame(() => {
        document.body.dataset.snapshotReady = "true";
      });
    });
    return () => {
      cancelAnimationFrame(frame1);
      cancelAnimationFrame(frame2);
    };
  }, [status]);
}

export default function DiagramSnapshot() {
  const { name } = useParams<{ name: string }>();
  const [errored, setErrored] = useState(false);

  // Index view — useful for humans browsing the sandbox.
  if (!name) {
    const names = Object.keys(diagramSnapshotRegistry);
    return (
      <div style={{ padding: 24, fontFamily: "monospace" }}>
        <Helmet>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <h1>Diagram snapshot sandbox</h1>
        <p>{names.length} registered diagrams</p>
        <ul>
          {names.map((n) => (
            <li key={n}>
              <a href={`/dev/diagram-snapshot/${n}`}>{n}</a>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const Diagram = diagramSnapshotRegistry[name];
  const status: "loading" | "ready" | "error" = !Diagram
    ? "error"
    : errored
      ? "error"
      : "ready";

  useSnapshotReady(status);

  if (!Diagram) {
    return (
      <div data-snapshot-unknown style={{ padding: 24, fontFamily: "monospace" }}>
        Unknown diagram: {name}
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <style dangerouslySetInnerHTML={{ __html: FREEZE_CSS }} />
      <div
        data-snapshot-target
        data-diagram-name={name}
        style={{
          padding: 16,
          maxWidth: 960,
          margin: "0 auto",
          background: "#ffffff",
        }}
      >
        <DiagramErrorBoundary onError={() => setErrored(true)}>
          <Suspense
            fallback={
              <div data-snapshot-loading style={{ padding: 24 }}>
                loading…
              </div>
            }
          >
            <Diagram />
          </Suspense>
        </DiagramErrorBoundary>
      </div>
    </>
  );
}

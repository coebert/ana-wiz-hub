import { fireEvent, render, screen } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

const session = vi.hoisted(() => ({ value: {} as Record<string, unknown> }));
const auth = vi.hoisted(() => ({ value: {} as Record<string, unknown> }));

vi.mock("@/hooks/useBase44AdminSession", () => ({
  useBase44AdminSession: () => session.value,
}));
vi.mock("@/hooks/useAuth", () => ({ useAuth: () => auth.value }));

import { Base44AdminGate } from "@/components/layout/Base44AdminGate";
import { RequireAdmin } from "@/components/layout/RequireAdmin";

const base44 = (status: string, error: string | null = null) => ({
  enabled: true,
  status,
  userId: status === "admin" ? "user-admin" : null,
  error,
  refresh: vi.fn(),
  signIn: vi.fn(),
  signOut: vi.fn(),
});

const supabaseAuth = (user: unknown, isAdmin = false, loading = false) => ({
  user,
  session: null,
  isAdmin,
  loading,
  signIn: vi.fn(),
  signOut: vi.fn(),
});

const renderAdmin = (element: JSX.Element) =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={["/admin"]}>
        <Routes>
          <Route path="/admin" element={element} />
          <Route path="/admin/login" element={<div>admin login</div>} />
        </Routes>
      </MemoryRouter>
    </HelmetProvider>
  );

describe("Base44 admin gate", () => {
  it("waits while the server session is being resolved", () => {
    session.value = base44("checking");
    renderAdmin(
      <Base44AdminGate>
        <div>admin panel</div>
      </Base44AdminGate>
    );
    expect(screen.getByText("Checking access…")).toBeInTheDocument();
    expect(screen.queryByText("admin panel")).not.toBeInTheDocument();
  });

  it("sends a signed-out visitor to the admin login", () => {
    session.value = base44("signedOut");
    renderAdmin(
      <Base44AdminGate>
        <div>admin panel</div>
      </Base44AdminGate>
    );
    expect(screen.getByText("admin login")).toBeInTheDocument();
    expect(screen.queryByText("admin panel")).not.toBeInTheDocument();
  });

  it("shows access denied to a signed-in non-admin", () => {
    session.value = base44("denied");
    renderAdmin(
      <Base44AdminGate>
        <div>admin panel</div>
      </Base44AdminGate>
    );
    expect(screen.getByRole("heading", { name: "Access denied" })).toBeInTheDocument();
    expect(screen.queryByText("admin panel")).not.toBeInTheDocument();
  });

  it("fails closed and offers a retry when the server cannot be reached", () => {
    session.value = base44("error", "Could not verify admin access.");
    renderAdmin(
      <Base44AdminGate>
        <div>admin panel</div>
      </Base44AdminGate>
    );
    expect(
      screen.getByRole("heading", { name: "Access could not be verified" })
    ).toBeInTheDocument();
    expect(screen.queryByText("admin panel")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Try again" }));
    expect(session.value.refresh).toHaveBeenCalledTimes(1);
  });

  it("renders the admin content only for a server-confirmed admin session", () => {
    session.value = base44("admin");
    renderAdmin(
      <Base44AdminGate>
        <div>admin panel</div>
      </Base44AdminGate>
    );
    expect(screen.getByText("admin panel")).toBeInTheDocument();
  });
});

describe("RequireAdmin default (Supabase) behaviour", () => {
  it("keeps the existing loading, redirect and denial states when the flag is off", () => {
    session.value = { enabled: false, status: "disabled" };

    auth.value = supabaseAuth(null, false, true);
    const loading = renderAdmin(
      <RequireAdmin>
        <div>admin panel</div>
      </RequireAdmin>
    );
    expect(screen.getByText("Checking access…")).toBeInTheDocument();
    loading.unmount();

    auth.value = supabaseAuth(null);
    const anonymous = renderAdmin(
      <RequireAdmin>
        <div>admin panel</div>
      </RequireAdmin>
    );
    expect(screen.getByText("admin login")).toBeInTheDocument();
    anonymous.unmount();

    auth.value = supabaseAuth({ id: "user-member" });
    const member = renderAdmin(
      <RequireAdmin>
        <div>admin panel</div>
      </RequireAdmin>
    );
    expect(screen.getByRole("heading", { name: "Access denied" })).toBeInTheDocument();
    member.unmount();

    auth.value = supabaseAuth({ id: "user-admin" }, true);
    renderAdmin(
      <RequireAdmin>
        <div>admin panel</div>
      </RequireAdmin>
    );
    expect(screen.getByText("admin panel")).toBeInTheDocument();
  });

  it("defers to the Base44 gate when the opt-in flag is on", () => {
    session.value = base44("admin");
    auth.value = supabaseAuth(null);
    renderAdmin(
      <RequireAdmin>
        <div>admin panel</div>
      </RequireAdmin>
    );
    expect(screen.getByText("admin panel")).toBeInTheDocument();
  });
});

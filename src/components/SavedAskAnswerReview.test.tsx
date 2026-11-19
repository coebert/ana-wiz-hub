import { act, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { SavedAskAnswerReview } from "./SavedAskAnswerReview";

function view(body: string) {
  return <MemoryRouter><SavedAskAnswerReview text={body}><p>Original assistant response</p></SavedAskAnswerReview></MemoryRouter>;
}

function fromHex(hex: string) {
  return Uint8Array.from(hex.match(/../g)!, (byte) => parseInt(byte, 16)).buffer;
}

afterEach(() => vi.unstubAllGlobals());

describe("historical Ask answer corrections", () => {
  it.each([
    [3021, "f975735f57f741f74410b6bf077fd4148b61fa00d29603ecf327bf04f2c149de", "/clinical/trauma-emergency"],
    [1899, "8a51ee6385fc43c4e3e74ebdedd63a1c8a32e6437bcdd1cf8359adc3a6a28e25", "/intensive-care/transfusion-coagulation"],
    [4524, "f2f4043c83029c5b0b86415e7987e2fa835ab8c2d22c38561205afa598695447", "/intensive-care/transfusion-coagulation"],
    [1495, "a50aeb7326971b74a8f1ad48e6411d89188ee0c3ab2351f08dd08c488ef01aca", "/physics/capnography"],
  ] as const)("checks a saved edition of length %i before displaying text", async (length, hash, path) => {
    const digest = vi.fn().mockResolvedValue(fromHex(hash));
    vi.stubGlobal("crypto", { subtle: { digest } });
    const body = "x".repeat(length);
    render(view(" \n" + body + "\n"));
    expect(screen.queryByText("Original assistant response")).toBeNull();
    expect(await screen.findByText("Clinical correction to this saved answer")).toBeVisible();
    expect(screen.getByRole("link")).toHaveAttribute("href", path);
    expect(new TextDecoder().decode(digest.mock.calls[0][1])).toBe(body);
    expect(screen.queryByText("Original assistant response")).toBeNull();
  });

  it("checks only the shared answer inside the dated legacy wrapper", async () => {
    const hash = "a50aeb7326971b74a8f1ad48e6411d89188ee0c3ab2351f08dd08c488ef01aca";
    const digest = vi.fn().mockResolvedValue(fromHex(hash));
    vi.stubGlobal("crypto", { subtle: { digest } });
    const body = "x\n\n---\n\n".padEnd(1495, "y");
    const wrapped = '**This question is already in the shared Ask AnaesthesiaCore library** — here\'s the answer saved on 10 Oct 2026 for "_Example_":\n\n---\n\n' + body + "\n\n---\n\n_If this isn't quite what you meant, rephrase the question to get a fresh answer._";
    render(view(wrapped));
    expect(await screen.findByText("Clinical correction to this saved answer")).toBeVisible();
    expect(new TextDecoder().decode(digest.mock.calls[0][1])).toBe(body);
  });

  it("keeps unrelated answers readable, including same-length text after fingerprint comparison", async () => {
    const digest = vi.fn().mockResolvedValue(new ArrayBuffer(32));
    vi.stubGlobal("crypto", { subtle: { digest } });
    const { rerender } = render(view("An unrelated answer."));
    expect(screen.getByText("Original assistant response")).toBeVisible();
    expect(digest).not.toHaveBeenCalled();
    rerender(view("y".repeat(1495)));
    expect(screen.queryByText("Original assistant response")).toBeNull();
    expect(await screen.findByText("Original assistant response")).toBeVisible();
    expect(screen.queryByText("Clinical correction to this saved answer")).toBeNull();
  });

  it("keeps unrelated answers readable when Web Crypto is unavailable and ignores an earlier result", async () => {
    let resolvePrevious!: (buffer: ArrayBuffer) => void;
    const digest = vi.fn().mockReturnValueOnce(new Promise<ArrayBuffer>((resolve) => { resolvePrevious = resolve; })).mockRejectedValueOnce(new Error("unavailable"));
    vi.stubGlobal("crypto", { subtle: { digest } });
    const { rerender } = render(view("x".repeat(1495)));
    rerender(view("y".repeat(1495)));
    expect(await screen.findByText("Original assistant response")).toBeVisible();
    await act(async () => resolvePrevious(fromHex("a50aeb7326971b74a8f1ad48e6411d89188ee0c3ab2351f08dd08c488ef01aca")));
    expect(screen.getByText("Original assistant response")).toBeVisible();
  });
});

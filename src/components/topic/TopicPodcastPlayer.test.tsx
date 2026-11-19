import { render, screen } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { fetchPodcast, fetchRecordedVoices } from "@/lib/podcast";
import { TopicPodcastPlayer } from "./TopicPodcastPlayer";

vi.mock("@/hooks/useAuth", () => ({ useAuth: () => ({ isAdmin: false }) }));
vi.mock("@/lib/podcastJobs", () => ({
  getPodcastJob: () => undefined,
  usePodcastJob: () => undefined,
}));
vi.mock("@/lib/podcast", () => ({
  fetchPodcast: vi.fn(),
  fetchRecordedVoices: vi.fn(),
  isStaleGenerating: () => false,
}));

function renderCachedRecording(filename: string) {
  vi.mocked(fetchPodcast).mockResolvedValue({
    status: "ready",
    audio_url: `https://example.org/podcasts/${filename}?v=old`,
    script: "Cached transcript",
  });
  return render(
    <HelmetProvider>
      <TopicPodcastPlayer topicId="gi-physiology" topicTitle="Gastrointestinal Physiology" />
    </HelmetProvider>,
  );
}

describe("clinical recording holds on topic pages", () => {
  beforeEach(() => {
    vi.mocked(fetchRecordedVoices).mockResolvedValue(["british-west-country"]);
  });

  it("withholds a previously cached original from playback and download", async () => {
    const { container } = renderCachedRecording("gi-physiology.mp3");
    expect(await screen.findByText("Recording temporarily withdrawn")).toBeInTheDocument();
    expect(container.querySelector("audio")).toBeNull();
    expect(screen.queryByRole("button", { name: "Download MP3" })).not.toBeInTheDocument();
  });

  it("allows an unaffected voice for the same topic", async () => {
    const { container } = renderCachedRecording("gi-physiology--british-west-country.mp3");
    expect(await screen.findByRole("button", { name: "Play" })).toBeInTheDocument();
    expect(container.querySelector("audio")?.src).toContain("gi-physiology--british-west-country.mp3");
    expect(screen.getByRole("button", { name: "Download MP3" })).toBeInTheDocument();
  });
});

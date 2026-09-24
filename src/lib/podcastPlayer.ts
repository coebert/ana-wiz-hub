import { useSyncExternalStore } from "react";

export interface PlayerTrack {
  key: string;
  title: string;
  subtitle?: string;
  src: string;
  topicPath?: string | null;
}

interface PlayerState {
  track: PlayerTrack | null;
  list: PlayerTrack[];
  playing: boolean;
  autoAdvance: boolean;
}

let state: PlayerState = { track: null, list: [], playing: false, autoAdvance: true };
const listeners = new Set<() => void>();
let audio: HTMLAudioElement | null = null;

const emit = (patch: Partial<PlayerState>) => {
  state = { ...state, ...patch };
  listeners.forEach((l) => l());
};

export const getAudio = () => {
  if (typeof window === "undefined") return null;
  if (!audio) {
    audio = new Audio();
    audio.preload = "metadata";
    audio.addEventListener("play", () => emit({ playing: true }));
    audio.addEventListener("pause", () => emit({ playing: false }));
    audio.addEventListener("ended", () => {
      emit({ playing: false });
      if (state.autoAdvance) skip(1);
    });
  }
  return audio;
};

export function playTrack(track: PlayerTrack, list?: PlayerTrack[], autoAdvance = true) {
  const a = getAudio();
  if (!a) return;
  if (state.track?.key === track.key) {
    emit({ list: list ?? state.list, autoAdvance });
    a.play().catch(() => {});
    return;
  }
  emit({ track, list: list ?? [track], autoAdvance });
  a.src = track.src;
  a.play().catch(() => {});
}

export function togglePlay() {
  const a = getAudio();
  if (!a || !state.track) return;
  if (a.paused) a.play().catch(() => {});
  else a.pause();
}

export function skip(offset: number) {
  const idx = state.list.findIndex((t) => t.key === state.track?.key);
  const next = state.list[idx + offset];
  if (idx !== -1 && next) playTrack(next, state.list, state.autoAdvance);
}

export function closePlayer() {
  const a = getAudio();
  a?.pause();
  if (a) a.removeAttribute("src");
  emit({ track: null, playing: false });
}

export function usePodcastPlayer() {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => state,
    () => state,
  );
}

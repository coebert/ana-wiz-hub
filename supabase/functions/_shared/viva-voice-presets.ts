// Installed clients may send a role name or a previously saved voice name.
// Named presets use distinct Base44 voices. The synthesis engine supplies the timbre.
const presets = new Map<string, string>([
  ["alloy", "alloy"], ["onyx", "onyx"], ["nova", "nova"],
  ["Kore", "alloy"], ["Charon", "onyx"], ["Aoede", "nova"],
  ["Puck", "verse"], ["Fenrir", "ash"], ["Leda", "shimmer"],
  ["Orus", "cedar"], ["Zephyr", "coral"],
]);

export function vivaVoicePreset(voice: unknown): string | undefined {
  return typeof voice === "string" ? presets.get(voice) : undefined;
}

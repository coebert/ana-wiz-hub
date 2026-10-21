/** Original 2004 PCI score; not calibrated for general ICU CT exposure. */
export function mehranScore(checked: Record<string, boolean>, contrastMl: string, egfr: string) {
  if (!contrastMl.trim() || !egfr.trim()) return null;
  const volume = Number(contrastMl);
  const filtration = Number(egfr);
  if (!Number.isFinite(volume) || !Number.isFinite(filtration) || volume < 0 || filtration < 0) return null;
  const weights: Record<string, number> = { hypotension: 5, iabp: 5, chf: 5, age: 4, anaemia: 3, diabetes: 3 };
  const clinical = Object.entries(weights).reduce((sum, [id, weight]) => sum + (checked[id] ? weight : 0), 0);
  const renal = filtration < 20 ? 6 : filtration < 40 ? 4 : filtration <= 60 ? 2 : 0;
  return clinical + Math.floor(volume / 100) + renal;
}

export function mehranBandIndex(score: number) {
  return score <= 5 ? 0 : score <= 10 ? 1 : score <= 16 ? 2 : 3;
}
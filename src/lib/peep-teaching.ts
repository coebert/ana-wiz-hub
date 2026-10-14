/** Timing arithmetic only: not a ventilator simulator or prescription. */
export function breathTiming(rate: number, inspiratoryTime: number) {
  if (!Number.isFinite(rate) || !Number.isFinite(inspiratoryTime) || rate <= 0 || inspiratoryTime <= 0) return null;
  const cycle = 60 / rate;
  const expiration = cycle - inspiratoryTime;
  if (expiration <= 0) return null;
  return { cycle, expiration, expiratoryRatio: expiration / inspiratoryTime };
}
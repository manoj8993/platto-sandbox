// Small helpers for "HH:MM" times. Times are plain strings so they are easy to read in the data.

export function nowHHMM(): string {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

export function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
}

export function addMinutes(hhmm: string, minutes: number): string {
  const total = (toMinutes(hhmm) + minutes + 24 * 60) % (24 * 60);
  return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
}

/** Minutes the current ETA is behind the time promised at checkout (0 if on time). */
export function minutesLate(promisedTime: string, etaTime: string): number {
  return Math.max(0, toMinutes(etaTime) - toMinutes(promisedTime));
}

/**
 * Display-only typography helper: keeps a label and its number together
 * ("No. 760", "H.R. 3305") with a non-breaking space so they never split across lines.
 * The underlying copy is unchanged.
 */
export function keepUnits(text: string): string {
  return text.replace(/\b(No\.|H\.R\.|S\.|Opinion|Day) (\d)/g, "$1\u00a0$2");
}

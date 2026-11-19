/**
 * Display-only typography helper: keeps a label and its number together
 * ("No. 760", "H.R. 3305") with a non-breaking space so they never split across lines.
 * The underlying copy is unchanged.
 */
export function keepUnits(text: string): string {
  return text.replace(/\b(No\.|H\.R\.|S\.|Opinion|Day) (\d)/g, "$1\u00a0$2");
}

const NBSP = String.fromCharCode(0xa0); // no-break space
/** Longest run of words the title rule glues together, so a glued run never outgrows a phone card. */
const MAX_RUN = 26;

/**
 * The one title rule (display only, her words unchanged; DESIGN.md "Titles"), in this order:
 * 1. "&" stays with the next word, and the word before "&" stays with its own predecessor (no lone word before "&");
 * 2. the last two words stay together (no lone last word);
 * 3. with two or more break points left, the first two words stay together (no lone first word);
 * 4. one- or two-letter words ("A", "of") stay with the next word.
 * A glue that would make a run longer than MAX_RUN characters is skipped. Titles that fit stay on one line.
 * Also applies keepUnits.
 */
export function titleText(text: string, maxRun: number = MAX_RUN): string {
  const words = keepUnits(text).split(" ").filter(Boolean);
  const n = words.length;
  if (n < 3) return words.join(" ");
  const glue: boolean[] = new Array(n - 1).fill(false); // glue[i] joins words[i] and words[i + 1]
  const runLen = (i: number) => {
    let a = i;
    let b = i + 1;
    while (a > 0 && glue[a - 1]) a--;
    while (b < n - 1 && glue[b]) b++;
    return words.slice(a, b + 1).join(" ").length;
  };
  const tryGlue = (i: number) => {
    if (i >= 0 && i < n - 1 && !glue[i] && runLen(i) <= maxRun) glue[i] = true;
  };
  words.forEach((w, i) => {
    if (w === "&") {
      tryGlue(i);
      tryGlue(i - 2);
    }
  });
  tryGlue(n - 2);
  if (glue.filter((g) => !g).length >= 2) tryGlue(0);
  words.forEach((w, i) => {
    if (/^[A-Za-z]{1,2}$/.test(w)) tryGlue(i);
  });
  return words.reduce((out, w, i) => (i === 0 ? w : out + (glue[i - 1] ? NBSP : " ") + w), "");
}

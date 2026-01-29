import { CHO_STD, JUNG_STD } from "../constants/hangulTables.js";

export function compose(cho, jung) {
  const choI = CHO_STD.indexOf(cho);
  const jungI = JUNG_STD.indexOf(jung);
  const code = 0xAC00 + (choI * 21 + jungI) * 28; // 종성 0(받침 없음)
  return String.fromCharCode(code);
}

export function decomposeCV(syllable) {
  const code = syllable.charCodeAt(0) - 0xAC00;
  if (code < 0 || code > (19 * 21 * 28 - 1)) return [null, null];
  const choI = Math.floor(code / (21 * 28));
  const jungI = Math.floor((code % (21 * 28)) / 28);
  return [CHO_STD[choI], JUNG_STD[jungI]];
}
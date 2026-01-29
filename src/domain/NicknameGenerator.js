import { STYLE_PRESETS } from "../constants/presets.js";
import { BANNED } from "../constants/bannedWords.js";
import { compose, decomposeCV } from "../utils/hangul.js";
import { choice } from "../utils/random.js";

export class NicknameGenerator {
  generateNicknames({ count, style, length }) {
    const out = [];
    const seen = new Set();
    let guard = 0;

    while (out.length < count && guard < count * 60) {
      guard++;
      const n = this.#makeNickname(style, length);
      if (!n) break;
      if (seen.has(n)) continue;
      seen.add(n);
      out.push(n);
    }
    return out;
  }

  #makeNickname(styleName, length, maxTries = 9000) {
    const preset = STYLE_PRESETS[styleName] || STYLE_PRESETS["밸런스"];

    for (let t = 0; t < maxTries; t++) {
      let name = "";
      let prev = "";

      for (let i = 0; i < length; i++) {
        // 첫/끝: strong, 가운데: soft (리듬)
        const choPool = (i === 0 || i === length - 1) ? preset.choStrong : preset.choSoft;
        const jungPool = preset.jung;

        const syl = compose(choice(choPool), choice(jungPool));
        if (!this.#isGood(prev, syl)) { name = ""; break; }
        name += syl;
        prev = syl;
      }

      if (name.length === length && !this.#isBanned(name)) return name;
    }
    return null;
  }

  #isGood(prevSyl, curSyl) {
    if (!prevSyl) return true;
    if (prevSyl === curSyl) return false;

    const [c1, v1] = decomposeCV(prevSyl);
    const [c2, v2] = decomposeCV(curSyl);
    if (c1 === c2) return false; // 초성 연속 금지
    if (v1 === v2) return false; // 모음 연속 금지
    return true;
  }

  #isBanned(name) {
    for (const w of BANNED) {
      if (w && name.includes(w)) return true;
    }
    return false;
  }
}
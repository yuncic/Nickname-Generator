import { repeat } from "../utils/random.js";

// 요청 반영:
// - 테토 강화: ㄱㄷㅂㅅㅈㅋㅌㅍ 비중↑, 모음 ㅏㅗㅜ 위주
// - 에겐 강화: ㅇㄴㄹㅁ 위주, 모음 ㅣㅐㅔ 비중↑
// - 튀는 모음 제거: ㅘ/ㅚ/ㅙ/ㅞ/ㅢ 등 사용 안함 (풀에 없음)

export const STYLE_PRESETS = {
  "테토력 뿜뿜": {
    choStrong: repeat([... "ㄱㄷㅂㅅㅈㅋㅌㅍ"], 4).concat(["ㅎ"]),
    choSoft:   repeat([... "ㄴㄹㅁㅇ"], 2).concat(["ㅎ"]),
    jung:      repeat([... "ㅏㅗㅜ"], 6).concat([... "ㅓㅡㅣ"]),
  },
  "에겐력 뿜뿜": {
    choStrong: repeat([... "ㅇㄴㄹㅁ"], 5).concat(["ㅎ"]),
    choSoft:   repeat([... "ㅇㄴㄹㅁㅂㅅㅈ"], 2),
    jung:      repeat([... "ㅣㅐㅔ"], 6).concat([... "ㅓㅏㅡ"]),
  },
  "밸런스": {
    choStrong: [... "ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅋㅌㅍㅎ"],
    choSoft:   [... "ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎ"],
    jung:      [... "ㅏㅓㅗㅜㅡㅣㅐㅔ"],
  },
};
import { NicknameGenerator } from "../domain/NicknameGenerator.js";
import { copyText } from "../utils/clipboard.js";

export class NicknameController {
  #els;
  #generator;

  constructor(els) {
    this.#els = els;
    this.#generator = new NicknameGenerator();
  }

  init() {
    const { genBtn, copyAllBtn, copySelectedBtn, outEl } = this.#els;

    genBtn.addEventListener("click", () => this.#handleGenerate());
    copyAllBtn.addEventListener("click", () => this.#handleCopyAll());
    copySelectedBtn.addEventListener("click", () => this.#handleCopySelected());

    // 선택 상태에 따라 버튼 활성/비활성
    const update = () => this.#updateSelectedCopyState();
    outEl.addEventListener("select", update);
    outEl.addEventListener("keyup", update);
    outEl.addEventListener("mouseup", update);

    this.#updateSelectedCopyState();
  }

  #handleGenerate() {
    const { countEl, styleEl, lengthEl, outEl, statusEl } = this.#els;

    const count = Number(countEl.value);
    const length = Number(lengthEl.value);
    const style = styleEl.value;

    if (!Number.isInteger(count) || count < 1 || count > 2000) {
      alert("개수는 1~2000 사이로 입력해줘!");
      return;
    }
    if (![2,3,4].includes(length)) {
      alert("글자 수는 2/3/4만 가능!");
      return;
    }

    const results = this.#generator.generateNicknames({ count, style, length });

    outEl.value = results.join("\n");
    statusEl.textContent = `요청: ${count}개 / 생성: ${results.length}개 / 스타일: ${style} / 글자 수: ${length}`;

    this.#updateSelectedCopyState();
  }

  async #handleCopyAll() {
    const { outEl } = this.#els;
    const text = outEl.value.trim();
    if (!text) {
      alert("복사할 내용이 없어!");
      return;
    }
    await copyText(text);
    alert("전체 복사 완료!");
  }

  async #handleCopySelected() {
    const { outEl } = this.#els;
    const sel = outEl.value.substring(outEl.selectionStart, outEl.selectionEnd).trim();
    if (!sel) {
      alert("선택된 내용이 없어!");
      return;
    }
    await copyText(sel);
    alert("선택 복사 완료!");
  }

  #updateSelectedCopyState() {
    const { outEl, copySelectedBtn } = this.#els;
    const sel = outEl.value.substring(outEl.selectionStart, outEl.selectionEnd);
    copySelectedBtn.disabled = sel.trim().length === 0;
  }
}
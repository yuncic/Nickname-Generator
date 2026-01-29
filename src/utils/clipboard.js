export async function copyText(text) {
  if (!navigator.clipboard) {
    // 일부 환경 fallback
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
    return;
  }
  await navigator.clipboard.writeText(text);
}
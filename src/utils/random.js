export function choice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function repeat(arr, times) {
  const out = [];
  for (let i = 0; i < times; i++) out.push(...arr);
  return out;
}
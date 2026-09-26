export function bar(ratio: number, width = 40): string {
  const n = Math.max(0, Math.min(width, Math.round(ratio * width)));
  const target = Math.floor(width / 2);
  return Array.from({ length: width }, (_, i) => (i < n ? "#" : i === target ? "|" : ".")).join("");
}

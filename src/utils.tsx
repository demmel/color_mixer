import { ColorArray } from "mixbox";

export function parseColorString(color: string): [number, number, number] {
  if (color.startsWith("#")) {
    const hex = color.slice(1);
    return [
      parseInt(hex.slice(0, 2), 16),
      parseInt(hex.slice(2, 4), 16),
      parseInt(hex.slice(4, 6), 16),
    ];
  }
  return [0, 0, 0];
}
export function rgbToHex(color: ColorArray): string {
  return `#${color
    .map((c) => {
      const hex = c.toString(16);
      return hex.length === 1 ? `0${hex}` : hex;
    })
    .join("")}`;
}

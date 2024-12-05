declare module "mixbox" {
  type ColorArray = [number, number, number];

  type Color = ColorArray | string | { r: number; g: number; b: number };

  function lerp(a: Color, b: Color, t: number): ColorArray;
}

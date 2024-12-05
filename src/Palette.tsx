import React from "react";
import { ColorSwatch } from "./ColorSwatch";

export function Palette({ colors }: { colors: string[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {colors.map((color) => (
        <ColorSwatch
          key={color}
          color={color}
          style={{ width: 32, height: 32 }}
        />
      ))}
    </div>
  );
}

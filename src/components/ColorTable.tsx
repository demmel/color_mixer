import React from "react";
import mixbox from "mixbox";
import { rgbToHex } from "../utils";
import { ColorSwatch } from "./ColorSwatch";

type Props = {
  colors: string[];
  onChoose?: (color: string) => void;
  ratio: number;
};

export function ColorTable({ colors, onChoose: onClick, ratio }: Props) {
  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ width: 32, height: 32 }} />
        <div
          style={{
            flexGrow: 1,
            height: 32,
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          {Math.round(ratio * 100)}%
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div
          style={{
            width: 32,
            height: colors.length * 32 + 32,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 32,
          }}
        >
          {Math.round(100 * (1 - ratio))}%
        </div>
        <div
          style={{
            border: "2px solid black",
            boxSizing: "border-box",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ width: 32, height: 32 }} />
            {colors.map((color, i) => (
              <ColorSwatch
                key={color + "-h-" + i}
                color={color}
                style={{
                  width: 32,
                  height: 32,
                  borderBottom: "2px solid black",
                  boxSizing: "border-box",
                }}
              />
            ))}
          </div>
          {colors.map((color1, i) => (
            <div style={{ display: "flex", flexDirection: "row" }}>
              <ColorSwatch
                key={color1 + "-" + i}
                color={color1}
                style={{
                  width: 32,
                  height: 32,
                  borderRight: "2px solid black",
                  boxSizing: "border-box",
                }}
              />
              {colors.map((color2, j) => {
                const mixed = mixbox.lerp(color1, color2, ratio);
                const hex = rgbToHex(mixed);
                return (
                  <ColorSwatch
                    key={color1 + "-" + color2 + "-" + i + "-" + j}
                    color={hex}
                    style={{ width: 32, height: 32 }}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

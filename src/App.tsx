import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import { ChromePicker } from "react-color";
import mixbox, { Color, ColorArray } from "mixbox";

function parseColorString(color: string): [number, number, number] {
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

function rgbToHex(color: ColorArray): string {
  return `#${color
    .map((c) => {
      const hex = c.toString(16);
      return hex.length === 1 ? `0${hex}` : hex;
    })
    .join("")}`;
}

function shouldUseBlackForeground(hex: string): boolean {
  const [r, g, b] = parseColorString(hex);
  return r * 0.299 + g * 0.587 + b * 0.114 > 186;
}

function ColorSwatch({
  color,
  withLabel,
  style,
  onClick,
}: {
  color: string;
  withLabel?: boolean;
  style?: React.CSSProperties;
  onClick?: () => void;
}) {
  return (
    <div
      style={{
        backgroundColor: color,
        color: shouldUseBlackForeground(color) ? "#000" : "#fff",
        ...style,
      }}
      onClick={onClick}
    >
      {withLabel ? color : ""}
    </div>
  );
}

function ColorTable({
  colors,
  onClick,
  ratio,
}: {
  colors: string[];
  onClick?: (color: string) => void;
  ratio: number;
}) {
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
          {Math.round(100 * (1.0 - ratio))}%
        </div>
        <div
          style={{
            border: "2px solid black",
            boxSizing: "border-box",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ width: 32, height: 32 }} />
            {colors.map((color) => (
              <ColorSwatch
                key={color}
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
          {colors.map((color1) => (
            <div style={{ display: "flex", flexDirection: "row" }}>
              <ColorSwatch
                key={color1}
                color={color1}
                style={{
                  width: 32,
                  height: 32,
                  borderRight: "2px solid black",
                  boxSizing: "border-box",
                }}
              />
              {colors.map((color2) => {
                const mixed = mixbox.lerp(color1, color2, ratio);
                const hex = rgbToHex(mixed);
                return (
                  <ColorSwatch
                    key={color2}
                    color={hex}
                    onClick={() => onClick && onClick(hex)}
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

function App() {
  const [baseColors, setBaseColors] = useState<string[]>([]);
  const [color, setColor] = useState<string>("#ffffff");
  const [ratio, setRatio] = useState<number>(0.5);

  return (
    <div className="App">
      <ChromePicker
        disableAlpha={true}
        color={color}
        onChange={({ hex }) => setColor(hex)}
      />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ marginRight: 16 }}>
          <h2>Colors</h2>
          <button onClick={() => setBaseColors([...baseColors, color])}>
            Add color
          </button>
          {baseColors.map((baseColor) => (
            <ColorSwatch key={baseColor} color={baseColor} withLabel={true} />
          ))}
        </div>
      </div>
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={ratio}
        onChange={(e) => setRatio(parseFloat(e.target.value))}
      />
      <ColorTable
        colors={baseColors}
        onClick={(color) => setBaseColors([...baseColors, color])}
        ratio={ratio}
      />
    </div>
  );
}

export default App;

import React, { useState } from "react";
import "./App.css";
import { ChromePicker } from "react-color";
import { ColorTable } from "./ColorTable";
import { Palette } from "./Palette";

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
          <Palette colors={baseColors} />
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

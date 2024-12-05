import React, { useState } from "react";
import "./App.css";
import { ChromePicker } from "react-color";
import { Palette } from "./Palette";
import { ColorTableWithRatioSlider } from "./ColorTableWithRatioSlider";

function App() {
  const [baseColors, setBaseColors] = useState<string[]>([]);
  const [color, setColor] = useState<string>("#ffffff");

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
      <ColorTableWithRatioSlider
        colors={baseColors}
        onChoose={(color) => setBaseColors([...baseColors, color])}
      />
    </div>
  );
}

export default App;

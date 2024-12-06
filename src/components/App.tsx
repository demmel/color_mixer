import React, { useState } from "react";
import "./App.css";
import { ChromePicker } from "react-color";
import { Palette } from "./Palette";
import { ColorTableWithRatioSlider } from "./ColorTableWithRatioSlider";
import { ColorSwatch } from "./ColorSwatch";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const [baseColors, setBaseColors] = useState<string[]>([]);
  const [color, setColor] = useState<string>("#ffffff");

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <ChromePicker
          disableAlpha={true}
          color={color}
          onChange={({ hex }) => setColor(hex)}
        />
        <button onClick={() => setBaseColors([...baseColors, color])}>
          Add color
        </button>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h2>Palette</h2>
          <Palette
            colors={baseColors}
            onDrop={(color) => setBaseColors([...baseColors, color])}
          />
        </div>
        <ColorTableWithRatioSlider
          colors={baseColors}
          onChoose={(color) => setBaseColors([...baseColors, color])}
          style={{ marginTop: 16 }}
        />
      </div>
    </DndProvider>
  );
}

export default App;

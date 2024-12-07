import React, { useState } from "react";
import "./App.css";
import { ChromePicker } from "react-color";
import { Palette } from "./Palette";
import { ColorTableWithRatioSlider } from "./ColorTableWithRatioSlider";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Workspace } from "./Workspace";

function App() {
  const [baseColors, setBaseColors] = useState<string[]>([]);
  const [color, setColor] = useState<string>("#ffffff");

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <h1>Color Mixer</h1>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              alignItems: "center",
              marginRight: 16,
            }}
          >
            <h2>Picker</h2>
            <ChromePicker
              disableAlpha={true}
              color={color}
              onChange={({ hex }) => setColor(hex)}
            />
            <button
              style={{
                width: "fit-content",
              }}
              onClick={() => setBaseColors([...baseColors, color])}
            >
              Add color
            </button>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: 256,
              flexGrow: 0,
              flexShrink: 0,
              marginRight: 16,
            }}
          >
            <h2>Palette</h2>
            <Palette
              colors={baseColors}
              onDrop={(color) => setBaseColors([...baseColors, color])}
              style={{ border: "2px solid black", width: 256, height: 256 }}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h2>Workspace</h2>
            <Workspace defaultRows={5} defaultCols={5} />
          </div>
        </div>
        <h2>Mixer</h2>
        <ColorTableWithRatioSlider
          colors={baseColors}
          onChoose={(color) => setBaseColors([...baseColors, color])}
        />
      </div>
    </DndProvider>
  );
}

export default App;

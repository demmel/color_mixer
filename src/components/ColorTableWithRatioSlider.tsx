import React, { useState } from "react";
import { ColorTable } from "./ColorTable";

type Props = {
  colors: string[];
  onChoose: (color: string) => void;
  style?: React.CSSProperties;
};

export function ColorTableWithRatioSlider({ colors, onChoose, style }: Props) {
  const [ratio, setRatio] = useState<number>(0.5);
  return (
    <div style={style}>
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={ratio}
        onChange={(e) => setRatio(parseFloat(e.target.value))}
      />
      <ColorTable colors={colors} onChoose={onChoose} ratio={ratio} />
    </div>
  );
}

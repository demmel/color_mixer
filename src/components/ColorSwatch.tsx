import React from "react";
import { parseColorString } from "../utils";
import { useDrag } from "react-dnd";

type Props = {
  color: string;
  withLabel?: boolean;
  style?: React.CSSProperties;
};

export function ColorSwatch({ color, withLabel, style }: Props) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "color",
    item: { color },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        backgroundColor: color,
        color: shouldUseBlackForeground(color) ? "#000" : "#fff",
        ...style,
      }}
    >
      {withLabel ? color : ""}
    </div>
  );
}

function shouldUseBlackForeground(hex: string): boolean {
  const [r, g, b] = parseColorString(hex);
  return r * 0.299 + g * 0.587 + b * 0.114 > 186;
}

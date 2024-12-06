import React from "react";
import { parseColorString } from "../utils";
import { useDrag } from "react-dnd";
import { DraggableType } from "./DragAndDrop";

type Props = {
  color: string;
  withLabel?: boolean;
  style?: React.CSSProperties;
  ref?: any;
};

export function ColorSwatch({ color, withLabel, style }: Props) {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "color",
      item: { color },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [color]
  );

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

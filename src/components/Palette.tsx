import React from "react";
import { ColorSwatch } from "./ColorSwatch";
import { useDrop } from "react-dnd";
import { DraggableType } from "./DragAndDrop";

type Props = {
  colors: string[];
  onDrop: (color: string) => void;
  style?: React.CSSProperties;
};

export function Palette({ colors, onDrop, style }: Props) {
  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: DraggableType.Color,
      drop: ({ color }: { color: string }) => onDrop(color),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [onDrop]
  );

  return (
    <div
      ref={drop}
      style={{
        ...style,
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignContent: "flex-start",
        backgroundColor: canDrop
          ? isOver
            ? "rgba(255, 255, 255, 0.75)"
            : "rgba(255, 255, 255, 0.5)"
          : "rgba(255, 255, 255, 0)",
      }}
    >
      {colors.map((color) => (
        <ColorSwatch
          key={color}
          color={color}
          style={{ width: 32, height: 32 }}
        />
      ))}
      <div
        ref={drop}
        style={{
          width: 32,
          height: 32,
        }}
      />
    </div>
  );
}

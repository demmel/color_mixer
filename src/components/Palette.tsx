import React from "react";
import { ColorSwatch } from "./ColorSwatch";
import { useDrop } from "react-dnd";
import { DraggableType } from "./DragAndDrop";

type Props = {
  colors: string[];
  onDrop: (color: string) => void;
};

export function Palette({ colors, onDrop }: Props) {
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
      style={{
        display: "flex",
        flexDirection: "row",
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
          backgroundColor: canDrop ? "rgb(255, 255, 255)" : undefined,
          opacity: canDrop ? (isOver ? 0.75 : 0.5) : 0.0,
        }}
      />
    </div>
  );
}

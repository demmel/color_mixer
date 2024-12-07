import React, { useRef, useState } from "react";
import { DraggableType } from "./DragAndDrop";
import { useDrop } from "react-dnd";
import { ColorSwatch } from "./ColorSwatch";

type Grid = (string | null)[][];

function WorkpaceItem({
  color,
  onDrop,
}: {
  color: string | null;
  onDrop: (color: string) => void;
}) {
  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: DraggableType.Color,
      drop: ({ color }: { color: string }) => onDrop(color),
      canDrop: ({ color: draggingColor }: { color: string }) =>
        draggingColor !== color,
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
        position: "relative",
        width: 32,
        height: 32,
      }}
    >
      {color ? (
        <ColorSwatch color={color} style={{ width: "100%", height: "100%" }} />
      ) : (
        <div
          style={{
            width: "100%",
            height: "100%",
            border: "1px solid #000000",
            boxSizing: "border-box",
          }}
        />
      )}
      {canDrop ? (
        <div
          ref={drop}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgb(255, 255, 255)",
            opacity: isOver ? 0.75 : 0.5,
          }}
        />
      ) : undefined}
    </div>
  );
}

type Props = {
  defaultRows: number;
  defaultCols: number;
};

export function Workspace({ defaultRows, defaultCols }: Props) {
  const [grid, setGrid] = useState<Grid>(
    Array.from({ length: defaultRows }, () =>
      Array.from({ length: defaultCols }, () => null)
    )
  );

  const numRows = grid.length;
  const numCols = grid[0].length;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid #000000",
        boxSizing: "border-box",
        width: numCols * 32,
      }}
    >
      {grid.map((row, i) => (
        <div key={i} style={{ display: "flex", flexDirection: "row" }}>
          {row.map((color, j) => (
            <WorkpaceItem
              key={i + "-" + j}
              color={color}
              onDrop={(color) => {
                const isLastRow = i === numRows - 1;
                const isLastCol = j === numCols - 1;

                console.log(isLastRow, isLastCol);
                console.log(i, j);
                console.log(grid);

                const newGrid = grid.map((row, rowIndex) =>
                  row.map((cell, colIndex) => {
                    if (rowIndex === i && colIndex === j) {
                      return color;
                    } else {
                      return cell;
                    }
                  })
                );

                console.log(newGrid);

                if (isLastCol) {
                  for (const row of newGrid) {
                    row.push(null);
                  }
                }

                if (isLastRow) {
                  newGrid.push(new Array(newGrid[0].length).fill(null));
                }

                console.log(newGrid);

                setGrid(newGrid);
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

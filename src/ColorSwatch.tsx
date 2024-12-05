import React from "react";
import { shouldUseBlackForeground } from "./App";

type Props = {
  color: string;
  withLabel?: boolean;
  style?: React.CSSProperties;
  onClick?: () => void;
};

export function ColorSwatch({ color, withLabel, style, onClick }: Props) {
  return (
    <div
      style={{
        backgroundColor: color,
        color: shouldUseBlackForeground(color) ? "#000" : "#fff",
        ...style,
      }}
      onClick={onClick}
    >
      {withLabel ? color : ""}
    </div>
  );
}

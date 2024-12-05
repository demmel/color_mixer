import React from "react";
import { parseColorString } from "../utils";

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

function shouldUseBlackForeground(hex: string): boolean {
  const [r, g, b] = parseColorString(hex);
  return r * 0.299 + g * 0.587 + b * 0.114 > 186;
}

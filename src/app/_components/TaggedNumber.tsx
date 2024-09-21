"use client";
import { useState } from "react";

type Colors = "black" | "lime" | "red";

export function TaggedNumber({
  children,
  className = "",
  initialColor = "black",
}: {
  children: number;
  initialColor: Colors;
  className?: string;
}) {
  const [color, setColor] = useState<Colors>(initialColor);

  const toggleColor = () => {
    setColor((current) => {
      if (current === "black") {
        return "lime";
      } else if (current === "lime") {
        return "red";
      } else {
        return "black";
      }
    });
  };

  return (
    <a
      className={`${className} font-semibold text-xl`}
      href={`https://www.alpertron.com.ar/ECM.HTM?q=${children}`}
      target="_blank"
      onContextMenu={(e) => {
        e.preventDefault();
        toggleColor();
      }}
      style={{ color }}
    >
      {children}
    </a>
  );
}

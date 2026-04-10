"use client";

import React from "react";
import dynamic from "next/dynamic";
import ICON from "../../../public/Slider.json";

type sizeProps = {
  responsiveSizing: string;
};

const Player = dynamic(
  () => import("@lordicon/react").then((mod) => mod.Player),
  { ssr: false }
);

export const Slider = React.memo(({ responsiveSizing }: sizeProps) => {
  const playerRef = React.useRef<any>(null);

  return (
    <div className={responsiveSizing}>
      <Player
        size={"100%"}
        icon={ICON}
        ref={(instance: any) => {
          if (instance) {
            playerRef.current = instance;
            playerRef.current.playFromBeginning?.();
          }
        }}
      />
    </div>
  );
});

Slider.displayName = "Slider";

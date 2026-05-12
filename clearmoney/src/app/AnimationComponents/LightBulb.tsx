"use client";

import React from "react";
import dynamic from "next/dynamic";
import ICON from "../../../public/LightBulb.json";

type sizeProps = {
  responsiveSizing: string;
};

export const LightBulb = React.memo(({ responsiveSizing }: sizeProps) => {
  const Player: any = dynamic(
    () => import("@lordicon/react").then((mod) => mod.Player),
    { ssr: false },
  );

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

LightBulb.displayName = "LightBulb";

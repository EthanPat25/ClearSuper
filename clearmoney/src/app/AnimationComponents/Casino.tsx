"use client";
import React from "react";
import dynamic from "next/dynamic";
import ICON from "../../../public/Casino.json";

// ✅ Module scope — defined once, not per render
const Player = dynamic(
  () => import("@lordicon/react").then((mod) => mod.Player),
  { ssr: false },
);

export const Casino = React.memo(
  ({ responsiveSizing }: { responsiveSizing: string }) => {
    const playerRef = React.useRef<any>(null);

    return (
      <div className={responsiveSizing}>
        <Player
          size={"100%"}
          icon={ICON}
          ref={(instance: any) => {
            if (instance) {
              playerRef.current = instance;
              instance.playFromBeginning?.();
            }
          }}
        />
      </div>
    );
  },
);

Casino.displayName = "Casino";

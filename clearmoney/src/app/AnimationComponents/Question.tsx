"use client";

import React from "react";
import dynamic from "next/dynamic";
import ICON from "../../../public/Question.json";

type sizeProps = {
  responsiveSizing: string;
};

const Player = dynamic(
  () => import("@lordicon/react").then((mod) => mod.Player),
  { ssr: false }
);

export const Question = React.memo(({ responsiveSizing }: sizeProps) => {
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

Question.displayName = "Question";

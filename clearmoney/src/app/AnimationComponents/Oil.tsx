"use client";

import React from "react";
import dynamic from "next/dynamic";
import ICON from "../../../public/Oil.json";

type sizeProps = {
  initialSize: number;
};

export const Oil = React.memo(({ initialSize }: sizeProps) => {
  const [windowsize, updatewindowsize] = React.useState<number | null>(null);
  const [size, updatesize] = React.useState(initialSize);

  // ✅ Use dynamic import to avoid SSR issues
  const Player: any = dynamic(
    () => import("@lordicon/react").then((mod) => mod.Player),
    {
      ssr: false,
      loading: () => <div style={{ width: size, height: size }} />,
    }
  );

  const playerRef = React.useRef<any>(null);

  React.useEffect(() => {
    const handleResize = () => updatewindowsize(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  React.useEffect(() => {
    if (windowsize === null) return;

    if (windowsize >= 3200) {
      updatesize(170);
    } else if (windowsize >= 2560) {
      updatesize(170);
    } else if (windowsize >= 1920) {
      updatesize(170);
    } else if (windowsize >= 1536) {
      updatesize(170);
    } else if (windowsize <= 1024) {
      updatesize(170);
    }
  }, [windowsize]);

  return (
    <div>
      <Player
        size={size}
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

Oil.displayName = "Oil";

import React from "react";

export function LowerPanelContainer(
  { children }: { children: React.ReactNode },
) {
  return (
    <div
      id="lowerPanel"
      className={"flex flex-grow h-full fixed top-28 w-full bg-slate-800 "}
    >
      {children}
    </div>
  );
}

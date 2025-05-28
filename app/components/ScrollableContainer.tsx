"use client";
import React from "react";

type Props = React.PropsWithChildren<{
  className?: string;
}>;

export default function ScrollableContainer({ className, children }: Props) {
  return (
    <div
      className={className}
      onWheel={(e) => {
        if (e.deltaY !== 0) {
          e.currentTarget.scrollLeft += e.deltaY;
          e.preventDefault();
        }
      }}
    >
      {children}
    </div>
  );
}

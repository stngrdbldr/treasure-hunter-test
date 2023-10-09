"use client";
import { FC, ReactNode } from "react";
import { SWRConfig } from "swr";
import { Character, Equipment } from "@/api/treasureHunter.api";

type SWRTreasureHuntersProviderProps = {
  children: ReactNode;
  character: Character | undefined;
  equipments: Equipment[];
};
export const SWRTreasureHuntersProvider: FC<
  SWRTreasureHuntersProviderProps
> = ({ character, children, equipments }) => {
  return (
    <SWRConfig value={{ fallback: { character, equipments } }}>
      {children}
    </SWRConfig>
  );
};

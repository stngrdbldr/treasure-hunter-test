import useSWR from "swr";
import { getCharacterInfo } from "@/api/treasureHunter.api";

export const useCharacter = () => {
  const result = useSWR("character", getCharacterInfo);

  return result;
};

import useSWR from "swr";
import { getAvailableEquipments } from "@/api/treasureHunter.api";

export const useEquipments = () => {
  const result = useSWR("equipments", getAvailableEquipments);

  return result;
};

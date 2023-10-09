import { useMemo } from "react";
import { Equipment } from "@/api/treasureHunter.api";
import { useAllEquipment } from "@/hooks/useAllEquipment";

export const useEquipmentStats = (equipmentIds: Array<Equipment["id"]>) => {
  const { findEquipment } = useAllEquipment();

  return useMemo(() => {
    const inital = {
      value: 0,
      attack: 0,
      luck: 0,
    };

    return equipmentIds.reduce((acc, id) => {
      const equipment = findEquipment(id);
      if (!equipment) return acc;
      acc.value += equipment.value;
      acc.attack += equipment.hpModifier;
      acc.luck += equipment.luckModifier;
      return acc;
    }, inital);
  }, [equipmentIds, findEquipment]);
};

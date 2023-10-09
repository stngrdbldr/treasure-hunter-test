import { useCallback, useMemo } from "react";
import { useCharacter } from "@/hooks/useCharacter";
import { useEquipments } from "@/hooks/useEquipments";

export const useAllEquipment = () => {
  const { data: character } = useCharacter();
  const { data: equipment } = useEquipments();

  const allEquipment = useMemo(() => {
    if (!character && !equipment) {
      return [];
    }

    return [...(character?.equipment ?? []), ...(equipment ?? [])];
  }, [character, equipment]);

  const findEquipment = useCallback(
    (equipmentId: string) => {
      return allEquipment.find((e) => e.id === equipmentId);
    },
    [allEquipment]
  );

  return { equipment: allEquipment, findEquipment };
};

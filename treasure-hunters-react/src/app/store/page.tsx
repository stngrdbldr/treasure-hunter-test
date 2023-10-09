"use client";

import { Flex, Button, Paper, Grid, Title, Text } from "@mantine/core";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useCharacter } from "@/hooks/useCharacter";
import { useEquipments } from "@/hooks/useEquipments";
import { useEquipmentStats } from "@/hooks/useEquipmentStats";
import { usePurchaseEquipment } from "@/hooks/usePurchaseEquipment";
import { pluralize } from "@/lib";
import { Inventory } from "@/ui/Inventory";
import { Statistic } from "@/ui/Statistic";

export default function Store() {
  const { data: character } = useCharacter();
  const { isLoading, data: equipments = [] } = useEquipments();
  const [selection, setSelection] = useState<string[]>([]);
  const { isMutating, purchase } = usePurchaseEquipment();

  const { value: totalCost, attack, luck } = useEquipmentStats(selection);
  const characterEquipmentStats = useEquipmentStats(
    character?.equipment.map((equipment) => equipment.id) ?? []
  );

  const { hitPoints: currentHitPoints = 0, luck: currentLuck = 0 } =
    character || {};

  const addToSelection = (id: string) => {
    setSelection((current) => {
      return current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id];
    });
  };

  const onBuyClick = async () => {
    setSelection([]);
    await purchase({ equipmentIds: selection });
  };

  const equipmentToDisplayInInventory = useMemo(() => {
    return equipments.map((equipment) => {
      const isSelected = selection.includes(equipment.id);
      return {
        ...equipment,
        isDisabled: !isSelected
          ? totalCost + equipment.value > (character?.wealth ?? 0)
          : false,
        isSelected,
      };
    });
  }, [character?.wealth, equipments, selection, totalCost]);

  const isOutOfFunds = useMemo(() => {
    return equipmentToDisplayInInventory.every(({ isDisabled, isSelected }) => {
      return isDisabled || isSelected;
    });
  }, [equipmentToDisplayInInventory]);
  return (
    <section>
      <Grid gutter="md">
        <Grid.Col span={12}>
          <Flex wrap="wrap" justify="space-between" gap="md">
            <Flex direction="column" gap="sm">
              <Title c="yellow" order={2}>
                Welcome to the store, {character?.name ?? "Treasure hunter"}!
              </Title>
              <Flex gap="sm" wrap="wrap">
                <Statistic
                  unit="kr"
                  progress={{
                    title: "Wealth",
                    max: character?.wealth ?? 0,
                    value: totalCost ?? 0,
                  }}
                  icon="cash"
                  title="Cost"
                />
                <Statistic
                  values={{
                    max:
                      attack +
                      characterEquipmentStats.attack +
                      currentHitPoints,
                    value: currentHitPoints + characterEquipmentStats.attack,
                  }}
                  icon="sword"
                  title="Attack"
                />
                <Statistic
                  values={{
                    max: luck + characterEquipmentStats.luck + currentLuck,
                    value: currentLuck + characterEquipmentStats.luck,
                  }}
                  icon="luck"
                  title="Luck"
                />
              </Flex>
            </Flex>
            <Flex direction="row" mt="auto" justify="flex-end" gap="sm">
              <Button
                variant="filled"
                disabled={selection.length === 0}
                onClick={onBuyClick}
              >
                Buy {selection.length} {pluralize("item", selection.length)}
              </Button>
            </Flex>
          </Flex>
        </Grid.Col>

        <Grid.Col span={{ base: 12 }}>
          <Flex justify="space-between" mb="sm">
            <Title order={2}>Selection of equipment</Title>
            {isOutOfFunds && (
              <Text mt="auto">
                Looks like you cannot buy any more items. Go to{" "}
                <Link href="/character">the profile</Link> and earn some more
                money!
              </Text>
            )}
          </Flex>

          <Paper>
            <Inventory
              isLoading={isLoading || isMutating}
              span={{ xs: 6, md: 3 }}
              onToggle={addToSelection}
              items={equipmentToDisplayInInventory}
            />
          </Paper>
        </Grid.Col>
      </Grid>
    </section>
  );
}

"use client";

import { Button, Flex, Grid, Paper, Title } from "@mantine/core";
import { useState } from "react";
import { useCharacter } from "@/hooks/useCharacter";
import { useEnchantEquipment } from "@/hooks/useEnchantment";
import { useEquipmentStats } from "@/hooks/useEquipmentStats";
import { useSellEquipment } from "@/hooks/useSellEquipment";
import { pluralize } from "@/lib";
import { Inventory } from "@/ui/Inventory";
import { Statistic } from "@/ui/Statistic";

export default function Character() {
  const { data: character } = useCharacter();
  const { isMutating: isMutatingEnchant, enchant } = useEnchantEquipment();
  const { isMutating: isMutatingSell, sell } = useSellEquipment();
  const [selection, setSelection] = useState<string[]>([]);

  const { value, attack, luck } = useEquipmentStats(
    character?.equipment.map((equipment) => equipment.id) ?? []
  );

  const toggleItem = (id: string) => {
    setSelection((current) => {
      return current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id];
    });
  };

  const onEnchantClick = async () => {
    setSelection([]);
    await enchant({ equipmentIds: selection });
  };

  const onSellClick = async () => {
    setSelection([]);
    await sell({ equipmentIds: selection });
  };

  const { equipment = [] } = character || {};

  return (
    <section>
      <Grid gutter="md">
        <Grid.Col span={12}>
          <Flex wrap="wrap" justify="space-between" gap="md">
            <Flex direction="column" gap="sm">
              <Title c="yellow" order={2}>
                {character?.name ?? "Character"}
              </Title>
              <Flex gap="sm" wrap="wrap">
                <Statistic
                  unit="kr"
                  values={{
                    max: character?.wealth ?? 0,
                  }}
                  icon="cash"
                  title="Cash"
                />
                <Statistic
                  unit="kr"
                  values={{
                    max: value + (character?.wealth ?? 0),
                  }}
                  icon="cash"
                  title="Wealth"
                />
                <Statistic
                  values={{
                    max: attack + (character?.hitPoints ?? 0),
                  }}
                  icon="sword"
                  title="Attack"
                />
                <Statistic
                  values={{
                    max: luck + (character?.luck ?? 0),
                  }}
                  icon="luck"
                  title="Luck"
                />
              </Flex>
            </Flex>
            <Flex direction="row" mt="auto" justify="flex-end" gap="sm">
              <Button
                variant="outline"
                disabled={selection.length === 0}
                onClick={onEnchantClick}
              >
                Enchant {selection.length} {pluralize("item", selection.length)}
              </Button>
              <Button
                variant="filled"
                disabled={selection.length === 0}
                onClick={onSellClick}
              >
                Sell {selection.length} {pluralize("item", selection.length)}
              </Button>
            </Flex>
          </Flex>
        </Grid.Col>
        <Grid.Col span={12}>
          <Flex justify="space-between">
            <Title mb="sm" order={2}>
              Inventory
            </Title>
          </Flex>

          <Paper>
            <Inventory
              isLoading={isMutatingEnchant || isMutatingSell}
              span={{ xs: 6, md: 3 }}
              onToggle={toggleItem}
              items={equipment.map((equipment) => {
                return {
                  ...equipment,
                  isSelected: selection.includes(equipment.id),
                };
              })}
            />
          </Paper>
        </Grid.Col>
      </Grid>
    </section>
  );
}

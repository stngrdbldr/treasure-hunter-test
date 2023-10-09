import {
  Center,
  Flex,
  Grid,
  Text,
  GridCol,
  Paper,
  LoadingOverlay,
} from "@mantine/core";
import React, { ComponentProps, FC } from "react";
import { Equipment } from "@/api/treasureHunter.api";
import { Icon } from "@/ui/Icon";
import { InventoryItem } from "./components";
import classes from "./Inventory.module.scss";

type InventoryProps = {
  items: Array<Equipment & { isSelected: boolean; isDisabled?: boolean }>;
  onToggle: (id: string) => void;
  span?: ComponentProps<typeof Grid.Col>["span"];
  renderItem?: (props: InventoryProps["items"][number]) => JSX.Element;
  emptyMessage?: string | React.ReactNode;
  isLoading: boolean;
};

const Inventory: FC<InventoryProps> = ({
  items,
  span = 4,
  emptyMessage = "It's empty in here...",
  onToggle,
  isLoading = false,
}) => {
  return (
    <Grid gutter="sm" className={classes.inventory}>
      <LoadingOverlay visible={isLoading} />
      {items.length ? (
        items.map((item) => {
          const { isSelected, isDisabled, ...equipment } = item;
          return (
            <Grid.Col span={span} key={`character_equipment_${equipment.id}`}>
              <InventoryItem
                h="100%"
                w="100%"
                onToggle={onToggle}
                equipment={equipment}
                isSelected={isSelected}
                isDisabled={isDisabled}
              />
            </Grid.Col>
          );
        })
      ) : (
        <GridCol>
          <Paper p="lg" withBorder>
            <Center>
              <Flex direction="column" align="center" gap="sm">
                <Icon icon="empty" size={100} />
                <Text size="lg">{emptyMessage}</Text>
              </Flex>
            </Center>
          </Paper>
        </GridCol>
      )}
    </Grid>
  );
};

export { Inventory };

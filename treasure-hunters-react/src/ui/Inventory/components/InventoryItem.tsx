import {
  Group,
  Text,
  Paper,
  SimpleGrid,
  PaperProps,
  Checkbox,
} from "@mantine/core";
import cx from "clsx";
import { CSSProperties, ComponentProps, FC } from "react";
import { Equipment } from "@/api/treasureHunter.api";
import { Icon } from "@/ui/Icon";
import classes from "./InventoryItem.module.scss";

type InventoryItemProps = {
  equipment: Equipment;
  isSelected?: boolean;
  isDisabled?: boolean;
  onToggle: (id: string) => void;
  className?: string;
} & PaperProps;

const iconMap = {
  Trinket: "trinket",
  Weapon: "sword",
  Armor: "armor",
} satisfies Record<Equipment["type"], ComponentProps<typeof Icon>["icon"]>;

const getEnchantmentChance = (enchantment: number) => {
  return (100 * (0.9 / Math.pow(1.1, enchantment))).toFixed(1);
};

export const InventoryItem: FC<InventoryItemProps> = ({
  isSelected = false,
  isDisabled = false,
  equipment,
  onToggle,
  className,
  ...rest
}) => {
  const {
    id,
    name,
    hpModifier,
    luckModifier,
    type,
    value,
    enchantment,
    color,
  } = equipment;

  const iconType = iconMap[type];

  const handleOnClick = () => {
    if (isDisabled) return;
    onToggle(id);
  };

  return (
    <Paper
      {...rest}
      p="sm"
      radius="md"
      className={cx(
        classes["inventory-item"],
        {
          [classes["inventory-item--disabled"]]: isDisabled,
        },
        className
      )}
      onClick={handleOnClick}
      style={
        {
          "--enchantment": enchantment,
          "--color": color,
        } as CSSProperties
      }
    >
      <Group gap="sm" mb="sm" wrap="nowrap" align="center">
        <Icon
          className={classes["inventory-item__icon"]}
          icon={iconType}
          color={color}
          size={25}
          radius="md"
        />
        <Text fz="xs" tt="uppercase" fw={500} c="dimmed">
          {name}
        </Text>
        <Checkbox ml="auto" readOnly checked={isSelected} />
      </Group>

      <SimpleGrid cols={2} spacing="xs">
        <Group wrap="nowrap" gap="xs" mt={3}>
          <Icon icon="sword" size="1rem" />
          <Text fz="xs" c="dimmed">
            {hpModifier}
          </Text>
        </Group>

        <Group wrap="nowrap" gap="xs" mt={3}>
          <Icon icon="luck" size="1rem" />
          <Text fz="xs" c="dimmed">
            {luckModifier}
          </Text>
        </Group>

        <Group wrap="nowrap" gap="xs" mt={3}>
          <Icon icon="cash" size="1rem" />
          <Text fz="xs" c="dimmed">
            {value}kr
          </Text>
        </Group>

        <Group wrap="nowrap" gap="xs" mt={3}>
          <Icon icon="cash" size="1rem" />
          <Text fz="xs" c="dimmed">
            {enchantment} ({getEnchantmentChance(enchantment)}%)
          </Text>
        </Group>
      </SimpleGrid>
    </Paper>
  );
};

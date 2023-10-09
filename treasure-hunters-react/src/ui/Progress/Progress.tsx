import {
  Group,
  Text,
  ProgressRoot,
  ProgressSection,
  Flex,
  rem,
  Center,
} from "@mantine/core";
import cn from "clsx";
import { ComponentProps, FC } from "react";
import { Icon } from "@/ui/Icon";
import classes from "./Progress.module.scss";

type ProgressProps = {
  title: string;
  className?: string;
  icon?: ComponentProps<typeof Icon>["icon"];
  size?: number;
  max: number;
  value: number;
  unit?: string;
};

export const Progress: FC<ProgressProps> = ({
  max,
  value,
  className,
  icon,
  unit = null,
  size = 15,
}) => {
  return (
    <Flex
      direction="row"
      wrap="nowrap"
      align="center"
      gap="xs"
      className={cn(className, classes.progress)}
    >
      {icon && (
        <Center w={rem(24)}>
          <Icon icon={icon} size="100%" radius="sm" />
        </Center>
      )}
      <Flex direction="column" w="100%" gap="xs">
        <Group justify="space-between">
          <Text fz="xs" fw={700}>
            {value}
            {unit}
          </Text>
          <Text fz="xs" c="teal" fw={700}>
            {max}
            {unit}
          </Text>
        </Group>
        <ProgressRoot
          bg="red"
          size={size}
          className={classes["progress__root"]}
        >
          <ProgressSection value={100 * (value / max)} color="teal" />
        </ProgressRoot>
      </Flex>
    </Flex>
  );
};

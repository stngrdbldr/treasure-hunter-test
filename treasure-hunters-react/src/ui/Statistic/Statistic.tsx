import { Flex, Group, Paper, PaperProps, Text } from "@mantine/core";
import React, { ComponentProps, FC } from "react";
import { AtLeastOne } from "@/types";
import { Icon } from "@/ui/Icon";
import { Progress } from "@/ui/Progress";
import classes from "./Statistic.module.scss";

type WithProgress = {
  progress: Omit<ComponentProps<typeof Progress>, "unit">;
  values?: never;
};

type WithoutProgress = {
  progress?: never;
  values: AtLeastOne<Pick<ComponentProps<typeof Progress>, "max" | "value">>;
};

type StatisticProps = PaperProps & {
  title: string;
  icon: ComponentProps<typeof Icon>["icon"];
  pick?: number;
  unit?: string;
} & (WithProgress | WithoutProgress);

const Statistic: FC<StatisticProps> = ({
  title,
  progress,
  values,
  icon,
  unit,
  ...rest
}) => {
  return (
    <Paper
      {...rest}
      withBorder
      p="sm"
      radius="md"
      className={classes.statistic}
    >
      <Flex
        direction="column"
        justify="space-between"
        className={classes.statistic__column}
        gap="sm"
      >
        <Group wrap="nowrap" gap="xs" justify="space-between">
          <Text size="xs" c="dimmed" className={classes["statistic__title"]}>
            {title}
          </Text>
          <Icon
            icon={icon}
            className={classes["statistic__icon"]}
            size="1.4rem"
          />
        </Group>

        {values && (
          <Group h="100%" justify="space-between">
            {values.value !== undefined ? (
              <Text size="md" c="dimmed" fw={700}>
                {values.value}
                {unit}
              </Text>
            ) : null}
            {values.max !== undefined ? (
              <Text size="lg" c="teal">
                {values.max}
                {unit}
              </Text>
            ) : null}
          </Group>
        )}
        {progress && (
          <Flex direction="column" gap="xs">
            <Progress size={8} unit={unit} {...progress} />
          </Flex>
        )}
      </Flex>
    </Paper>
  );
};

export { Statistic };

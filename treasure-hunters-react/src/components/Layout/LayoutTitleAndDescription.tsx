import { Text } from "@mantine/core";
import { FC, ReactNode } from "react";

export const LayoutTitleAndDescription: FC<{
  title: string;
  description: ReactNode;
}> = ({ title, description }) => {
  return (
    <div>
      <Text mb="xs" component="h3" fw="bold">
        {title}
      </Text>

      <Text fz="sm" mb="sm">
        {description}
      </Text>
    </div>
  );
};

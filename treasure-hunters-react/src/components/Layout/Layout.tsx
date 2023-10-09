import { Container, Flex, Group } from "@mantine/core";
import { FC, ReactNode } from "react";
import { Header } from "@/components/Header";
import classes from "./Layout.module.scss";

type LayoutProps = {
  children: ReactNode;
  title: string;
  description: ReactNode;
};

export const Layout: FC<LayoutProps> = ({ title, description, children }) => {
  return (
    <main className={classes.layout}>
      <Header title={title} className={classes.layout__header} />
      <Container size="xl" my="sm" h="100%" p="md">
        <Flex align="center" justify="space-between" mb="sm">
          <Group>{description}</Group>
        </Flex>

        {children}
      </Container>
    </main>
  );
};

"use client";

import { Title, Group, Container } from "@mantine/core";
import cn from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";
import { Icon } from "@/ui/Icon";
import classes from "./Header.module.scss";

type HeaderProps = {
  title: string;
  className?: string;
};
export const Header: FC<HeaderProps> = ({ title, className }) => {
  const pathname = usePathname();

  return (
    <header className={cn(classes.header, className)}>
      <Container size="xl" className={classes.header__inner}>
        <Link href="/">
          <Icon icon="home" size={50} />
        </Link>
        <Title order={1}>{title}</Title>
        <Group gap={5} visibleFrom="xs">
          <Link
            data-active={pathname.startsWith("/character") || undefined}
            className={classes.header__link}
            href="/character"
          >
            Profile
          </Link>
          <Link
            data-active={pathname.startsWith("/store") || undefined}
            className={classes.header__link}
            href="/store"
          >
            Store
          </Link>
        </Group>
      </Container>
    </header>
  );
};

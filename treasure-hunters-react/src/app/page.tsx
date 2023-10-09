import { Paper, Title } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import goblinHome from "@/../public/goblin-home.jpeg";
import goblinStore from "@/../public/goblin-store.jpeg";
import classes from "./page.module.scss";

export default function Home() {
  return (
    <main className={classes.main}>
      <Paper
        className={classes.main__square}
        component={Link}
        href="/character"
        withBorder
        radius="md"
        p="sm"
      >
        <Image
          className={classes.main__bg}
          fill
          src={goblinHome.src}
          alt="Goblin"
        />

        <Title className={classes.main__text}>Go home</Title>
      </Paper>
      <Paper
        className={classes.main__square}
        component={Link}
        href="/store"
        withBorder
        radius="md"
        p="sm"
      >
        <Image
          className={classes.main__bg}
          fill
          src={goblinStore.src}
          alt="Goblin"
        />
        <Title className={classes.main__text}>Visit the store</Title>
      </Paper>
    </main>
  );
}

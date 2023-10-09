"use client";

import {
  MantineColorsTuple,
  MantineProvider as MantineCoreProvider,
  createTheme,
} from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { FC } from "react";

const myColors: MantineColorsTuple = [
  "#fff0e4",
  "#ffe0cf",
  "#fac0a1",
  "#f69e6e",
  "#f28043",
  "#f06d27",
  "#f06418",
  "#d6530c",
  "#bf4906",
  "#a73c00",
];

const theme = createTheme({
  colors: {
    myColors,
  },

  spacing: {
    xl: "4rem",
    lg: "3rem",
    md: "2rem",
    sm: "1rem",
    xs: "0.3rem",
  },
  primaryColor: "myColors",
});

type MantineProviderProps = {
  children: React.ReactNode;
};

export const MantineProvider: FC<MantineProviderProps> = ({ children }) => {
  return (
    <MantineCoreProvider defaultColorScheme="dark" theme={theme}>
      <Notifications limit={10} />
      {children}
    </MantineCoreProvider>
  );
};

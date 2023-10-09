import { ColorSchemeScript } from "@mantine/core";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {
  getAvailableEquipments,
  getCharacterInfo,
} from "@/api/treasureHunter.api";
import { MantineProvider } from "@/components/MantineProvider";
import { SWRTreasureHuntersProvider } from "@/components/SWRTreasureHuntersProvider";
import "./globals.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Treasure hunter",
  description: "Treasure hunter app",
};

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [character, equipments] = await Promise.all([
    getCharacterInfo(),
    getAvailableEquipments(),
  ]);

  return (
    <html lang="en">
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body className={inter.className}>
        <MantineProvider>
          <SWRTreasureHuntersProvider
            equipments={equipments}
            character={character}
          >
            {children}
          </SWRTreasureHuntersProvider>
        </MantineProvider>
      </body>
    </html>
  );
}

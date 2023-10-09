import { SimpleGrid } from "@mantine/core";
import { FC, ReactNode } from "react";
import { Layout, LayoutTitleAndDescription } from "@/components/Layout";

type StoreLayoutProps = {
  children: ReactNode;
};

const StoreLayout: FC<StoreLayoutProps> = ({ children }) => {
  return (
    <Layout
      title="Equipment store"
      description={
        <SimpleGrid cols={{ base: 2, sm: 2, md: 3, lg: 4 }}>
          <LayoutTitleAndDescription
            title="🏛️ Equipment Emporium 🏛️"
            description={
              <>
                Welcome to the heart of the Treasure Hunter-haven, the Equipment
                Emporium. Here, seekers of adventure and collectors of marvels
                find their dreams fulfilled. Step into a world where choice
                meets destiny, and where every item has a story to tell:
              </>
            }
          />

          <LayoutTitleAndDescription
            title="🛡️ Armory of Wonders:"
            description={
              <>
                The walls of the Equipment Emporium are adorned with a dazzling
                array of weapons, armor, and accessories. From gleaming swords
                to ancient amulets, each item has been curated to meet the
                discerning tastes of treasure hunters like you.
              </>
            }
          />

          <LayoutTitleAndDescription
            title="🔍 Find Your Perfect Fit:"
            description={
              <>
                Our expert curators have scoured the realms to bring you the
                finest gear, ensuring you arere always prepared for the unknown.
                Whether you seek artifacts of power or relics of legend, the
                perfect equipment awaits your discovery.
              </>
            }
          />

          <LayoutTitleAndDescription
            title="🧙‍♂️ Expert Advice:"
            description={
              <>
                Our knowledgeable staff is here to assist you in making the
                right choice for your adventures. Ask for recommendations, lore,
                and hidden secrets behind the items on display.
              </>
            }
          />
        </SimpleGrid>
      }
    >
      {children}
    </Layout>
  );
};

export default StoreLayout;

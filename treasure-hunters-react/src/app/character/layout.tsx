import { SimpleGrid } from "@mantine/core";
import { FC, ReactNode } from "react";
import { Layout, LayoutTitleAndDescription } from "@/components/Layout";

type CharacterLayoutProps = {
  children: ReactNode;
};

const CharacterLayout: FC<CharacterLayoutProps> = ({ children }) => {
  return (
    <Layout
      title="Profile"
      description={
        <SimpleGrid cols={{ base: 2, sm: 2, md: 3, lg: 4 }}>
          <LayoutTitleAndDescription
            title="🌟 Character Profile 🌟"
            description={
              <>
                Congratulations, brave adventurer! You have ventured through the
                enchanting aisles and thriving marketplace of Enchanted Relics
                Emporium. Now, let us take a closer look at your character
                profile where your journey truly comes to life
              </>
            }
          />

          <LayoutTitleAndDescription
            title="⚔️ Equipped for Glory:"
            description={
              <>
                The equipment section showcases your carefully chosen arsenal,
                each item glowing with the enchantments that you have bestowed
                upon them. Witness the transformation of your gear into powerful
                artifacts, each with its own unique abilities and enhancements.
              </>
            }
          />

          <LayoutTitleAndDescription
            title="🔮 Enchantment Mastery:"
            description={
              <>
                For those who have harnessed the art of enchantment, this
                section showcases your enchantment achievements. Witness the
                magic you have woven into your equipment, with each piece
                holding the promise of newfound power.
              </>
            }
          />

          <LayoutTitleAndDescription
            title="📊 Stats and Skills:"
            description={
              <>
                Delve into your character statistics and skills. Learn what
                makes you a formidable force in the realms of treasure hunting
                and adventure. Analyze your strengths and uncover areas for
                growth.
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

export default CharacterLayout;

import React from "react";
import { type IconType, type IconBaseProps } from "react-icons";
import {
  GiArmorDowngrade,
  GiBloodySword,
  GiClover,
  GiFlowerPot,
  GiArmorUpgrade,
  GiJewelCrown,
  GiArmorPunch,
  GiMoneyStack,
  GiCheckMark,
  GiCrossMark,
  GiPowerLightning,
  GiElvenCastle,
} from "react-icons/gi";

type Icons =
  | `armor-${"upgrade" | "downgrade"}`
  | "armor"
  | "sword"
  | "luck"
  | "trinket"
  | "cash"
  | "success"
  | "enchantment"
  | "empty"
  | "home"
  | "error";

const map = {
  "armor-downgrade": GiArmorDowngrade,
  "armor-upgrade": GiArmorUpgrade,
  armor: GiArmorPunch,
  sword: GiBloodySword,
  luck: GiClover,
  trinket: GiJewelCrown,
  cash: GiMoneyStack,
  success: GiCheckMark,
  error: GiCrossMark,
  enchantment: GiPowerLightning,
  empty: GiCrossMark,
  home: GiElvenCastle,
} satisfies Record<Icons, IconType>;

const icons = new Proxy(map, {
  get(target, prop) {
    if (prop in target) {
      return Reflect.get(target, prop);
    }
    return GiFlowerPot;
  },
});

type IconProps = {
  icon: keyof typeof map;
} & IconBaseProps;

const Icon: React.FC<IconProps> = ({ icon, ...rest }) => {
  const Icon: IconType = icons[icon];
  return <Icon {...rest} />;
};

export { Icon };

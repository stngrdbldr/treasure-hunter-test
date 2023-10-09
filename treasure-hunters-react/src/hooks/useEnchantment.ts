import { useCallback } from "react";
import { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";
import { enchantEquipment, getErrorMessage } from "@/api/treasureHunter.api";
import { useAllEquipment } from "@/hooks/useAllEquipment";
import {
  ShowNotificationArguments,
  useNotifications,
} from "@/hooks/useNotifications";

async function postSell(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _url: string,
  { arg }: { arg: Parameters<typeof enchantEquipment>[0] }
) {
  return enchantEquipment(arg);
}

export const useEnchantEquipment = () => {
  const { show } = useNotifications();
  const { findEquipment } = useAllEquipment();
  const config = useSWRConfig();

  const handleDone = useCallback(async () => {
    return Promise.allSettled([
      config.mutate("character"),
      config.mutate("equipments"),
    ]);
  }, [config]);

  const getMessage = useCallback(
    (
      equipmentIds: string[],
      success: boolean
    ): ShowNotificationArguments | undefined => {
      const equipment = equipmentIds
        .map((id) => findEquipment(id))
        .map((equipment) => equipment?.name)
        .filter(Boolean);

      if (!equipment.length) return undefined;
      return {
        id: `enchantment-message-${success ? "success" : "error"}`,
        title: `Enchantment ${!success ? "failed!" : "complete!"}`,
        message: success
          ? `Equipments ${equipment.join(
              ", "
            )} has been successfully enchanted!`
          : `Equipments ${equipment.join(
              ", "
            )} failed to be enchanted and has been destroyed!`,
        status: !success ? "error" : "success",
      };
    },
    [findEquipment]
  );

  const { trigger: enchant, ...result } = useSWRMutation(
    "enchantment",
    postSell,
    {
      revalidate: true,
      onError: async (error) => {
        show({
          id: "enchantment-error",
          title: "Enchanting failed",
          message: getErrorMessage(error),
          status: "error",
        });
        await handleDone();
      },
      onSuccess: async (response) => {
        await handleDone();

        const successMessage = getMessage(response.success, true);
        if (successMessage) show(successMessage);

        const errorMessage = getMessage(response.failure, false);
        if (errorMessage) show(errorMessage);
      },
    }
  );

  return { ...result, enchant };
};

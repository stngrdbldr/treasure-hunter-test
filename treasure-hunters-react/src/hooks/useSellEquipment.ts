import { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";
import { getErrorMessage, sellEquipment } from "@/api/treasureHunter.api";
import { useNotifications } from "@/hooks/useNotifications";

async function postSell(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _url: string,
  { arg }: { arg: Parameters<typeof sellEquipment>[0] }
) {
  return sellEquipment(arg);
}

export const useSellEquipment = () => {
  const config = useSWRConfig();
  const { show } = useNotifications();

  const { trigger: sell, ...result } = useSWRMutation("sell", postSell, {
    onError: (error) => {
      show({
        id: `sell-error`,
        title: "Sell failed",
        message: getErrorMessage(error),
        status: "error",
      });
    },
    onSuccess: async ({ equipmentIds }) => {
      await Promise.allSettled([
        config.mutate("character"),
        config.mutate("equipments"),
      ]);

      show({
        id: `sell-success`,
        title: "Sell complete!",
        message: `${equipmentIds.length} equipments has been sold!`,
        status: "success",
      });
    },
  });

  return { ...result, sell };
};

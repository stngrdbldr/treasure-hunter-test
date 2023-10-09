import { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";
import { getErrorMessage, purchaseEquipment } from "@/api/treasureHunter.api";
import { useNotifications } from "@/hooks/useNotifications";

async function makePurchase(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _url: string,
  { arg }: { arg: Parameters<typeof purchaseEquipment>[0] }
) {
  return purchaseEquipment(arg);
}

export const usePurchaseEquipment = () => {
  const config = useSWRConfig();
  const { show } = useNotifications();
  const { trigger: purchase, ...result } = useSWRMutation(
    "purchase",
    makePurchase,
    {
      onError: (error) => {
        show({
          id: `purchase-error`,
          title: "Purchase failed",
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
          id: `purchase-success`,
          title: "Purchase complete!",
          message: `${equipmentIds.length} equipments has been purchased!`,
          status: "success",
        });
      },
    }
  );

  return { ...result, purchase };
};

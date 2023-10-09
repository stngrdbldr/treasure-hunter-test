import { notifications } from "@mantine/notifications";
import { number, object, string, array, Output, enumType } from "valibot";
import { createValibotFetcher } from "@/api/client";
import { isServer } from "@/lib";

export type TreasureHunterApiKeys =
  | "character"
  | "equipment"
  | "purchases"
  | "sell"
  | "enchantment";
const host = "http://localhost:5000";

export const getResponseMessage = async (response: Response) => {
  try {
    const data = await response.json();
    return data.message;
  } catch {
    return `Request failed with status ${response.status}`;
  }
};

export const getErrorMessage = (
  error: unknown,
  defaultMessage = "Houston error"
) => {
  if (error instanceof Error) {
    return error.message;
  }

  return defaultMessage;
};

const client = createValibotFetcher(
  async (path: TreasureHunterApiKeys, init: RequestInit = {}) => {
    const result = await fetch(`${host}/${path}`, {
      ...init,
      credentials: "include",
    });

    if (result.status !== 200) {
      if (!isServer()) {
        notifications.show({
          title: "Request failed",
          message: await getResponseMessage(result),
        });
      }
      throw new Error(await getResponseMessage(result));
    }

    const data = await result.json();

    return data;
  }
);

const equipmentSchema = object({
  id: string(),
  name: string(),
  type: enumType(["Trinket", "Weapon", "Armor"]),
  hpModifier: number(),
  luckModifier: number(),
  value: number(),
  color: string(),
  enchantment: number(),
});

export type Equipment = Output<typeof equipmentSchema>;

const equipmentsSchema = array(equipmentSchema);

const characterSchema = object({
  name: string(),
  hitPoints: number(),
  luck: number(),
  wealth: number(),
  equipment: equipmentsSchema,
  startingWealth: number(),
});

export type Character = Output<typeof characterSchema>;

export const getCharacterInfo = async () => {
  return client(characterSchema, "character");
};

export const getAvailableEquipments = async () => {
  return client(equipmentsSchema, "equipment");
};

const equipmentRequestSchema = object({
  equipmentIds: array(string()),
});

type EquipmentRequestSchema = Output<typeof equipmentRequestSchema>;

export const purchaseEquipment = (data: EquipmentRequestSchema) =>
  client(equipmentRequestSchema, "purchases", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

export const sellEquipment = (data: EquipmentRequestSchema) => {
  return client(equipmentRequestSchema, "sell", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const enchantmentSchema = object({
  failure: array(string()),
  success: array(string()),
});

export const enchantEquipment = (data: EquipmentRequestSchema) => {
  return client(enchantmentSchema, "enchantment", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

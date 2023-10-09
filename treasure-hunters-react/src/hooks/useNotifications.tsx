import { notifications } from "@mantine/notifications";
import { Icon } from "@/ui/Icon";

export type ShowNotificationArguments = {
  id: string;
  title: string;
  message: string;
  status: "success" | "error";
};

export const useNotifications = () => {
  const show = ({ status, ...data }: ShowNotificationArguments) => {
    notifications.show({
      ...data,
      color: status === "success" ? "teal" : "red",
      icon: <Icon fill="white" size={24} icon={status} />,
    });
  };

  return { show };
};

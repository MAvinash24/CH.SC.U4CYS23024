import api from "./axios";
import { Log } from "../logging_middleware/logger";

export const fetchNotifications = async (
  limit = 20,
  page = 1,
  type = ""
) => {
  try {
    Log("info", "api", "Fetching notifications");

    const response = await api.get("/notifications", {
      params: {
        limit,
        page,
        notification_type: type || undefined,
      },
    });

    console.log("API Response:", response.data);
    Log("info", "api", "Notifications fetched successfully");

    return response.data.notifications || response.data;
  } catch (error) {
    console.error("API Error:", error);
    Log("error", "api", `Failed to fetch notifications: ${error}`);
    throw error;
  }
};
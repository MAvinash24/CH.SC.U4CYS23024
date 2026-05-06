import { useEffect, useState } from "react";

import { fetchNotifications } from "../api/notifications";

import type { Notification } from "../types/notification";

import { Log } from "../logging_middleware/logger";

export const useNotifications = () => {
  const [notifications, setNotifications] =
    useState<Notification[]>([]);

  const [loading, setLoading] =
    useState(false);

  const loadNotifications = async () => {
    try {
      setLoading(true);

      await Log(
        "info",
        "hook",
        "Loading notifications"
      );

      const data =
        await fetchNotifications(
          10,
          1
        );

      console.log("Data received in hook:", data);
      setNotifications(Array.isArray(data) ? data : data?.notifications || []);

      await Log(
        "info",
        "hook",
        "Notifications loaded successfully"
      );
    } catch (error) {
      console.error("Hook error:", error);

      await Log(
        "error",
        "hook",
        `Notification loading failed: ${error}`
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  return {
    notifications,
    loading,
    reload: loadNotifications,
  };
};
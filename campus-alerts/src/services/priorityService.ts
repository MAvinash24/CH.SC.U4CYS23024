import type { Notification } from "../types/notification";
import { PRIORITY_WEIGHTS } from "../utils/constants";
import { getMinutesAgo } from "../utils/helpers";

export const getPriorityNotifications = (
  notifications: Notification[],
  topN = 10
) => {
  const sorted = [...notifications].sort(
    (a, b) => {
      const weightA =
        PRIORITY_WEIGHTS[
          a.Type as keyof typeof PRIORITY_WEIGHTS
        ];

      const weightB =
        PRIORITY_WEIGHTS[
          b.Type as keyof typeof PRIORITY_WEIGHTS
        ];

      const recencyA = getMinutesAgo(
        a.Timestamp
      );

      const recencyB = getMinutesAgo(
        b.Timestamp
      );

      const scoreA =
        weightA * 100 - recencyA;

      const scoreB =
        weightB * 100 - recencyB;

      return scoreB - scoreA;
    }
  );

  return sorted.slice(0, topN);
};
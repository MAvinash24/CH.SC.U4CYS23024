import {
  Card,
  CardContent,
  Typography,
  Stack,
} from "@mui/material";

import PriorityBadge from "./PriorityBadge";
import type { Notification } from "../types/notification";

function NotificationCard({
  notification,
}: {
  notification: Notification;
}) {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Stack
          direction="row"
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">
            {notification.Message}
          </Typography>

          <PriorityBadge type={notification.Type} />
        </Stack>

        <Typography sx={{ mt: 2 }}>
          {notification.Timestamp}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default NotificationCard;
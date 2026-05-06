import {
  Box,
  Container,
  Typography,
  MenuItem,
  Select,
  Button,
  Paper,
  Stack,
} from "@mui/material";

import { useMemo, useState } from "react";

import Navbar from "../components/Navbar";
import NotificationCard from "../components/NotificationCard";
import Loading from "../components/Loading";

import { useNotifications } from "../hooks/useNotifications";
import { getPriorityNotifications } from "../services/priorityService";

function Dashboard() {
  const { notifications, loading, reload } =
    useNotifications();

  const [type, setType] = useState("");

  const filteredNotifications = useMemo(() => {
    const filteredData = type
      ? notifications.filter(
          (notification) =>
            notification.Type === type
        )
      : notifications;

    return getPriorityNotifications(
      filteredData,
      10
    );
  }, [notifications, type]);

  return (
    <>
      <Navbar />

      <Container
        maxWidth="md"
        sx={{
          mt: 4,
          mb: 4,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 3,
            borderRadius: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                sm: "row",
              },
              gap: 2,
              justifyContent: "space-between",
              mb: 4,
            }}
          >
            <Select
              value={type}
              onChange={(e) =>
                setType(e.target.value)
              }
              fullWidth
            >
              <MenuItem value="">
                All Notifications
              </MenuItem>

              <MenuItem value="Placement">
                Placement
              </MenuItem>

              <MenuItem value="Result">
                Result
              </MenuItem>

              <MenuItem value="Event">
                Event
              </MenuItem>
            </Select>
            <Button
              variant="contained"
              onClick={reload}
            >
              Refresh
            </Button>
          </Box>

          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", mb: 3 }}
          >
            Top Priority Notifications
          </Typography>

          {loading ? (
            <Loading />
          ) : filteredNotifications.length === 0 ? (
            <Typography>
              No notifications found
            </Typography>
          ) : (
            <Stack spacing={2}>
              {filteredNotifications.map(
                (notification) => (
                  <NotificationCard
                    key={notification.ID}
                    notification={notification}
                  />
                )
              )}
            </Stack>
          )}
        </Paper>
      </Container>
    </>
  );
}

export default Dashboard;
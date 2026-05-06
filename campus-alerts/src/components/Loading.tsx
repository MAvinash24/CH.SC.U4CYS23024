import { CircularProgress, Box } from "@mui/material";

function Loading() {
  return (
    <Box sx={{ textAlign: "center", mt: 5 }}>
      <CircularProgress />
    </Box>
  );
}

export default Loading;
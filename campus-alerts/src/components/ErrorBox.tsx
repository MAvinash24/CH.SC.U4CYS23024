import { Alert } from "@mui/material";

function ErrorBox({ message }: { message: string }) {
  return <Alert severity="error">{message}</Alert>;
}

export default ErrorBox;
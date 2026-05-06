import Chip from "@mui/material/Chip";

const colors: any = {
  Placement: "success",
  Result: "warning",
  Event: "primary",
};

function PriorityBadge({ type }: { type: string }) {
  return (
    <Chip
      label={type}
      color={colors[type]}
      variant="filled"
    />
  );
}

export default PriorityBadge;
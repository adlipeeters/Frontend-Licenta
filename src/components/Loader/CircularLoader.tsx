import { Box, CircularProgress } from "@mui/material";

interface CircularProgressProps {}

const CircularLoader: React.FunctionComponent<CircularProgressProps> = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default CircularLoader;

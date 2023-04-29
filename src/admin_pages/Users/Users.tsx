import React from "react";
import { useQuery } from "@tanstack/react-query";
import UsersTable from "./components/Table";
import { Box, Button } from "@mui/material";
import CircularLoader from "../../components/Loader/CircularLoader";
import AddCardIcon from "@mui/icons-material/AddCard";
import { getUsers } from "../../api/admin-api/users/users";
// import CreateCategory from "./components/CreateCategory";

interface UsersProps {}

const Users: React.FunctionComponent<UsersProps> = () => {
  const [open, setOpen] = React.useState(false);
  const query = useQuery(["usersData"], () => getUsers(), {
    retry: 1,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error: any) => {
      console.log(error.response.status);
    },
  });

  if (query.isLoading || query.isError) {
    return <CircularLoader />;
  }

  return (
    <Box sx={{ flexGrow: 1, height: "100%" }}>
      <Button
        variant="contained"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "5px",
          marginBottom: "15px",
          "&:hover": {
            // backgroundColor: theme.palette.success.light,
          },
        }}
        onClick={() => setOpen(true)}
      >
        <AddCardIcon />
        Add User
      </Button>
      <UsersTable data={query.data} />
      {/* <CreateCategory open={open} setOpen={setOpen} /> */}
    </Box>
  );
};

export default Users;

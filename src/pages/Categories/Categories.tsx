import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../api/categories/categories";
import CategoriesTable from "./components/Table";
import { Box, Button } from "@mui/material";
import CircularLoader from "../../components/Loader/CircularLoader";
import AddCardIcon from "@mui/icons-material/AddCard";
import CreateCategory from "./components/CreateCategory";

interface CategoriesProps {}

const Categories: React.FunctionComponent<CategoriesProps> = () => {
  const [open, setOpen] = React.useState(false);
  const query = useQuery(["categoriesData"], () => getCategories(), {
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
    <Box sx={{ flexGrow: 1 }}>
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
        Add Category
      </Button>
      <CategoriesTable data={query.data} />
      <CreateCategory open={open} setOpen={setOpen} />
    </Box>
  );
};

export default Categories;

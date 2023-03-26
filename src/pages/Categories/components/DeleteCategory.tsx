import React from "react";
import { Box, Button, TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import {
  getCategory,
  deleteCategory,
} from "../../../api/categories/categories";
import { useTheme } from "@mui/material/styles";

const validationSchema = z.object({
  //   name: z.string().min(1, { message: "Name is required" }),
});

interface EditCategoryProps {}

type ValidationSchema = z.infer<typeof validationSchema>;

function EditCategory(props: any) {
  const theme = useTheme();
  const handleClose = () => {
    // props.setOpen((prevState: any) => ({ ...prevState, state: false }));
    props.setOpen((prevState: any) => ({ id: "", state: false }));
  };

  const queryClient = useQueryClient();

  const categoryQuery = useQuery({
    queryKey: ["categoriesData", props.open.id],
    // enabled: props.open.id != null,
    queryFn: () => getCategory(Number(props.open.id)),
    onSuccess: (data) => {
      //   console.log(data);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: (data) => {
      toast.success("Category deleted successfully!", {
        position: "top-right",
      });
      queryClient.invalidateQueries(["categoriesData"], {
        exact: true,
      });
      queryClient.removeQueries(["categoriesData", props.open.id], {
        exact: true,
      });
      handleClose();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data.message, {
        position: "top-right",
      });
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => {
    console.log(props.open.id);
    deleteMutation.mutate({
      id: props.open.id,
    });
    // reset();
  };

  React.useEffect(() => {
    if (categoryQuery?.data) {
      reset({ name: categoryQuery.data.name });
    }
  }, [categoryQuery?.data, reset]);

  return (
    <>
      <div>
        <Dialog open={props.open.state} onClose={handleClose} fullWidth={true}>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <DialogTitle
              sx={{
                textAlign: "center",
                //    color: theme.palette.error.main
              }}
            >
              Delete {categoryQuery?.data?.name} Category ?
            </DialogTitle>
            <DialogContent>
              <DialogContentText
                sx={{
                  textAlign: "center",
                  fontSize: "24px",
                  //   color: theme.palette.error.main,
                }}
              >
                You won't be able to revert this!
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} variant="contained">
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={deleteMutation.isLoading ? true : false}
                color="error"
              >
                {deleteMutation.isLoading ? (
                  <CircularProgress size={25} />
                ) : (
                  "Delete"
                )}
              </Button>{" "}
            </DialogActions>
          </Box>
        </Dialog>
      </div>
    </>
  );
}

export default EditCategory;

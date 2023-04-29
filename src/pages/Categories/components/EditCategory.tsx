import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
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
  updateCategory,
  getCategory,
} from "../../../api/categories/categories";

const validationSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  type: z.enum(["income", "expense"]).optional(),
});

interface EditCategoryProps {}

type ValidationSchema = z.infer<typeof validationSchema>;

function EditCategory(props: any) {
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

  const editMutation = useMutation({
    mutationFn: updateCategory,
    onSuccess: (data) => {
      toast.success("Category updated successfully!", {
        position: "top-right",
      });
      queryClient.invalidateQueries(["categoriesData"], {
        exact: true,
      });
      queryClient.invalidateQueries(["categoriesData", props.open.id], {
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
    watch,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
    defaultValues: { name: "" },
  });

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => {
    editMutation.mutate({
      id: props.open.id,
      name: data.name,
      type: data.type,
    });
    reset();
  };

  React.useEffect(() => {
    if (categoryQuery?.data) {
      reset({ name: categoryQuery.data.name, type: categoryQuery.data.type });
    }
  }, [categoryQuery?.data, reset]);

  return (
    <>
      <div>
        <Dialog open={props.open.state} onClose={handleClose} fullWidth={true}>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogContent>
              <DialogContentText></DialogContentText>
              <TextField
                size="small"
                error={errors.name ? true : false}
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                autoComplete="name"
                autoFocus
                {...register("name")}
                helperText={errors.name && errors.name?.message}
                InputLabelProps={{ shrink: true }}
              />
              <FormControl
                sx={{ width: "100%", marginBottom: "8.5px" }}
                size="small"
              >
                <InputLabel id="demo-simple-select-readonly-label">
                  Type
                </InputLabel>
                <Select
                  error={errors.type ? true : false}
                  labelId="demo-simple-select-readonly-label"
                  id="demo-simple-select-readonly"
                  label="Type"
                  defaultValue={""}
                  {...register("type")}
                  value={watch("type") || ""}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"expense"}>Expense</MenuItem>
                  <MenuItem value={"income"}>Income</MenuItem>
                </Select>
                <FormHelperText>
                  {errors.type && errors.type?.message}
                </FormHelperText>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} variant="contained">
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={editMutation.isLoading ? true : false}
              >
                {editMutation.isLoading ? (
                  <CircularProgress size={25} />
                ) : (
                  "Save"
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

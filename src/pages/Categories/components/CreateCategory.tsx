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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategory } from "../../../api/categories/categories";

const validationSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  type: z.enum(["income", "expense"]).optional(),
});

interface CreateCategoryProps {}

type ValidationSchema = z.infer<typeof validationSchema>;

function CreateCategory(props: any) {
  const handleClose = () => {
    props.setOpen(false);
  };

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: (data) => {
      toast.success("Category created successfully!", {
        position: "top-right",
      });
      queryClient.invalidateQueries(["categoriesData"], { exact: true });
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
    createMutation.mutate({
      name: data.name,
      type: data.type,
    });
    reset();
  };
  return (
    <>
      <div>
        <Dialog open={props.open} onClose={handleClose} fullWidth={true}>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <DialogTitle>Create Category</DialogTitle>
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
                disabled={createMutation.isLoading ? true : false}
              >
                {createMutation.isLoading ? (
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

export default CreateCategory;

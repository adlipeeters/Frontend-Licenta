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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAccount } from "../../../api/accounts/accounts";

const validationSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  amount: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Expected number, received a string",
  }),
});

interface CreateAccountProps {}

type ValidationSchema = z.infer<typeof validationSchema>;

function CreateAccount(props: any) {
  const handleClose = () => {
    props.setOpen(false);
  };

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createAccount,
    onSuccess: (data) => {
      toast.success("Account created successfully!", {
        position: "top-right",
      });
      queryClient.invalidateQueries(["accountsData"], { exact: true });
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
      amount: data.amount,
    });
    reset();
  };
  return (
    <>
      <div>
        <Dialog open={props.open} onClose={handleClose} fullWidth={true}>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <DialogTitle>Create Account</DialogTitle>
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
              <TextField
                size="small"
                error={errors.amount ? true : false}
                margin="normal"
                required
                fullWidth
                id="amount"
                label="Amount"
                autoComplete="amount"
                autoFocus
                {...register("amount")}
                helperText={errors.amount && errors.amount?.message}
                type="number"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button
                type="submit"
                // variant="contained"
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

export default CreateAccount;

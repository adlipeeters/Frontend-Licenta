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
import { useTheme } from "@mui/material/styles";
import {
  deleteScheduledTransaction,
  getScheduledTransaction,
} from "../../../api/scheduled-transactions/scheduled-transactions";

const validationSchema = z.object({
  //   name: z.string().min(1, { message: "Name is required" }),
});

interface DeleteScheduledTransactionProps {}

type ValidationSchema = z.infer<typeof validationSchema>;

function DeleteScheduledTransactionProps(props: any) {
  const theme = useTheme();
  const handleClose = () => {
    // props.setOpen((prevState: any) => ({ ...prevState, state: false }));
    props.setOpen((prevState: any) => ({ id: "", state: false }));
  };

  const queryClient = useQueryClient();

  const transactionQuery = useQuery({
    queryKey: ["scheduledTransactionsData", props.open.id],
    // enabled: props.open.id != null,
    queryFn: () => getScheduledTransaction(Number(props.open.id)),
    onSuccess: (data) => {
      //   console.log(data);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteScheduledTransaction,
    onSuccess: (data) => {
      toast.success("Transaction deleted successfully!", {
        position: "top-right",
      });
      queryClient.invalidateQueries(["scheduledTransactionsData"], {
        exact: true,
      });
      queryClient.removeQueries(["scheduledTransactionsData", props.open.id], {
        exact: true,
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
    console.log(props.open.id);
    deleteMutation.mutate({
      id: props.open.id,
    });
    // reset();
  };

  React.useEffect(() => {
    if (transactionQuery?.data) {
      reset({ name: transactionQuery.data.name });
    }
  }, [transactionQuery?.data, reset]);

  return (
    <>
      <div>
        <Dialog open={props.open.state} onClose={handleClose} fullWidth={false}>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <DialogTitle
              sx={{
                textAlign: "center",
                //    color: theme.palette.error.main
              }}
            >
              Delete Scheduled Transaction ?
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

export default DeleteScheduledTransactionProps;

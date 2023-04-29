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
import { getAccount, deleteAccount } from "../../../api/accounts/accounts";
import { useTheme } from "@mui/material/styles";

const validationSchema = z.object({
  //   name: z.string().min(1, { message: "Name is required" }),
});

interface DeleteAccountProps {}

type ValidationSchema = z.infer<typeof validationSchema>;

function DeleteAccount(props: any) {
  const theme = useTheme();
  const handleClose = () => {
    // props.setOpen((prevState: any) => ({ ...prevState, state: false }));
    props.setOpen((prevState: any) => ({ id: "", state: false }));
  };

  const queryClient = useQueryClient();

  const accountQuery = useQuery({
    queryKey: ["accountsData", props.open.id],
    // enabled: props.open.id != null,
    queryFn: () => getAccount(Number(props.open.id)),
    onSuccess: (data) => {
      //   console.log(data);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteAccount,
    onSuccess: (data) => {
      toast.success("Account deleted successfully!", {
        position: "top-right",
      });
      queryClient.invalidateQueries(["accountsData"], {
        exact: true,
      });
      queryClient.removeQueries(["accountsData", props.open.id], {
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
    if (accountQuery?.data) {
      reset({ name: accountQuery.data.name });
    }
  }, [accountQuery?.data, reset]);

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
              Delete {accountQuery?.data?.name} Account ?
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

export default DeleteAccount;

import { useParams } from "react-router-dom";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { getAccount, updateAccount } from "../../../api/accounts/accounts";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { toast } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CircularLoader from "../../../components/Loader/CircularLoader";
import React from "react";

const Item = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  // color: theme.palette.text.secondary,
  borderRadius: "5px",
  boxShadow: "0px 2px 10px 0px rgba(58, 53, 65, 0.1)",
  position: "relative",
  height: "100%",
}));

const validationSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  amount: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Expected number, received a string",
  }),
});

type ValidationSchema = z.infer<typeof validationSchema>;

interface AccountPageProps {}

const AccountPage: React.FunctionComponent<any> = (props) => {
  const queryClient = useQueryClient();
  const theme = useTheme();

  const accountQuery = useQuery({
    queryKey: ["accountsData", props.id],
    // enabled: id != null,
    queryFn: () => getAccount(Number(props.id)),
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const editMutation = useMutation({
    mutationFn: updateAccount,
    onSuccess: (data) => {
      toast.success("Account updated successfully!", {
        position: "top-right",
      });
      queryClient.invalidateQueries(["accountsData"], {
        exact: true,
      });
      queryClient.invalidateQueries(["accountsData", props.id], {
        exact: true,
      });
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
    editMutation.mutate({
      id: props.id,
      name: data.name,
      amount: data.amount,
    });
    reset();
  };

  React.useEffect(() => {
    if (accountQuery?.data) {
      reset({ name: accountQuery.data.name, amount: accountQuery.data.amount });
    }
  }, [accountQuery?.data, reset]);

  if (accountQuery.isLoading || accountQuery.isError) {
    return <CircularLoader />;
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Typography
        variant="h5"
        component="div"
        sx={{
          display: "flex",
          justifyContent: "center",
          color: theme.palette.grey[800],
        }}
      >
        Update Account
      </Typography>
      <TextField
        disabled={editMutation.isLoading ? true : false}
        error={errors.name ? true : false}
        margin="normal"
        required
        id="name"
        label="Name"
        autoComplete="name"
        fullWidth
        size="small"
        {...register("name")}
        helperText={errors.name && errors.name?.message}
      />
      <TextField
        disabled={editMutation.isLoading ? true : false}
        error={errors.amount ? true : false}
        margin="normal"
        required
        id="amount"
        label="Amount"
        autoComplete="amount"
        fullWidth
        size="small"
        {...register("amount")}
        helperText={errors.amount && errors.amount?.message}
      />
      <Button
        fullWidth
        type="submit"
        variant="contained"
        disabled={editMutation.isLoading ? true : false}
      >
        {editMutation.isLoading ? <CircularProgress size={25} /> : "Save"}
      </Button>{" "}
    </Box>
  );
};

export default AccountPage;

import {
  Box,
  Button,
  FormHelperText,
  TextField,
  Typography,
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
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { getCategories } from "../../../api/categories/categories";
import { createTransaction } from "../../../api/transactions/transactions";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import CircularProgress from "@mui/material/CircularProgress";
import { getAccounts } from "../../../api/accounts/accounts";
import { useState } from "react";

enum CategoryType {
  Income = "income",
  Expense = "expense",
}

const validationSchema = z.object({
  amount: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/i, {
      message: "Amount must be a number with up to 2 decimal places",
    })
    .refine((val) => !isNaN(parseFloat(val)), {
      message: "Amount must be a number",
    })
    .refine((val) => parseFloat(val) >= 1, {
      message: "Amount must be greater than or equal to 1",
    }),
  type: z.enum(["income", "expense"]).optional(),
  category: z.number().optional(),
  account: z.number().optional(),
});

interface CreateTransactionProps {}

type ValidationSchema = z.infer<typeof validationSchema>;

function CreateTransaction(props: any) {
  const handleClose = () => {
    props.setOpen(false);
  };

  const queryClient = useQueryClient();

  const accounts = useQuery(["accountsData"], () => getAccounts(), {
    retry: 1,
    onSuccess: (data) => {},
    onError: (error: any) => {},
  });

  const categories = useQuery(["categoriesData"], () => getCategories(), {
    retry: 1,
    onSuccess: (data) => {},
    onError: (error: any) => {},
  });

  const createMutation = useMutation({
    mutationFn: createTransaction,
    onSuccess: (data) => {
      toast.success("Transaction created successfully!", {
        position: "top-right",
      });
      queryClient.invalidateQueries(["transactionsData"], { exact: true });
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
    let { type } = categories.data.find(
      (category: any) => category.id === data.category
    );

    if (type !== data.type) {
      toast.error(
        "The selected category is not of the same type as the transaction",
        {
          position: "top-right",
        }
      );
    } else {
      createMutation.mutate({
        amount: Number(data.amount),
        type: data.type,
        account: data.account,
        category: data.category,
      });
      reset();
    }
  };

  return (
    <>
      <div>
        <Dialog open={props.open} onClose={handleClose} fullWidth={true}>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <DialogTitle>Create Transaction</DialogTitle>
            <DialogContent>
              <DialogContentText></DialogContentText>
              <TextField
                size="small"
                error={errors.amount ? true : false}
                margin="normal"
                required
                fullWidth
                id="amount"
                label="Amount"
                type="number"
                autoComplete="amount"
                autoFocus
                {...register("amount")}
                helperText={errors.amount && errors.amount?.message}
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
              {accounts.isLoading ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CircularProgress size={25} />
                </Box>
              ) : accounts.data.isError ? (
                <Typography variant="body1" color="error">
                  Error loading accounts. Please try again later.
                </Typography>
              ) : (
                <FormControl
                  sx={{ width: "100%", marginBottom: "8.5px" }}
                  size="small"
                >
                  <InputLabel id="demo-simple-select-readonly-label">
                    Account
                  </InputLabel>
                  <Select
                    error={errors.account ? true : false}
                    labelId="demo-simple-select-readonly-label"
                    id="demo-simple-select-readonly"
                    label="Account"
                    defaultValue={""}
                    {...register("account")}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {accounts.data.map((acc: any) => (
                      <MenuItem key={acc.id} value={acc.id}>
                        {acc.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>
                    {errors.account && errors.account?.message}
                  </FormHelperText>
                </FormControl>
              )}
              {categories.isLoading ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CircularProgress size={25} />
                </Box>
              ) : categories.data.isError ? (
                <Typography variant="body1" color="error">
                  Error loading categories. Please try again later.
                </Typography>
              ) : (
                <FormControl sx={{ width: "100%" }} size="small">
                  <InputLabel id="demo-simple-select-readonly-label">
                    Category
                  </InputLabel>
                  <Select
                    error={errors.category ? true : false}
                    labelId="demo-simple-select-readonly-label"
                    id="demo-simple-select-readonly"
                    label="Category"
                    defaultValue={""}
                    {...register("category")}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {categories.data.map((category: any) => (
                      <MenuItem
                        key={category.id}
                        value={category.id}
                        data-type={category.type}
                      >
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>
                    {errors.category && errors.category?.message}
                  </FormHelperText>
                </FormControl>
              )}
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

export default CreateTransaction;

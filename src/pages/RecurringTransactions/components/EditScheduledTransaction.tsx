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
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import CircularProgress from "@mui/material/CircularProgress";
import { getAccounts } from "../../../api/accounts/accounts";
import React, { useState } from "react";
import {
  getScheduledTransaction,
  updateScheduledTransaction,
} from "../../../api/scheduled-transactions/scheduled-transactions";
import { validationSchema } from "./Validation";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { format, parseISO } from "date-fns";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";

interface EditScheduledTransactionProps {}

type ValidationSchema = z.infer<typeof validationSchema>;

function EditScheduledTransaction(props: any) {
  const theme = useTheme();
  const [selectedDate, setSelectedDate] = useState<null | any | Date>(null);
  const handleClose = () => {
    props.setOpen((prevState: any) => ({ id: "", state: false }));
  };

  const queryClient = useQueryClient();

  const transactionQuery = useQuery({
    queryKey: ["scheduledTransactionsData", props.open.id],
    // enabled: props.open.id != null,
    queryFn: () => getScheduledTransaction(Number(props.open.id)),
    onSuccess: (data) => {
      console.log(data);
    },
  });

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

  const editMutation = useMutation({
    mutationFn: updateScheduledTransaction,
    onSuccess: (data) => {
      toast.success("Scheduled transaction updated successfully!", {
        position: "top-right",
      });
      queryClient.invalidateQueries(["scheduledTransactionsData"], {
        exact: true,
      });
      queryClient.invalidateQueries(
        ["scheduledTransactionsData", props.open.id],
        {
          exact: true,
        }
      );
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
    watch,
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
        "The selected category is not of the same type as the scheduled transaction",
        {
          position: "top-right",
        }
      );
    } else {
      editMutation.mutate({
        id: props.open.id,
        amount: Number(data.amount),
        type: data.type,
        account: data.account,
        category: data.category,
        nextCronDate: format(new Date(selectedDate), "yyyy-MM-dd"),
        frequency: data.frequency,
      });
      reset();
    }
  };

  React.useEffect(() => {
    if (transactionQuery?.data) {
      reset({
        amount: transactionQuery.data.amount,
        type: transactionQuery.data.type,
        account: transactionQuery.data.account.id,
        category: transactionQuery.data.category.id,
        frequency: transactionQuery.data.frequency,
      });
      setSelectedDate(new Date(transactionQuery.data.nextCronDate));
    }
  }, [transactionQuery?.data, reset]);
  return (
    <>
      <div>
        <Dialog open={props.open.state} onClose={handleClose} fullWidth={true}>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <DialogTitle>Edit Transaction</DialogTitle>
            <DialogContent>
              <DialogContentText></DialogContentText>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker
                        label="First transaction date"
                        sx={{ width: "100%" }}
                        slotProps={{ textField: { size: "small" } }}
                        value={selectedDate}
                        onChange={(newValue) => setSelectedDate(newValue)}
                        format="yyyy-MM-dd"
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl
                    sx={{
                      width: "100%",
                      [theme.breakpoints.up("md")]: { mt: 1 },
                    }}
                    size="small"
                  >
                    <InputLabel id="demo-simple-select-readonly-label">
                      Frequency
                    </InputLabel>
                    <Select
                      error={errors.frequency ? true : false}
                      labelId="demo-simple-select-readonly-label"
                      id="demo-simple-select-readonly"
                      label="Frequency"
                      //   defaultValue={""}
                      value={watch("frequency") || ""}
                      {...register("frequency")}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={"daily"}>Daily</MenuItem>
                      <MenuItem value={"every_15_days"}>Every 15 days</MenuItem>
                      <MenuItem value={"monthly"}>Monthly</MenuItem>
                    </Select>
                    <FormHelperText>
                      {errors.frequency && errors.frequency?.message}
                    </FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
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
                  //   defaultValue={""}
                  value={watch("type") || ""}
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
                    value={watch("account") || ""}
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
                    value={watch("category") || ""}
                    {...register("category")}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {categories.data.map((category: any) => (
                      <MenuItem key={category.id} value={category.id}>
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

export default EditScheduledTransaction;

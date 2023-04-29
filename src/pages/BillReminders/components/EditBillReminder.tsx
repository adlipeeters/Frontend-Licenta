import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
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
import { createAccount } from "../../../api/accounts/accounts";
import { useEffect } from "react";
import AddCardIcon from "@mui/icons-material/AddCard";
import {
  createBillReminder,
  getBillReminder,
  toggleBillReminder,
  updateBillReminder,
} from "../../../api/bill-reminders/bill-reminders";
import { format } from "date-fns";
import { useTheme } from "@mui/material/styles";

const validationSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  date: z.string().min(1, { message: "Date is required" }),
  amount: z.string().min(1, { message: "Amount is required" }),
  description: z.string().optional(),
});

interface EditBillReminderProps {}

type ValidationSchema = z.infer<typeof validationSchema>;

function EditBillReminder(props: any) {
  const theme = useTheme();
  const handleClose = () => {
    props.setOpen({ id: null, state: false });
  };

  const queryClient = useQueryClient();

  const billReminderQuery = useQuery({
    queryKey: ["billRemindersData", props.open.id],
    enabled: props.open.id != null,
    queryFn: () => getBillReminder(Number(props.open.id)),
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const editMutation = useMutation({
    mutationFn: updateBillReminder,
    onSuccess: (data) => {
      toast.success("Reminder updated successfully!", {
        position: "top-right",
      });
      queryClient.invalidateQueries(["billRemindersData"], { exact: true });
      queryClient.invalidateQueries(["billRemindersData", props.open.id], {
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

  const toggleStatus = useMutation({
    mutationFn: toggleBillReminder,
    onSuccess: (data) => {
      toast.success("Status updated successfully!", {
        position: "top-right",
      });
      queryClient.invalidateQueries(["billRemindersData"], {
        exact: true,
      });
      queryClient.invalidateQueries(["billRemindersData", props.open.id], {
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

  const handleToggle = () => {
    if (props.open.id !== null) {
      toggleStatus.mutate(props.open.id);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => {
    if (props.open.id !== null) {
      editMutation.mutate({
        id: props.open.id,
        title: data.name,
        date: data.date,
        description: data.description,
        amount: data.amount,
      });
      reset();
    }
  };

  useEffect(() => {
    if (billReminderQuery?.data) {
      reset({
        name: billReminderQuery.data.title,
        description: billReminderQuery.data.description,
        date: format(new Date(billReminderQuery.data.date), "yyyy-MM-dd"),
        amount: billReminderQuery.data.amount,
      });
    }
  }, [billReminderQuery?.data, reset]);

  const toggleBtn =
    billReminderQuery.data && billReminderQuery.data.isCompleted === 0
      ? "Mark as Complete"
      : "Mark as Incomplete";
  return (
    <>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Typography sx={{ textAlign: "right" }} variant="h5">
          Update Reminder
        </Typography>
        <FormControl fullWidth>
          <TextField
            size="small"
            error={errors.date ? true : false}
            margin="normal"
            required
            fullWidth
            id="date"
            label="Date"
            autoComplete="date"
            InputProps={{
              readOnly: true,
            }}
            {...register("date")}
            helperText={errors.date && errors.date?.message}
            type="string"
            InputLabelProps={{ shrink: true }}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            size="small"
            error={errors.name ? true : false}
            margin="normal"
            required
            fullWidth
            id="name"
            label="Title"
            autoComplete="name"
            autoFocus
            {...register("name")}
            helperText={errors.name && errors.name?.message}
            InputLabelProps={{ shrink: true }}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            size="small"
            error={errors.description ? true : false}
            margin="normal"
            // required
            fullWidth
            id="description"
            label="Description"
            autoComplete="description"
            {...register("description")}
            helperText={errors.description && errors.description?.message}
            InputLabelProps={{ shrink: true }}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            size="small"
            error={errors.amount ? true : false}
            margin="normal"
            required
            fullWidth
            id="amount"
            label="Amount"
            autoComplete="amount"
            {...register("amount")}
            helperText={errors.amount && errors.amount?.message}
            type="number"
            InputLabelProps={{ shrink: true }}
          />
        </FormControl>
        <Box sx={{ display: "flex", gap: "5px" }}>
          <Button
            variant="contained"
            type="submit"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",
              marginTop: "15px",
              flexGrow: 1,
              "&:hover": {},
            }}
            // onClick={handleDateClick}
            disabled={editMutation.isLoading ? true : false}
          >
            {editMutation.isLoading ? <CircularProgress size={25} /> : "Update"}
          </Button>
          <Button
            variant="contained"
            type="button"
            onClick={handleToggle}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",
              marginTop: "15px",
              flexGrow: 1,
              background:
                billReminderQuery.data &&
                billReminderQuery.data.isCompleted === 0
                  ? theme.palette.success.main
                  : theme.palette.error.main,
              "&:hover": {},
            }}
            // onClick={handleDateClick}
            disabled={editMutation.isLoading ? true : false}
          >
            {editMutation.isLoading ? (
              <CircularProgress size={25} />
            ) : (
              toggleBtn
            )}
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default EditBillReminder;

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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAccount } from "../../../api/accounts/accounts";
import { useEffect } from "react";
import AddCardIcon from "@mui/icons-material/AddCard";
import { createBillReminder } from "../../../api/bill-reminders/bill-reminders";

const validationSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  date: z.string().min(1, { message: "Date is required" }),
  amount: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Expected number, received a string",
  }),
  description: z.string().optional(),
});

interface CreateBillReminderProps {}

type ValidationSchema = z.infer<typeof validationSchema>;

function CreateBillReminder(props: any) {
  const handleClose = () => {
    props.setOpen({ date: null, state: false });
  };

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createBillReminder,
    onSuccess: (data) => {
      toast.success("Reminder created successfully!", {
        position: "top-right",
      });
      queryClient.invalidateQueries(["billRemindersData"], { exact: true });
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
      title: data.name,
      date: data.date,
      description: data.description,
      amount: data.amount,
    });
    reset();
  };

  useEffect(() => {
    console.log(props.open.date);
    reset({ date: props.open.date });
  }, [props.open.date, reset]);
  return (
    <>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Typography sx={{ textAlign: "right" }} variant="h5">
          Create Reminder
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
            autoFocus
            InputProps={{
              readOnly: true,
            }}
            {...register("date")}
            helperText={errors.date && errors.date?.message}
            type="string"
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
            autoFocus
            {...register("description")}
            helperText={errors.description && errors.description?.message}
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
            autoFocus
            {...register("amount")}
            helperText={errors.amount && errors.amount?.message}
            type="number"
          />
        </FormControl>
        <Button
          fullWidth
          variant="contained"
          type="submit"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "5px",
            marginTop: "15px",
            "&:hover": {},
          }}
          // onClick={handleDateClick}
          disabled={createMutation.isLoading ? true : false}
        >
          {createMutation.isLoading ? <CircularProgress size={25} /> : "Save"}
        </Button>
      </Box>
    </>
  );
}

export default CreateBillReminder;

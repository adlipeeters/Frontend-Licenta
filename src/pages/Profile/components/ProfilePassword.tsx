import React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import images from "../../../constants/images";
import { Button, TextField } from "@mui/material";
import { useStateContext } from "../../../context/AuthUserContext";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changePassword } from "../../../api/auth/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

interface ProfilePasswordProps {}

const Div = styled("div")(({ theme }) => ({
  width: "100%",
  gap: "30px",
  display: "flex",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

const validationSchema = z.object({
  password: z
    .string()
    .min(6, { message: "Password must be atleast 6 characters" }),
  newPassword: z
    .string()
    .min(6, { message: "New Password must be atleast 6 characters" }),
});
// .refine((data) => data.password === data.newPassword, {
//   path: ["newPassword"],
//   message: "Password don't match",
// });

type ValidationSchema = z.infer<typeof validationSchema>;

const ProfilePassword: React.FunctionComponent<ProfilePasswordProps> = () => {
  const profilePasswordMutation = useMutation({
    mutationFn: changePassword,
    onSuccess: (data) => {
      console.log(data);
      //   queryClient.invalidateQueries(["authUser"], { exact: true });
      // navigate("/login");
      toast.success("Your password has been updated!", {
        position: "top-right",
      });
      reset();
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
    profilePasswordMutation.mutate({
      oldPassword: data.password,
      newPassword: data.newPassword,
    });
  };

  //   if (profilePasswordMutation.isLoading) {
  //     return <FullScreenLoader />;
  //   }

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Div></Div>
          <Grid item xs={12}>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              sx={{ mt: 1 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    disabled={profilePasswordMutation.isLoading ? true : false}
                    error={errors.password ? true : false}
                    margin="normal"
                    required
                    id="password"
                    label="Old password"
                    autoComplete="password"
                    fullWidth
                    {...register("password")}
                    helperText={errors.password && errors.password?.message}
                    type="password"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    disabled={profilePasswordMutation.isLoading ? true : false}
                    error={errors.newPassword ? true : false}
                    margin="normal"
                    required
                    id="newPassword"
                    label="New Password"
                    autoComplete="newPassword"
                    fullWidth
                    {...register("newPassword")}
                    helperText={
                      errors.newPassword && errors.newPassword?.message
                    }
                    type="password"
                  />
                </Grid>
                <Grid item xs={12} sx={{ display: "flex" }}>
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={profilePasswordMutation.isLoading ? true : false}
                  >
                    {profilePasswordMutation.isLoading ? (
                      <CircularProgress size={25} />
                    ) : (
                      "Change Password"
                    )}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfilePassword;

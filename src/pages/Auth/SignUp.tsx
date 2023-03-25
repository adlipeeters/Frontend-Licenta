import React from "react";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { register as signup } from "../../api/auth/auth";
import { toast } from "react-toastify";
import { Avatar, Box, Container, CssBaseline } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate, Link as RouterLink } from "react-router-dom";

interface SignUpProps {}

const validationSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    username: z.string().min(1, { message: "Username is required" }),
    email: z.string().min(1, { message: "Email is required" }).email({
      message: "Must be a valid email",
    }),
    password: z
      .string()
      .min(6, { message: "Password must be atleast 6 characters" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password don't match",
  });

type ValidationSchema = z.infer<typeof validationSchema>;

const SignUp: React.FunctionComponent<SignUpProps> = () => {
  const navigate = useNavigate();

  const registerMutation = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      navigate("/login");
      toast.success("Your account has been created!", {
        position: "top-right",
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
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => {
    console.log(data);
    registerMutation.mutate({
      name: data.name,
      username: data.username,
      email: data.email,
      password: data.password,
    });
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "white",
            borderRadius: "5px",
            boxShadow: "0px 2px 10px 0px rgba(58, 53, 65, 0.1)",
            padding: "50px 30px",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
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
              error={errors.username ? true : false}
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              autoComplete="username"
              {...register("username")}
              helperText={errors.username && errors.username?.message}
            />
            <TextField
              size="small"
              error={errors.email ? true : false}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              autoComplete="email"
              {...register("email")}
              helperText={errors.email && errors.email?.message}
            />
            <TextField
              size="small"
              error={errors.password ? true : false}
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register("password")}
              helperText={errors.password && errors.password?.message}
            />
            <TextField
              size="small"
              error={errors.confirmPassword ? true : false}
              margin="normal"
              required
              fullWidth
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="current-password"
              {...register("confirmPassword")}
              helperText={
                errors.confirmPassword && errors.confirmPassword?.message
              }
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={registerMutation.isLoading ? true : false}
            >
              {registerMutation.isLoading ? (
                <CircularProgress size={25} />
              ) : (
                "Sign In"
              )}
            </Button>
            <Grid container>
              <Grid
                item
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                {/* <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link> */}
                <RouterLink to={"/login"} style={{ fontSize: "14px" }}>
                  {"Already have an account? Sign in instead"}
                </RouterLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default SignUp;

import React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import images from "../../../constants/images";
import { Button, TextField, Typography } from "@mui/material";
import { useStateContext } from "../../../context/AuthUserContext";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { getMe, updateProfile } from "../../../api/auth/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ProfileImage from "./ProfileImage";
import FullScreenLoader from "../../../components/Loader/FullScreenLoader";

interface ProfileFormProps {}

const Div = styled("div")(({ theme }) => ({
  width: "100%",
  gap: "30px",
  display: "flex",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  //   "image/webp",
];

const validationSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  username: z.string().min(1, { message: "Username is required" }),
  email: z.string().min(1, { message: "Email is required" }).email({
    message: "Must be a valid email",
  }),
  // profileImage: z
  //   .any()
  //   .refine((files) => files?.length === 1, { message: "Image is required." })
  //   .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, {
  //     message: "Max file size is 5MB.",
  //   })
  //   .refine(
  //     (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
  //     {
  //       message: ".jpg, .jpeg, .png and .webp files are accepted.",
  //     }
  //     //   ".jpg, .jpeg, .png and .webp files are accepted."
  //   ),
});

type ValidationSchema = z.infer<typeof validationSchema>;

const ProfileForm: React.FunctionComponent<ProfileFormProps> = () => {
  const navigate = useNavigate();
  const [image, setImage] = React.useState(images.avatar);
  const imageRef = React.useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();
  const profileSettingsMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["authUser"], { exact: true });
      // navigate("/login");
      toast.success("Your profile has been updated!", {
        position: "top-right",
      });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data.message, {
        position: "top-right",
      });
    },
  });

  const userData = useQuery(["authUser"], () => getMe(), {
    retry: 1,
    // select: (data) => data.data.user,
    onSuccess: (data) => {
      console.log(data);
      stateContext.dispatch({ type: "SET_USER", payload: data });
    },
    onError: (error: any) => {
      console.log(error.response.status);
      if (error.response.status === 401) {
        navigate("/login");
      }
    },
  });

  const stateContext = useStateContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    defaultValues: {
      name: userData.data.name,
      username: userData.data.username,
      email: userData.data.email,
    },
    resolver: zodResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => {
    // console.log(data);
    // const formData = new FormData();
    // formData.append("file", image);
    profileSettingsMutation.mutate({
      id: stateContext.state.authUser?.id,
      name: data.name,
      username: data.username,
      email: data.email,
      // profileImage: formData,
    });
  };

  // const onImageChange = (event: any) => {
  //   if (event.target.files && event.target.files[0]) {
  //     setImage(URL.createObjectURL(event.target.files[0]));
  //     // setImage(event.target.files[0]);
  //   }
  // };

  if (profileSettingsMutation.isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Div>
            {/* <img
              alt="alt"
              src={image}
              style={{
                borderRadius: "5px",
                width: "150px",
                height: "150px",
                // minHeight: "150px",
                objectFit: "cover",
              }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                justifyContent: "center",
              }}
            >
              <ProfileImage />
              <Typography component="span">
                Allowed PNG, JPG or JPEG. Max size of 500K.
              </Typography>
            </div> */}
            <ProfileImage />
          </Div>
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
                    disabled={userData.isLoading ? true : false}
                    error={errors.name ? true : false}
                    margin="normal"
                    required
                    id="name"
                    label="Name"
                    autoComplete="name"
                    fullWidth
                    {...register("name")}
                    helperText={errors.name && errors.name?.message}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    disabled={userData.isLoading ? true : false}
                    error={errors.username ? true : false}
                    margin="normal"
                    required
                    id="username"
                    label="Username"
                    autoComplete="username"
                    fullWidth
                    {...register("username")}
                    helperText={errors.username && errors.username?.message}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    disabled={userData.isLoading ? true : false}
                    error={errors.email ? true : false}
                    margin="normal"
                    required
                    id="email"
                    label="Email Address"
                    autoComplete="email"
                    fullWidth
                    {...register("email")}
                    helperText={errors.email && errors.email?.message}
                  />
                </Grid>
                <Grid item xs={12} sx={{ display: "flex" }}>
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={userData.isLoading ? true : false}
                  >
                    Save Changes
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

export default ProfileForm;

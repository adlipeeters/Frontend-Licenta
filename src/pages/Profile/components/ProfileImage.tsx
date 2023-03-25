import { Button, Typography } from "@mui/material";
import React from "react";
import images from "../../../constants/images";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProfileImage, updateProfileImage } from "../../../api/auth/auth";
import { useStateContext } from "../../../context/AuthUserContext";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";

interface ProfileImageProps {}

const ProfileImage: React.FunctionComponent<ProfileImageProps> = () => {
  const [image, setImage] = React.useState(images.avatar);
  const stateContext = useStateContext();

  const queryClient = useQueryClient();

  const profileImage = useQuery(
    ["profileImage"],
    () => getProfileImage(stateContext.state.authUser?.profileImage),
    {
      retry: 1,
      onSuccess: (image) => {},
      onError: (error: any) => {},
    }
  );

  const updateImage = useMutation({
    mutationFn: updateProfileImage,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["profileImage"], { exact: true });
      toast.success("Your profile image has been updated!", {
        position: "top-right",
      });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data.message, {
        position: "top-right",
      });
    },
  });

  const onImageChange = (e: any) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    updateImage.mutate(formData);
  };

  return (
    <>
      <div>
        {profileImage.isLoading ? (
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        ) : (
          <img
            alt="alt"
            src={profileImage.data}
            style={{
              borderRadius: "5px",
              width: "150px",
              height: "150px",
              // minHeight: "150px",
              objectFit: "cover",
            }}
          />
        )}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        <Button variant="contained" component="label">
          Upload new photo
          <input
            type="file"
            //   {...register("profileImage", {
            // onChange: (e) => {
            // onImageChange(e);
            // },
            //   })}
            onChange={onImageChange}
            hidden
          />
        </Button>{" "}
        <Typography component="span">
          Allowed PNG, JPG or JPEG. Max size of 500K.
        </Typography>
      </div>
    </>
  );
};

export default ProfileImage;

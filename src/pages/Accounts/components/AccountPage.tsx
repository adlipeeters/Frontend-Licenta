import { useParams } from "react-router-dom";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { getAccount, updateAccount } from "../../../api/accounts/accounts";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import { Box, TextField } from "@mui/material";
import { toast } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import EditAccount from "./EditAccount";

const Item = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
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

interface AccountPageProps {}

const AccountPage: React.FunctionComponent<AccountPageProps> = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const accountQuery = useQuery({
    queryKey: ["accountsData", id],
    enabled: id != null,
    queryFn: () => getAccount(Number(id)),
    onSuccess: (data) => {
      console.log(data);
    },
  });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Item></Item>
        </Grid>
        <Grid item xs={12} md={4}>
          <Item>
            <EditAccount id={id} />
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AccountPage;

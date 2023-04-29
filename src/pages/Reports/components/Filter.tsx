import {
  Autocomplete,
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { useQuery } from "@tanstack/react-query";
import { getAccounts } from "../../../api/accounts/accounts";
import { useEffect, useState } from "react";

interface ReportFilterProps {}

const ReportFilter: any = (props: any) => {
  const [defaultAcc, setDefaultAcc] = useState([]);

  const accounts = useQuery(["accountsData"], () => getAccounts(), {
    retry: 1,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error: any) => {
      // console.log(error.response.status);
    },
  });

  const handleChange = (event: any, values: any) => {
    let ids: number[] = [];

    values.forEach((value: any) => {
      ids.push(value.id);
    });

    props.setAccounts(ids);
  };
  // console.log(props.accounts);

  // useEffect(() => {
  //   let acc: any = [];
  //   props?.accounts.forEach((account: any) => {
  //     if (accounts.data) {
  //       accounts?.data.filter((item: any) => {
  //         if (item?.id === account) {
  //           console.log(account, item);
  //           acc.push(item);
  //         }
  //       });
  //     }
  //   });
  //   setDefaultAcc(acc);
  // }, [props?.accounts, accounts?.data]);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Box sx={{ minWidth: 120, paddingY: "8.5px" }}>
            <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-label">Report type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={props.type}
                label="Report type"
                onChange={(e) => props.setType(e.target.value)}
              >
                <MenuItem value={0}>Expense & Income</MenuItem>
                <MenuItem value={1}>Expense by Category</MenuItem>
                <MenuItem value={2}>Income by Category</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box sx={{ minWidth: 120, paddingY: "8.5px" }}>
            {/* <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-label">
                Specify accounts
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={age}
                label="Specify accounts"
                // onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {accounts?.data != null &&
                  accounts?.data.map((acc: any) => (
                    <MenuItem key={acc.id} value={acc.id}>
                      {acc.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl> */}
            <Autocomplete
              multiple
              id="tags-outlined"
              size="small"
              options={accounts?.data != null ? accounts?.data : []}
              getOptionLabel={(option: any) => option?.name}
              onChange={handleChange}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Accounts"
                  placeholder="Accounts"
                />
              )}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box sx={{ minWidth: 120, paddingY: "8.5px" }}>
            <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-label">
                Exclude categories
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={age}
                label="Exclude categories"
                // onChange={handleChange}
              >
                <MenuItem value={10}>Expense & Income</MenuItem>
                <MenuItem value={20}>Expense by Category</MenuItem>
                <MenuItem value={30}>Income by Category</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box sx={{ minWidth: 120 }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Period"
                  sx={{ width: "100%" }}
                  slotProps={{ textField: { size: "small" } }}
                  openTo="month"
                  //   value={selectedDate}
                  //   onChange={(newValue) => setSelectedDate(newValue)}
                  views={["year", "month"]}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
];

export default ReportFilter;

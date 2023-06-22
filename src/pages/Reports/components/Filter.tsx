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
import { getCategories } from "../../../api/categories/categories";

interface ReportFilterProps {}

const ReportFilter: any = (props: any) => {
  const [defaultAcc, setDefaultAcc] = useState([]);

  const accounts = useQuery(["accountsData"], () => getAccounts(), {
    retry: 1,
    onSuccess: (data) => {
      // console.log(data);
    },
    onError: (error: any) => {
      // console.log(error.response.status);
    },
  });

  const categories = useQuery(["categoriesData"], () => getCategories(), {
    retry: 1,
    onSuccess: (data) => {
      // console.log(data);
    },
    onError: (error: any) => {
      // console.log(error.response.status);
    },
  });
  const handleAccountChange = (event: any, values: any) => {
    let ids: number[] = [];

    values.forEach((value: any) => {
      ids.push(value.id);
    });

    props.setAccounts(ids);
  };

  const handleCategoryChange = (event: any, values: any) => {
    let ids: number[] = [];

    values.forEach((value: any) => {
      ids.push(value.id);
    });

    props.setExcludedCategories(ids);
  };

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
            <Autocomplete
              multiple
              id="tags-outlined"
              size="small"
              options={accounts?.data != null ? accounts?.data : []}
              getOptionLabel={(option: any) => option?.name}
              onChange={handleAccountChange}
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
            <Autocomplete
              multiple
              id="tags-outlined"
              size="small"
              options={categories?.data != null ? categories?.data : []}
              getOptionLabel={(option: any) => option?.name}
              onChange={handleCategoryChange}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Exclude categories"
                  placeholder="Exclude categories"
                />
              )}
            />
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
                  value={props.period}
                  onChange={(newValue) => props.setPeriod(newValue)}
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

export default ReportFilter;

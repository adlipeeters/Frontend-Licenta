import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";

interface TransactionsTableProps {}

const TableWrapper = styled("div")(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  borderRadius: "5px",
  boxShadow: "0px 2px 10px 0px rgba(58, 53, 65, 0.1)",
  background: "white",
  position: "relative",
  height: "100%",
  width: "100%",
}));

const TransactionsTable: React.FunctionComponent<any> = (props) => {
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "firstName", headerName: "First name", width: 150 },
    { field: "lastName", headerName: "Last name", width: 150 },
    { field: "age", headerName: "Age", type: "number", width: 100 },
    // adaugă alte coloane aici
  ];

  const rows = [
    { id: 1, firstName: "John", lastName: "Doe", age: 35 },
    { id: 2, firstName: "Jane", lastName: "Doe", age: 28 },
    { id: 3, firstName: "Bob", lastName: "Smith", age: 42 },
    // adaugă alte rânduri aici
  ];
  return (
    <TableWrapper>
      <DataGrid
        rows={rows}
        columns={columns}
        slots={{ toolbar: GridToolbar }}
        sx={{ border: "none", minHeight: "300px" }}
      />
    </TableWrapper>
  );
};

export default TransactionsTable;

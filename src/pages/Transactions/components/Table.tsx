import * as React from "react";
import {
  DataGrid,
  GridColDef,
  GridPrintExportOptions,
  GridToolbar,
} from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import { Chip, IconButton, Tooltip } from "@mui/material";
import EditTransaction from "./EditTransaction";
import { Delete, Edit } from "@mui/icons-material";
import DeleteTransaction from "./DeleteTransaction";
import {
  parseISO,
  formatDistanceToNow,
  formatDistanceToNowStrict,
  format,
} from "date-fns";

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
  const [edit, setEdit] = React.useState({ state: false, id: "" });
  const [destroy, setDestroy] = React.useState({ state: false, id: "" });

  const handleEditClick = (rowData: any) => {
    setEdit({ state: true, id: rowData.id });
  };

  const handleDeleteClick = (rowData: any) => {
    setDestroy({ state: true, id: rowData.id });
  };

  React.useEffect(() => {
    if (props.data != null && props.data.length > 0) {
      for (let i = 0; i < props.data.length; i++) {
        props.data[i]["formattedDate"] = format(
          parseISO(props.data[i].createdAt),
          "MMMM dd, yyyy"
        );
      }
    }
  }, [props.data]);

  const columns: GridColDef[] = [
    { field: "amount", headerName: "Amount" },
    {
      field: "type",
      headerName: "Type",
      valueFormatter: (params) =>
        params.value.charAt(0).toUpperCase() + params.value.slice(1),
    },
    {
      field: "account.name",
      headerName: "Account",
      valueGetter: (params) => params.row.account.name,
    },
    {
      field: "category.name",
      headerName: "Category",
      valueGetter: (params) => params.row.category.name,
      width: 150,
    },
    {
      field: "formattedDate",
      headerName: "Date",
      width: 150,
    },
    {
      field: "scheduledTransaction",
      headerName: "",
      width: 150,
      renderCell: (params: any) => (
        <React.Fragment>
          {params.row.scheduledTransaction !== null ? (
            <Chip label="Scheduled" />
          ) : (
            ""
          )}
        </React.Fragment>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      headerAlign: "right",
      align: "right",
      renderCell: (params: any) => (
        <React.Fragment>
          <Tooltip placement="left" title="Edit Transaction">
            <IconButton onClick={() => handleEditClick(params.row)}>
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip placement="right" title="Delete Transaction">
            <IconButton onClick={() => handleDeleteClick(params.row)}>
              <Delete />
            </IconButton>
          </Tooltip>
        </React.Fragment>
      ),
    },
  ];

  const rows = [...props.data];
  return (
    <TableWrapper>
      <DataGrid
        rows={rows}
        columns={columns}
        slots={{ toolbar: GridToolbar }}
        sx={{ border: "none", minHeight: "300px" }}
        disableRowSelectionOnClick
      />
      <EditTransaction open={edit} setOpen={setEdit} />
      <DeleteTransaction open={destroy} setOpen={setDestroy} />
    </TableWrapper>
  );
};

export default TransactionsTable;

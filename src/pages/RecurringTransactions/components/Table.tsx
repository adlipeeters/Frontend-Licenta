import * as React from "react";
import {
  DataGrid,
  GridColDef,
  GridPrintExportOptions,
  GridToolbar,
} from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import { IconButton, Tooltip } from "@mui/material";
// import EditTransaction from "./EditTransaction";
import { Delete, Edit } from "@mui/icons-material";
// import DeleteTransaction from "./DeleteTransaction";
import {
  parseISO,
  formatDistanceToNow,
  formatDistanceToNowStrict,
  format,
} from "date-fns";
import Chip from "@mui/material/Chip";
import { useTheme } from "@mui/material/styles";
import EditScheduledTransaction from "./EditScheduledTransaction";
import DeleteScheduledTransaction from "./DeleteScheduledTransaction";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleTransactionStatus } from "../../../api/scheduled-transactions/scheduled-transactions";
import { toast } from "react-toastify";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ViewIssuedTransactions from "./ViewIssuedTransactions";

interface ScheduledTransactionsTableProps {}

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

const ScheduledTransactionsTable: React.FunctionComponent<any> = (props) => {
  const theme = useTheme();
  const queryClient = useQueryClient();

  const [view, setView] = React.useState({ state: false, id: "" });
  const [edit, setEdit] = React.useState({ state: false, id: "" });
  const [destroy, setDestroy] = React.useState({ state: false, id: "" });

  console.log(view);

  const handleViewClick = (rowData: any) => {
    setView({ state: true, id: rowData.id });
  };

  const handleEditClick = (rowData: any) => {
    setEdit({ state: true, id: rowData.id });
  };

  const handleDeleteClick = (rowData: any) => {
    setDestroy({ state: true, id: rowData.id });
  };

  const handleStatus = (rowData: any) => {
    toggleStatus.mutate(rowData.id);
  };

  const toggleStatus = useMutation({
    mutationFn: toggleTransactionStatus,
    onSuccess: (data) => {
      toast.success("Status updated successfully!", {
        position: "top-right",
      });
      queryClient.invalidateQueries(["scheduledTransactionsData"], {
        exact: true,
      });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data.message, {
        position: "top-right",
      });
    },
  });

  React.useEffect(() => {
    if (props.data != null && props.data.length > 0) {
      for (let i = 0; i < props.data.length; i++) {
        props.data[i]["formattedDate"] = format(
          parseISO(props.data[i].createdAt),
          "MMMM dd, yyyy"
        );
        props.data[i]["nextCronDate"] = format(
          new Date(props.data[i].nextCronDate),
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
      //   width: 150,
    },
    {
      field: "formattedDate",
      headerName: "Created At",
      width: 150,
    },
    {
      field: "nextCronDate",
      headerName: "Next Transaction",
      width: 150,
    },
    {
      field: "frequency",
      headerName: "Frequency ",
      valueFormatter: (params) => {
        switch (params.value) {
          case "monthly":
            return "Monthly";
          case "daily":
            return "Daily";
          case "every_15_days":
            return "Every 15 days";

          default:
            break;
        }
      },
      width: 150,
    },
    {
      field: "isActive",
      headerName: "Status ",
      renderCell: (params: any) => (
        <React.Fragment>
          {params.row.isActive === 1 ? (
            <Chip
              label="Active"
              sx={{ background: theme.palette.success.main, color: "white" }}
            />
          ) : (
            <Chip
              label="Inactive"
              sx={{ background: theme.palette.error.main, color: "white" }}
            />
          )}
        </React.Fragment>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      headerAlign: "center",
      align: "right",
      renderCell: (params: any) => (
        <React.Fragment>
          <Tooltip placement="left" title="View issued transactions">
            <IconButton onClick={() => handleViewClick(params.row)}>
              <VisibilityIcon />
            </IconButton>
          </Tooltip>
          <Tooltip placement="bottom" title="Edit Transaction">
            <IconButton onClick={() => handleEditClick(params.row)}>
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip placement="bottom" title="Delete Transaction">
            <IconButton onClick={() => handleDeleteClick(params.row)}>
              <Delete />
            </IconButton>
          </Tooltip>
          <Tooltip placement="right" title="Toggle Status">
            <IconButton onClick={() => handleStatus(params.row)}>
              {params.row.isActive === 1 ? (
                <RadioButtonCheckedIcon />
              ) : (
                <RadioButtonUncheckedIcon />
              )}
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
        // autoHeight
        rows={rows}
        columns={columns}
        slots={{ toolbar: GridToolbar }}
        sx={{ border: "none", minHeight: "75vh" }}
        disableRowSelectionOnClick
      />
      <ViewIssuedTransactions open={view} setOpen={setView} />
      <EditScheduledTransaction open={edit} setOpen={setEdit} />
      <DeleteScheduledTransaction open={destroy} setOpen={setDestroy} />
    </TableWrapper>
  );
};

export default ScheduledTransactionsTable;

import * as React from "react";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import { Box, IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import Tooltip from "@mui/material/Tooltip";
import EditCategory from "./EditCategory";
import DeleteCategory from "./DeleteCategory";

interface CategoriesTableProps {}

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

const CategoriesTable: React.FunctionComponent<any> = (props) => {
  const [edit, setEdit] = React.useState({ state: false, id: "" });
  const [destroy, setDestroy] = React.useState({ state: false, id: "" });

  const handleEditClick = (rowData: any) => {
    setEdit({ state: true, id: rowData.id });
  };

  const handleDeleteClick = (rowData: any) => {
    setDestroy({ state: true, id: rowData.id });
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 250 },
    {
      field: "type",
      headerName: "Type",
      width: 250,
      valueFormatter: (params) =>
        params.value.charAt(0).toUpperCase() + params.value.slice(1),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      headerAlign: "right",
      align: "right",
      renderCell: (params: any) => (
        <React.Fragment>
          <Tooltip placement="left" title="Edit Category">
            <IconButton onClick={() => handleEditClick(params.row)}>
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip placement="right" title="Delete Category">
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
        // autoHeight
        rows={rows}
        columns={columns}
        slots={{ toolbar: GridToolbar }}
        sx={{ border: "none", minHeight: "75vh" }}
        disableRowSelectionOnClick
      />
      <EditCategory open={edit} setOpen={setEdit} />
      <DeleteCategory open={destroy} setOpen={setDestroy} />
    </TableWrapper>
  );
};

export default CategoriesTable;

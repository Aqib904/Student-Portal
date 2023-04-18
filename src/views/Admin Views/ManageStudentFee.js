import React from "react";
import { useEffect, useState } from "react";
import LoadingOverlay from "react-loading-overlay";
import { useLocation } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
} from "reactstrap";
import { getFeeStatus } from "../../store/actions/feeAction";
import { styled } from "@mui/material/styles";
import { gridClasses } from "@mui/x-data-grid";
import { GridToolbar } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
export default function ManageStudentFee() {
  const location = useLocation();
  const dispatch = useDispatch();
  const data = location?.state;
  const { feeStatus, feeStatusloading } = useSelector((state) => state.fee);
  const [rows, setRows] = useState([]);
  const StripedDataGrid = styled(DataGrid)(() => ({
    [`& .${gridClasses.row}.even`]: {
      backgroundColor: "#EEEE",
    },
  }));
  const columns = [
    { field: "id", headerName: "Id", hide: true, filterable: false },
    {
      field: "installment_no",
      headerName: "Installment No",
      width: 150,
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 170,
    },
    {
      field: "issue_date",
      headerName: "Issue Date",
      width: 170,
    },

    {
      field: "expiry_date",
      headerName: "Expiry Date",
      width: 170,
    },
    {
      field: "FeeStatus",
      type: "action",
      headerName: "Fee Status",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            {params.row.status == false ? (
              <span>Pending</span>
            ) : (
              <span>Approved</span>
            )}
          </>
        );
      },
    },
    {
      field: "status",
      type: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Button
              className={`${
                params.row.status == false ? "bg-site-success" : "bg-warning"
              } text-white border-0 `}
              disabled={params.row.status == true ? true : false}
            >
              <i class="fas fa-check"></i>
            </Button>
          </>
        );
      },
    },
  ];
  useEffect(() => {
    const updatedRows = [...feeStatus].sort(
      (a, b) => a.installment_no - b.installment_no
    );
    setRows(updatedRows);
  }, [feeStatus]);
  useEffect(() => {
    dispatch(getFeeStatus(data?.regNo));
  }, []);
  return (
    <>
      <h4 className="d-none d-md-block m-0 font-weight-bold mx-3">
        Manage Student Fee
      </h4>
      <Container>
        <Row>
          <Col sm={12} md={12}>
            <Card className="shadow my-3 w-100 z-index-n1">
              <LoadingOverlay
                active={feeStatusloading}
                spinner
                text="Fee Status Loading...."
              >
                <CardHeader>
                  <div>
                    <h6 className="d-inline-block">Name:&nbsp;</h6>
                    <span>{data.name}</span>
                  </div>
                </CardHeader>
                <StripedDataGrid
                  autoHeight
                  autoWidth
                  columns={columns}
                  rows={rows}
                  disableSelectionOnClick={false}
                  getRowClassName={(params) =>
                    params.indexRelativeToCurrentPage % 2 === 0 ? "odd" : "even"
                  }
                  hideFooterPagination={true}
                />
              </LoadingOverlay>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

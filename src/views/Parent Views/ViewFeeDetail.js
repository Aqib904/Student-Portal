import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, CardHeader, Col, Container, Row } from "reactstrap";
import { getChallan, getFeeDetail } from "../../store/actions/feeAction";
import { Details } from "@material-ui/icons";
import { styled } from "@mui/material/styles";
import { gridClasses } from "@mui/x-data-grid";
import { GridToolbar } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import LoadingOverlay from "react-loading-overlay";
import { Link, useHistory, useLocation } from "react-router-dom";
export default function Fee() {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const [username, setUsername] = useState(location?.state);
  const { feeDetail, loading } = useSelector((state) => state.fee);
  const StripedDataGrid = styled(DataGrid)(() => ({
    [`& .${gridClasses.row}.even`]: {
      backgroundColor: "#EEEE",
    },
  }));
  const [rows, setRows] = useState([]);
  const handletransferData = (data) => {
    const totalAmount =
      data.semesterFee +
      data.otherFee +
      data.extraCourseFee +
      data.addmissionFee;
    console.log(totalAmount, "totalAmount");
    history.push({
      pathname: `/parent/generate_challan/${data.id}`,
      state: {
        ...data,
        totalAmount: totalAmount,
        username: username,
      },
    });
  };
  const columns = [
    { field: "id", headerName: "Id", hide: true, filterable: false },
    {
      field: "semesterFee",
      headerName: "Semester Fee",
      width: 130,
    },
    {
      field: "otherFee",
      headerName: "Other Fee",
      width: 100,
    },
    {
      field: "addmissionFee",
      headerName: "Admission Fee",
      width: 130,
    },
    {
      field: "extraCourseFee",
      headerName: "Extra Courses Fee",
      width: 140,
    },
    {
      field: "enrolledCoursesCount",
      headerName: "Total Enroll Courses",
      width: 150,
    },
    {
      field: "totalFee",
      headerName: "Total Fee",
      width: 100,
    },
    {
      field: "status",
      headerName: "Status",
      width: 110,
    },
    {
      field: "isChallanGenerated",
      type: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            {params.row.status == "generated" ? (
              <Button
                className="bg-site-success text-white border-0"
                onClick={() => dispatch(getChallan(username))}
              >
                <i className="fas fa-print"></i>
              </Button>
            ) : params.row.status == "pending" ? (
              <Button
                className="bg-site-success text-white border-0"
                onClick={() => handletransferData(params.row)}
              >
                <i className="fas fa-folder-plus"></i>
              </Button>
            ) : (
              ""
            )}
            <Button
              className="bg-site-success text-white border-0 mx-2"
              onClick={() =>
                history.push({
                  pathname: `/parent/fee-status/${username}`,
                  state: username,
                })
              }
            >
              <i className="fas fa-eye"></i>
            </Button>
          </>
        );
      },
    },
  ];
  useEffect(() => {
    setUsername(location?.state);
  }, [location]);
  useEffect(() => {
    let tempdata = [];
    let totalFee = 0;
    if (!isNaN(feeDetail.semesterFee)) {
      totalFee += feeDetail.semesterFee;
    }
    if (!isNaN(feeDetail.otherFee)) {
      totalFee += feeDetail.otherFee;
    }
    if (!isNaN(feeDetail.extraCourseFee)) {
      totalFee += feeDetail.extraCourseFee;
    }
    if (!isNaN(feeDetail.admissionFee)) {
      totalFee += feeDetail.admissionFee;
    }
    tempdata.push({
      id: 1,
      addmissionFee: feeDetail.admissionFee,
      enrolledCoursesCount: feeDetail.enrolledCoursesCount,
      extraCourseFee: feeDetail.extraCourseFee,
      otherFee: feeDetail.otherFee,
      semesterFee: feeDetail.semesterFee,
      status: feeDetail.status,
      totalFee: totalFee,
    });
    setRows(tempdata);
  }, [feeDetail]);
  useEffect(() => {
    dispatch(getFeeDetail(username));
  }, [username]);
  return (
    <>
      <h4 className="d-block d-md-block m-0 font-weight-bold mx-2">
        <Link
          className="text-dark"
          onClick={() =>
            history.push({
              pathname: `/parent/view-information/${username}`,
              state: username,
            })
          }
        >
          <i class="fas fa-arrow-alt-circle-left"></i>
        </Link>
        &nbsp;Fee Detail
      </h4>
      <Container fluid>
        <Row>
          <Col>
            <Card className="shadow my-3 w-100 z-index-n1 my-5">
              <LoadingOverlay
                active={loading}
                spinner
                text="Fee Detail Loading...."
              >
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

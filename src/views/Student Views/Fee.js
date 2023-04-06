import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, CardHeader, Col, Container, Row } from "reactstrap";
import { getFeeDetail } from "../../store/actions/feeAction";
import { Details } from "@material-ui/icons";
import { styled } from "@mui/material/styles";
import { gridClasses } from "@mui/x-data-grid";
import { GridToolbar } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import LoadingOverlay from "react-loading-overlay";
import { useHistory } from "react-router-dom";
export default function Fee() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { feeDetail,loading } = useSelector((state) => state.fee);
  const { token } = useSelector((state) => state.authUser);
  const StripedDataGrid = styled(DataGrid)(() => ({
    [`& .${gridClasses.row}.even`]: {
      backgroundColor: "#EEEE",
    },
  }));
  const [rows, setRows] = useState([]);
  const columns = [
    { field: "id", headerName: "Id", hide: true, filterable: false },
    {
      field: "semesterFee",
      headerName: "Semester Fee",
      width: 240,
    },
    {
      field: "otherFee",
      headerName: "Other Fee",
      width: 170,
    },
    {
      field: "extraCourseFee",
      headerName: "Extra Courses Fee",
      width: 170,
    },

    {
      field: "enrolledCoursesCount",
      headerName: "Total Enroll Courses",
      width: 170,
    },
    {
      field: "isChallanGenerated",
      type: "action",
      headerName: "Challan",
      width: 280,
      renderCell: (params) => {
        return (
          <>
            {params.row.isChallanGenerated ? (
              <Button
                className="bg-site-success text-white border-0"
              >
                View 
              </Button>
            ) : (
              <Button
              className="bg-site-success text-white border-0"
              onClick={() =>
                history.push({
                  pathname: `/student/generate_challan/${params.row.id}`,
                  state: params.row,
                })
              }
            >
              Generate
            </Button>
            )}
          </>
        );
      },
    },
  ];
  useEffect(() => {
    let tempdata = [];
    tempdata.push({
      id:1,
      enrolledCoursesCount: feeDetail.enrolledCoursesCount,
      extraCourseFee: feeDetail.extraCourseFee,
      otherFee: feeDetail.otherFee,
      semesterFee: feeDetail.semesterFee,
      isChallanGenerated: feeDetail.isChallanGenerated,
    })
    setRows(tempdata);
  }, [feeDetail]);
  useEffect(() => {
    dispatch(getFeeDetail(token?.username));
  }, []);
  return (
    <>
      <h4 className="d-none d-md-block m-0 font-weight-bold mx-3">
        Fee Detail
      </h4>
      <Container fluid>
        <Row>
          <Col>
            <Card className="shadow my-3 w-100 z-index-n1 my-5">
            <LoadingOverlay active={loading} spinner text="Fee Detail Loading....">
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

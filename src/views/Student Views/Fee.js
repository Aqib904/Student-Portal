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
import { Link, useHistory } from "react-router-dom";
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
  const handletransferData = (data)=>{
    const totalAmount = data.semesterFee + data.otherFee + data.extraCourseFee + data.addmissionFee;
    console.log(totalAmount, 'totalAmount');
    history.push({
      pathname: `/student/generate_challan/${data.id}`,
      state: {
        ...data,
        totalAmount: totalAmount
      },
    })
  }
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
      width: 170,
    },
    {
      field: "enrolledCoursesCount",
      headerName: "Total Enroll Courses",
      width: 150,
    },
    {
      field: "totalFee",
      headerName: "Total Fee",
      width: 150,
    },
    {
      field: "isChallanGenerated",
      type: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            {params.row.isChallanGenerated ? (
              <Button
                className="bg-site-success text-white border-0"
                onClick={()=>
                  dispatch(getChallan(token?.username))
                }
              >
                <i className="fas fa-print"></i>
              </Button>
            ) : (
              <Button
              className="bg-site-success text-white border-0"
              onClick={() =>
               handletransferData(params.row)
              }
            >
              <i className="fas fa-folder-plus"></i>
            </Button>
            )}
             <Link to="/student/fee_status">
             <Button
                className="bg-site-success text-white border-0 mx-2"
              >
                <i className="fas fa-eye"></i>
              </Button>
              </Link>
          </>
        );
      },
    },
  ];
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
      id:1,
      addmissionFee:feeDetail.admissionFee,
      enrolledCoursesCount: feeDetail.enrolledCoursesCount,
      extraCourseFee: feeDetail.extraCourseFee,
      otherFee: feeDetail.otherFee,
      semesterFee: feeDetail.semesterFee,
      isChallanGenerated: feeDetail.isChallanGenerated,
      totalFee: totalFee
    });
    setRows(tempdata);
  }, [feeDetail]);
  useEffect(() => {
    dispatch(getFeeDetail(token?.username));
  }, []);
  return (
    <>
      <h4 className="d-block d-md-block m-0 font-weight-bold mx-3">
      <Link className="text-dark" to="/student/finance">
          <i class="fas fa-arrow-alt-circle-left"></i>
        </Link>
        &nbsp;Fee Detail
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

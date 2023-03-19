import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getTeachersFeedback } from "../../store/actions/assessmentAction";
import { styled } from "@mui/material/styles";
import { gridClasses } from "@mui/x-data-grid";
import { GridToolbar } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Container,
  Row,
} from "reactstrap";
export default function EvaluationPercentage() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { feedback } = useSelector((state) => state.assessment);
  const data = location.state;
  const StripedDataGrid = styled(DataGrid)(() => ({
    [`& .${gridClasses.row}.even`]: {
      backgroundColor: "#EEEE",
    },
  }));
  const [rows, setRows] = useState([]);
  const columns = [
    { field: "id", headerName: "Id", hide: true, filterable: false },
    {
      field: "question",
      headerName: "Question",
      width: 550,
    },
    {
      field: "percentage",
      headerName: "Percentage",
      width: 170,
    },
  ];
  useEffect(() => {
    let tempdata = [];
    let index = 0;
    feedback?.map((item) => {
      index++;
      return tempdata.push({
        id: index,
        question: item?.question,
        percentage: item?.percentage,
      });
    });
    setRows(tempdata);
  }, [feedback]);
  useEffect(() => {
    dispatch(
      getTeachersFeedback(data?.teacher_id, data?.course_code, data?.session)
    );
  }, []);
  return (
    <>
      <Row>
        <Col>
          <h4 className="d-none d-md-block m-0 font-weight-bold mx-4">
            Evaluation Data
          </h4>
        </Col>
      </Row>
      {rows.length==0?(
        <Container>
        <Row>
          <Col>
            <Card className="shadow my-4">
                <CardHeader>
                    Evaluation of&nbsp;{data.teacherName}
                </CardHeader>
              <CardBody>
                 <p className="text-center text-danger">Evaluation pending from student!</p>
              </CardBody>
              <CardFooter></CardFooter>
            </Card>
          </Col>
        </Row>
        </Container>
      ):(
<Container>
<Row>
  <Col>
    <Card className="shadow my-4">
        <CardHeader>
            Evaluation of&nbsp;{data.teacherName}
        </CardHeader>
      <CardBody>
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
      </CardBody>
      <CardFooter></CardFooter>
    </Card>
  </Col>
</Row>
</Container>
      )}
      
    </>
  );
}

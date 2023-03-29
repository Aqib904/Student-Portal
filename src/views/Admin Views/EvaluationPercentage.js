import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getTeachersFeedback } from "../../store/actions/assessmentAction";
import { styled } from "@mui/material/styles";
import { gridClasses } from "@mui/x-data-grid";
import { GridToolbar } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import Chart from "react-apexcharts";
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

  const [individual,setIndividual] = useState({
    options: {
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: ["Excellent", "Good", "Average", "Poor"]
      },
      plotOptions: {
        bar: {
          colors: {
            ranges: [
              {
                from: 0,
                to: 30,
                color: '#F44336'
              },
              {
                from: 31,
                to: 50,
                color: '#FFC107'
              },
              {
                from: 51,
                to: 75,
                color: '#4CAF50'
              },
              {
                from: 76,
                to: 100,
                color: '#03A9F4'
              }
            ]
          }
        }
      },
      toolbar: false,
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 52, 100]
      }
    ]
  });
  const columns = [
    { field: "id", headerName: "Id", hide: true, filterable: false },
    {
      field: "question",
      headerName: "Question",
      width: 750,
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
      <Row>
        <Col lg={6} md="6" sm="12">
          <Card className="shadow mx-3 my-2">
            <CardHeader>Merged</CardHeader>
        <Chart
              options={individual.options}
              series={individual.series}
              type="bar"
              width="100%"
              
            />
            </Card>
        </Col>
        <Col lg={6} md="6" sm="12">
          <Card className="shadow mx-3 my-2">
            <CardHeader>Individual</CardHeader>
        <Chart
              options={individual.options}
              series={individual.series}
              type="bar"
              width="100%"
              
            />
            </Card>
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

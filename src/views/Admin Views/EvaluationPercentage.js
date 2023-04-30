import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
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
import ReactApexChart from "react-apexcharts";
export default function EvaluationPercentage() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { feedback } = useSelector((state) => state.assessment);
  console.log(feedback,'feedback')
  const data = location.state;
  const StripedDataGrid = styled(DataGrid)(() => ({
    [`& .${gridClasses.row}.even`]: {
      backgroundColor: "#EEEE",
    },
  }));
  const [rows, setRows] = useState([]);
  let [seriesMerge,setSeriesMerge] = useState([]);
  console.log(seriesMerge,'length')
  let [seriesIndividual,setSeriesIndividual] = useState([0,0,0,0])
  let [options, setOptions] = useState({
    labels: ["Excellent", "Good", "Average", "Poor"],
    chart: {
      type: "donut",
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          // chart: {
          //   width: 200
          // },
        },
      },
    ],
  });

  // const [individual,setIndividual] = useState({
  //   options: {
  //     chart: {
  //       id: "basic-bar"
  //     },
  //     xaxis: {
  //       categories: ["Excellent", "Good", "Average", "Poor"]
  //     },
  //     plotOptions: {
  //       bar: {
  //         colors: {
  //           ranges: [
  //             {
  //               from: 0,
  //               to: 30,
  //               color: '#F44336'
  //             },
  //             {
  //               from: 31,
  //               to: 50,
  //               color: '#FFC107'
  //             },
  //             {
  //               from: 51,
  //               to: 75,
  //               color: '#4CAF50'
  //             },
  //             {
  //               from: 76,
  //               to: 100,
  //               color: '#03A9F4'
  //             }
  //           ]
  //         }
  //       }
  //     },
  //     toolbar: false,
  //   },
  //   series: [
  //     {
  //       name: "series-1",
  //       data: [30, 40, 52, 100]
  //     }
  //   ]
  // });
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
      valueGetter: (params) => {
        const percentage = params.value;
        if (percentage >= 80) {
          return "Excellent";
        } else if (percentage >= 60 && percentage < 80) {
          return "Good";
        } else if (percentage >= 40 && percentage < 60) {
          return "Average";
        } else {
          return "Poor";
        }
      },
    },
    
  ];
  useEffect(() => {
    let tempdata = [];
    let index = 0;
    feedback?.data?.map((item) => {
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
 useEffect(() => {
  if (feedback && feedback.data2) {
    const { excellent, good, average, poor } = feedback.data2;
    setSeriesMerge([excellent, good, average, poor]);
  }
}, [feedback]);
  return (
    <>
    <Container>
      <Row>
        <Col>
          <h4 className="d-block d-md-block m-0 font-weight-bold mx-4">
          <Link className="text-dark" to="/admin/checkevaluation">
          <i class="fas fa-arrow-alt-circle-left"></i>
        </Link>
        &nbsp;Evaluation Percentage
          </h4>
        </Col>
      </Row>
      <Row>
        <Col lg={6} md={6} sm={12} sx={12}>
        {seriesIndividual[0]==0&&seriesIndividual[1]==0&&seriesIndividual[2]==0&&seriesIndividual[3]==0?(
            <Card className="shadow mx-3 my-2">
              <CardHeader>Individual</CardHeader>
              <CardBody>
                <div className="d-flex justify-content-center align-items-center">
                  <p className="text-danger">Graph view empty!</p>
                </div>
              </CardBody>
            </Card>
          ):(
            <Card className="shadow mx-3 my-2">
            <CardHeader>Individual</CardHeader>
            {/* <Chart
              options={individual.options}
              series={individual.series}
              type="bar"
              width="100%"
              
            /> */}
            <ReactApexChart
              options={options}
              series={seriesIndividual}
              type="donut"
            />
          </Card>
          )}
        </Col>
        <Col lg={6} md={6} sm={12} sx={12}>
          {seriesMerge[0]==0&&seriesMerge[1]==0&&seriesMerge[2]==0&&seriesMerge[3]==0?(
            <Card className="shadow mx-3 my-2">
              <CardHeader>Merged</CardHeader>
              <CardBody>
                <div className="d-flex justify-content-center align-items-center">
                  <p className="text-danger">Graph view empty!</p>
                </div>
              </CardBody>
            </Card>
          ):(
            <Card className="shadow mx-3 my-2">
            <CardHeader>Merged</CardHeader>
            {/* <Chart
              options={individual.options}
              series={individual.series}
              type="bar"
              width="100%"
              
            /> */}
            <ReactApexChart
              options={options}
              series={seriesMerge}
              type="donut"
            />
          </Card>
          )}
        </Col>
      </Row>
      {rows.length == 0 ? (
       
          <Row>
            <Col>
              <Card className="shadow my-4">
                <CardHeader>Evaluation of&nbsp;{data.teacherName}</CardHeader>
                <CardBody>
                  <p className="text-center text-danger">
                    Evaluation pending from student!
                  </p>
                </CardBody>
                <CardFooter></CardFooter>
              </Card>
            </Col>
          </Row>

      ) : (
        
          <Row>
            <Col>
              <Card className="shadow my-4">
                <CardHeader>Evaluation of&nbsp;{data.teacherName}</CardHeader>
                <CardBody>
                  <StripedDataGrid
                    autoHeight
                    autoWidth
                    columns={columns}
                    rows={rows}
                    disableSelectionOnClick={false}
                    getRowClassName={(params) =>
                      params.indexRelativeToCurrentPage % 2 === 0
                        ? "odd"
                        : "even"
                    }
                    hideFooterPagination={true}
                  />
                </CardBody>
                <CardFooter></CardFooter>
              </Card>
            </Col>
          </Row>
             )}
        </Container>
   
    </>
  );
}

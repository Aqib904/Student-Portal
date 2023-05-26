import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { Card, CardHeader, Col, Container, Row } from "reactstrap";
import { styled } from "@mui/material/styles";
import { gridClasses } from "@mui/x-data-grid";
import { GridToolbar } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
export default function TeacherRating() {
  const location = useLocation();
  const data = location?.state;
  console.log(data, "data");
  const [rows, setRows] = useState([]);
  console.log(rows, "<rows>");
  const [individualOptions, setIndividualOptions] = useState({});
  const [individualSeries, setIndividualSeries] = useState([]);
  const [columns, setColumns] = useState([]);
  const colors = [
    "#008FFB",
    "#00E396",
    "#FEB019",
    "#FF4560",
    "#775DD0",
    "#546E7A",
    "#26a69a",
    "#D10CE8",
  ];
  const StripedDataGrid = styled(DataGrid)(() => ({
    [`& .${gridClasses.row}.even`]: {
      backgroundColor: "#EEEE",
    },
  }));
  // const columns = [
  //   { field: "id", headerName: "Id", hide: true, filterable: false },
  //   {
  //       field: "question",
  //       headerName: "Q.No",
  //       width: 50,
  //     },
  //     {
  //       field: "questionText",
  //       headerName: "Question",
  //       width: 650,
  //     },
  //   {
  //     field: "teacherName",
  //     headerName: "Teacher Name",
  //     width: 190,
  //   },
  //   {
  //     field: "percentage",
  //     headerName: "Percentage",
  //     width: 140,
  //     valueGetter: (params) => {
  //       const percentage = params.value;
  //       if (percentage >= 80) {
  //         return "Excellent";
  //       } else if (percentage >= 60 && percentage < 80) {
  //         return "Good";
  //       } else if (percentage >= 40 && percentage < 60) {
  //         return "Average";
  //       } else {
  //         return "Poor";
  //       }
  //     },
  //   },
  // ];
  console.log(data, "data>>>>");
  useEffect(() => {
    if (data) {
      const categories = [];
      const seriesData = [];
      data?.totalResult?.forEach((item) => {
        categories.push(item.teacherName);
        seriesData.push(item.percentage);
      });
      const individual = {
        options: {
          chart: {
            height: 300,
            type: "bar",
          },
          colors: colors,
          plotOptions: {
            bar: {
              columnWidth: "15%",
              distributed: true,
            },
          },
          dataLabels: {
            enabled: false,
          },
          legend: {
            show: false,
          },
          xaxis: {
            categories: categories,
            labels: {
              style: {
                colors: colors,
                fontSize: "12px",
              },
            },
          },
        },
        series: [
          {
            data: seriesData,
          },
        ],
      };
      setIndividualOptions(individual.options);
      setIndividualSeries(individual.series);
    }
  }, [data]);
  // useEffect(() => {
  //   // Define the initial rows array
  //   const rows = [];

  //   // Initialize a counter for the question number
  //   let questionNumber = 1;
  //   let index=0;
  //   // Loop through the questionResult array
  //   data.questionResult.forEach(([question, teachers]) => {
  //     // Loop through the teachers array for each question
  //     teachers.forEach(({ teacherName, percentage }) => {
  //       index++;
  //       // Create a new object with the same question number, question, teacherName, and percentage
  //       const row = {
  //           id:index,
  //         question: questionNumber,
  //         questionText: question,
  //         teacherName,
  //         percentage,
  //       };

  //       // Add the row to the rows array
  //       rows.push(row);
  //     });

  //     // Increment the question number for the next question
  //     questionNumber++;
  //   });

  //   // Use the rows array as needed
  //   console.log(rows,'rowss'); // or perform any other operations
  // setRows(rows)
  // }, [data]);
  useEffect(() => {
    const rows = [];
    let questionNumber = 1;
    let index = 0;
    const teacherNames = [];
    const questionDataMap = new Map();
  
    data.questionResult.forEach(([question, teachers]) => {
      const mergedData = {
        id: index + 1,
        question: questionNumber,
        questionText: question,
      };
      teachers.forEach(({ teacherName, percentage }) => {
        let teacherIndex = teacherNames.indexOf(teacherName);
        if (teacherIndex === -1) {
          teacherNames.push(teacherName);
          teacherIndex = teacherNames.length - 1;
        }
        mergedData[`percentage${teacherIndex}`] = percentage;
      });
      rows.push(mergedData);
      questionDataMap.set(question, mergedData);
      questionNumber++;
      index += teachers.length;
    });
  
    const columns = [
      { field: "id", headerName: "Id", hide: true, filterable: false },
      { field: "question", headerName: "Q.No", width: 50 },
      { field: "questionText", headerName: "Question", width: 650 },
    ];
  
    teacherNames.forEach((teacherName, teacherIndex) => {
      columns.push({
        field: `percentage${teacherIndex}`,
        headerName: `${teacherName}`,
        width: 140,
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
      });
    });
  
    setRows(rows);
    setColumns(columns);
  }, [data]);
  

  return (
    <>
      <h4 className="d-block d-md-block m-0 font-weight-bold mx-3">
        <Link className="text-dark" to="/student/rating-courses">
          <i class="fas fa-arrow-alt-circle-left"></i>
        </Link>
        &nbsp;Teacher Rating
      </h4>
      <Container fluid>
        <Row className="my-4">
          <Col>
            <Card>
              <CardHeader>Teachers rating of {data?.courseName}</CardHeader>
              <div
                style={{ width: "100%", maxWidth: "500px", margin: "0 auto" }}
              >
                <Chart
                  options={individualOptions}
                  series={individualSeries}
                  type="bar"
                  height={300}
                />
              </div>
            </Card>
          </Col>
        </Row>
        <Row className="my-3">
          <Col>
            <Card>
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
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

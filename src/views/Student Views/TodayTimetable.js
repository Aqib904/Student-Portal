import React from "react";
import { GRID_CHECKBOX_SELECTION_COL_DEF } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import { gridClasses } from "@mui/x-data-grid";
import { GridToolbar } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import { Card, Container, Row, Col, CardHeader } from "reactstrap";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getWeeklyTimetable } from "../../store/actions/timetableAction";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import celebration from "../../assets/img/celebration.jpg";
function TodayTimetable() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.authUser);
  const { timetable } = useSelector((state) => state.timetable);
  const [todayTimetable, setTodayTimetable] = useState([]);
  const StripedDataGrid = styled(DataGrid)(() => ({
    [`& .${gridClasses.row}.even`]: {
      backgroundColor: "#EEEE",
    },
  }));
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayname = new Date();
  let days = weekday[dayname.getDay()];
  const columns = [
    { field: "id", headerName: "Id", hide: true, filterable: false },
    {
      field: "course",
      headerName: "Course Name",
      width: 170,
    },
    {
      field: "time",
      headerName: "Time",
      width: 100,
    },
    {
      field: "venue",
      headerName: "Venue",
      width: 100,
    },
  ];
  useEffect(() => {
    let data = [];
    let index = 0;
    {
      if (timetable) {
        Object.keys(timetable)?.map((key) => {
          return timetable[key]?.detail?.map((details) => {
            index++;
            if (timetable[key]?.day == days) {
              return data.push({
                id: index,
                course: details.course,
                time: details.time,
                venue: details.venue,
              });
            }
          });
        });
      }
    }
    setTodayTimetable(data);
  }, [timetable]);
  useEffect(() => {
    dispatch(getWeeklyTimetable(token?.username));
  }, []);
  return (
    <>
        <Col sx={12} sm={12} md={12} lg={12}className="w-100">
          {todayTimetable.length != 0 ? (
            <Card className="shadow my-4 w-100 ">
              <CardHeader>Today Timetable</CardHeader>
              <Link to={"/student/timetable"}>
                <StripedDataGrid
                  autoHeight
                  autoWidth
                  columns={columns}
                  rows={todayTimetable}
                  disableSelectionOnClick={false}
                  getRowClassName={(params) =>
                    params.indexRelativeToCurrentPage % 2 === 0 ? "odd" : "even"
                  }
                  hideFooterPagination={true}
                />
              </Link>
            </Card>
          ) : (
            <Link to={"/student/timetable"} className="text-decoration-none">
              <Card className="shadow my-4 w-100 text-dark ">
                <CardHeader>Today's Timetable</CardHeader>
                <div className="d-flex justify-content-center align-items-center my-5">
                  <p className="my-2">You dont have classes today!</p>
                  {/* <img src={celebration} height={50} width={50} /> */}
                </div>
              </Card>
            </Link>
          )}
          <Row>
            <Col  sx={12} sm={12} md={12}>
              <Card className="shadow my-4 w-100 ">
                <CardHeader>Today's Notification</CardHeader>
                <div className="d-flex justify-content-center align-items-center my-5">
                  <p className="my-2">You dont have any notification!</p>
                </div>
              </Card>
            </Col>
          </Row>
        </Col>
    </>
  );
}

export default TodayTimetable;

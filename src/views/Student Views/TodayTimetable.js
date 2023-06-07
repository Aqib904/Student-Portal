import React from "react";
import { GRID_CHECKBOX_SELECTION_COL_DEF } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import { gridClasses } from "@mui/x-data-grid";
import { GridToolbar } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import { Card, Container, Row, Col, CardHeader, CardBody } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { getWeeklyTimetable } from "../../store/actions/timetableAction";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import LoadingOverlay from "react-loading-overlay";
import celebration from "../../assets/img/celebration.jpg";
import moment from "moment";
import { seenNotification } from "../../store/actions/noticeboardAction";
function TodayTimetable() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { token } = useSelector((state) => state.authUser);
  const { timetable, loading } = useSelector((state) => state.timetable);
  const [todayTimetable, setTodayTimetable] = useState([]);
  const [todayNotification, setTodayNotification] = useState([]);
  console.log(todayNotification,'todayNotification')
  const { notification, notificationLoading } = useSelector(
    (state) => state.noticeboard
  );
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
      width: 150,
    },
    {
      field: "venue",
      headerName: "Venue",
      width: 70,
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
    data.sort((a, b) => {
      const timeA = a.time.split("-")[0].trim(); // Assuming time is in the format "08:30am"
      const timeB = b.time.split("-")[0].trim();

      const [hoursA, minutesA, periodA] = timeA.split(/:|(?=[ap]m)/i);
      const [hoursB, minutesB, periodB] = timeB.split(/:|(?=[ap]m)/i);

      if (periodA.toLowerCase() === "pm" && periodB.toLowerCase() === "am") {
        return 1; // Sort 'pm' after 'am'
      } else if (
        periodA.toLowerCase() === "am" &&
        periodB.toLowerCase() === "pm"
      ) {
        return -1; // Sort 'am' before 'pm'
      } else if (hoursA === "12" && hoursB !== "12") {
        return 1; // Sort '12:00am' after '12:00pm'
      } else if (hoursA !== "12" && hoursB === "12") {
        return -1; // Sort '12:00pm' before '12:00am'
      } else {
        const timeValueA = parseInt(hoursA) * 60 + parseInt(minutesA);
        const timeValueB = parseInt(hoursB) * 60 + parseInt(minutesB);
        return timeValueA - timeValueB;
      }
    });
    setTodayTimetable(data);
  }, [timetable]);
  useEffect(() => {
    const todayNotifications = notification
      .filter((notification) => {
        const notificationTime = moment(
          notification.dateTime,
          "DD-MM-YYYY,HH:mm:ss"
        );
        const todayStart = moment().startOf("day");
        const todayEnd = moment().endOf("day");
        return notificationTime.isBetween(
          todayStart,
          todayEnd,
          undefined,
          "[]"
        );
      })
      .sort((a, b) => {
        const dateA = moment(a.dateTime, "DD-MM-YYYY,HH:mm:ss");
        const dateB = moment(b.dateTime, "DD-MM-YYYY,HH:mm:ss");
        return dateB - dateA;
      })
      .map((notification) => {
        const notificationTime = moment(
          notification.dateTime,
          "DD-MM-YYYY,HH:mm:ss"
        );
        const timeDiff = moment().diff(notificationTime, "minutes");

        let formattedTimeDiff = "";

        if (timeDiff < 60) {
          formattedTimeDiff = `${timeDiff} minutes ago`;
        } else {
          const hours = Math.floor(timeDiff / 60);
          const minutes = timeDiff % 60;
          formattedTimeDiff = `${hours} hour${
            hours > 1 ? "s" : ""
            // } ${minutes} minute${minutes > 1 ? "s" : ""} ago`;
          } ago`;
        }

        return {
          ...notification,
          dateTime: formattedTimeDiff,
        };
      });
    setTodayNotification(todayNotifications);
  }, [notification]);
  useEffect(() => {
    dispatch(getWeeklyTimetable(token?.username));
  }, []);
  return (
    <>
      <Col sx={12} sm={12} md={12} lg={12} className="w-100">
        {todayTimetable.length != 0 ? (
          <Card className="shadow my-4 w-100 ">
            <CardHeader>Today Timetable</CardHeader>
            <Link to={"/student/timetable"}>
              <LoadingOverlay
                active={loading}
                spinner
                text="Today Timetable Loading...."
              >
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
              </LoadingOverlay>
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
          <Col sx={12} sm={12} md={12}>
            <Card className=" shadow my-4 w-100 ">
              <CardHeader>Today's Notification</CardHeader>
              <CardBody className="notification-card">
              {todayNotification?.length == 0 ? (
                <div className="d-flex justify-content-center align-items-center my-5">
                  <p className="my-2">You dont have any notification!</p>
                </div>
              ) : (
                todayNotification?.map((item, index) => (
                    <div
                      key={index}
                      className={`notification-item   ${
                        item.status ? "status-true" : "status-false"
                      }`}
                      onClick={() => {
                        if (token?.role === "student") {
                          history.push({
                            pathname: `${item.type}`,
                          });
                          dispatch(seenNotification(item?.id))
                        }
                      }}
                    >
                      {item.status == false ? (
                        <i class="fas fa-envelope text-site-primary"></i>
                      ) : (
                        <i class="fas fa-envelope-open text-site-primary"></i>
                      )}
                      &nbsp;
                      <strong style={{ fontSize: "14px", fontWeight: 600 }}>
                        {item.detail.split("!")[0]}
                      </strong>
                      {item.status == false ? (
                        <span className="notification-dot float-right"></span>
                      ) : null}
                      <span className="notification-time float-right">
                        {item.dateTime}
                      </span>
                      <br />
                      <div style={{ marginLeft: "21px", maxWidth: "86%" }}>
                        <span style={{ fontSize: "13px", letterSpacing: 0.6 }}>
                          {item.detail.split("!")[1]}
                        </span>
                      </div>
                      <br />
                    </div>
                ))
              )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Col>
    </>
  );
}

export default TodayTimetable;

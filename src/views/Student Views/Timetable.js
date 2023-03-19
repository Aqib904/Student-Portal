import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Card, Container, Row, Col, UncontrolledTooltip } from "reactstrap";
import { getWeeklyTimetable } from "../../store/actions/timetableAction";
function Timetable() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { token, status } = useSelector((state) => state.authUser);
  const { timetable } = useSelector((state) => state.timetable);
  const [weeklytime, setWeeklyTime] = useState([]);
  const [day, setDay] = useState([]);
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
  useEffect(() => {
    let day = [];
    timetable?.map((time) => {
      return day.push(time.day);
    });
    let uniqueChars = [...new Set(day)];
    setDay(uniqueChars);
  }, [timetable]);
  useEffect(() => {
    dispatch(getWeeklyTimetable(token?.username));
  }, []);
  useEffect(() => {
    if (status == false) {
      history.push("/student/enrollment");
    }
  }, [status]);
  useEffect(() => {
    let tempdata = [];
    let index = 0;
    const indexMap = new Map();
    // Iterate over each day in the timetable
    timetable?.forEach((day) => {
      let detailArray = [];
      day?.detail?.forEach((detailObj) => {
        let indexval = indexMap.get(
          detailObj.course +
            detailObj.teacher +
            detailObj.time +
            detailObj.venue
        ); // check if indexval exists
        if (!indexval) {
          // if indexval does not exist, create a new indexval and add it to the map
          index++;
          indexval = index;
          indexMap.set(
            detailObj.course +
              detailObj.teacher +
              detailObj.time +
              detailObj.venue,
            indexval
          );
        }
        detailArray.push({
          indexval: index,
          course: detailObj.course,
          teacher: detailObj.teacher,
          time: detailObj.time,
          venue: detailObj.venue,
        });
      });
      tempdata.push({
        day: day.day,
        detail: detailArray,
      });
    });

    setWeeklyTime(tempdata);
  }, [timetable]);
  return (
    <Container>
      <Row>
        {day.map((dayname) => {
          return (
            <Col sm={12} md={8} lg={6}>
              <Card
                className={`shadow my-3 w-100 z-index-n1 my-2 ${
                  days == dayname ? "bg-site-table" : "bg-site-table-none"
                }`}
              >
                <h5 className="text-center">{dayname}</h5>
                <table className="table w-100 fs-6 ">
                  <thead className="bg-site-success  text-light">
                    <tr>
                      <th>Course</th>
                      <th>Time</th>
                      <th>Venue</th>
                      <th>Teacher</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(weeklytime).map((key) => {
                      return weeklytime[key].detail.map((details) => {
                        if (dayname === weeklytime[key].day) {
                          return (
                            <tr key={details.indexval}>
                              <td>{details.course}</td>
                              <td>{details.time}</td>
                              <td>{details.venue}</td>
                              <td id={`teacher_${details.indexval}`}>
                                {details.teacher.substr(0, 8)}..
                              </td>
                              <UncontrolledTooltip
                                placement="below"
                                target={`#teacher_${details.indexval}`}
                                autohide={false}
                              >
                                {details.teacher}
                              </UncontrolledTooltip>
                            </tr>
                          );
                        } else {
                          return null;
                        }
                      });
                    })}
                  </tbody>
                </table>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default Timetable;

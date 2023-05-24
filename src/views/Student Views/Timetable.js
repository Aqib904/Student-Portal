import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Card, Container, Row, Col, UncontrolledTooltip } from "reactstrap";
import { getWeeklyTimetable } from "../../store/actions/timetableAction";
import LoadingOverlay from "react-loading-overlay";
function Timetable() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { token, status } = useSelector((state) => state.authUser);
  const { timetable,loading } = useSelector((state) => state.timetable);
  const [weeklytime, setWeeklyTime] = useState([]);
  console.log(weeklytime,'weeklytime');
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
  const today = new Date();
  useEffect(() => {
    let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    let dayOrder = [];
    let timetableDays = [];
    timetable?.forEach((time) => {
      if (time.day && !timetableDays.includes(time.day)) {
        timetableDays.push(time.day);
      }
    });
    days.forEach((day) => {
      if (timetableDays.includes(day)) {
        dayOrder.push(day);
      }
    });
    setDay(dayOrder);
  }, [timetable]);
  
  useEffect(() => {
    dispatch(getWeeklyTimetable(token?.username));
  }, []);
  useEffect(() => {
    if (status == false) {
      history.push("/student/enrollment");
    }
  }, [status]);
  const getCurrentDay = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDate = new Date();
    const currentDayIndex = currentDate.getDay();
    return days[currentDayIndex];
  };
  
  // Function to get the order value for each day
  const getDayOrder = (day) => {
    const order = {
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6,
      Sunday: 7,
    };
    return order[day];
  };

  function convertTimeToMinutes(time) {
    const [hours, minutes] = time.split(':');
    return parseInt(hours) * 60 + parseInt(minutes);
  }
  useEffect(() => {
    let tempdata = [];
    let index = 0;
    const indexMap = new Map();
    
    // Find today's object in timetable
    const todayObject = timetable?.find((day) => day.day === getCurrentDay());
    
    if (todayObject) {
      // If today's object exists, add it at the beginning of the weeklyTime array
      const detailArray = [];
      todayObject?.detail.forEach((detailObj) => {
        let indexval = indexMap.get(
          detailObj.course +
          detailObj.teacher +
          detailObj.time +
          detailObj.venue
        );
        if (!indexval) {
          index++;
          indexval = index;
          indexMap?.set(
            detailObj.course +
            detailObj.teacher +
            detailObj.time +
            detailObj.venue,
            indexval
          );
        }
        detailArray?.push({
          indexval: index,
          course: detailObj.course,
          teacher: detailObj.teacher,
          time: detailObj.time,
          venue: detailObj.venue,
        });
      });
      tempdata.push({
        day: todayObject.day,
        detail: detailArray,
      });
    }
    
    // Sort remaining objects in weeklyTime based on weekly days order
    const remainingDays = timetable?.filter((day) => day.day !== getCurrentDay());
    remainingDays?.sort((a, b) => getDayOrder(a.day) - getDayOrder(b.day));
    
    remainingDays?.forEach((day) => {
      let detailArray = [];
      day.detail.forEach((detailObj) => {
        let indexval = indexMap.get(
          detailObj.course +
          detailObj.teacher +
          detailObj.time +
          detailObj.venue
        );
        if (!indexval) {
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
      detailArray.sort((a, b) => {
        const timeA = a.time.split('-')[0].trim(); // Assuming time is in the format "08:30am"
        const timeB = b.time.split('-')[0].trim();
    
        const [hoursA, minutesA, periodA] = timeA.split(/:|(?=[ap]m)/i);
        const [hoursB, minutesB, periodB] = timeB.split(/:|(?=[ap]m)/i);
    
        if (periodA.toLowerCase() === 'pm' && periodB.toLowerCase() === 'am') {
          return 1; // Sort 'pm' after 'am'
        } else if (periodA.toLowerCase() === 'am' && periodB.toLowerCase() === 'pm') {
          return -1; // Sort 'am' before 'pm'
        } else if (hoursA === '12' && hoursB !== '12') {
          return 1; // Sort '12:00am' after '12:00pm'
        } else if (hoursA !== '12' && hoursB === '12') {
          return -1; // Sort '12:00pm' before '12:00am'
        } else {
          const timeValueA = parseInt(hoursA) * 60 + parseInt(minutesA);
          const timeValueB = parseInt(hoursB) * 60 + parseInt(minutesB);
          return timeValueA - timeValueB;
        }
      });
      tempdata.push({
        day: day.day,
        detail: detailArray,
      });
    });
    setWeeklyTime(tempdata);
  }, [timetable]);
  console.log(timetable,'timetable')
  // useEffect(() => {
  //   let tempdata = [];
  //   let index = 0;
  //   const indexMap = new Map();
  //   // Iterate over each day in the timetable
  //   timetable?.forEach((day) => {
  //     let detailArray = [];
  //     day?.detail?.forEach((detailObj) => {
  //       let indexval = indexMap.get(
  //         detailObj.course +
  //           detailObj.teacher +
  //           detailObj.time +
  //           detailObj.venue
  //       ); // check if indexval exists
  //       if (!indexval) {
  //         // if indexval does not exist, create a new indexval and add it to the map
  //         index++;
  //         indexval = index;
  //         indexMap.set(
  //           detailObj.course +
  //             detailObj.teacher +
  //             detailObj.time +
  //             detailObj.venue,
  //           indexval
  //         );
  //       }
  //       detailArray.push({
  //         indexval: index,
  //         course: detailObj.course,
  //         teacher: detailObj.teacher,
  //         time: detailObj.time,
  //         venue: detailObj.venue,
  //       });
  //     });
  //     tempdata.push({
  //       day: day.day,
  //       detail: detailArray,
  //     });
  //   });

  //   setWeeklyTime(tempdata);
  // }, [timetable]);
  return (
    <Container>
  <Row>
    {weeklytime.map((dayData, index) => {
      const dayname = dayData.day;
      const dayIndex = weekday.findIndex((day) => day === dayname);

      return (
        <Col sm={12} md={8} lg={6} key={dayname}>
          <LoadingOverlay active={loading} spinner text="Timetable Loading....">
            <Card
              className={`shadow my-3 w-100  z-index-n1 my-2 ${
                dayIndex === today.getDay()? "bg-site-table" : "bg-site-table-none"
              }`}
            >
              <h5 className="text-center">{dayname}</h5>
              <table className="table w-100  fs-6 ">
                <thead className="bg-site-success  text-light">
                  <tr>
                    <th>Course</th>
                    <th>Time</th>
                    <th>Teacher</th>
                    <th>Venue</th>
                  </tr>
                </thead>
                <tbody>
                  {dayData.detail.map((details) => (
                    <tr key={details.indexval}>
                      <td>{details.course}</td>
                      <td>{details.time}</td>
                      <td id={`teacher_${details.indexval}`}>
                        {details.teacher.substr(0, 8)}..
                      </td>
                      <td>{details.venue}</td>
                      <UncontrolledTooltip
                        placement="below"
                        target={`#teacher_${details.indexval}`}
                        autohide={false}
                      >
                        {details.teacher}
                      </UncontrolledTooltip>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </LoadingOverlay>
        </Col>
      );
    })}
  </Row>
</Container>

    // <Container>
    //   <Row>
    //     {day.map((dayname) => {
    //       return (
    //         <Col sm={12} md={8} lg={6}>
    //           <LoadingOverlay active={loading} spinner text="Timetable Loading....">
    //           <Card
    //             className={`shadow my-3 w-100  z-index-n1 my-2 ${
    //               days == dayname ? "bg-site-table" : "bg-site-table-none"
    //             }`}
    //           >
    //             <h5 className="text-center">{dayname}</h5>
    //             <table className="table w-100  fs-6 ">
    //               <thead className="bg-site-success  text-light">
    //                 <tr>
    //                   <th>Course</th>
    //                   <th>Time</th>
    //                   <th>Venue</th>
    //                   <th>Teacher</th>
    //                 </tr>
    //               </thead>
    //               <tbody>
    //                 {Object.keys(weeklytime).map((key) => {
    //                   return weeklytime[key].detail.map((details) => {
    //                     if (dayname === weeklytime[key].day) {
    //                       return (
    //                         <tr key={details.indexval}>
    //                           <td>{details.course}</td>
    //                           <td>{details.time}</td>
    //                           <td>{details.venue}</td>
    //                           <td id={`teacher_${details.indexval}`}>
    //                             {details.teacher.substr(0, 8)}..
    //                           </td>
    //                           <UncontrolledTooltip
    //                             placement="below"
    //                             target={`#teacher_${details.indexval}`}
    //                             autohide={false}
    //                           >
    //                             {details.teacher}
    //                           </UncontrolledTooltip>
    //                         </tr>
    //                       );
    //                     } else {
    //                       return null;
    //                     }
    //                   });
    //                 })}
    //               </tbody>
    //             </table>
    //           </Card>
    //           </LoadingOverlay>
    //         </Col>
    //       );
    //     })}
    //   </Row>
    // </Container>
  );
}

export default Timetable;

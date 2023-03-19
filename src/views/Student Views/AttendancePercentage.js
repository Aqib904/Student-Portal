import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Container,
  Card,
  CardHeader,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  UncontrolledTooltip,
} from "reactstrap";
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { getStudentAttendaceList } from "../../store/actions/attendanceAction";
import { useHistory } from "react-router-dom";
export default function AttendancePercentage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { token } = useSelector((state) => state.authUser);
  const { attendancelist } = useSelector((state) => state.attendance);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [initialattendance, setInitialAttendance] = useState([]);
  const [finalattendance, setFinalAttendance] = useState([]);
  const [attendanceDetail, setAttendanceDetail] = useState();
  const [enrollmentID, setEnrollmentId] = useState("");
  const [courseCodee, setCourseCodee] = useState("");
  const myoption = {
    labels: ["Percentage"],
    chart: {
      height: 280,
      type: "radialBar",
    },
    colors: ["#099d78"],
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 0,
          size: "70%",
          background: "#fff",
        },
        track: {
          dropShadow: {
            enabled: true,
            top: 2,
            left: 0,
            blur: 4,
            opacity: 0.15,
          },
        },
        dataLabels: {
          name: {
            offsetY: -10,
            color: "#099d78",
            fontSize: "13px",
          },
          value: {
            color: "#099d78",
            fontSize: "30px",
            show: true,
          },
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "vertical",
        gradientToColors: ["#099d78"],
        stops: [0, 100],
      },
    },
    stroke: {
      lineCap: "round",
    },
  };
  const handleCourseInformationClick = (id, detail, courseCode) => {
    setAttendanceDetail(detail);
    setEnrollmentId(id);
    setCourseCodee(courseCode);
    toggle();
  };
  useEffect(() => {
    const result = attendancelist?.map((data) => {
      const detail = data.detail?.map((statues) => {
        const present = statues.status === "P" ? 1 : 0;
        const absent = statues.status === "A" ? 1 : 0;
        return {
          status: statues.status,
          date: statues.date,
          type: statues.type,
          aid: statues.aid,
          present,
          absent,
        };
      });
      const totalPresent = detail.reduce((acc, curr) => acc + curr.present, 0);
      const totalAbsent = detail.reduce((acc, curr) => acc + curr.absent, 0);
      return {
        courseCode: data.courseCode,
        courseName: data.CourseName,
        enrollmentId: data.enrollmentId,
        detail,
        totalPresent,
        totalAbsent,
      };
    });
    setInitialAttendance(result);
  }, [attendancelist]);
  useEffect(() => {
    if (initialattendance) {
      const finalAttendance = initialattendance.reduce(
        (accumulator, currentData) => {
          const total = currentData.detail.length;
          const percentage =
            total === 0
              ? 0
              : Math.round((parseInt(currentData.totalPresent) / total) * 100);
          const present = currentData.totalPresent.toString();
          const absent = (
            total - parseInt(currentData.totalPresent)
          ).toString();

          accumulator.push({
            name: [currentData.courseName],
            courseCode: currentData.courseCode,
            percentage: [percentage],
            detail: currentData.detail,
            present: present,
            absent: absent,
            enrollmentId: currentData.enrollmentId,
          });

          return accumulator;
        },
        []
      );

      const full = 100;
      const newAttendance = {
        name: finalAttendance.map((data) => data.name[0]),
        percentage: finalAttendance.map((data) =>
          data.percentage == 0 ? full : data.percentage
        ),
        detail: finalAttendance.map((data) => data.detail),
        present: finalAttendance.map((data) => data.present),
        absent: finalAttendance.map((data) => data.absent),
        enrollmentId: finalAttendance.map((data) => data.enrollmentId),
        courseCode: finalAttendance.map((data) => data.courseCode),
      };

      const result = [];
      for (let i = 0; i < newAttendance.name.length; i++) {
        result.push({
          name: [newAttendance.name[i]],
          percentage: [newAttendance.percentage[i]],
          detail: newAttendance.detail[i],
          present: newAttendance.present[i],
          absent: newAttendance.absent[i],
          enrollmentId: newAttendance.enrollmentId[i],
          courseCode: newAttendance.courseCode[i],
        });
      }
      setFinalAttendance(result);
    }
  }, [initialattendance]);
  useEffect(() => {
    dispatch(getStudentAttendaceList(token?.username));
  }, []);
  return (
<>
        <Col sm={12} md={12} lg={12} className="attendance">
          <Card className="shadow my-4 w-100 d-inline-block">
            <CardHeader>Attendance & Marks</CardHeader>
            {finalattendance?.map((item) => {
              return (
                <div className="d-inline-block my-2 position-relative">
                  <Chart
                    className="chart mx-4"
                    type="radialBar"
                    width="220"
                    series={item.percentage}
                    options={myoption}
                  />
                  <div
                    style={{
                      height: "10px",
                      width: "10px",
                      marginLeft: "80px",
                    }}
                    className="bg-site-primary text-center d-inline-block rounded-circle position-absolute  my-2"
                  ></div>
                  <div
                    style={{
                      height: "10px",
                      width: "10px",
                      marginLeft: "80px",
                      marginTop: "33px",
                    }}
                    className="bg-site-grey text-center d-inline-block rounded-circle position-absolute  "
                  ></div>
                  <p style={{marginLeft:"30px"}} className="text-center">
                    Present:&nbsp;{item.present}
                    <br />
                    Absent:&nbsp;{item.absent}
                  </p>
                  <button
                    className="attendance-btn btn mx-5 w-75 py-2"
                    id={`course_${item.courseCode}`}
                    onClick={() => {
                      handleCourseInformationClick(
                        item.enrollmentId,
                        item,
                        item.courseCode
                      );
                    }}
                  >
                    {item.name[0].substr(0, 17)}...
                  </button>
                  <UncontrolledTooltip
                                placement="below"
                                target={`#course_${item.courseCode}`}
                                autohide={false}
                              >
                                {item.name}
                              </UncontrolledTooltip>
                </div>
              );
            })}
          </Card>
        </Col>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Course Information</ModalHeader>
        <ModalBody>
          <h5 className="text-center ">Select you want to view</h5>
          <div className="d-flex justify-content-center align-items-center my-3">
            <Button
              className="bg-site-primary  mx-2"
              onClick={() =>
                history.push({
                  pathname: `/student/attendance/${enrollmentID}`,
                  state: attendanceDetail,
                })
              }
            >
              Attendance
            </Button>

            <Button
              className="bg-site-primary"
              onClick={() =>
                history.push({
                  pathname: `/student/assessment/${courseCodee}`,
                  state: courseCodee,
                })
              }
            >
              Assessment
            </Button>
          </div>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>
      </>
  );
}

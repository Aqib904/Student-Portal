import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Container,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Input,
} from "reactstrap";
import { styled } from "@mui/material/styles";
import { gridClasses } from "@mui/x-data-grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getStudentsList,
  getTeacherCourses,
} from "../../store/actions/attendanceAction";
import {
  contestAcceptAction,
  contestRejectAction,
  getContestList,
} from "../../store/actions/contestAction";
import { useHistory } from "react-router-dom";
export default function TeacherDashboard() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { teacherCourses, attendanceList } = useSelector(
    (state) => state.attendance
  );
  console.log(teacherCourses,'attendaceList');
  const { token } = useSelector((state) => state.authUser);
  const { contestList } = useSelector((state) => state.contest);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [attendanceModal, setAttendanceModal] = useState(false);
  const attendancetoggle = () => {
    clearSelect();
    setAttendanceModal(!attendanceModal)};
  const [evaluationModal, setEvaluationModal] = useState(false);
  const evaluationtoggle = () => {
    setEvaluationModal(!evaluationModal)
    clearSelect()
  };
  const [allocate, setAllocate] = useState([{}]);
  const [program, setProgram] = useState([
    { course_code: "", course_name: "" },
  ]);
  const [select, setSelect] = useState({
    section: "",
    id: "",
    discipline: "",
  });
  const [courseTitle, setCourseTitle] = useState([
    { course_code: "", course_name: "" },
  ]);
  const [decipline, setDecipline] = useState([
    { id: "", program: "", semester: "", section: "" },
  ]);
  const [contestData, setContestData] = useState([]);
  const [type, setType] = useState("");
  const [totalMarks, setTotalMarks] = useState("");
  const[allocationId,setAllocationId] = useState("")
  const [evaluationList, setEvaluationList] = useState([]);
  const[studentAttendanceList,setStudentAttendanceList] = useState([])
  const manageAttendance = () => {
    if (select.id != "" && select.section != "") {
      history.push({
        pathname: `/teacher/attendance/${id}`,
        state: studentAttendanceList,
        allocateId:allocationId
      });
    } else {
      alert("Please select the required Fields");
    }
  };
  const clearSelect =()=>{
    setSelect({
      section: "",
      id: "",
      discipline: "",
    })
  }
  const manageEvaluations = () => {
    if (
      select.id != "" &&
      select.section != "" &&
      totalMarks != "" &&
      type != ""
    ) {
      history.push({
        pathname: `/teacher/evaluation/${id}`,
        state: evaluationList,
        type: type,
      });
    } else {
      alert("Please select the required Fields");
    }
  };
  const clearFields = () => {
    setDecipline([{ id: "", program: "", semester: "", section: "" }]);
  };
  const handleProgramChange = (event,allocationIds) => {
    console.log(allocationIds,'allocationId');
    setAllocationId(allocationIds)
    attendancetoggle();
    const course_code = event;
    const course = program.find((item) => item.course_code === course_code);
    setCourseTitle({
      course_code: course_code,
      course_name: course ? course?.course_name : "",
    });
    let deciplineData = [];
    const matchingItems = teacherCourses?.filter(
      (item) => item.course_code === course_code
    );

    matchingItems.forEach((item) => {
      const discipline = {
        course_code: item.course_code,
        course_name: item.course_name,
        id: item.id,
        program: item.program,
        section: item.section,
        semester: item.semester,
      };
      deciplineData.push(discipline);
    });
    setDecipline(deciplineData);
  };
  const handleEvaluationChange = (event) => {
    evaluationtoggle();
    const course_code = event;
    const course = program.find((item) => item.course_code === course_code);
    setCourseTitle({
      course_code: course_code,
      course_name: course ? course?.course_name : "",
    });
    let deciplineData = [];
    const matchingItems = teacherCourses?.filter(
      (item) => item.course_code === course_code
    );

    matchingItems.forEach((item) => {
      const discipline = {
        course_code: item.course_code,
        course_name: item.course_name,
        id: item.id,
        program: item.program,
        section: item.section,
        semester: item.semester,
      };
      deciplineData.push(discipline);
    });
    setDecipline(deciplineData);
  };
  // const handleDeciplineChange = (event) => {
  //   const id = event.target.value;
  //   const course = decipline.find((item) => item.id === id);
  //   setSelect({
  //     ...select,
  //     id: id,
  //     section: course ? course.section : "",
  //   });
  // };
  const handleDeciplineChange = (event) => {
    const section = event.target.value;
    const selectedDiscipline = decipline.find(
      (item) => item.section === section
    );
    const id = selectedDiscipline ? selectedDiscipline.id : "";
    const disciplineCode = selectedDiscipline
      ? `BS${selectedDiscipline.program}${selectedDiscipline.semester}${selectedDiscipline.section}`
      : "";
    setSelect({
      id: id,
      section: section,
      discipline: disciplineCode,
    });
  };
  const StripedDataGrid = styled(DataGrid)(() => ({
    [`& .${gridClasses.row}.even`]: {
      backgroundColor: "#EEEE",
    },
  }));
  const column = [
    { field: "id", headerName: "Id", hide: true, filterable: false },
    {
      field: "name",
      headerName: "Name",
      width: 180,
    },
    {
      field: "reg_no",
      headerName: "Status",
      width: 200,
    },
    {
      field: "course_name",
      headerName: "Course name",
      width: 200,
    },
    {
      field: "date",
      headerName: " Date",
      width: 180,
      renderCell: (params) => {
        const dateTimeString = params.row.dateTime;
        const dateOnly = dateTimeString.split(",")[0];
        return dateOnly;
      },
    },
    {
      field: "time",
      headerName: " Time",
      width: 180,
      renderCell: (params) => {
        const dateTimeString = params.row.dateTime;
        const timeOnly = dateTimeString.split(",")[1];
        return timeOnly;
      },
    },
    {
      field: "decipline",
      type: "actions",
      headerName: "Decipline",
      width: 100,
      renderCell: (params) => {
        return (
          <p className="my-2">
            BS{params.row.program}
            {params.row.semester}
            {params.row.section}
          </p>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
    },
    {
      field: "type",
      headerName: "Type",
      width: 100,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => {
        return (
          <>
            <Button
              size="sm"
              color="success"
              className="mx-2"
              onClick={async (e) => {
                e.preventDefault();
                await dispatch(contestAcceptAction(params.row.attendance_id));
                dispatch(getContestList(token?.username));
              }}
            >
              🗸
            </Button>
            <Button
              size="sm"
              color="danger"
              className="mx-2"
              onClick={async (e) => {
                e.preventDefault();
                await dispatch(contestRejectAction(params.row.attendance_id));
                dispatch(getContestList(token?.username));
              }}
            >
              {" "}
              X
            </Button>
          </>
        );
      },
    },
  ];
  useEffect(() => {
    let tempdata = [];
    let index = 0;
    contestList.map((item) => {
      console.log(item,'item')
      index++;
      return tempdata.push({
        attendance_id: item.attendance_id,
        name: item.name,
        reg_no: item.reg_no,
        course_name: item.course_name,
        course_code: item.course_code,
        status: item.status,
        dateTime: item.dateTime,
        section: item.section,
        program: item.program,
        semester: item.semester,
        type:item.type,
        id: index,
      });
    });
    setContestData(tempdata);
  }, [contestList]);
  useEffect(() => {
    dispatch(getTeacherCourses(token?.username));
  }, []);
  useEffect(() => {
    dispatch(getContestList(token?.username));
  }, []);
  useEffect(() => {
    let allocatedData = [];
    let programData = [];
    teacherCourses?.map((item) => {
      return (
        allocatedData.push({
          course_code: item.course_code,
          course_name: item.course_name,
          semester: item.semester,
          section: item.section,
          allocation_id:item.allocation_id
        }),
        programData.push({
          course_name: item.course_name,
          course_code: item.course_code,
        })
      );
    });
    let uniqueAllocated = [
      ...new Map(allocatedData.map((m) => [m.course_name, m])).values(),
    ];
    setAllocate(uniqueAllocated);
  }, [teacherCourses]);
  useEffect(() => {
    if (select.id != "" && select.section != "") {
      dispatch(getStudentsList(select.id, select.section));
    }
  }, [select]);
  let id = 0;
  useEffect(() => {
    teacherCourses?.map((item) => {
      return (id = item.id);
    });
  }, [attendanceList]);
  useEffect(() => {
    let tempdata = [];
    attendanceList.map((item) => {
      return tempdata.push({
        id: item.id,
        name: item.name,
        reg_no: item.reg_no,
        profile_photo:item.profile_photo,
        totalMarks: totalMarks,
        obtained_marks: 0,
        type: type,
      });
    });
    setEvaluationList(tempdata);
  }, [attendanceList, totalMarks, type]);
  useEffect(() => {
    let tempdata = [];
    attendanceList.map((item) => {
      return tempdata.push({
        id: item.id,
        name: item.name,
        reg_no: item.reg_no,
        status:item.status,
        profile_photo:item.profile_photo,
        allocateId:allocationId
      });
    });
    setStudentAttendanceList(tempdata);
  }, [attendanceList,allocationId]);
  useEffect(() => {
    let programData = [];
    teacherCourses?.map((item) => {
      return programData.push({
        course_name: item.course_name,
        course_code: item.course_code,
      });
    });
    let uniqueProgram = [
      ...new Map(programData.map((m) => [m.course_code, m])).values(),
    ];
    setProgram(uniqueProgram);
  }, [teacherCourses]);
  return (
    <>
      <Container fluid>
        <Row>
          <Col lg={9}>
            <h5 className="mx-3 d-inline-block">Allocated Courses:</h5>
          </Col>
          <Col lg={3}>
            <Button
              className={`mx-3  ${
                contestData.length == 0 ? "bg-site-primary" : "bg-danger"
              }`}
              onClick={toggle}
            >
              Contest Requests
            </Button>
          </Col>
        </Row>
        <Row>
          {allocate.map((data) => {
            return (
              <Col md={6} sm={12} sx={12}>
                <Card className="shadow my-3 ">
                  <CardHeader>
                    <h6 className="text-center">{data.course_name}</h6>
                  </CardHeader>
                  <CardBody>
                    <div>
                      <h6 className="d-inline-block mx-2">Course Code:</h6>
                      <span>{data.course_code}</span>
                    </div>
                    <div>
                      <h6 className="d-inline-block mx-2">Semester:</h6>
                      <span>{data.semester}th</span>
                    </div>
                  </CardBody>
                  <CardFooter>
                    <div className="d-flex align-items-center justify-content-center">
                      <Button
                        className="bg-site-primary mx-1"
                        onClick={() => {
                          handleProgramChange(data?.course_code,data?.allocation_id);
                        }}
                      >
                        Attendance
                      </Button>
                      <Button
                        className="bg-site-primary"
                        onClick={() => {
                          handleEvaluationChange(data?.course_code);
                        }}
                      >
                        {" "}
                        Assessment
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </Col>
            );
          })}
        </Row>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Contest Request Box</ModalHeader>
          {contestData.length !== 0 ? (
            <ModalBody>
              <StripedDataGrid
                autoHeight
                autoWidth
                columns={column}
                rows={contestData}
                disableSelectionOnClick={false}
                getRowClassName={(params) =>
                  params.indexRelativeToCurrentPage % 2 === 0 ? "odd" : "even"
                }
                hideFooterPagination={true}
              />
            </ModalBody>
          ) : (
            <ModalBody>
              <div>
                <p className="text-center ">
                  Requests Box Empty&nbsp;<i class="fas fa-trash"></i>
                </p>
              </div>
            </ModalBody>
          )}
          <ModalFooter></ModalFooter>
        </Modal>
        <Modal isOpen={attendanceModal} toggle={attendancetoggle}>
          <ModalHeader
            toggle={() => {
              attendancetoggle();
              clearFields();
              clearSelect();
            }}
          >
            Manage Attendance
          </ModalHeader>
          <ModalBody>
            <div>
              {/* <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small">Course</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={program.course_code}
                  label="Course"
                  onChange={handleProgramChange}
                  required
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {program.map((item) => {
                    return (
                      <MenuItem key={item.course_code} value={item.course_code}>
                        {item.course_name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl> */}
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small">Discipline</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={select.section}
                  disabled={
                    courseTitle.course_code === "" &&
                    courseTitle.course_name === "" &&
                    true
                  }
                  label="Discipline"
                  onChange={handleDeciplineChange}
                  required
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {decipline.map((item) => {
                    const disciplineCode = `BS${item.program}${item.semester}${item.section}`;
                    return (
                      <MenuItem key={item.id} value={item.section}>
                        {disciplineCode}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button
              className="bg-site-primary"
              onClick={() => {
                manageAttendance();
              }}
            >
              Mark Attendance
            </Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={evaluationModal} toggle={evaluationtoggle}>
          <ModalHeader
            toggle={() => {
              evaluationtoggle();
              clearFields();
              clearSelect();
            }}
          >
            Manage Assessment
          </ModalHeader>
          <ModalBody>
            <div>
              {/* <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small">Course</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={program.course_code}
                  label="Course"
                  onChange={handleProgramChange}
                  required
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {program.map((item) => {
                    return (
                      <MenuItem key={item.course_code} value={item.course_code}>
                        {item.course_name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl> */}
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small">Discipline</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={select.section}
                  disabled={
                    courseTitle.course_code === "" &&
                    courseTitle.course_name === "" &&
                    true
                  }
                  label="Discipline"
                  onChange={handleDeciplineChange}
                  required
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {decipline.map((item) => {
                    const disciplineCode = `BS${item.program}${item.semester}${item.section}`;
                    return (
                      <MenuItem key={item.id} value={item.section}>
                        {disciplineCode}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>

              <FormControl
                sx={{ m: 1, minWidth: 120, width: 130, display: "block" }}
                size="small"
              >
                <Label id="demo-select-small">Total Marks</Label>
                <Input
                  type="number"
                  required
                  placeholder="total marks"
                  value={totalMarks}
                  onChange={(e) => {
                    setTotalMarks(e.target.value);
                  }}
                ></Input>
              </FormControl>
              <br />
              <FormControl
                sx={{ m: 1, minWidth: 150, display: "block" }}
                size="small"
              >
                <InputLabel id="demo-select-small">Type</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  className="w-25"
                  label="Type"
                  required
                  value={type}
                  onChange={(e) => {
                    setType(e.target.value);
                  }}
                >
                  <MenuItem value="quiz">Quiz</MenuItem>
                  <MenuItem value="assignment">Assignment</MenuItem>
                  <MenuItem value="mid">Mid</MenuItem>
                  <MenuItem value="final">Final</MenuItem>
                </Select>
              </FormControl>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              className="bg-site-primary"
              onClick={() => {
                manageEvaluations();
              }}
            >
              Assessment
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    </>
  );
}

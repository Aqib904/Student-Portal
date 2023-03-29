import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import {
  Typography,
} from "@mui/material";
import user from "../../assets/img/user.png"
import { Stack } from "@mui/system";
import { toastSuccess, toastWarning } from "../../components/global/Toast";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { GRID_CHECKBOX_SELECTION_COL_DEF } from "@mui/x-data-grid";
import DatePicker, { Calendar, utils } from "react-modern-calendar-datepicker";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { styled } from "@mui/material/styles";
import { gridClasses } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import {
  ClearStudentList,
  getStudentsList,
  getTeacherCourses,
  markAttendance,
} from "../../store/actions/attendanceAction";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { useHistory, useLocation } from "react-router-dom";
import PictureWall from "../../components/global/PictureWall";
export default function ManageAttendance() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const { teacherCourses } = useSelector((state) => state.attendance);
  const { token } = useSelector((state) => state.authUser);
  const attendanceList = location.state;
  const allocationId = location.allocateId
  const [allocate,setAllocate] = useState("")
  const [program, setProgram] = useState([
    { course_code: "", course_name: "" },
  ]);
console.log(attendanceList,'location');
  // const [decipline, setDecipline] = useState([
  //   { id: "", program: "", semester: "", section: "" },
  // ]);
  const [rows, setRows] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [flagSubmit, setFlagSubmit] = useState(false);
  const [type, setType] = useState("lab");
  // const [courseTitle, setCourseTitle] = useState([
  //   { course_code: "", course_name: "" },
  // ]);
  const today = new Date();
  const initialDate = {
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    day: today.getDate(),
  };
  const [selectedDay, setSelectedDay] = useState(initialDate);
  // const [select, setSelect] = useState({
  //   section: "",
  //   id: "",
  // });
  // const dateFormat = (dateString) => {
  //   if (dateString !== "") {
  //     const date = new Date(dateString);
  //     const day = date.getDate();
  //     const month = date.getMonth() + 1;
  //     const year = date.getFullYear();
  //     const hours = date.getHours();
  //     const minutes = date.getMinutes();
  //     const seconds = date.getSeconds();
  //     const formattedDate = `${day}/${month}/${year},${hours}:${minutes}:${seconds}`;
  //     return formattedDate;
  //   }
  // };
  // let date = new Date()
  // const formattedDate = dateFormat(date);
  //  console.log(formattedDate);
  const submitAttendanceList = () => {
    let list = [];

    rows.map((item) => {
      return list.push({
        enrollmeent_id: item.id,
        status: item.status,
        type: type,
      });
    });
    
    dispatch(markAttendance(list,allocate,fileList,history));
  };
  const handleTypeChange = (event) => {
    setType(event.target.value);
  };
  const handleAllPresent = () => {
    let tempdata = [];
    let index = 0;
    rows.map((item) => {
      index++;
      return tempdata.push({
        id: item.id,
        regno: item.regno,
        name: item.name,
        status: "P",
      });
    });
    setRows(tempdata);
  };
  const handleAbsent = () => {
    let tempdata = [];
    let index = 0;
    rows.map((item) => {
      index++;
      return tempdata.push({
        id: item.id,
        regno: item.regno,
        name: item.name,
        status: "A",
      });
    });
    setRows(tempdata);
  };

  // const handleProgramChange = (event) => {
  //   const course_code = event.target.value;
  //   const course = program.find((item) => item.course_code === course_code);
  //   setCourseTitle({
  //     course_code: course_code,
  //     course_name: course ? course?.course_name : "",
  //   });
  //   let deciplineData = [];
  //   const matchingItems = teacherCourses?.filter(
  //     (item) => item.course_code === course_code
  //   );

  //   matchingItems.forEach((item) => {
  //     const discipline = {
  //       course_code: item.course_code,
  //       course_name: item.course_name,
  //       id: item.id,
  //       program: item.program,
  //       section: item.section,
  //       semester: item.semester,
  //     };
  //     deciplineData.push(discipline);
  //   });
  //   setDecipline(deciplineData);
  // };
  // const handleDeciplineChange = (event) => {
  //   const id = event.target.value;
  //   const course = decipline.find((item) => item.id === id);
  //   setSelect({
  //     ...select,
  //     id: id,
  //     section: course ? course.section : "",
  //   });
  // };
  const StripedDataGrid = styled(DataGrid)(() => ({
    [`& .${gridClasses.row}.even`]: {
      backgroundColor: "#EEEE",
    },
  }));

  const handleClick = (id,event) => {
    event.stopPropagation(); 
    setRows((prevState) =>
      prevState.map((row) =>
        row.id === id ? { ...row, status: row.status === "P" ? "A" : "P" } : row
      )
    );
  };
  const ImageCell = (props) => {
    const [showModal, setShowModal] = useState(false);
  
    const handleImageClick = () => {
      setShowModal(!showModal);
    };
  
    return (
      <>
        <div onClick={handleImageClick}>
          <img
            className="rounded-circle"
            height={50}
            width={50}
            src={props.row.profile_photo?`https://localhost:44374/AttendanceImages/${props.row.profile_photo}`:user}
            alt={props.row.profile_photo}
          />
        </div>
        <Modal isOpen={showModal} toggle={handleImageClick}>
          <ModalHeader toggle={handleImageClick}>Image Preview</ModalHeader>
          <ModalBody>
            <img
              className=""
              height={200}
              width={200}
              src={props.row.profile_photo?`https://localhost:44374/AttendanceImages/${props.row.profile_photo}`:user}
              alt={props.row.profile_photo}
            />
          </ModalBody>
        </Modal>
      </>
    );
  };
  const columns = [
    { field: "id", headerName: "Id", hide: true, filterable: false },
    {
      field: "profile_photo",
      headerName: "Profile Photo",
      width: 100,
      renderCell: (params) => {
        return <ImageCell row={params.row} />;
      },
    },
    { field: "regno", headerName: "Reg No", width: 170 },
    { field: "name", headerName: "Name", width: 170 },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 280,
      renderCell: (params) => {
        return (
          <>
            {params.row.status ? (
              <Button
                className="bg-site-success text-white border-0"
                onClick={(event) => handleClick(params.row.id,event)}
              >
                {params.row.status}
              </Button>
            ) : (
              ""
            )}
          </>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(ClearStudentList());
  }, [token]);
  // useEffect(() => {
  //   if (select.id != "" && select.section != "") {
  //     dispatch(getStudentsList(select.id, select.section));
  //   }
  // }, [select]);
  useEffect(() => {
    let tempdata = [];
    attendanceList?.map((data) => {
      return tempdata.push({
        id: data.id,
        regno: data.reg_no,
        name: data.name,
        status: data.status,
        profile_photo:data.profile_photo
      });
    });
    setRows(tempdata);
  }, [attendanceList]);
  useEffect(() => {
    dispatch(getTeacherCourses(token?.username));
  }, [token?.username]);
  useEffect(()=>{
    let id = 0;
    attendanceList.map((item)=>{
      return(
        id=item.allocateId
      )
    })
    setAllocate(id)
  },[attendanceList])
  // useEffect(() => {
  //   let programData = [];
  //   teacherCourses?.map((item) => {
  //     return programData.push({
  //       course_name: item.course_name,
  //       course_code: item.course_code,
  //     });
  //   });
  //   let uniqueProgram = [
  //     ...new Map(programData.map((m) => [m.course_code, m])).values(),
  //   ];
  //   setProgram(uniqueProgram);
  // }, [teacherCourses]);
  return (
    <>
    <h4 className='d-none d-md-block m-0 font-weight-bold mx-4'>Manage Attendance</h4>
    <Container fluid>
      <Row>
        <Col className="my-2">
          {/* <div>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
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
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small">Discipline</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={select.id}
                disabled={
                  courseTitle.course_code === "" &&
                  courseTitle.course_name === "" &&
                  true
                }
                label="Decipline"
                onChange={handleDeciplineChange}
                required
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {decipline.map((item) => {
                  return (
                    <MenuItem key={item.id} value={item.id}>
                      BS{item.program}
                      {item.semester}
                      {item.section}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div> */}
          <FormControl className="mx-3">
            <FormLabel
              id="demo-row-radio-buttons-group-label"
              className="text-dark"
            >
              Type
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={type}
              onChange={handleTypeChange}
            >
              <FormControlLabel
                value="lab"
                control={<Radio color="success" />}
                label="Lab"
              />
              <FormControlLabel
                value="class"
                control={<Radio color="success" />}
                label="Class"
              />
            </RadioGroup>
          </FormControl>
        </Col>
      </Row>
      <Row>
        <Col>
        <Stack spacing={1} ml={2}>
                      <h5>Upload Attendance Photos</h5>
                      <Typography
                        variant="p"
                        mr={2}
                        fontWeight={500}
                        fontSize={12}
                      >
                        {/* (Upload a minimum of 7 photos of your Attendance) */}
                      </Typography>
                      <PictureWall
                        fileList={fileList}
                        setFileList={setFileList}
                      />
                    </Stack>
                    {flagSubmit && fileList.length < 6 ? (
                      <Typography
                        variant="p"
                        mr={2}
                        fontWeight={500}
                        fontSize={12}
                        sx={{ color: "red" }}
                      >
                        Upload minimum 7 photos of your property*
                      </Typography>
                    ) : null}
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <Card className="shadow my-3 ">
            <CardHeader>
              <p className="d-inline-block">Attendance list </p>
              <Button
                className="bg-site-success text-white border-0 float-right"
                onClick={() => {
                  submitAttendanceList();
                }}
                disabled={attendanceList.length==0?true:false}
              >
                Submit
              </Button>
              <Button
                className="bg-site-success text-white border-0 float-right mx-1"
                onClick={handleAllPresent}
              >
                Mark Present
              </Button>
              <Button
                className="bg-site-success text-white border-0 float-right mx-1"
                onClick={handleAbsent}
              >
                Mark Absent
              </Button>
              {/* <div className="px-4 datePicker-Card   border-0  d-inline-block  ">
                <DatePicker
                  value={selectedDay}
                  onChange={setSelectedDay}
                  inputPlaceholder="DD/MM/YY"
                  calendarPopperPosition="bottom"
                  minDate={
                    new Date(
                      today.getFullYear(),
                      today.getMonth(),
                      today.getDate()
                    )
                  }
                  maxDate={
                    new Date(
                      today.getFullYear(),
                      today.getMonth(),
                      today.getDate()
                    )
                  }
                  formatInputText={() => {
                    if (selectedDay !== "") {
                      let { day, month, year } = selectedDay;
                      let formatedDate = [day, month, year].join("/");
                      return formatedDate;
                    }
                  }}
                />
              </div> */}
            </CardHeader>
            <CardBody>
              <div className="w-100">
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
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
    </>
  );
}

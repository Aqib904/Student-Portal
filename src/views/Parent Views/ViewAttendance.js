import React from "react";
import {
  Col,
  Row,
  Container,
  Card,
  CardHeader,
  CardBody,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Input,
  Spinner,
} from "reactstrap";
import Chart from "react-apexcharts";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import { gridClasses } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useDispatch, useSelector } from "react-redux";
import { getAbsentsList } from "../../store/actions/attendanceAction";
import { markContest } from "../../store/actions/contestAction";
export default function Attendance() {
  const { absentslist } = useSelector((state) => state.attendance);
  const { loading } = useSelector((state) => state.contest);
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const rowData = location.state;
  //console.log(rowData, "rowData>>");
  const StripedDataGrid = styled(DataGrid)(() => ({
    [`& .${gridClasses.row}.even`]: {
      backgroundColor: "#EEEE",
    },
  }));
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [confirmModal, setConfirmModal] = useState(false);
  const confirmtoggle = () => setConfirmModal(!confirmModal);
  const [type, setType] = useState("all");
  const [modalType, setModalType] = useState("class");
  const [classData, setClassData] = useState([]);
  const [labData, setLabData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [modalClass, setModalClass] = useState([]);
  const [modalLab, setModalLab] = useState([]);
  const toggleContest = () => {
    toggle();
    dispatch(getAbsentsList(rowData?.attendanceDetail.enrollmentId));
  };
  const handleTypeChange = (event) => {
    setType(event.target.value);
  };
  const handleModalTypeChange = (event) => {
    setModalType(event.target.value);
  };
  const [contestData, setContestData] = useState([]);
  const handleSubmitContest = async () => {
    await dispatch(markContest(contestData));
    dispatch(getAbsentsList(rowData?.attendanceDetail?.enrollmentId));
    toggle();
    confirmtoggle();
    setContestData([]);
  };
  const handleAddContest = (row) => {
    //console.log(row,'row')
    const { attendance_id, enrollment_id, course_code } = row;
    setContestData([{ attendance_id, enrollment_id, course_code }]);
    confirmtoggle();
  };
  // const handleCheckboxClick = (row) => {
  //   const { attendance_id, enrollment_id, course_code } = row;
  //   const index = contestData.findIndex(
  //     (item) =>
  //       item.attendance_id === attendance_id &&
  //       item.enrollment_id === enrollment_id &&
  //       item.course_code === course_code
  //   );
  //   if (index > -1) {
  //     setContestData([
  //       ...contestData.slice(0, index),
  //       ...contestData.slice(index + 1),
  //     ]);
  //   } else {
  //     setContestData([
  //       ...contestData,
  //       { attendance_id, enrollment_id, course_code },
  //     ]);
  //   }
  // };
  //console.log(contestData, "contestData");
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
  const columns = [
    { field: "id", headerName: "Id", hide: true, filterable: false },
    {
      field: "date",
      headerName: " Date",
      width: 130,
      renderCell: (params) => {
        const dateTimeString = params.row.date;
        const dateOnly = dateTimeString.split(",")[0];
        return dateOnly;
      },
    },
    {
      field: "time",
      headerName: "Mark Time",
      width: 130,
      renderCell: (params) => {
        const dateTimeString = params.row.date;
        const timeOnly = dateTimeString.split(",")[1];
        return timeOnly;
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => {
        const { attendance_id, status } = params.row;
        const matchingItem = absentslist.find(
          (item) => item.id === attendance_id
        );

        if (status === "A" && matchingItem) {
          return (
            <Button
              className="bg-site-primary"
              onClick={() => handleAddContest(params.row)}
            >
              <i className="fas fa-share"></i>
            </Button>
          );
        } else if (status === "A") {
          return (
            <Button className="bg-danger">
              <i class="fas fa-window-close"></i>
            </Button>
          );
        } else {
          return null; // Return null if status is not "A"
        }
      },
    },
  ];
  const allDataColumns = [
    { field: "id", headerName: "Id", hide: true, filterable: false },
    {
      field: "date",
      headerName: " Date",
      width: 130,
      renderCell: (params) => {
        const dateTimeString = params.row.date;
        const dateOnly = dateTimeString.split(",")[0];
        return dateOnly;
      },
    },
    {
      field: "time",
      headerName: "Mark Time",
      width: 130,
      renderCell: (params) => {
        const dateTimeString = params.row.date;
        const timeOnly = dateTimeString.split(",")[1];
        return timeOnly;
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 70,
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
        const { attendance_id, status } = params.row;
        const matchingItem = absentslist.find(
          (item) => item.id === attendance_id
        );

        if (status === "A" && matchingItem) {
          return (
            <Button
              className="bg-site-primary"
              onClick={() => handleAddContest(params.row)}
            >
              <i className="fas fa-share"></i>
            </Button>
          );
        } else if (status === "A") {
          return (
            <Button className="bg-danger">
              <i class="fas fa-window-close"></i>
            </Button>
          );
        } else {
          return null; // Return null if status is not "A"
        }
      },
    },
  ];
  // const columnsmodal = [
  //   { field: "id", headerName: "Id", hide: true, filterable: false },
  //   {
  //     field: "date",
  //     headerName: " Date",
  //     width: 180,
  //     renderCell: (params) => {
  //       const dateTimeString = params.row.date;
  //       const dateOnly = dateTimeString.split(",")[0];
  //       return dateOnly;
  //     },
  //   },
  //   {
  //     field: "time",
  //     headerName: "Mark Time",
  //     width: 180,
  //     renderCell: (params) => {
  //       const dateTimeString = params.row.date;
  //       const timeOnly = dateTimeString.split(",")[1];
  //       return timeOnly;
  //     },
  //   },
  //   {
  //     field: "status",
  //     headerName: "Status",
  //     width: 100,
  //   },
  //   {
  //     field: "actions",
  //     type: "actions",
  //     headerName: "Actions",
  //     width: 100,
  //     renderCell: (params) => {
  //       const { attendance_id, enrollment_id, course_code } = params.row;
  //       const isSelected = contestData.some(
  //         (item) =>
  //           item.attendance_id === attendance_id &&
  //           item.enrollment_id === enrollment_id &&
  //           item.course_code === course_code
  //       );
  //       return (
  //         <FormGroup check>
  //           <Input
  //             type="checkbox"
  //             className="my-n2"
  //             checked={isSelected}
  //             required
  //             onChange={() => handleCheckboxClick(params.row)}
  //           />
  //         </FormGroup>
  //       );
  //     },
  //   },
  // ];
  useEffect(() => {
    let tempclass = [];
    let templab = [];
    let index = 0;
    let allData = []; // Create an array to store all data

    rowData?.attendanceDetail?.detail?.map((item) => {
      index++;
      if (item.type === "class") {
        tempclass.push({
          date: item.date,
          status: item.status,
          attendance_id: item.aid,
          enrollment_id: rowData.attendanceDetail?.enrollmentId,
          course_code: rowData.attendanceDetail?.courseCode,
          id: index,
        });
      } else {
        templab.push({
          date: item.date,
          status: item.status,
          attendance_id: item.aid,
          enrollment_id: rowData.attendanceDetail?.enrollmentId,
          course_code: rowData.attendanceDetail?.courseCode,
          id: index,
        });
      }

      allData.push({
        // Push each item to allData array
        date: item.date,
        status: item.status,
        attendance_id: item.aid,
        enrollment_id: rowData.attendanceDetail?.enrollmentId,
        course_code: rowData.attendanceDetail?.courseCode,
        id: index,
        type: item.type,
      });
    });

    setClassData(tempclass);
    setLabData(templab);
    setAllData(allData); // Set the allData state variable
  }, [rowData.attendanceDetail?.detail]);

  //console.log(absentslist, "absentsList");
  // useEffect(() => {
  //   let tempclass = [];
  //   let templab = [];
  //   let index = 0;
  //   absentslist?.map((item) => {
  //     index++;
  //     return item.type === "class" && item.status === "A"
  //       ? tempclass.push({
  //           date: item.dateTime,
  //           status: item.status,
  //           attendance_id: item.id,
  //           enrollment_id: rowData.enrollmentId,
  //           course_code: rowData.courseCode,
  //           id: index,
  //         })
  //       : item.type === "lab" && item.status === "A"
  //       ? templab.push({
  //           date: item.dateTime,
  //           status: item.status,
  //           attendance_id: item.id,
  //           enrollment_id: rowData.enrollmentId,
  //           course_code: rowData.courseCode,
  //           id: index,
  //         })
  //       : "";
  //   });
  //   setModalClass(tempclass);
  //   setModalLab(templab);
  // }, [absentslist]);
  useEffect(() => {
    dispatch(getAbsentsList(rowData?.attendanceDetail?.enrollmentId));
  }, [rowData]);
  return (
    <>
      <h4 className="d-block d-md-block m-0 font-weight-bold mx-2">
        <Link
          className="text-dark"
          onClick={() =>
            history.push({
              pathname: `/parent/academic-detail/${rowData?.username}`,
              state: rowData?.username,
            })
          }
        >
          <i class="fas fa-arrow-alt-circle-left"></i>
        </Link>
        &nbsp;Attendance
      </h4>
      <Container>
        <Row>
          <Col>
            <FormControl>
              <FormLabel
                id="demo-row-radio-buttons-group-label"
                className="text-dark my-2"
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
                  value="all"
                  control={<Radio color="success" />}
                  label="All"
                />
                <FormControlLabel
                  value="class"
                  control={<Radio color="success" />}
                  label="Class"
                />
                <FormControlLabel
                  value="lab"
                  control={<Radio color="success" />}
                  label="Lab"
                />
              </RadioGroup>
            </FormControl>
          </Col>
        </Row>
        <Row>
          <Col lg={5} md="12" sm="12">
            <Card className="shadow d-inline-block my-2 w-100 position-relative">
              <CardHeader>
                <h5>{rowData.attendanceDetail?.name}</h5>
              </CardHeader>

              <Chart
                className="chart mx-3 d-inline-block"
                type="radialBar"
                width="220"
                series={rowData.attendanceDetail?.percentage}
                options={myoption}
              />
              <div
                style={{
                  height: "30px",
                  width: "90px",
                }}
                className="bg-site-primary position-absolute my-5 mx-n4 d-inline-block text-light rounded-pill text-center"
              >
                Present:&nbsp;{rowData.attendanceDetail?.present}
              </div>
              <div
                style={{
                  height: "30px",
                  width: "90px",
                  marginTop: "90px",
                }}
                className="bg-danger position-absolute  mx-n4 d-inline-block text-light rounded-pill text-center"
              >
                Absent:&nbsp;{rowData.attendanceDetail?.absent}
              </div>
            </Card>
          </Col>
          <Col lg={7} className="my-2" md="12" sm="12">
            <Card className="shadow">
              <CardHeader>
                <h5 className="d-inline-block">Attendance</h5>
                {/* <Button
                  variant="contained"
                  className="bg-site-primary float-right d-inline-block"
                  onClick={toggleContest}
                >
                  Contest
                </Button> */}
              </CardHeader>
              <CardBody>
                <StripedDataGrid
                  autoHeight
                  autoWidth
                  columns={type == "all" ? allDataColumns : columns}
                  rows={
                    type == "class"
                      ? classData
                      : type == "all"
                      ? allData
                      : labData
                  }
                  disableSelectionOnClick={false}
                  getRowClassName={(params) =>
                    params.indexRelativeToCurrentPage % 2 === 0 ? "odd" : "even"
                  }
                  hideFooterPagination={true}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
        {/* <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Contest Box</ModalHeader>
          <ModalBody>
            <FormControl>
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
                value={modalType}
                onChange={handleModalTypeChange}
              >
                <FormControlLabel
                  value="class"
                  control={<Radio color="success" />}
                  label="Class"
                />
                <FormControlLabel
                  value="lab"
                  control={<Radio color="success" />}
                  label="Lab"
                />
              </RadioGroup>
            </FormControl>
            <StripedDataGrid
              autoHeight
              autoWidth
              columns={columnsmodal}
              rows={modalType == "class" ? modalClass : modalLab}
              disableSelectionOnClick={false}
              getRowClassName={(params) =>
                params.indexRelativeToCurrentPage % 2 === 0 ? "odd" : "even"
              }
              hideFooterPagination={true}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              className="bg-site-primary"
              disabled={contestData.length == 0}
              onClick={confirmtoggle}
            >
              Submit
            </Button>
          </ModalFooter>
        </Modal> */}
        <Modal isOpen={confirmModal} toggle={confirmtoggle}>
          <ModalHeader toggle={confirmtoggle}>Confirmation Box</ModalHeader>
          <ModalBody>
            <h5 className="text-center ">
              Are you Sure for Attendance Contest?
            </h5>
            <div className="d-flex justify-content-center align-items-center my-3">
              <Button
                className="bg-site-primary w-25 mx-2"
                onClick={handleSubmitContest}
                disabled={loading}
              >
                {loading ? <Spinner size="sm" /> : "Yes"}
              </Button>
              <Button className="bg-danger w-25" onClick={confirmtoggle}>
                No
              </Button>
            </div>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </Modal>
      </Container>
    </>
  );
}

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTeachersCourses,
  startNewEvaluation,
} from "../../store/actions/assessmentAction";
import { styled } from "@mui/material/styles";
import { gridClasses, GRID_CHECKBOX_SELECTION_COL_DEF } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Container,
  Form,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useHistory } from "react-router-dom";
import { Calendar } from "react-modern-calendar-datepicker";
export default function CheckEvaluation() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { allTeachers } = useSelector((state) => state.assessment);
  const StripedDataGrid = styled(DataGrid)(() => ({
    [`& .${gridClasses.row}.even`]: {
      backgroundColor: "#EEEE",
    },
  }));
  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
    clearDate();
  };
  const [selectedDayRange, setSelectedDayRange] = useState({
    from: "",
    to: "",
  });
  console.log(selectedDayRange, "selectDay");
  const [select, setSelect] = useState("FALL2022");
  const [date, setDate] = useState({ start_date: "", end_date: "" });
  let sessionData = ["FALL2021", "SPRING2021", "FALL2022", "SPRING2022"];
  const [rows, setRows] = useState([]);
  const clearDate = () => {
    setSelectedDayRange({ from: "", to: "" });
    setDate({start_date:"",end_date:""})
  };
  const columns = [
    { field: "id", headerName: "Id", hide: true, filterable: false },
    {
      field: "teacherName",
      headerName: "Teacher Name",
      width: 240,
      fixed: true,
    },
    {
      field: "course_name",
      headerName: "course_name",
      width: 300,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Check Feedback",
      width: 280,
      renderCell: (params) => {
        return (
          <>
            <Button
              className="bg-site-success text-white border-0"
              onClick={() => {
                let data = {
                  course_code: params.row.course_code,
                  teacher_id: params.row.teacher_id,
                  session: select,
                  teacherName: params.row.teacherName,
                };
                history.push({
                  pathname: `/admin/evaluationpercentage/${params.row.course_code}`,
                  state: data,
                });
              }}
            >
              <i className="fas fa-eye "></i>
            </Button>
          </>
        );
      },
    },
  ];
  useEffect(() => {
    if (select != "") {
      dispatch(getTeachersCourses(select));
    }
  }, [select]);
  useEffect(() => {
    let tempdata = [];
    let index = 0;
    allTeachers?.map((item) => {
      index++;
      return tempdata.push({
        id: index,
        teacher_id: item?.teacher_id,
        teacherName: item?.teacherName,
        course_code: item?.course_code,
        course_name: item?.course_name,
      });
    });
    setRows(tempdata);
  }, [allTeachers]);
  useEffect(() => {
    if(selectedDayRange.from!=''&&selectedDayRange.to!=''){
    const { from, to } = selectedDayRange;
    const startDay = from?.day < 10 ? `0${from?.day}` : from?.day;
    const startMonth = from?.month < 10 ? `0${from?.month}` : from?.month;
    const endDay = to?.day < 10 ? `0${to?.day}` : to?.day;
    const endMonth = to?.month < 10 ? `0${to?.month}` : to?.month;
    const startDate = `${startDay}-${startMonth}-${from?.year}`;
    const endDate = `${endDay}-${endMonth}-${to?.year}`;
    setDate({ start_date: startDate, end_date: endDate });
    }
  }, [selectedDayRange]);
  return (
    <>
    <Container>
      <Row>
        <Col>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small">Session</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              className=""
              value={select}
              label="Session"
              onChange={(e) => {
                setSelect(e.target.value);
              }}
              required
            >
              {sessionData.map((item) => {
                return (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Col>
      </Row>
        <Row>
          <Col>
            <Card className="shadow my-3 w-100 z-index-n1">
              <CardHeader>
                <p className="d-inline-block">Check Evaluation</p>{" "}
                <Button
                  className="bg-site-primary float-right"
                  onClick={toggle}
                >
                  Start new evaluation
                </Button>
              </CardHeader>
              <StripedDataGrid
                autoHeight
                autoWidth
                columns={columns}
                rows={rows}
                initialState={{
                  pinnedColumns: {
                    left: [GRID_CHECKBOX_SELECTION_COL_DEF.field],
                  },
                }}
                disableSelectionOnClick={false}
                getRowClassName={(params) =>
                  params.indexRelativeToCurrentPage % 2 === 0 ? "odd" : "even"
                }
                hideFooterPagination={true}
              />
            </Card>
          </Col>
        </Row>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Set Date Range</ModalHeader>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              if (
                date.start_date != "" &&date.end_date != "" 
              ) {
                dispatch(startNewEvaluation(date));
                toggle();
              } else {
                alert("Please select the starting & ending date");
              }
            }}
          >
            <ModalBody>
              <div className="d-flex align-items-center justify-content-center">
                <Calendar
                  value={selectedDayRange}
                  onChange={setSelectedDayRange}
                  calendarClassName="responsive-calendar"
                  colorPrimary="#099d78"
                  colorPrimaryLight="#58ffc5"
                  shouldHighlightWeekends
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button className="bg-site-success" type="submit">
                Start
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
      </Container>
    </>
  );
}

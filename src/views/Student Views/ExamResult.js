import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardHeader, Col, Container, Row } from "reactstrap";
import { getExamMarks, getSession } from "../../store/actions/evaluationAction";
import { styled } from "@mui/material/styles";
import { gridClasses } from "@mui/x-data-grid";
import { GridToolbar } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import { useHistory } from "react-router-dom";
import LoadingOverlay from "react-loading-overlay";
export default function ExamResult() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { token, status } = useSelector((state) => state.authUser);
  const { session, exam, loading } = useSelector((state) => state.evaluation);
  const StripedDataGrid = styled(DataGrid)(() => ({
    [`& .${gridClasses.row}.even`]: {
      backgroundColor: "#EEEE",
    },
  }));
  const [select, setSelect] = useState("");
  const [course, setCourse] = useState([]);
  const [selectCourse, setSelectCourse] = useState("");
  const [type, setType] = useState("");
  const [rows, setRows] = useState([]);
  const columns = [
    { field: "id", headerName: "Id", hide: true, filterable: false },
    // {
    //   field: "courseName",
    //   headerName: " Course Name",
    //   width: 240,
    // },
    {
      field: "totalMarks",
      headerName: "Total Marks",
      width: 170,
    },
    {
      field: "obtainedMarks",
      headerName: "Obtained Marks",
      width: 170,
    },
    {
      field: "type",
      headerName: "Type",
      width: 170,
    },
  ];
  useEffect(() => {
    let tempdata = [];
    let index = 0;
    if (select && selectCourse) {
      exam.map((item) => {
        if (selectCourse == item.courseName ) {
          index++;
          return tempdata.push({
            id: index,
            courseName: item.courseName,
            totalMarks: item.total_marks,
            obtainedMarks: item.obtained_marks,
            type:item.type
          });
        }
      });
    }
    setRows(tempdata);
  }, [select, selectCourse]);
  useEffect(() => {
    dispatch(getSession(token?.username));
  }, []);
  useEffect(() => {
    let tempdata = [];
    exam.map((item) => {
      return tempdata.push(item.courseName);
    });
    let uniqueChars = [...new Set(tempdata)];
    setCourse(uniqueChars);
  }, [exam]);
  useEffect(() => {
    dispatch(getExamMarks(token?.username, select));
  }, [select]);
  useEffect(() => {
    if (status == false) {
      history.push("/student/enrollment");
    }
  }, [status]);
  return (
    <Container>
      <Row>
        <Col>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small">Session</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={select}
              label="Session"
              onChange={(e) => {
                setSelect(e.target.value);
              }}
              required
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {session.map((item) => {
                return (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small">Course</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={selectCourse}
              label="Course"
              onChange={(e) => {
                setSelectCourse(e.target.value);
              }}
              required
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {course.map((item) => {
                return (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          {/* <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small">Type</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={type}
              label="Type"
              onChange={(e) => {
                setType(e.target.value);
              }}
              required
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem key="mid" value="mid">
                Mid
              </MenuItem>
              <MenuItem key="final" value="final">
                Final
              </MenuItem>
            </Select>
          </FormControl> */}
        </Col>
      </Row>
      <Row>
        <Col sm={12} md={12}>
          <Card className="shadow my-3 w-100 z-index-n1">
            {/* <CardHeader>Marks of {type}</CardHeader> */}
            <LoadingOverlay
              active={loading}
              spinner
              text="Exam Result Loading...."
            >
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
            </LoadingOverlay>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

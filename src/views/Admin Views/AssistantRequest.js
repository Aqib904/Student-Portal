import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Col, Container, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import { getFinancialAssistanceRequests } from "../../store/actions/financialAssistanceAction";
import { styled } from "@mui/material/styles";
import { gridClasses } from "@mui/x-data-grid";
import { GridToolbar } from "@mui/x-data-grid";
import user from "../../assets/img/user.png";
import { DataGrid } from "@mui/x-data-grid";
import LoadingOverlay from "react-loading-overlay";
import { useHistory } from "react-router-dom";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
export default function AssistantRequest() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { getRequestloading, requestList } = useSelector(
    (state) => state.financial
  );
  const [rows,setRows] = useState([])
  const [discipline, setDiscipline] = useState([]);
  const [selectedDiscipline, setSelectedDiscipline] = useState("");
    console.log(discipline,'setRows')
    const StripedDataGrid = styled(DataGrid)(() => ({
      [`& .${gridClasses.row}.even`]: {
        backgroundColor: "#EEEE",
      },
    }));
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
              src={
                props.row.profile_photo
                  ? `https://localhost:44374/AttendanceImages/${props.row.profile_photo}`
                  : user
              }
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
                src={
                  props.row.profile_photo
                    ? `https://localhost:44374/AttendanceImages/${props.row.profile_photo}`
                    : user
                }
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
      {
        field: "name",
        headerName: "Name",
        width: 240,
      },
      {
        field: "reg_no",
        headerName: "Reg no",
        width: 130,
      },
      {
        field: "selectedDiscipline",
        headerName: "Discipline",
        width: 130,
      },
      {
        field: "date",
        headerName: "Date",
        width: 130,
      },
      {
        field: "status",
        type: "status",
        headerName: "Status",
        width: 150,
        renderCell: (params) => {
          return (
            <>
             <span>{params.row.status==null?"Pending":params.row.status==false?"Rejected":"Approved"}</span>
            </>
          );
        },
      },
      {
        field: "Action",
        type: "action",
        headerName: "Manage Request",
        width: 150,
        renderCell: (params) => {
          return (
            <>
              <Button
                className="bg-site-success"
                onClick={() =>
                  history.push({
                    pathname: `/admin/manage_financial_assistance/:${params.row.id}`,
                    state: params.row,
                  })
                }
              >    
                  <i class="fas fa-eye"></i>
              </Button>
            </>
          );
        },
      },
    ];
    useEffect(() => {
      const programSectionSemester = requestList
        .map((student) => {
          return {
            program: student.program,
            section: student.section,
            semester: student.semester,
          };
        })
        .filter((student, index, self) => {
          return (
            index ===
            self.findIndex(
              (s) =>
                s.program === student.program &&
                s.section === student.section &&
                s.semester === student.semester
            )
          );
        })
        .map((student) => {
          return `${"BS"}${student.program}${student.semester}${student.section}`;
        });
      setDiscipline(programSectionSemester);
    }, [requestList]);
  useEffect(() => {
    let index = 0;
    if (selectedDiscipline !== "") {
      const matchingStudents = requestList
        .filter(
          (student) =>
            student.program === selectedDiscipline.slice(2, 4) &&
            student.semester === parseInt(selectedDiscipline.slice(4, 5)) &&
            student.section === selectedDiscipline.slice(5)
        )
        .map((student) => {
          index++;
          return { ...student, selectedDiscipline };
        });
      setRows(matchingStudents);
    } else {
      setRows([]);
    }
  }, [selectedDiscipline, requestList]);
  useEffect(() => {
    dispatch(getFinancialAssistanceRequests());
  }, []);
  return (
    <Container fluid>
      <Row>
        <Col>
          <FormControl
            sx={{ m: 1, minWidth: 150, display: "block" }}
            size="small"
          >
            <InputLabel id="demo-select-small">Discipline</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              style={{ width: "200px" }}
              label="Discipline"
              required
              value={selectedDiscipline}
              onChange={(e) => setSelectedDiscipline(e.target.value)}
            >
              {discipline.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Col>
      </Row>
      <Row>
        <Col>
        <Card className="shadow my-3 w-100 z-index-n1">
            <LoadingOverlay active={getRequestloading} spinner text="Financial Requests Loading....">
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

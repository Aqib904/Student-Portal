import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  Col,
  Container,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import { getStudent } from "../../store/actions/feeAction";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { styled } from "@mui/material/styles";
import { gridClasses } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import user from "../../assets/img/user.png";
import { useHistory } from "react-router-dom";
export default function StudentFee() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { students } = useSelector((state) => state.fee);
  const [discipline, setDiscipline] = useState([]);
  const [selectedDiscipline, setSelectedDiscipline] = useState("");
  const [rows, setRows] = useState([]);
  console.log(rows, "rows");
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
              props.row.profilePhoto
                ? `https://localhost:44374/AttendanceImages/${props.row.profilePhoto}`
                : user
            }
            alt={props.row.profilePhoto}
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
                props.row.profilePhoto
                  ? `https://localhost:44374/AttendanceImages/${props.row.profilePhoto}`
                  : user
              }
              alt={props.row.profilePhoto}
            />
          </ModalBody>
        </Modal>
      </>
    );
  };
  const columns = [
    { field: "id", headerName: "Id", hide: true, filterable: false },
    {
      field: "profilePhoto",
      headerName: "Profile Photo",
      width: 150,
      renderCell: (params) => {
        return <ImageCell row={params.row} />;
      },
    },
    { field: "regNo", headerName: "Reg No", width: 200 },
    { field: "name", headerName: "Name", width: 230 },
    { field: "selectedDiscipline", headerName: "Discipline", width: 170 },
    {
      field: "status",
      type: "mark",
      headerName: "Status",
      width: 130,
      renderCell: (params) => {
        console.log(params.row)
        return (
          <>
            <span>
              {params.row.isPending == true ? "Pending" : "Approved"}
            </span>
          </>
        );
      },
    },
    {
      field: "isPending",
      type: "mark",
      headerName: "Action",
      width: 280,
      renderCell: (params) => {
        return (
          <>
            <Button
              className={`${
                params.row.isPending == true ? "bg-warning" : "bg-site-success"
              } text-white border-0 `}
              // disabled={params.row.isPending == true ? false : true}
              onClick={() =>
                history.push({
                  pathname: `/admin/manage_fee/${params.row.regNo}`,
                  state: params.row,
                })
              }
            >
              {params.row.isPending == true ? (
                <i class="fas fa-user-times"></i>
              ) : (
                <i class="fas fa-user-check"></i>
              )}
            </Button>
          </>
        );
      },
    },
  ];
  useEffect(()=>{
    if(discipline.length > 0){
      setSelectedDiscipline(discipline[0])
    }else{
      setSelectedDiscipline("")
    }
  },[discipline])
  useEffect(() => {
    const programSectionSemester = students
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
  }, [students]);
  useEffect(() => {
    let index = 0;
    if (selectedDiscipline !== "") {
      const matchingStudents = students
        .filter(
          (student) =>
            student.program === selectedDiscipline.slice(2, 4) &&
            student.semester === parseInt(selectedDiscipline.slice(4, 5)) &&
            student.section === selectedDiscipline.slice(5)
        )
        .map((student) => {
          index++;
          return { ...student, selectedDiscipline, id: index };
        });
      setRows(matchingStudents);
    } else {
      setRows([]);
    }
  }, [selectedDiscipline, students]);

  useEffect(() => {
    dispatch(getStudent());
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
      <Row className="my-3">
        <Col>
          <Card className="shadow">
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
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

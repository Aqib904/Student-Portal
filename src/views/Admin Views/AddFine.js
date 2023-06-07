import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFine, getStudentsList } from "../../store/actions/fineAction";
import { styled } from "@mui/material/styles";
import { gridClasses } from "@mui/x-data-grid";
import { GridToolbar } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import user from "../../assets/img/user.png";
import LoadingOverlay from "react-loading-overlay";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Spinner,
} from "reactstrap";
import { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
export default function AddFine() {
  const dispatch = useDispatch();
  const { studentsList, studentsloading ,addFineloading} = useSelector((state) => state.fine);
  const [rows, setRows] = useState([]);
  const [discipline, setDiscipline] = useState([]);
  const [selectedDiscipline, setSelectedDiscipline] = useState("");
  const [regno, setRegno] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [modal, setModal] = useState(false);
  const toggle = () => {
    clearState();
    setModal(!modal)};
  const StripedDataGrid = styled(DataGrid)(() => ({
    [`& .${gridClasses.row}.even`]: {
      backgroundColor: "#EEEE",
    },
  }));
  //console.log(studentsList, "studentsLists");
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
  const clearState =()=>{
    setDescription("");
    setAmount("");
  }
  const handleSubmit=()=>{
    let list ={
      reg_no:regno,
      amount:amount,
      description:description
    }
    dispatch(addFine(list))
    toggle()
  }
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
      width: 170,
    },
    {
      field: "selectedDiscipline",
      headerName: "Descipline",
      width: 170,
    },
    {
      field: "addfine",
      type: "addfine",
      headerName: "Add Fine",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Button
              className="bg-site-success"
              onClick={() => {
                setRegno(params.row.reg_no);
                toggle();
              }}
            >
              <i class="fas fa-plus"></i>
            </Button>
          </>
        );
      },
    },
  ];
  useEffect(() => {
    const programSectionSemester = studentsList
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
  }, [studentsList]);
  useEffect(()=>{
    if(discipline.length > 0){
      setSelectedDiscipline(discipline[0])
    }else{
      setSelectedDiscipline("")
    }
  },[discipline])
  useEffect(() => {
    let index = 0;
    if (selectedDiscipline !== "") {
      const matchingStudents = studentsList
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
  }, [selectedDiscipline, studentsList]);
  useEffect(() => {
    dispatch(getStudentsList());
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
        <Col sm={12} md={12}>
          <Card className="shadow my-3 w-100 z-index-n1">
            <LoadingOverlay
              active={studentsloading}
              spinner
              text="Students List Loading...."
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
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add Fine detail</ModalHeader>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            toggle();
          }}
        >
          <ModalBody>
            <Label>Reg no:</Label>
            <Input
              placeholder="Enter the amount"
              type="text"
              value={regno}
              disabled={true}
            ></Input>
            <Label>Amount:</Label>
            <Input
              placeholder="Enter the amount"
              type="number"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            ></Input>
            <Label>Reason:</Label>
            <Input
              placeholder="reason..."
              type="textarea"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></Input>
          </ModalBody>
          <ModalFooter>
            <Button
              type="submit"
              className="bg-site-success"
              disabled={
                amount == "" || description == "" || regno == "" ? true : false
              }
              onClick={()=>{handleSubmit()}}
            >
               {addFineloading ? <Spinner size="sm" /> : "Add"}
            </Button>
            <Button className="bg-danger" onClick={toggle}>
              cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </Container>
  );
}

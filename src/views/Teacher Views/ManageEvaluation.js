import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Container,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import user from "../../assets/img/user.png"
import { styled } from "@mui/material/styles";
import { gridClasses } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  markGeneralExam,
  markMidFinal,
} from "../../store/actions/evaluationAction";
export default function ManageEvaluation() {
  const location = useLocation();
  const dispatch = useDispatch();
  const[evaluationList,setEvaluationList] = useState(location.state)
  const [type, setType] = useState();
  const [obtMark,setObtMark] = useState([])
  
  const [title, setTitle] = useState("");
  const [general, setGeneral] = useState([]);
  const [finalRecord, setFinalRecord] = useState([]);
  const StripedDataGrid = styled(DataGrid)(() => ({
    [`& .${gridClasses.row}.even`]: {
      backgroundColor: "#EEEE",
    },
  }));
  const handleMarksChange = ( newNumber,id) => {
    setEvaluationList(prevState => {
        // make a copy of the original state
        const newState = [...prevState];

        // use map() method to update the object
        const updatedState = newState.map(obj => {
            if (obj.id == id) {
                // create a new object with the updated property
                return { ...obj, obtained_marks: newNumber };
            } else {
                // return the original object if it's not the one we want to update
                return obj;
            }
        });

        // return the new array with the updated object
        return updatedState;
    });
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
    { field: "reg_no", headerName: "Reg No", width: 170 },
    { field: "name", headerName: "Name", width: 170 },
    { field: "totalMarks", headerName: "Total Marks", width: 170 },
    {
      field: "actions",
      type: "actions",
      headerName: "Obtained Marks",
      width: 280,
      renderCell: (params) => {
        return (
          <Input
          type="number"
          required
          defaultValue={params.row.obtained_marks}
          className="w-25"
          onChange={(e) => {handleMarksChange(e.target.value, params.row.id)}}
        />
        );
      },
    },
  ];
  useEffect(() => {
    let data = "";
    evaluationList?.map((item) => {
      return (data = item.type);
    });
    setType(data);
  }, [evaluationList]);
  useEffect(() => {
    let asgMidData = [];
    evaluationList?.forEach((item) => {
      asgMidData.push({
        enrollment_id: item.id,
        total_marks: item.totalMarks,
        title: title,
        obtained_marks:item.obtained_marks?(item.obtained_marks):0,
        type: item.type,
      });
    });
    setGeneral(asgMidData);
  }, [title, evaluationList]);
  useEffect(() => {
    let examData = [];
    evaluationList?.map((item) => {
      return examData.push({
        enrollment_id: item.id,
        total_marks: item.totalMarks,
        obtained_marks:item.obtained_marks?(item.obtained_marks):0,
        type: item.type,
      });
    });
    setFinalRecord(examData);
  }, [ evaluationList, title]);
  return (
    <>
     <h4 className='d-none d-md-block m-0 font-weight-bold mx-3'>Manage Assessment</h4>
    <Container fluid>
      <Row>
        <Col className="my-3">
          {type === "assignment" || type === "quiz" ? (
            <>
              <Label>Title</Label>
              <Input
                type="text"
                required
                placeholder="Enter the title"
                className="w-25"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              ></Input>
            </>
          ) : (
            ""
          )}
        </Col>
      </Row>
      <Row>
        <Col className="my-3">
          {evaluationList.length===0?(
            <Card className="shadow">
              <CardHeader></CardHeader>
              <CardBody>
                <p className="text-center text-danger">No Student Enroll in this section!</p>
              </CardBody>
              <CardFooter></CardFooter>
            </Card>
          ):(
          <Card>
            <CardHeader>
              <h6 className="d-inline-block">Assessment for {type}</h6>
              <Button
                className="bg-site-primary float-right d-inline-block"
                disabled={evaluationList.length==0?true:false}
                onClick={(e) => {
                  e.preventDefault();
                  if (type === "assignment" || type === "quiz") {
                    dispatch(markGeneralExam(general));
                  } else {
                    dispatch(markMidFinal(finalRecord));
                  }
                }}
              >
                Submit
              </Button>
            </CardHeader>
            <CardBody>
              <div className="w-100">
                <StripedDataGrid
                  autoHeight
                  autoWidth
                  columns={columns}
                  rows={evaluationList}
                  disableSelectionOnClick={false}
                  getRowClassName={(params) =>
                    params.indexRelativeToCurrentPage % 2 === 0 ? "odd" : "even"
                  }
                  hideFooterPagination={true}
                />
              </div>
            </CardBody>
          </Card>
          )}
        </Col>
      </Row>
    </Container>
    </>
  );
}

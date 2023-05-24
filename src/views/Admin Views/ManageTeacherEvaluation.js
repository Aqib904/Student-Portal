import React,{useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Col,
  Container,
  Form,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Spinner,
} from "reactstrap";
import { DropzoneArea } from "material-ui-dropzone";
import { addTecaherEvaluation } from '../../store/actions/TeacherEvaluationAction';
export default function ManageTeacherEvaluation() {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.teacherevaluation);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [teacherEvaluation, setTeacherEvaluation] = useState("");
  const handleInputChange = (peerevaluationfile) => {
    setTeacherEvaluation(peerevaluationfile);
  };
  return (
    <Container fluid>
    <Row>
      <Col lg={12}>
        <div className="d-flex flex-column justify-content-center align-items-center ">
          <i
            className="fas fa-file-excel d-flex justify-content-center align-items-center border rounded-circle  bg-light"
            style={{ fontSize: "50px", width: "130px", height: "130px" }}
          ></i>
          <h3 className=" my-2">Teacher Evaluation File</h3>
          <p className=" my-2">upload a file below</p>
          <Button className="bg-site-success px-4" onClick={toggle}>
            <i class="fas fa-file-upload mx-2"></i>Upload File
          </Button>
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Upload Teacher Evaluation File</ModalHeader>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                dispatch(addTecaherEvaluation(teacherEvaluation[0],()=>{
                    toggle();
                }));
                
              }}
            >
              <ModalBody>
                <DropzoneArea
                  required
                  name="peerevaluationfile"
                  onChange={handleInputChange}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  type="submit"
                  className="bg-site-success"
                  disabled={teacherEvaluation == "" ? true : false}
                >
                  {loading ? <Spinner size="sm" /> : "Upload"}
                </Button>
                <Button className="bg-danger" onClick={toggle}>
                  cancel
                </Button>
              </ModalFooter>
            </Form>
          </Modal>
        </div>
      </Col>
    </Row>
  </Container>
  )
}

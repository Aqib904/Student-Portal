import React, { useState } from "react";
import { useDispatch } from "react-redux";
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
} from "reactstrap";
import { addTimetable } from "../../store/actions/timetableAction";
import { DropzoneArea } from "material-ui-dropzone";
export default function ManageTimetable() {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [timetable, setTimetable] = useState("");
  const handleInputChange = (timetablefile) => {
    setTimetable(timetablefile);
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
            <h3 className=" my-2">Timetable</h3>
            <p className=" my-2">upload a file below</p>
            <Button className="bg-site-success px-4" onClick={toggle}>
              <i class="fas fa-file-upload mx-2"></i>Upload File
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
              <ModalHeader toggle={toggle}>Upload Timetable File</ModalHeader>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  dispatch(addTimetable(timetable[0]));
                  toggle();
                }}
              >
                <ModalBody>
                  <DropzoneArea
                    required
                    name="timetablefile"
                    onChange={handleInputChange}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button
                    type="submit"
                    className="bg-site-success"
                    disabled={timetable == "" ? true : false}
                  >
                    Upload
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
  );
}

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
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { addDatesheet } from "../../store/actions/datesheetAction";
import { DropzoneArea } from "material-ui-dropzone";
export default function ManageDatesheet() {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [datesheet, setDatesheet] = useState("");
  const [type, setType] = useState("mid");
  const handleInputChange = (datesheetfile) => {
    setDatesheet(datesheetfile);
  };
  const handleTypeChange = (event) => {
    setType(event.target.value);
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
            <h3 className=" my-2">Datesheet</h3>
            <p className=" my-2">upload a file below</p>
            <Button className="bg-site-success px-4" onClick={toggle}>
              <i class="fas fa-file-upload mx-2"></i>Upload File
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
              <ModalHeader toggle={toggle}>Upload Datesheet File</ModalHeader>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  dispatch(addDatesheet(datesheet[0], type));
                  toggle();
                }}
              >
                <ModalBody>
                  <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label" className="text-dark">
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
                        value="mid"
                        control={<Radio color="success" />}
                        label="Mid"
                      />
                      <FormControlLabel
                        value="final"
                        control={<Radio color="success" />}
                        label="Final"
                      />
                    </RadioGroup>
                  </FormControl>
                  <DropzoneArea
                    required
                    name="datesheetfile"
                    onChange={handleInputChange}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button className="bg-site-success" type="submit" disabled={datesheet==""?true:false}>
                    Upload
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

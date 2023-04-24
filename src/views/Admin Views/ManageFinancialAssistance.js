import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import {  getFinancialAssistanceImages,  requestAcceptAction, requestRejectAction } from "../../store/actions/financialAssistanceAction";
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
  Spinner,
} from "reactstrap";
import { Image } from "react-bootstrap";

export default function ManageFinancialAssistance() {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const { requestImages, acceptloading, rejectloading } = useSelector(
    (state) => state.financial
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const toggleModal = (imageSrc) => {
    setSelectedImage(imageSrc);
    setIsModalOpen(!isModalOpen);
  };
  let data = location?.state;
  console.log(requestImages, "data");
  useEffect(() => {
    dispatch(getFinancialAssistanceImages(data?.id));
  }, [data?.id]);
  return (
    <>
      <h4 className="d-none d-md-block m-0 font-weight-bold mx-3">
        Manage Financial Assistance
      </h4>
      <Container>
        <Row>
          <Col>
            <Card className="shadow my-4">
              <CardHeader>Name:&nbsp;{data?.name}</CardHeader>
              <CardBody>
                <Label>Click on Request Photos:</Label>
                <Row>
                  {requestImages.map((item) => {
                    return (
                      <Col md="4" sm="12" className="my-1">
                        <Image
                          src={`https://localhost:44374/FinancialAssistanceImages/${item}`}
                          alt="Batch"
                          height={150}
                          width={250}
                          className="img-fluid"
                          onClick={() =>
                            toggleModal(
                              `https://localhost:44374/FinancialAssistanceImages/${item}`
                            )
                          }
                        />
                      </Col>
                    );
                  })}
                  {isModalOpen && (
                    <Modal isOpen={isModalOpen} toggle={toggleModal}>
                      <ModalHeader toggle={toggleModal}>
                        Preview Your Photo
                      </ModalHeader>
                      <ModalBody>
                        <Image
                          src={selectedImage}
                          alt="Batch"
                          width={500}
                          className="img-fluid"
                        />
                      </ModalBody>
                    </Modal>
                  )}
                  <Label>Description:</Label>
                  <Input
                    value={data?.description}
                    type="textarea"
                    disabled={true}
                    rows={Math.ceil(data?.description.length / 50)}
                  ></Input>
                </Row>
              </CardBody>
              <CardFooter>
                <Row className=" float-right">
                  <Button className="bg-site-success mx-1"
                  onClick={()=>{dispatch(requestAcceptAction(data?.id,history))}}>
                    {acceptloading ? <Spinner size="sm" /> : "Accept Request"}
                  </Button>
                  <Button className="bg-danger"
                   onClick={()=>{dispatch(requestRejectAction(data?.id,history))}}>
                    {rejectloading ? <Spinner size="sm" /> : "Reject Request"}
                  </Button>
                </Row>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

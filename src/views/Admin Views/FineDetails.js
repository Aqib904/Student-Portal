import React,{useState} from "react";
import { Image } from "react-bootstrap";
import { Link, useHistory, useLocation } from "react-router-dom";
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
import nullImage from "../../assets/img/no_uploaded.png";
import { fineAcceptAction, fineRejectAction } from "../../store/actions/fineAction";
import { useDispatch, useSelector } from "react-redux";
export default function FineDetails() {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const { acceptFineloading,rejectFineloading } = useSelector((state) => state.fine);
  const data = location.state;
  const [request, setRequest] = useState("");
  const [confirmModal, setConfirmModal] = useState(false);
  const confirmtoggle = () => setConfirmModal(!confirmModal);
  console.log(data, "data");
  return (
    <>
      <h4 className="d-none d-md-block m-0 font-weight-bold mx-3">
        <Link className="text-dark" to="/admin/finelist">
          <i class="fas fa-arrow-alt-circle-left"></i>
        </Link>
        &nbsp;Fine Details
      </h4>
      <Container fluid>
        <Row>
          <Col>
            <Card className="shadow my-4">
              <CardHeader>Name:&nbsp;{data?.name}</CardHeader>
              <CardBody>
                <Row>
                  <Col md={4} sm={12}>
                    <Image
                      src={
                        data?.receipt
                          ? `https://localhost:44374/FineReceiptImages/${data?.receipt}`
                          : nullImage
                      }
                      alt="Batch"
                      // height={150}
                      // width={250}
                      className="img-fluid my-2"
                    />
                  </Col>
                  <Col md={8} sm={12}>
                    <Label>Date:</Label>
                    <Input
                      value={data?.date}
                      disabled={true}
                      type="text"
                    ></Input>
                    <Label>Amount</Label>
                    <Input
                      value={data?.amount}
                      disabled={true}
                      type="text"
                    ></Input>
                    <Label>Description:</Label>
                    <Input
                      value={data?.description}
                      type="textarea"
                      disabled={true}
                      rows={Math.ceil(data?.description.length / 50)}
                    ></Input>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <Row className="float-right">
                  {data?.status == null ? (
                    <>
                      <Button
                        className="bg-site-success mx-2"
                        disabled={data?.receipt == null ? true : false}
                        onClick={() => {
                          setRequest("Accept");
                          confirmtoggle();
                        }}
                      >
                        Accept Fine
                      </Button>
                      <Button
                        className="bg-danger"
                        disabled={data?.receipt == null ? true : false}
                        onClick={() => {
                          setRequest("Reject");
                          confirmtoggle();
                        }}
                      >
                        Reject Fine
                      </Button>
                    </>
                  ) : (
                    ""
                  )}
                </Row>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </Container>
      <Modal isOpen={confirmModal} toggle={confirmtoggle}>
        <ModalHeader toggle={confirmtoggle}>Confirmation Box</ModalHeader>
        <ModalBody>
          <h5 className="text-center ">
            Are you Sure for {request} the Student Fine Details?
          </h5>
          <div className="d-flex justify-content-center align-items-center my-3">
            {request == "Accept" ? (
              <Button
                className="bg-site-primary w-25 mx-2"
                onClick={() => {
                  dispatch(fineAcceptAction(data?.id, history));
                  confirmtoggle()
                }}
                disabled={acceptFineloading}
              >
                {acceptFineloading ? <Spinner size="sm" /> : "Yes"}
              </Button>
            ) : (
              <Button
                className="bg-site-primary w-25 mx-2"
                onClick={() => {
                  dispatch(fineRejectAction(data?.id, history));
                  confirmtoggle()
                }}
                disabled={rejectFineloading}
              >
                {rejectFineloading ? <Spinner size="sm" /> : "Yes"}
              </Button>
            )}

            <Button className="bg-danger w-25" onClick={confirmtoggle}>
              No
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}

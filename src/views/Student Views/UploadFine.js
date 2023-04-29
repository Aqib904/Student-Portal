import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getStudentFine,
  uploadFineReceipt,
} from "../../store/actions/fineAction";
import emptyFolder from "../../assets/img/emptyFolder.jpg";
import { useState } from "react";
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
  ModalFooter,
  ModalHeader,
  Row,
  Spinner,
} from "reactstrap";
import ChallanWall from "../../components/global/ChallanWall";
import { Stack, Typography } from "@mui/material";
import { Image } from "react-bootstrap";
export default function UploadFine() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.authUser);
  const [fineStatus, setFineStatus] = useState(false);
  const [modal, setModal] = useState(false);
  const { studentFine, addFineloading } = useSelector((state) => state.fine);
  const [fileList, setFileList] = useState([]);
  const [receipt, setReceipt] = useState(null);
  const [flagSubmit, setFlagSubmit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  console.log(selectedId, "selectedId");
  const toggle = () => {
    setFileList([]);
    setSelectedId("");
    setReceipt("");
    setModal(!modal);
  };
  const handleUpload = async () => {
    for (const item of fileList) {
      await dispatch(uploadFineReceipt(item.originFileObj, selectedId));
      dispatch(getStudentFine(token?.username));
    }
    toggle();
  };
  useEffect(() => {
    dispatch(getStudentFine(token?.username));
  }, []);
  return (
    <Container fluid>
      <Row>
        {studentFine.length == 0 ? (
          <Col lg={12} >
            <Card>
              <CardHeader>Fine Details</CardHeader>
              <CardBody>
                <div className=" d-flex justify-content-center align-items-center">
                <Image
                  src={emptyFolder}
                  alt="Batch"
                  height={140}
                  width={140}
                  className="mx-1 cursor-pointer rounded-circle"
                />
                </div>
                <h5 className="text-center my-3">Folder Empty</h5>
              </CardBody>
            </Card>
          </Col>
        ) : (
          <>
            {studentFine?.map((item) => {
              return (
                <>
                  <Col md={4} sm={12} className="my-2">
                    <Card className="shadow">
                      <CardHeader>Fine Details of&nbsp;{item?.date}</CardHeader>
                      <CardBody>
                        <Label>Status:</Label>
                        <Input
                          value={
                            item?.status == null
                              ? "Pending"
                              : item?.status == false
                              ? "Rejected"
                              : "Approved"
                          }
                          disabled={true}
                        ></Input>
                        <Label>Amount:</Label>
                        <Input value={item?.amount} disabled={true}></Input>
                        <Label>Description:</Label>
                        <Input
                          value={item?.description}
                          type="textarea"
                          disabled={true}
                          rows={Math.ceil(item?.description.length / 50)}
                        ></Input>
                      </CardBody>
                      <CardFooter>
                        <Row className="float-right">
                          {item?.receipt == null ? (
                            <Button
                              className="bg-site-success"
                              onClick={() => {
                                toggle();
                                setSelectedId(item.id);
                                setReceipt(item?.receipt);
                                setFineStatus(false);
                              }}
                            >
                              Upload Receipt
                            </Button>
                          ) : (
                            <Button
                              className={`${
                                item.status == true
                                  ? "bg-site-success"
                                  : "bg-danger"
                              }`}
                              disabled={item?.status == true ? true : false}
                              onClick={() => {
                                setFineStatus(true);
                                toggle();
                                setSelectedId(item.id);
                                setReceipt(item?.receipt);
                              }}
                            >
                              {item?.status == true
                                ? "Approved"
                                : "Update Receipt"}
                            </Button>
                          )}
                        </Row>
                      </CardFooter>
                    </Card>
                  </Col>
                </>
              );
            })}
            <Modal isOpen={modal} toggle={toggle}>
              <ModalHeader toggle={toggle}>
                {" "}
                {fineStatus == true
                  ? "Update Fine Receipt"
                  : "Upload Fine Receipt"}
              </ModalHeader>
              <ModalBody>
                <Container>
                  <Row>
                    <Col>
                      {fineStatus == true ? (
                        <>
                          <Stack spacing={1} ml={2}>
                            <h5>Previous Photo click to preview</h5>
                            <Image
                              src={`https://localhost:44374/FineReceiptImages/${receipt}`}
                              alt="Batch"
                              height={140}
                              width={140}
                              className="mx-1 cursor-pointer"
                              onClick={() => setIsModalOpen(true)}
                            />
                            {isModalOpen && (
                              <Modal isOpen={isModalOpen} toggle={toggleModal}>
                                <ModalHeader toggle={toggleModal}>
                                  Preview Your Photo
                                </ModalHeader>
                                <ModalBody>
                                  <Image
                                    src={`https://localhost:44374/FineReceiptImages/${receipt}`}
                                    alt="Batch"
                                    // height={500}
                                    width={350}
                                  />
                                </ModalBody>
                              </Modal>
                            )}
                            <h5>Update Receipt</h5>
                            <ChallanWall
                              fileList={fileList}
                              setFileList={setFileList}
                            />
                          </Stack>
                        </>
                      ) : (
                        <>
                          <Stack spacing={1} ml={2}>
                            <h5>Upload Receipt</h5>
                            <Typography
                              variant="p"
                              mr={2}
                              fontWeight={500}
                              fontSize={12}
                            >
                              (Upload a minimum of 1 photo of your Fine Receipt)
                            </Typography>
                            <ChallanWall
                              fileList={fileList}
                              setFileList={setFileList}
                            />
                          </Stack>
                          {flagSubmit && fileList.length == 0 ? (
                            <Typography
                              variant="p"
                              mr={2}
                              fontWeight={500}
                              fontSize={12}
                              sx={{ color: "red" }}
                            >
                              Upload minimum 1 photo of your Fine Receipt*
                            </Typography>
                          ) : null}
                        </>
                      )}
                    </Col>
                  </Row>
                </Container>
              </ModalBody>
              <ModalFooter>
                {fineStatus == true ? (
                  <Button
                    className="bg-site-primary"
                    disabled={fileList.length == 0 ? true : false}
                    onClick={handleUpload}
                  >
                    {addFineloading ? <Spinner size="sm" /> : "Update"}
                  </Button>
                ) : (
                  <Button
                    className="bg-site-primary"
                    disabled={fileList.length == 0 ? true : false}
                    onClick={handleUpload}
                  >
                    {addFineloading ? <Spinner size="sm" /> : "Upload"}
                  </Button>
                )}
              </ModalFooter>
            </Modal>
          </>
        )}
      </Row>
    </Container>
  );
}

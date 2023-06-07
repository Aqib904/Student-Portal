import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFeeStatus, uploadChallan } from "../../store/actions/feeAction";
import { styled } from "@mui/material/styles";
import { gridClasses } from "@mui/x-data-grid";
import { GridToolbar } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import Image from "react-bootstrap/Image";
import {
  Button,
  Card,
  CardHeader,
  Col,
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Spinner,
} from "reactstrap";
import LoadingOverlay from "react-loading-overlay";
import { Link, useHistory } from "react-router-dom";
import { Stack, Typography } from "@mui/material";
import ChallanWall from "../../components/global/ChallanWall";
export default function ViewFeeStatus() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { feeStatus, feeStatusloading, uploadloading } = useSelector(
    (state) => state.fee
  );
  const { token } = useSelector((state) => state.authUser);
  const [rows, setRows] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [flagSubmit, setFlagSubmit] = useState(false);
  const [modal, setModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [challanImage, setChallanImage] = useState(null);
  const [challanStatus, setChallanStatus] = useState(false);
  const [status, setStatus] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  //console.log(selectedId, "selectedId");
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const toggle = () => {
    setFileList([]);
    setModal(!modal);
  };
  const StripedDataGrid = styled(DataGrid)(() => ({
    [`& .${gridClasses.row}.even`]: {
      backgroundColor: "#EEEE",
    },
  }));
  const columns = [
    { field: "id", headerName: "Id", hide: true, filterable: false },
    {
      field: "installment_no",
      headerName: "Installment No",
      width: 150,
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 170,
    },
    {
      field: "issue_date",
      headerName: "Issue Date",
      width: 170,
    },

    {
      field: "expiry_date",
      headerName: "Expiry Date",
      width: 170,
    },
    {
      field: "FeeStatus",
      type: "action",
      headerName: "Fee Status",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            {params.row.status == false ? (
              <span>Pending</span>
            ) : (
              <span>Approved</span>
            )}
          </>
        );
      },
    },
    {
      field: "status",
      type: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            {params.row.challan_image == null ? (
              <Button
                className="bg-danger"
                disabled={params.row.status == true ? true : false}
                onClick={() => {
                  setSelectedId(params.row.id);
                  toggle();
                  setChallanStatus(false);
                  setStatus(params.row.status);
                }}
              >
                <i class="fas fa-upload"></i>
              </Button>
            ) : (
              <Button
                className={`${
                  params.row.status == false ? "bg-warning" : "bg-site-success"
                } text-white border-0 `}
                // disabled={params.row.status == true ? true : false}
                onClick={() => {
                  setChallanImage(params.row.challan_image);
                  setSelectedId(params.row.id);
                  setChallanStatus(true);
                  setStatus(params.row.status);
                  toggle();
                }}
              >
                {params.row.status == true ? (
                  <i class="fas fa-eye"></i>
                ) : (
                  <i class="fas fa-edit"></i>
                )}
              </Button>
            )}
          </>
        );
      },
    },
  ];
  const handleUpload = async () => {
    for (const item of fileList) {
      await dispatch(uploadChallan(item.originFileObj, selectedId));
      dispatch(getFeeStatus(token?.username));
    }
    toggle();
  };
  useEffect(() => {
    const updatedRows = [...feeStatus].sort(
      (a, b) => a.installment_no - b.installment_no
    );
    setRows(updatedRows);
  }, [feeStatus]);
  useEffect(() => {
    dispatch(getFeeStatus(token?.username));
  }, []);
  return (
    <>
      <h4 className="d-block d-md-block m-0 font-weight-bold mx-3">
      <Link className="text-dark" to="/student/fee_detail">
            <i class="fas fa-arrow-alt-circle-left"></i>
          </Link>
          &nbsp;Fee Status
      </h4>
      <Container>
        <Row>
          <Col sm={12} md={12}>
            <Card className="shadow my-3 w-100 z-index-n1">
              <LoadingOverlay
                active={feeStatusloading}
                spinner
                text="Fee Status Loading...."
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
      </Container>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          {" "}
          {challanStatus == true ? "Manage Challan" : "Upload Challan"}
        </ModalHeader>
        <ModalBody>
          <Container>
            <Row>
              <Col>
                {challanStatus == true ? (
                  <>
                    <Stack spacing={1} ml={2}>
                      <h5>Previous Photo click to preview</h5>
                      <Image
                        src={`https://localhost:44374/ChallanImages/${challanImage}`}
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
                              src={`https://localhost:44374/ChallanImages/${challanImage}`}
                              alt="Batch"
                              // height={500}
                              width={350}
                            />
                          </ModalBody>
                        </Modal>
                      )}
                      {status == true ? (
                        ""
                      ) : (
                        <>
                          <h5>Update Photo</h5>
                          <ChallanWall
                            fileList={fileList}
                            setFileList={setFileList}
                          />
                        </>
                      )}
                    </Stack>
                  </>
                ) : (
                  <>
                    <Stack spacing={1} ml={2}>
                      <h5>Upload Challan Photo</h5>
                      <Typography
                        variant="p"
                        mr={2}
                        fontWeight={500}
                        fontSize={12}
                      >
                        (Upload a minimum of 1 photo of your Challan)
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
                        Upload minimum 1 photo of your Challan*
                      </Typography>
                    ) : null}
                  </>
                )}
              </Col>
            </Row>
          </Container>
        </ModalBody>
        <ModalFooter>
          {status == true ? (
            ""
          ) : (
            <>
              {challanStatus == true ? (
                <Button
                  className="bg-site-primary"
                  disabled={fileList.length == 0 ? true : false}
                  onClick={handleUpload}
                >
                  {uploadloading ? <Spinner size="sm" /> : "Update Challan"}
                </Button>
              ) : (
                <Button
                  className="bg-site-primary"
                  disabled={fileList.length == 0 ? true : false}
                  onClick={handleUpload}
                >
                  {uploadloading ? <Spinner size="sm" /> : "Upload Challan"}
                </Button>
              )}
            </>
          )}
        </ModalFooter>
      </Modal>
    </>
  );
}

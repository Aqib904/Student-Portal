import React from "react";
import { useEffect, useState } from "react";
import LoadingOverlay from "react-loading-overlay";
import { Link, useLocation } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
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
import Image from "react-bootstrap/Image";
import {
  approveFeeStatus,
  getFeeStatus,
  rejectFeeStatus,
} from "../../store/actions/feeAction";
import { styled } from "@mui/material/styles";
import { gridClasses } from "@mui/x-data-grid";
import { GridToolbar } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { Stack } from "@mui/material";
export default function ManageStudentFee() {
  const location = useLocation();
  const dispatch = useDispatch();
  const data = location?.state;
  const { feeStatus, feeStatusloading, approveLoading, rejectLoading } =
    useSelector((state) => state.fee);
  const [rows, setRows] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [challanImage, setChallanImage] = useState(null);
  const [modal, setModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const StripedDataGrid = styled(DataGrid)(() => ({
    [`& .${gridClasses.row}.even`]: {
      backgroundColor: "#EEEE",
    },
  }));
  const toggle = () => {
    setModal(!modal);
  };
  console.log(rows, "rows");
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
            <Button
              className={`${
                params.row.status == false ? "bg-site-success" : "bg-warning"
              } text-white border-0 `}
              disabled={params.row.challan_image == null ? true : false}
              onClick={() => {
                setChallanImage(params.row.challan_image);
                setSelectedId(params.row.id);
                toggle();
              }}
            >
              {params.row.challan_image == null ? (
                <i class="fas fa-eye-slash"></i>
              ) : (
                <i class="fas fa-eye"></i>
              )}
            </Button>
          </>
        );
      },
    },
  ];
  useEffect(() => {
    const updatedRows = [...feeStatus].sort(
      (a, b) => a.installment_no - b.installment_no
    );
    setRows(updatedRows);
  }, [feeStatus]);
  useEffect(() => {
    dispatch(getFeeStatus(data?.regNo));
  }, []);
  return (
    <>
      <h4 className="d-none d-md-block m-0 font-weight-bold mx-3">
      <Link className="text-dark" to="/admin/student_fee"><i class="fas fa-arrow-alt-circle-left"></i></Link>&nbsp;Manage Student Fee
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
                <CardHeader>
                  <div>
                    <h6 className="d-inline-block">Name:&nbsp;</h6>
                    <span>{data.name}</span>
                  </div>
                </CardHeader>
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
        <ModalHeader toggle={toggle}>Manage Status</ModalHeader>
        <ModalBody>
          <Container>
            <Row>
              <Col>
                <>
                  <Stack spacing={1} ml={2}>
                    <h5>Challan Slip click to preview</h5>
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
                            className="img-fluid"
                            width={350}
                          />
                        </ModalBody>
                      </Modal>
                    )}
                  </Stack>
                </>
              </Col>
            </Row>
          </Container>
        </ModalBody>
        <ModalFooter>
          <Button
            size="sm"
            color="success"
            className="mx-2"
            onClick={async (e) => {
              e.preventDefault();
             await dispatch(approveFeeStatus(selectedId));
             dispatch(getFeeStatus(data?.regNo));
             toggle()
            }}
          >
            {approveLoading ? <Spinner size="sm" /> : "🗸"}
          </Button>
          <Button
            size="sm"
            color="danger"
            className="mx-2"
            onClick={async (e) => {
              e.preventDefault();
              await dispatch(rejectFeeStatus(selectedId));
              dispatch(getFeeStatus(data?.regNo));
              toggle()
            }}
          >
            {rejectLoading ? <Spinner size="sm" /> : "X"}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

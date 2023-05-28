import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { approveInstallment, getInstallmentRequests, rejectInstallment } from "../../store/actions/feeAction";
import { styled } from "@mui/material/styles";
import { gridClasses } from "@mui/x-data-grid";
import user from "../../assets/img/user.png";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  Col,
  Container,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Spinner,
} from "reactstrap";
import { toast } from "react-toastify";
import LoadingOverlay from "react-loading-overlay";
export default function InstallmentRequest() {
  const dispatch = useDispatch();
  const { loading, installmentRequests, approveloading,rejectloading } = useSelector((state) => state.fee);
  const [rows, setRows] = useState([]);
  const [installments, setInstallments] = useState([]);
  const [installmentRows, setInstallmentRows] = useState([]);
  const [installmentId, setInstallmentId] = useState("");
  const [confirmModal, setConfirmModal] = useState(false);
  const confirmtoggle = () => setConfirmModal(!confirmModal);
  console.log(installmentRows, "install");
  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };
  const StripedDataGrid = styled(DataGrid)(() => ({
    [`& .${gridClasses.row}.even`]: {
      backgroundColor: "#EEEE",
    },
  }));
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
  const installmentColumns = [
    { field: "id", headerName: "Id", hide: true, filterable: false },
    {
      field: "installment_no",
      headerName: "Installment no",
      width: 180,
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 170,
    },
  ];
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
      width: 280,
    },
    {
      field: "reg_no",
      headerName: "Reg no",
      width: 170,
    },
    {
      field: "discipline",
      headerName: "Discipline",
      width: 160,
    },
    {
      field: "Action",
      type: "action",
      headerName: "Installments",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Button
              className="bg-site-success"
              onClick={() => {
                setInstallments(params?.row?.installments);
                setInstallmentId(params?.row?.id);
                toggle();
              }}
            >
              <i class="fas fa-eye"></i>
            </Button>
          </>
        );
      },
    },
  ];
  useEffect(() => {
    const installmentsWithIds = installments.map((installment, index) => ({
      ...installment,
      id: index + 1,
    }));
    setInstallmentRows(installmentsWithIds);
  }, [installments]);

  useEffect(() => {
    const updatedRows = installmentRequests.map((student) => {
      const discipline =
        "BS" + student.program + student.semester + student.section;
      return { ...student, discipline };
    });
    setRows(updatedRows);
  }, [installmentRequests]);
  useEffect(() => {
    dispatch(getInstallmentRequests());
  }, []);
  return (
    <Container fluid>
      <Row>
        <Col>
          <LoadingOverlay
            active={loading}
            spinner
            text="Installments Requests Loading...."
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
        </Col>
      </Row>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Manage Installments</ModalHeader>
        <ModalBody>
          <StripedDataGrid
            autoHeight
            autoWidth
            columns={installmentColumns}
            rows={installmentRows}
            disableSelectionOnClick={false}
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0 ? "odd" : "even"
            }
            hideFooterPagination={true}
          />
        </ModalBody>
        <ModalFooter>
          <Button
                size="sm"
                color="success"
                className="mx-2"
                onClick={async (e) => {
                  e.preventDefault();
                  await dispatch(approveInstallment(installmentId));
                  dispatch(getInstallmentRequests());
                  toggle();
                  setInstallmentId("")
                }}
                disabled={approveloading}
              >
                {approveloading ? <Spinner size="sm" /> : "🗸"}
              </Button>
               <Button
                size="sm"
                color="danger"
                className="mx-2"
                onClick={()=>{confirmtoggle()}}
              >
                X
              </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={confirmModal} toggle={confirmtoggle}>
        <ModalHeader toggle={confirmtoggle}>Confirmation Box</ModalHeader>
        <ModalBody>
          <h5 className="text-center ">
            Are you Sure for Reject the Installments Request?
          </h5>
          <div className="d-flex justify-content-center align-items-center my-3">
            <Button
              className="bg-site-primary w-25 mx-2"
              onClick={async (e) => {
                e.preventDefault();
                  await dispatch(rejectInstallment(installmentId));
                  dispatch(getInstallmentRequests());
                  toggle();
                  confirmtoggle();
                  setInstallmentId("")
              }}
              disabled={rejectloading}
            >
                
              {rejectloading ? <Spinner size="sm" /> : "Yes"}
            </Button>

            <Button className="bg-danger w-25" onClick={confirmtoggle}>
              No
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </Container>
  );
}

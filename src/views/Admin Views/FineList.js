import React from "react";
import { useEffect ,useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Col, Container, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import { getFineList } from "../../store/actions/fineAction";
import { styled } from "@mui/material/styles";
import { gridClasses } from "@mui/x-data-grid";
import { GridToolbar } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import user from "../../assets/img/user.png";
import LoadingOverlay from "react-loading-overlay";
import { useHistory } from "react-router-dom";
export default function FineList() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { fineList ,loading } = useSelector((state) => state.fine);
  const [rows,setRows] = useState([])
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
        width: 240,
      },
      {
        field: "reg_no",
        headerName: "Reg no",
        width: 170,
      },
    {
      field: "discipline",
      headerName: "Descipline",
      width: 170,
    },
    {
        field: "detail",
        type: "detail",
        headerName: "Fine Details",
        width: 150,
        renderCell: (params) => {
          return (
            <>
              <Button
                className="bg-site-success"
                onClick={() =>
                    history.push({
                      pathname: `/admin/fine_details/:${params.row.id}`,
                      state: params.row,
                    })
                  }
              >    
                  <i class="fas fa-eye"></i>
              </Button>
            </>
          );
        },
      },
  ];
  console.log(fineList,'fineList')
  useEffect(() => {
    const updatedArray = fineList.map((list) => ({
      ...list,
      discipline: `BS${list.program}${list.semester}${list.section}`,
    }));
    setRows(updatedArray)
  }, [fineList]);
  useEffect(() => {
    dispatch(getFineList());
  },[]);
  return (
    <Container>
      <Row>
      <Col sm={12} md={12}>
          <Card className="shadow my-3 w-100 z-index-n1">
            <LoadingOverlay active={loading} spinner text="Fine List Loading....">
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
  );
}

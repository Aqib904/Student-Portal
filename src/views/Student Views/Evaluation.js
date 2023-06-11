import React,{useState} from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import LoadingOverlay from "react-loading-overlay";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Container,
  Row,
} from "reactstrap";
import moment from 'moment';
import { styled } from "@mui/material/styles";
import { gridClasses } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import { getCourseTeacher } from "../../store/actions/assessmentAction";

export default function Assessment() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { teachersData, loading } = useSelector((state) => state.assessment);
  console.log(teachersData, "teacherData");
  const { token, status } = useSelector((state) => state.authUser);
  const [rows, setRows] = useState([]);
  const [endDate, setEndDate] = useState('');
  console.log(endDate,'endDate')
  const StripedDataGrid = styled(DataGrid)(() => ({
    [`& .${gridClasses.row}.even`]: {
      backgroundColor: "#EEEE",
    },
  }));
  const columns = [
    { field: "id", headerName: "Id", hide: true, filterable: false },
    {
      field: "teacherName",
      headerName: "Teacher Name",
      width: 240,
    },
    {
      field: "courseName",
      headerName: "Course Name",
      width: 300,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Start Feedback",
      width: 280,
      renderCell: (params) => {
        //console.log(params.row,'params.row')
        return (
          <>
            <Button
              className={`${
                params.row.isPending === true ? "bg-danger" : "bg-site-success"
              } text-white border-0`}
              disabled={params.row.isPending === false ? true : false}
              onClick={() => {
                history.push({
                  pathname: `/student/evaluation/${params.row.courseCode}`,
                  state: params.row,
                });
              }}
            >
              {params.row.isPending == false ? (
                <i class="fas fa-check"></i>
              ) : (
                <i class="fas fa-hand-point-right"></i>
              )}
            </Button>
          </>
        );
      },
    },
  ];
  useEffect(() => {
    dispatch(getCourseTeacher(token?.username));
  }, []);
  useEffect(() => {
    if (status == false) {
      history.push("/student/enrollment");
    }
  }, [status]);
  useEffect(() => {
    let tempdata = []
    teachersData?.data && teachersData?.data.map((item)=>{
      return(
        tempdata.push({
          id:item.id,
          teacherName:item.teacherName,
          courseCode:item.courseCode,
          courseName:item.courseName,
          isPending:item.isPending,
        })
      )
    })
      setRows(tempdata);
    const calculateRemainingTime = (endDate) => {
      const timerInterval = setInterval(() => {
        const today = moment();
        const end = moment(endDate, 'DD-MM-YYYY');
        const duration = moment.duration(end.diff(today));
        const totalSeconds = Math.ceil(duration.asSeconds());

        if (totalSeconds <= 0) {
          clearInterval(timerInterval);
          setEndDate('Expired');
        } else if (totalSeconds < 86400) {
          const hours = Math.floor(totalSeconds / 3600);
          const minutes = Math.floor((totalSeconds % 3600) / 60);
          const seconds = totalSeconds % 60;
          setEndDate(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
        } else {
          const daysLeft = Math.ceil(duration.asDays());
          setEndDate(`${daysLeft} days left`);
        }
      }, 1000);
    };

    if (teachersData && teachersData.end_date) {
      calculateRemainingTime(teachersData.end_date);
    }
  }, [teachersData]);
  return (
    <Container>
      <Row>
        <Col>
        <div className="d-flex">
        <h5>RemainingTime:</h5>&nbsp;<span>{endDate==""?"Evaluation Closed":endDate}</span>
        </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card className="my-2 shadow">
            <LoadingOverlay
              active={loading}
              spinner
              text="Teachers Data Loading...."
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
  );
}

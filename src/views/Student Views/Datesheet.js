import React from "react";
import { GRID_CHECKBOX_SELECTION_COL_DEF } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import { gridClasses } from "@mui/x-data-grid";
import { GridToolbar } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { Card, Container, Row, Col, CardHeader } from "reactstrap";
import { useEffect } from "react";
import { getDatesheet } from "../../store/actions/datesheetAction";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import LoadingOverlay from "react-loading-overlay";
export default function Datesheet() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { datesheet ,loading} = useSelector((state) => state.datesheet);
  const { token ,status} = useSelector((state) => state.authUser);
  const StripedDataGrid = styled(DataGrid)(() => ({
    [`& .${gridClasses.row}.even`]: {
      backgroundColor: "#EEEE",
    },
  }));
  const [datesheetdata, setDatesheetData] = useState([]);
  const columns = [
    { field: "id", headerName: "Id", hide: true, filterable: false },
    {
      field: "courseName",
      headerName: " Course Name",
      width: 240,
    },
    {
      field: "day",
      headerName: "Day",
      width: 170,
    },
    {
      field: "time",
      headerName: "Time",
      width: 170,
    },

    {
      field: "date",
      headerName: "Date",
      width: 170,
    },
  ];
  useEffect(() => {
    dispatch(getDatesheet(token?.username));
  }, []);
  useEffect(() => {
    let datesheetsData = [];
    let index = 0;
    datesheet.dateSheet?.map((item) => {
      index++;
      return datesheetsData.push({
        id: index,
        courseName: item.courseName,
        day: item.day,
        date: item.date,
        time: item.time,
      });
    });
    setDatesheetData(datesheetsData);
  }, [datesheet]);
  useEffect(()=>{
    if(status==false){
      history.push("/student/enrollment")
    }
  },[status])
  return (
    <Container>
      <Row>
        <Col sm={12} md={12}>
          <Card className="shadow my-3 w-100 z-index-n1">
            <CardHeader>Datesheet of {datesheet.type}</CardHeader>
            <LoadingOverlay active={loading} spinner text="Datesheet Loading....">
            <StripedDataGrid
              autoHeight
              autoWidth
              columns={columns}
              rows={datesheetdata}
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

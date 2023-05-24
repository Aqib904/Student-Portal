import React, { useState, useEffect, } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  CardHeader,
  Col,
  Container,
  FormGroup,
  Input,
  Row,
} from "reactstrap";
import { AddEnrollment, getEnrollment } from "../../store/actions/enrollmentAction";
import { styled } from "@mui/material/styles";
import { gridClasses } from "@mui/x-data-grid";
import { GridToolbar } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useHistory } from "react-router-dom";
export default function Enrollment() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { token,status } = useSelector((state) => state.authUser);
  const { enrollmentCourses } = useSelector((state) => state.enrollment);
  console.log(enrollmentCourses ,'enrollmentCourses ')
  const [passed, setPassed] = useState([]);
  const [failed, setFailed] = useState([]);
  console.log(failed,'failed')
  const [passCheck, setPassCheck] = useState(true);
  const [totalCrHour,setTotalCrHour] = useState({totalCredit:"",course_code:[]})
  const StripedDataGrid = styled(DataGrid)(() => ({
    [`& .${gridClasses.row}.even`]: {
      backgroundColor: "#EEEE",
    },
  }));
  const passedcolumns = [
    { field: "id", headerName: "Id", hide: true, filterable: false },
    {
      field: "course_name",
      headerName: " Course Name",
      width: 240,
    },
    {
      field: "course_code",
      headerName: "Course Code",
      width: 170,
    },
    {
      field: "credit_hours",
      headerName: "Credit Hours",
      width: 170,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Is Enroll",
      width: 100,
      renderCell: (params) => {
        return (
          <FormGroup check>
            <Input
              type="checkbox"
              className="my-n2"
              checked={passCheck}
              disabled={true}
            />
          </FormGroup>
        );
      },
    },
  ];
  const [checkboxValues, setCheckboxValues] = useState({});
  const [final, setFinal] = useState([]);
  const [selectedSection, setSelectedSection] = useState([]);
  console.log(selectedSection,'selectedSection')
  const [submit,setSubmit] = useState([])
  const handleSubmit = () => {
    const submitData = passed.map((item) => {
      const matchingSection = selectedSection.find((section) => section.courseCode === item.course_code);
      const sectionName = matchingSection ? matchingSection.section : item.section;
      return {
        reg_no: token?.username,
        course_offering_semester_id: item.id,
        section: sectionName,
      }
    }).concat(selectedSection.map((section) => {
      return {
        reg_no: token?.username,
        course_offering_semester_id: section.id,
        section: section.section,
      }
    }));
    setSubmit(submitData);
    dispatch(AddEnrollment(submitData,history))
  };
  const handleSectionChange = (event, courseId) => {
    const sectionName = event.target.value;
    const matchedCourse = final.find(
      (course) => course.courseCode === courseId
    );
    if (matchedCourse) {
      const matchedSection = matchedCourse.sections.find(
        (section) => section.sectionName === sectionName
      );
      if (matchedSection) {
        const selectedSectionIndex = selectedSection.findIndex(
          (section) => section.id === matchedSection.sectionId
        );
        if (selectedSectionIndex === -1) {
          // If the selected section is from a different row or a new section, create a new object in the array and store the previous data
          setSelectedSection([
            ...selectedSection,
            {
              id: matchedSection.sectionId,
              section: matchedSection.sectionName,
              discipline:"BS"+ matchedSection.program+matchedSection.semester+ matchedSection.sectionName,
              courseCode:courseId,
              credit_hours:matchedSection.credit_hours
            },
          ]);
        } else {
          // If the selected section is from the same row, replace the object in the array with the new data
          const updatedSelectedSection = [...selectedSection];
          updatedSelectedSection[selectedSectionIndex] = {
            id: matchedSection.sectionId,
            section: matchedSection.sectionName,
            discipline:"BS"+ matchedSection.program+matchedSection.semester+ matchedSection.sectionName,
            credit_hours:matchedSection.credit_hours,
            courseCode:courseId,
          };
          setSelectedSection(updatedSelectedSection);
        }
      }
    }
  };
  const handleCheckboxChange = (event, courseCode) => {
    event.preventDefault();
    const newCheckboxValues = { ...checkboxValues };
    newCheckboxValues[courseCode] = event.target.checked;
    setCheckboxValues(newCheckboxValues);
    const matchedCourse = enrollmentCourses.failedCourses1.find(
      (course) => course.course_code === courseCode
    );
    console.log(matchedCourse,'matchedCourse')
    if (matchedCourse) {
      const sections = matchedCourse.sections.map((section) => ({
        sectionId: section.id,
        sectionName: section.section,
        semester: section.semester,
        program: section.program,
        credit_hours:matchedCourse.credit_hours,
        discipline: "BS" + section.program + section.semester + section.section,
      }));
      // Remove duplicates from the sections array
      const uniqueSections = Array.from(new Set(sections.map((section) => JSON.stringify(section))))
        .map((sectionString) => JSON.parse(sectionString));
  
      const finalData = {
        courseCode,
        sections: uniqueSections,
      };
  
      setFinal((prevFinal) => {
        if (event.target.checked) {
          return [...prevFinal, finalData];
        } else {
          const updatedTotalCrHour = totalCrHour.course_code.filter((code) => code !== courseCode);
        const updatedTotalCredit = totalCrHour.totalCredit - matchedCourse.credit_hours;
        setTotalCrHour({
          course_code: updatedTotalCrHour,
          totalCredit: updatedTotalCredit,
        });
          setSelectedSection(selectedSection.filter((section) => section.courseCode !== courseCode));
          return prevFinal.filter((data) => data.courseCode !== courseCode);
        }
      });
    }
  };
  // const handleCheckboxChange = (event, courseCode) => {
  //   event.preventDefault()
  //   const newCheckboxValues = { ...checkboxValues };
  //   newCheckboxValues[courseCode] = event.target.checked;
  //   setCheckboxValues(newCheckboxValues);
  //   const matchedCourse = enrollmentCourses.failedCourses1.find(
  //     (course) => course.course_code === courseCode
  //   );
  //   if (matchedCourse) {
  //     const sections = matchedCourse.sections.map((section) => ({
  //       sectionId: section.id,
  //       sectionName: section.section,
  //       semester: section.semester,
  //       program: section.program,
  //       discipline: "BS"+section.program + section.semester + section.section,
  //     }));
  //         let uniqueProgram = [
  //     ...new Map(sections.map((m) => [m.course_code, m])).values(),
  //   ];
  //     const finalData = {
  //       courseCode,
  //       sections,
  //     };
  //     setFinal((prevFinal) => {
  //       if (event.target.checked) {
  //         return [...prevFinal, finalData];
  //       } else {
  //         setSelectedSection(selectedSection.filter(section => section.courseCode !== courseCode));
  //         return prevFinal.filter((data) => data.courseCode !== courseCode);
  //       }
  //     });
  //   }
  // };
  const failcolumns = [
    { field: "id", headerName: "Id", hide: true, filterable: false },
    {
      field: "course_name",
      headerName: " Course Name",
      width: 240,
    },
    {
      field: "course_code",
      headerName: "Course Code",
      width: 170,
    },
    {
      field: "credit_hours",
      headerName: "Credit Hours",
      width: 170,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Is Enroll",
      width: 100,
      renderCell: (params) => {
        console.log(params.row,'params')
        const courseCode = params.row.course_code;
        const isChecked = checkboxValues[courseCode] || false;

        return (
          
          <FormGroup check>
            <Input
              type="checkbox"
              className="my-n2"
              disabled={params.row.section.length==0?true:false}
              checked={isChecked}
              onChange={(event) => handleCheckboxChange(event, courseCode)}
            />
          </FormGroup>
        );
      },
    },
    {
      field: "select",
      type: "select",
      headerName: "Select Section",
      width: 150,
      renderCell: (params) => {
        const courseCode = params.row.course_code;
        const sections = final.find((data) => data.courseCode === courseCode)?.sections || [];
        return (
          <>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small">Section</InputLabel>
    
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                label="Section"
                required
                onChange={(event) => handleSectionChange(event, courseCode)}
                value={selectedSection.find((section) => section.courseCode === courseCode)?.section || ""}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {sections.map((data) => (
                  <MenuItem  value={data.sectionName} name={data.sectionName}>
                    {data.discipline}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </>
        );
      },
    }
  ];
  useEffect(() => {
    let tempdata = [];
    let creditHour = {totalCredit:"",course_code:[]};
    let totalCrHour = 0;
    enrollmentCourses?.enrollmentCourses?.map((item) => {
      totalCrHour += item.credit_hours;
      creditHour.course_code.push(item.course_code);
      creditHour.totalCredit = totalCrHour;
      return tempdata.push({
        id: item.id,
        course_name: item.course_name,
        course_code: item.course_code,
        credit_hours: item.credit_hours,
        semester: item.semester,
        program: item.program,
        section: item.section,
      });
    }
    );
    setPassed(tempdata);
    setTotalCrHour(creditHour);
  }, [enrollmentCourses]);
  useEffect(() => {
    let tempdata = [];
    let index = 0;
    enrollmentCourses?.failedCourses1?.forEach((item) => {
      index++
      if (item?.sections && item?.sections?.length > 0) {
        item?.sections?.forEach((sec) => {
          tempdata.push({
            id: sec.id,
            course_name: item.course_name,
            course_code: item.course_code,
            credit_hours: item.credit_hours,
            section: sec.section,
            discipline: "BS" + sec?.program + sec?.semester + sec?.section,
          });
        });
      } else {
        tempdata.push({
          id: index,
          course_name: item.course_name,
          course_code: item.course_code,
          credit_hours: item.credit_hours,
          section: [],
          discipline: "",
        });
      }
    });
    
    let uniqueProgram = [...new Map(tempdata.map((m) => [m.course_code, m])).values()];
    setFailed(uniqueProgram);
  }, [enrollmentCourses]);
  // useEffect(() => {
  //   let tempdata = [];
  //   enrollmentCourses?.failedCourses1?.map((item) => {
  //     return item.sections.map((sec) => {
  //       return tempdata.push({
  //         id: sec.id,
  //         course_name: item.course_name,
  //         course_code: item.course_code,
  //         credit_hours: item.credit_hours,
  //         section: sec.section,
  //         discipline: "BS" + sec?.program + sec?.semester + sec?.section,
  //       });
  //     });
  //   });
  //   let uniqueProgram = [
  //     ...new Map(tempdata.map((m) => [m.course_code, m])).values(),
  //   ];
  //   setFailed(uniqueProgram);
  // }, [enrollmentCourses]);
  useEffect(() => {
    dispatch(getEnrollment(token?.username));
  }, []);
  useEffect(()=>{
    if(status==true){
      history.push("/student/dashboard")
    }
  },[status])
  console.log(totalCrHour,'totalCrHour')
  useEffect(() => {
    let creditHour = { ...totalCrHour };
    selectedSection.map((item) => {
      if (!creditHour.course_code.includes(item.courseCode)) {
        creditHour.course_code.push(item.courseCode);
        creditHour.totalCredit += item.credit_hours;
      }
    });
    setTotalCrHour(creditHour);
  }, [selectedSection]);
  return (
    <>
      <h4 className="d-block d-md-block m-0 font-weight-bold mx-3">
        Enrollment
      </h4>
      <Container>
        <Row>
          <Col className="mt-4">
          <h6 className="d-inline-block">Total Enroll credit hours:</h6>&nbsp;<span>{totalCrHour.totalCredit}</span>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card className="shadow my-3 w-100 z-index-n1">
              <CardHeader><h6 className="d-inline-block">Regular Courses</h6>
              <Button className="bg-site-primary float-right d-inline-block" onClick={()=>{handleSubmit()}}>Submit</Button>
              </CardHeader>
              <StripedDataGrid
                autoHeight
                autoWidth
                columns={passedcolumns}
                rows={passed}
                disableSelectionOnClick={false}
                getRowClassName={(params) =>
                  params.indexRelativeToCurrentPage % 2 === 0 ? "odd" : "even"
                }
                hideFooterPagination={true}
              />
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card className="shadow my-3 w-100 z-index-n1">
              <CardHeader><h6>Failed/Remaining Courses</h6></CardHeader>
              <StripedDataGrid
                autoHeight
                autoWidth
                columns={failcolumns}
                rows={failed}
                disableSelectionOnClick={false}
                getRowClassName={(params) =>
                  params.indexRelativeToCurrentPage % 2 === 0 ? "odd" : "even"
                }
                hideFooterPagination={true}
              />
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

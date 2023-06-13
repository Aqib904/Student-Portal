import { Box, CardContent, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomizedSteppers from "../../components/global/CustomizedSteppers";
import {
  Button,
  Card,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Spinner,
} from "reactstrap";
import Slider from "@mui/material/Slider";
import { useDispatch, useSelector } from "react-redux";
import {
  ExitFormQuestions,
  SubmitExitForm,
} from "../../store/actions/authAction";
export default function ExitForm() {
  const dispatch = useDispatch();
  const { token, status, questions, loading } = useSelector(
    (state) => state.authUser
  );
  const [activeStep, setActiveStep] = useState(0);
  const [flagClick, setFlagClick] = useState(false);
  const [acedemic, setAcedamic] = useState([]);
  const [support, setSupport] = useState([]);
  const [activities, setActivities] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [graduation, setGraduation] = useState([]);
  const [finance, setFinance] = useState([]);
  const [administration, setAdministration] = useState([]);
  const [feedback, setFeedback] = useState([
    {
      reg_no: "",
      question_id: "",
      answer: "",
    },
  ]);
  // let formData = {
  //   Academic_Experience: [
  //     {
  //       id: 1,
  //       question: "Quality of Teaching and Instruction",
  //       type: "Academic Experience",
  //     },
  //     {
  //       id: 2,
  //       question:
  //         "Availability and Effectiveness of Academic Advisors or Mentors",
  //       type: "Academic Experience",
  //     },
  //     {
  //       id: 3,
  //       question: "Variety and Relevance of Courses Offered",
  //       type: "Academic Experience",
  //     },
  //     {
  //       id: 4,
  //       question: "Opportunities for Research or Internships",
  //       type: "Academic Experience",
  //     },
  //     {
  //       id: 5,
  //       question: "Adequacy of Resources and Facilities",
  //       type: "Academic Experience",
  //     },
  //     {
  //       id: 6,
  //       question:
  //         "Please provide any additional comments or suggestions regarding your academic experience at the university",
  //       type: "Academic Experience",
  //     },
  //   ],
  //   Support_Services: [
  //     {
  //       id: 7,
  //       question: "Career Services or Job Placement Support",
  //       type: "Support Services",
  //     },
  //     {
  //       id: 8,
  //       question: "Counseling or Mental Health Services",
  //       type: "Support Services",
  //     },
  //     {
  //       id: 9,
  //       question: "Support for Students with Disabilities or Special Needs",
  //       type: "Support Services",
  //     },
  //     {
  //       id: 10,
  //       question:
  //         "Accessibility and Usefulness of the University's Website or Online Platforms",
  //       type: "Support Services",
  //     },
  //     {
  //       id: 11,
  //       question:
  //         "Please provide any additional comments or suggestions regarding the support services at the university",
  //       type: "Support Services",
  //     },
  //   ],
  //   Extracurricular_Activities: [
  //     {
  //       id: 12,
  //       question: "Clubs or student organizations",
  //       type: "Extracurricular Activities",
  //     },
  //     {
  //       id: 13,
  //       question: "Sports teams or athletic events",
  //       type: "Extracurricular Activities",
  //     },
  //     {
  //       id: 14,
  //       question: "Cultural or arts events",
  //       type: "Extracurricular Activities",
  //     },
  //     {
  //       id: 15,
  //       question: "Volunteering or community service",
  //       type: "Extracurricular Activities",
  //     },
  //   ],
  //   Campus_Facilities: [
  //     { id: 16, question: "Classrooms", type: "Campus Facilities" },
  //     { id: 17, question: "Libraries", type: "Campus Facilities" },
  //     {
  //       id: 18,
  //       question: "Recreational Areas (e.g., gym, sports facilities)",
  //       type: "Campus Facilities",
  //     },
  //   ],
  //   Graduation_Process: [
  //     {
  //       id: 19,
  //       question:
  //         "How would you rate your understanding of the graduation requirements?",
  //       type: "Graduation Process",
  //     },
  //     {
  //       id: 20,
  //       question:
  //         "How would you rate the communication regarding graduation procedures?",
  //       type: "Graduation Process",
  //     },
  //     {
  //       id: 21,
  //       question:
  //         "Please provide any additional comments or suggestions regarding the graduation process",
  //       type: "Graduation Process",
  //     },
  //   ],
  //   Finance: [
  //     {
  //       id: 25,
  //       question:
  //         "Were the staff in the finance department helpful and responsive in addressing your financial concerns or inquiries?",
  //       type: "Finance",
  //     },
  //     {
  //       id: 26,
  //       question:
  //         "Did you receive timely and accurate information regarding tuition fees, payment deadlines, and financial aid opportunities?",
  //       type: "Finance",
  //     },
  //     {
  //       id: 27,
  //       question:
  //         "How would you rate the efficiency and effectiveness of the university's finance department in handling financial matters, such as tuition payments, scholarships, and financial aid?",
  //       type: "Finance",
  //     },
  //   ],
  //   Administration: [
  //     {
  //       id: 28,
  //       question:
  //         "Were you satisfied with the clarity and accessibility of administrative policies and procedures?",
  //       type: "Administration",
  //     },
  //     {
  //       id: 29,
  //       question:
  //         "Did you find the administrative staff to be helpful and knowledgeable in providing assistance and guidance on administrative procedures?",
  //       type: "Administration",
  //     },
  //     {
  //       id: 30,
  //       question:
  //         "How would you rate the overall effectiveness and efficiency of the university administration in addressing administrative matters, such as registration, transcript requests, and documentation?",
  //       type: "Administration",
  //     },
  //   ],
  //   feedback: [
  //     {
  //       id: 31,
  //       question:
  //         "We value your feedback! Please share your thoughts on your overall university experience. What are some aspects that you appreciated and would like to see continued, as well as any areas for improvement?",
  //       type: "feedback",
  //     },
  //   ],
  // };
  const handleAcedemicChange = (questionId, answer) => {
    const updatedAcedemic = acedemic.map((item) => ({ ...item }));
    const index = updatedAcedemic.findIndex(
      (item) => item.question_id === questionId
    );
    if (index !== -1) {
      updatedAcedemic[index].answer = answer;
    } else {
      updatedAcedemic.push({
        reg_no: token?.username,
        question_id: questionId,
        answer: answer,
      });
    }
    setAcedamic(updatedAcedemic);
  };
  const handleSupportChange = (questionId, answer) => {
    const updatedSupport = support.map((item) => ({ ...item }));
    const index = updatedSupport.findIndex(
      (item) => item.question_id === questionId
    );
    if (index !== -1) {
      updatedSupport[index].answer = answer;
    } else {
      updatedSupport.push({
        reg_no: token?.username,
        question_id: questionId,
        answer: answer,
      });
    }
    setSupport(updatedSupport);
  };
  const handleActivityChange = (questionId, checked) => {
    const updatedActivities = activities.map((activity) => ({
      ...activity,
    }));
    const index = updatedActivities.findIndex(
      (activity) => activity.question_id === questionId
    );
    if (index !== -1) {
      updatedActivities[index].answer = checked;
    } else {
      updatedActivities.push({
        reg_no: token?.username,
        question_id: questionId,
        answer: checked,
      });
    }
    setActivities(updatedActivities);
  };
  const marks = [
    {
      value: 0,
      label: "Poor",
    },
    {
      value: 30,
      label: "Average",
    },
    {
      value: 60,
      label: "Good",
    },
    {
      value: 100,
      label: "Excellent",
    },
  ];

  function valuetext(value) {
    return `${value}°C`;
  }

  function valueLabelFormat(value) {
    return marks.findIndex((mark) => mark.value === value) + 1;
  }
  let index = 0;
  const handleSubmit = (e) => {
    e.preventDefault();
    setFlagClick(true);
    if (activeStep < 6) {
      setActiveStep((curr) => curr + 1);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      let submit = [];
      submit = [
        acedemic,
        support,
        activities,
        facilities,
        graduation,
        finance,
        administration,
        feedback,
      ];
      dispatch(SubmitExitForm(submit));
    }
  };
  useEffect(() => {
    if (activeStep === 2 && activities.length === 0) {
      const initialActivities = questions?.Extracurricular_Activities.map(
        (item) => ({
          reg_no: token?.username,
          question_id: item.id,
          answer: false,
        })
      );
      setActivities(initialActivities);
    }
  }, [activeStep, activities, questions?.Extracurricular_Activities]);
  useEffect(() => {
    if (activeStep === 3 && facilities.length === 0) {
      const initialFacilities = questions?.Campus_Facilities.map((item) => ({
        reg_no: token?.username,
        question_id: item.id,
        answer: "100",
      }));
      setFacilities(initialFacilities);
    }
  }, [activeStep, facilities, questions?.Campus_Facilities]);
  useEffect(() => {
    if (activeStep === 4 && graduation.length === 0) {
      const graduationItems = questions?.Graduation_Process.map(
        (item, index) => {
          let answer = index < 2 ? "100" : "";
          return {
            reg_no: token?.username,
            question_id: item.id,
            answer: answer,
          };
        }
      );
      setGraduation(graduationItems);
    }
  }, [activeStep, facilities, questions?.Graduation_Process]);
  useEffect(() => {
    if (
      activeStep === 5 &&
      finance.length === 0 &&
      administration.length === 0
    ) {
      const financeItems = questions?.Finance.map((item, index) => {
        let answer = index < 2 ? "Yes" : "100";
        return {
          reg_no: token?.username,
          question_id: item.id,
          answer: answer,
        };
      });
      const administrationItems = questions?.Administration.map(
        (item, index) => {
          let answer = index < 2 ? "Yes" : "100";
          return {
            reg_no: token?.username,
            question_id: item.id,
            answer: answer,
          };
        }
      );
      setFinance(financeItems);
      setAdministration(administrationItems);
    }
  }, [activeStep, facilities, questions?.Finance, questions?.Administration]);
  useEffect(() => {
    dispatch(ExitFormQuestions());
  }, []);
  return (
    <Container>
      <Row>
        <Col>
          <Form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <CustomizedSteppers
              activeStep={activeStep}
              stepsLabel={[
                "Step 1",
                "Step 2",
                "Step 3",
                "Step 4",
                "Step 5",
                "Step 6",
                "Step 7",
              ]}
              stepsIcons={{
                1: "1",
                2: "2",
                3: "3",
                4: "4",
                5: "5",
                6: "6",
                7: "7",
              }}
            />
            {activeStep === 0 && (
              <>
                {/* -------------------------- Card One  --------------------------*/}

                <Card
                  className="shadow"
                  style={{
                    minWidth: 275,
                    backgroundColor: "white",
                    borderRadius: 18,
                    border: "1px solid #e1d6d6",
                    marginTop: 15,
                  }}
                >
                  <CardContent>
                    <h2
                      className="text-center mt-2 "
                      style={{
                        fontSize: "40px",
                        fontWeight: "600",
                        lineHeight: "48px",
                      }}
                    >
                      Academic Experience
                    </h2>
                    <hr />
                    {questions?.Academic_Experience.slice(0, 5).map((item) => {
                      index++;
                      const acedamicItem = acedemic.find(
                        (acedamicItem) => acedamicItem.question_id === item.id
                      );
                      return (
                        <div className="m-3" key={item.id}>
                          <h6>
                            {index}:&nbsp;{item.question}
                          </h6>
                          {/* Render radio buttons here */}
                          <span className="d-block my-1">
                            <input
                              type="radio"
                              name={item.id}
                              value="Excellent"
                              required
                              onChange={(e) =>
                                handleAcedemicChange(item.id, e.target.value)
                              }
                              checked={
                                acedamicItem &&
                                acedamicItem.answer === "Excellent"
                              }
                            />{" "}
                            Excellent
                          </span>
                          <span className="d-block my-1">
                            <input
                              type="radio"
                              name={item.id}
                              value="Good"
                              required
                              onChange={(e) =>
                                handleAcedemicChange(item.id, e.target.value)
                              }
                              checked={
                                acedamicItem && acedamicItem.answer === "Good"
                              }
                            />{" "}
                            Good
                          </span>
                          <span className="d-block my-1">
                            <input
                              type="radio"
                              name={item.id}
                              value="Average"
                              required
                              onChange={(e) =>
                                handleAcedemicChange(item.id, e.target.value)
                              }
                              checked={
                                acedamicItem &&
                                acedamicItem.answer === "Average"
                              }
                            />{" "}
                            Average
                          </span>
                          <span className="d-block mb-2">
                            <input
                              type="radio"
                              name={item.id}
                              value="Poor"
                              required
                              onChange={(e) =>
                                handleAcedemicChange(item.id, e.target.value)
                              }
                              checked={
                                acedamicItem && acedamicItem.answer === "Poor"
                              }
                            />{" "}
                            Poor
                          </span>
                        </div>
                      );
                    })}

                    <div className="m-3">
                      <h6>6:{questions?.Academic_Experience[5]?.question}</h6>
                      {/* Render textarea input here */}
                      <Input
                        type="textarea"
                        required
                        onChange={(e) =>
                          handleAcedemicChange(
                            questions?.Academic_Experience[5]?.id,
                            e.target.value
                          )
                        }
                        value={
                          acedemic.find(
                            (item) =>
                              item.question_id ===
                              questions?.Academic_Experience[5]?.id
                          )?.answer || ""
                        }
                      />
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
            {activeStep === 1 && (
              <>
                {/* -------------------------- Card One  --------------------------*/}

                <Card
                  className="shadow"
                  style={{
                    minWidth: 275,
                    backgroundColor: "white",
                    borderRadius: 18,
                    border: "1px solid #e1d6d6",
                    marginTop: 15,
                  }}
                >
                  <CardContent>
                    <h2
                      className="text-center mt-2 "
                      style={{
                        fontSize: "40px",
                        fontWeight: "600",
                        lineHeight: "48px",
                      }}
                    >
                      Support Services
                    </h2>
                    <hr />
                    {questions?.Support_Services.slice(0, 4).map((item) => {
                      index++;
                      const supportItem = support.find(
                        (supportItem) => supportItem.question_id === item.id
                      );
                      return (
                        <div className="m-3" key={item.id}>
                          <h6>
                            {index}:&nbsp;{item.question}
                          </h6>
                          {/* Render radio buttons here */}
                          <span className="d-block my-1">
                            <input
                              type="radio"
                              name={item.id}
                              value="Excellent"
                              required
                              onChange={(e) =>
                                handleSupportChange(item.id, e.target.value)
                              }
                              checked={
                                supportItem &&
                                supportItem.answer === "Excellent"
                              }
                            />{" "}
                            Excellent
                          </span>
                          <span className="d-block my-1">
                            <input
                              type="radio"
                              name={item.id}
                              value="Good"
                              required
                              onChange={(e) =>
                                handleSupportChange(item.id, e.target.value)
                              }
                              checked={
                                supportItem && supportItem.answer === "Good"
                              }
                            />{" "}
                            Good
                          </span>
                          <span className="d-block my-1">
                            <input
                              type="radio"
                              name={item.id}
                              value="Average"
                              required
                              onChange={(e) =>
                                handleSupportChange(item.id, e.target.value)
                              }
                              checked={
                                supportItem && supportItem.answer === "Average"
                              }
                            />{" "}
                            Average
                          </span>
                          <span className="d-block mb-2">
                            <input
                              type="radio"
                              name={item.id}
                              value="Poor"
                              required
                              onChange={(e) =>
                                handleSupportChange(item.id, e.target.value)
                              }
                              checked={
                                supportItem && supportItem.answer === "Poor"
                              }
                            />{" "}
                            Poor
                          </span>
                        </div>
                      );
                    })}

                    <div className="m-3">
                      <h6>
                        5:&nbsp;{questions?.Support_Services[4]?.question}
                      </h6>
                      {/* Render textarea input here */}
                      <Input
                        type="textarea"
                        required
                        onChange={(e) =>
                          handleSupportChange(
                            questions?.Support_Services[4]?.id,
                            e.target.value
                          )
                        }
                        value={
                          support.find(
                            (item) =>
                              item.question_id ===
                              questions?.Support_Services[4]?.id
                          )?.answer || ""
                        }
                      />
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
            {activeStep === 2 && (
              <>
                <Card
                  className="shadow"
                  style={{
                    minWidth: 275,
                    backgroundColor: "white",
                    borderRadius: 18,
                    border: "1px solid #e1d6d6",
                    marginTop: 15,
                  }}
                >
                  <CardContent>
                    <h2
                      className="text-center mt-2 "
                      style={{
                        fontSize: "40px",
                        fontWeight: "600",
                        lineHeight: "48px",
                      }}
                    >
                      Extracurricular Activities
                    </h2>
                    <hr />
                    {questions?.Extracurricular_Activities.map((item) => {
                      index++;
                      const activityItem = activities.find(
                        (activity) => activity.question_id === item.id
                      );

                      return (
                        <FormGroup check key={item.id} className="my-2">
                          <Label check>
                            <Input
                              type="checkbox"
                              checked={
                                activityItem ? activityItem.answer : false
                              }
                              onChange={(e) =>
                                handleActivityChange(item.id, e.target.checked)
                              }
                            />{" "}
                            {item.question}
                          </Label>
                        </FormGroup>
                      );
                    })}
                  </CardContent>
                </Card>
              </>
            )}
            {activeStep === 3 && (
              <>
                <Card
                  className="shadow"
                  style={{
                    minWidth: 275,
                    backgroundColor: "white",
                    borderRadius: 18,
                    border: "1px solid #e1d6d6",
                    marginTop: 15,
                  }}
                >
                  <CardContent>
                    <h2
                      className="text-center mt-2 "
                      style={{
                        fontSize: "40px",
                        fontWeight: "600",
                        lineHeight: "48px",
                      }}
                    >
                      Campus Facilities
                    </h2>
                    <hr />
                    {questions?.Campus_Facilities.map((item, index) => {
                      const facility = facilities.find(
                        (activity) => activity.question_id === item.id
                      );

                      const handleFacilityChange = (event, value) => {
                        const updatedFacilities = [...facilities];
                        updatedFacilities[index] = {
                          ...facility,
                          answer: value,
                        };
                        setFacilities(updatedFacilities);
                      };

                      return (
                        <div className="m-3" key={item.id}>
                          <h6>{item.question}</h6>
                          <Box sx={{ width: 200 }} className="mx-4">
                            <Slider
                              aria-label="Restricted values"
                              defaultValue={facility?.answer}
                              value={facility?.answer}
                              onChange={handleFacilityChange}
                              valueLabelFormat={valueLabelFormat}
                              getAriaValueText={valuetext}
                              step={null}
                              valueLabelDisplay="auto"
                              marks={marks}
                            />
                          </Box>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              </>
            )}
            {activeStep === 4 && (
              <>
                <Card
                  className="shadow"
                  style={{
                    minWidth: 275,
                    backgroundColor: "white",
                    borderRadius: 18,
                    border: "1px solid #e1d6d6",
                    marginTop: 15,
                  }}
                >
                  <CardContent>
                    <h2
                      className="text-center mt-2"
                      style={{
                        fontSize: "40px",
                        fontWeight: "600",
                        lineHeight: "48px",
                      }}
                    >
                      Graduation Process
                    </h2>
                    <hr />
                    {graduation.slice(0, 2).map((item, index) => {
                      const question =
                        questions?.Graduation_Process[index]?.question;
                      return (
                        <div className="m-3" key={item.question_id}>
                          <h6>
                            {index + 1}:&nbsp;{question}
                          </h6>
                          <Box sx={{ width: 200 }} className="mx-4">
                            <Slider
                              aria-label="Restricted values"
                              value={item.answer}
                              valueLabelFormat={valueLabelFormat}
                              getAriaValueText={valuetext}
                              step={null}
                              valueLabelDisplay="auto"
                              marks={marks}
                              onChange={(event, newValue) => {
                                const updatedGraduation = [...graduation];
                                updatedGraduation[index].answer = newValue;
                                setGraduation(updatedGraduation);
                              }}
                            />
                          </Box>
                        </div>
                      );
                    })}
                    <div className="m-3">
                      <h6>
                        3:&nbsp;{questions?.Graduation_Process[2]?.question}
                      </h6>
                      <Input
                        type="textarea"
                        required
                        value={graduation[2]?.answer}
                        onChange={(event) => {
                          const updatedGraduation = [...graduation];
                          updatedGraduation[2].answer = event.target.value;
                          setGraduation(updatedGraduation);
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {activeStep === 5 && (
              <>
                <Card
                  className="shadow"
                  style={{
                    minWidth: 275,
                    backgroundColor: "white",
                    borderRadius: 18,
                    border: "1px solid #e1d6d6",
                    marginTop: 15,
                  }}
                >
                  <CardContent>
                    <h2
                      className="text-center mt-2 "
                      style={{
                        fontSize: "40px",
                        fontWeight: "600",
                        lineHeight: "48px",
                      }}
                    >
                      Finance
                    </h2>
                    <hr />
                    {questions?.Finance.slice(0, 2).map((item, index) => {
                      const question = item.question;
                      const answer = finance[index]?.answer;

                      return (
                        <div className="m-3" key={item.id}>
                          <h6>
                            {index + 1}:&nbsp;{question}
                          </h6>
                          <span className="my-1 mx-2">
                            <input
                              type="radio"
                              name={item.id}
                              value="Yes"
                              required
                              checked={answer === "Yes"}
                              onChange={(event) => {
                                const updatedFinance = [...finance];
                                updatedFinance[index].answer =
                                  event.target.value;
                                setFinance(updatedFinance);
                              }}
                            />{" "}
                            Yes
                          </span>
                          <span className="my-1 mx-2">
                            <input
                              type="radio"
                              name={item.id}
                              value="No"
                              required
                              checked={answer === "No"}
                              onChange={(event) => {
                                const updatedFinance = [...finance];
                                updatedFinance[index].answer =
                                  event.target.value;
                                setFinance(updatedFinance);
                              }}
                            />{" "}
                            No
                          </span>
                        </div>
                      );
                    })}
                    <div className="m-3">
                      <h6>3:&nbsp;{questions?.Finance[2]?.question}</h6>
                      <Box sx={{ width: 200 }} className="mx-4">
                        <Slider
                          aria-label="Restricted values"
                          value={finance[2]?.answer}
                          valueLabelFormat={valueLabelFormat}
                          getAriaValueText={valuetext}
                          step={null}
                          valueLabelDisplay="auto"
                          marks={marks}
                          onChange={(event, newValue) => {
                            const updatedFinance = [...finance];
                            updatedFinance[2].answer = newValue;
                            setFinance(updatedFinance);
                          }}
                        />
                      </Box>
                    </div>
                  </CardContent>
                </Card>
                <Card
                  className="shadow"
                  style={{
                    minWidth: 275,
                    backgroundColor: "white",
                    borderRadius: 18,
                    border: "1px solid #e1d6d6",
                    marginTop: 15,
                  }}
                >
                  <CardContent>
                    <h2
                      className="text-center mt-2 "
                      style={{
                        fontSize: "40px",
                        fontWeight: "600",
                        lineHeight: "48px",
                      }}
                    >
                      Administration
                    </h2>
                    <hr />
                    {questions?.Administration.slice(0, 2).map(
                      (item, index) => {
                        const question = item.question;
                        const answer = administration[index]?.answer;

                        return (
                          <div className="m-3" key={item.id}>
                            <h6>
                              {index + 1}:&nbsp;{question}
                            </h6>
                            <span className="my-1 mx-2">
                              <input
                                type="radio"
                                name={item.id}
                                value="Yes"
                                required
                                checked={answer === "Yes"}
                                onChange={(event) => {
                                  const updatedAdministration = [
                                    ...administration,
                                  ];
                                  updatedAdministration[index].answer =
                                    event.target.value;
                                  setAdministration(updatedAdministration);
                                }}
                              />{" "}
                              Yes
                            </span>
                            <span className="my-1 mx-2">
                              <input
                                type="radio"
                                name={item.id}
                                value="No"
                                required
                                checked={answer === "No"}
                                onChange={(event) => {
                                  const updatedAdministration = [
                                    ...administration,
                                  ];
                                  updatedAdministration[index].answer =
                                    event.target.value;
                                  setAdministration(updatedAdministration);
                                }}
                              />{" "}
                              No
                            </span>
                          </div>
                        );
                      }
                    )}
                    <div className="m-3">
                      <h6>3:&nbsp;{questions?.Administration[2]?.question}</h6>
                      <Box sx={{ width: 200 }} className="mx-4">
                        <Slider
                          aria-label="Restricted values"
                          value={administration[2]?.answer}
                          valueLabelFormat={valueLabelFormat}
                          getAriaValueText={valuetext}
                          step={null}
                          valueLabelDisplay="auto"
                          marks={marks}
                          onChange={(event, newValue) => {
                            const updatedAdministration = [...administration];
                            updatedAdministration[2].answer = newValue;
                            setAdministration(updatedAdministration);
                          }}
                        />
                      </Box>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
            {activeStep === 6 && (
              <>
                <Card
                  className="shadow"
                  style={{
                    minWidth: 275,
                    backgroundColor: "white",
                    borderRadius: 18,
                    border: "1px solid #e1d6d6",
                    marginTop: 15,
                  }}
                >
                  <CardContent>
                    <h2
                      className="text-center mt-2 "
                      style={{
                        fontSize: "40px",
                        fontWeight: "600",
                        lineHeight: "48px",
                      }}
                    >
                      Feedback
                    </h2>
                    <hr />
                    {questions?.feedback.map((item, index) => {
                      const feedbackItem = feedback.find(
                        (feedbackItem) => feedbackItem.question_id === item.id
                      );
                      return (
                        <div className="m-3" key={item.id}>
                          <h6>{item.question}</h6>
                          <Input
                            type="textarea"
                            rows={4}
                            required
                            value={feedbackItem?.answer}
                            onChange={(event) => {
                              const updatedFeedback = [feedback];
                              updatedFeedback[index] = {
                                reg_no: token?.username, // Add the desired value for reg_no
                                question_id: item.id,
                                answer: event.target.value,
                              };
                              setFeedback(updatedFeedback);
                            }}
                          />
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              </>
            )}
            <Row className="my-3 mx-2">
              <Col
                md={6}
                sm={6}
                className="d-flex justify-content-center mt-sm-0 mt-3"
              >
                <Button
                  disabled={activeStep < 1 ? true : false}
                  variant="contained"
                  className="bg-site-primary"
                  onClick={(e) => {
                    setActiveStep((curr) => curr - 1);
                  }}
                >
                  Previous
                </Button>
              </Col>
              <Col
                md={6}
                sm={6}
                className="d-flex justify-content-center mt-sm-0 mt-3"
              >
                <Button
                  variant="contained"
                  type="submit"
                  className="bg-site-primary"
                >
                  {loading ? (
                    <Spinner size="sm" />
                  ) : activeStep < 6 ? (
                    "Next"
                  ) : (
                    "Submit"
                  )}
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

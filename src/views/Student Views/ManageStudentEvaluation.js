import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import {
  Col,
  Container,
  Row,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "reactstrap";
import {
  getAssessmentQuestions,
  markEvaluation,
} from "../../store/actions/assessmentAction";
export default function ManageAssessment() {
  const location = useLocation();
  const { token } = useSelector((state) => state.authUser);
  const data = location.state;
  const dispatch = useDispatch();
  const history = useHistory();
  const { questions } = useSelector((state) => state.assessment);
  console.log(questions,'questions')
  const [questionss, setQuestionss] = useState([]);
  const options = ["Excellent", "Good", "Average", "Poor"];
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [answerss, setAnswer] = useState({});
  const [submit, setSubmit] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    if (answers.length != questionss.length) {
      alert("Please complete the assessment");
    } else {
      dispatch(markEvaluation(submit, history));
    }
  };
  const handleOptionChange = (questionId, optionValue) => {
    const answerMap = {
      Excellent: 4,
      Good: 3,
      Average: 2,
      Poor: 1,
    };
    const answer = answerMap[optionValue];
    const questionIndex = answers.findIndex((q) => q.questionId === questionId);
    const updatedAnswers = [...answers];
    if (questionIndex !== -1) {
      updatedAnswers[questionIndex].answer = answer;
    } else {
      updatedAnswers.push({ questionId, answer });
    }
    setAnswers(updatedAnswers);

    setAnswer({
      ...answerss,
      [questionId]: optionValue,
    });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const renderQuestionPage = (pageNumber) => {
    const startIndex = pageNumber * 5;
    const endIndex = startIndex + 5;
    const currentPageQuestions = questions.slice(startIndex, endIndex);
    return (
      <Container>
        <Row>
          <Col>
            <Card className="my-3">
              <CardHeader>
                <h6 className="d-inline-block">Student Feedback</h6>
                <h6 className="float-right">
                  {answers.length}&nbsp;Out of&nbsp;{questionss.length}
                </h6>
              </CardHeader>
              {currentPageQuestions.map((questions) => {
                return (
                  <CardBody key={questions.id}>
                    <h6>{questions.question}</h6>
                    {options.map((option) => (
                      <label key={option}>
                        <input
                          className=" mx-2 text-success"
                          type="radio"
                          required={true}
                          name={`question${questions.id}`}
                          value={option}
                          checked={answerss[questions.id] === option}
                          onChange={() =>
                            handleOptionChange(questions.id, option)
                          }
                        />
                        {option}
                      </label>
                    ))}
                  </CardBody>
                );
              })}
              <CardFooter>
                {pageNumber > 0 && (
                  <Button
                    className=" bg-site-primary"
                    onClick={() => handlePageChange(pageNumber - 1)}
                  >
                    Previous
                  </Button>
                )}
                {pageNumber === Math.ceil(questions.length / 5) - 1 && (
                  <Button
                    className="float-right bg-site-primary"
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                )}
                {pageNumber < Math.ceil(questions.length / 5) - 1 && (
                  <Button
                    className="float-right bg-site-primary"
                    onClick={() => handlePageChange(pageNumber + 1)}
                  >
                    Next
                  </Button>
                )}
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  };
  useEffect(() => {
    if (answers.length == questionss.length) {
      let tempdata = {};
      tempdata = {
        allocationId: data.id,
        reg_no: token?.username,
        evaluationAnswers: answers,
      };
      console.log(answers,'answers')
      setSubmit(tempdata);
    }
  }, [answers]);
  useEffect(() => {
    setQuestionss(questions);
  }, [questions]);
  useEffect(() => {
    dispatch(getAssessmentQuestions(data?.id));
  }, [data]);
  return (
    <>
      <Container fluid>
        <Row>
          <Col sm="12" md="6" lg="8">
            <h4 className="d-none d-md-block m-0 font-weight-bold mx-4 ">
              Start Evaluation
            </h4>
          </Col>
          <Col sm="12" md="6" lg="4">
            <div className="">
              <h5 className="d-inline-block">Feedback To:</h5>
              <span className="mx-4">{data.teacherName}</span>
            </div>
            <div className="">
              <h5 className="d-inline-block">Course Name:</h5>
              <span className="mx-3">{data.courseName}</span>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>{renderQuestionPage(currentPage)}</Col>
        </Row>
      </Container>
    </>
  );
}

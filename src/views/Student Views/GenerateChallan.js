import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
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
  Row,
  Spinner,
} from "reactstrap";
import { generateChallan, getFeeDetail } from "../../store/actions/feeAction";

export default function GenerateChallan() {
  const history = useHistory()
  const location = useLocation();
  let data = location.state;
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.authUser);
  const { challan, challanloading,feeDetail } = useSelector((state) => state.fee);
  const [challanGenerated, setChallanGenerated] = useState(false);
  const [challanLink, setChallanLink] = useState("");
  const [numInstallments, setNumInstallments] = useState("");
  const [installments, setInstallments] = useState([]);
  function generateInstallments(totalFee, numInstallments) {
    let installments = [];
    if (numInstallments === 1) {
      // Only one installment, set it to the total fee
      installments.push({ installment: "1st installment", fee: totalFee });
    } else if (numInstallments === 2) {
      // Two installments, first is 60% of the total fee, second is 40%
      const firstInstallment = Math.round(totalFee * 0.6);
      const secondInstallment = totalFee - firstInstallment;
      installments.push(
        { installment: "1st installment", fee: firstInstallment },
        { installment: "2nd installment", fee: secondInstallment }
      );
    } else if (numInstallments === 3) {
      // Three installments, first is 60% of the total fee, second and third are 20% each
      const firstInstallment = Math.round(totalFee * 0.6);
      const remainingFee = totalFee - firstInstallment;
      const remainingInstallments = Math.round(remainingFee / 2);
      installments.push(
        { installment: "1st installment", fee: firstInstallment },
        { installment: "2nd installment", fee: remainingInstallments },
        { installment: "3rd installment", fee: remainingInstallments }
      );
    } else {
      // Unsupported number of installments
      throw new Error("Unsupported number of installments.");
    }
    // Make sure the installments add up to the total fee
    const sum = installments.reduce((a, b) => a + b.fee, 0);
    if (sum !== totalFee) {
      const diff = totalFee - sum;
      installments[installments.length - 1].fee += diff;
    }
    return installments;
  }
  function handleNumInstallmentsChange(event) {
    const newNumInstallments = parseInt(event.target.value, 10);
    setNumInstallments(newNumInstallments);
    setInstallments(generateInstallments(data.totalAmount, newNumInstallments));
  }
  const handleGenerateChallan = () => {
    const newArray = installments.map((item) => item.fee);
    const obj = {
      regNo: token?.username,
      installmentAmount: newArray,
      admissionFee: data.addmissionFee,
      extraCourseFee: data.extraCourseFee,
      otherFee: data.otherFee,
      semesterFee: data.semesterFee,
    };
    dispatch(generateChallan(obj,history));
    setInstallments([]);
  };
  // const handleDownloadChallan = () => {
  //   window.open(challanLink);
  //   history.push({
  //     pathname: `/student/fee`
  //   })
  // };
  // useEffect(() => {
  //   if (challan != null) {
  //     setChallanLink(`https://localhost:44374/ChallanFiles/${challan}`);
  //     setChallanGenerated(true);
  //   }
  // }, [challan]);
  useEffect(() => {
    dispatch(getFeeDetail(token?.username));
  }, []);
  return (
    <>
      <h4 className="d-none d-md-block m-0 font-weight-bold mx-3">
        Generate Challan Form
      </h4>
      <Container>
        <Row className="my-4">
          <Col>
          {feeDetail.isChallanGenerated ==false? (
            <Card className="shadow">
            <CardHeader>
              Choose your installments and generate your challan form:
            </CardHeader>
            <CardBody>
              <FormControl
                sx={{ m: 1, minWidth: 150, display: "block" }}
                size="small"
              >
                <InputLabel id="demo-select-small">
                  No of Installment
                </InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  label="No of Installment"
                  style={{width:"200px"}}
                  required
                  value={numInstallments}
                  onChange={handleNumInstallmentsChange}
                >
                  <MenuItem value="1">One Installment</MenuItem>
                  <MenuItem value="2">Two Installment</MenuItem>
                  <MenuItem value="3">Three Installment</MenuItem>
                </Select>
              </FormControl>
              {installments ? (
                <>
                  {installments.map((item) => {
                    return (
                      <>
                        <div className="d-flex mx-3">
                          <FormControl>
                            <Label>{item.installment}:</Label>
                            <Input
                              type="text"
                              disabled={true}
                              value={item.fee}
                            ></Input>
                          </FormControl>
                        </div>
                      </>
                    );
                  })}
                </>
              ) : (
                ""
              )}
              {/* {!feeDetail.isChallanGenerated && (
                <> */}
              {/* {!challanGenerated && ( */}
                <Button
                  className="bg-site-primary my-4 mx-3"
                  type="submit"
                  disabled={numInstallments === "" ? true : false}
                  onClick={handleGenerateChallan}
                >
                  {challanloading ? (
                    <Spinner size="sm" />
                  ) : (
                    "Generate Challan"
                  )}
                </Button>
              {/* )} */}
              {/* </>
              )} */}
              {/* {challanGenerated && (
                <Button
                  className="bg-site-primary my-4 mx-3"
                  type="submit"
                  onClick={handleDownloadChallan}
                >
                  Download Challan
                </Button>
              )} */}
            </CardBody>
          </Card>
          )
          :(<Card>
            <CardHeader></CardHeader>
            <CardBody><p className="text-danger text-center">Already Challan Generated</p></CardBody>
            <CardFooter></CardFooter>
          </Card>)
          }
            
          </Col>
        </Row>
      </Container>
    </>
  );
}

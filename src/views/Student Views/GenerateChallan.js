// import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useHistory, useLocation } from "react-router-dom";
// import {
//   Button,
//   Card,
//   CardBody,
//   CardFooter,
//   CardHeader,
//   Col,
//   Container,
//   Input,
//   Label,
//   Row,
//   Spinner,
// } from "reactstrap";
// import { generateChallan, getFeeDetail } from "../../store/actions/feeAction";

// export default function GenerateChallan() {
//   const history = useHistory();
//   const location = useLocation();
//   let data = location.state;
//   const dispatch = useDispatch();
//   const { token } = useSelector((state) => state.authUser);
//   const {  challanloading, feeDetail } = useSelector(
//     (state) => state.fee
//   );
//   const [numInstallments, setNumInstallments] = useState("");
//   const [installments, setInstallments] = useState([]);
//   function generateInstallments(totalFee, numInstallments) {
//     let installments = [];
//     if (numInstallments === 1) {
//       // Only one installment, set it to the total fee
//       installments.push({ installment: "1st installment", fee: totalFee });
//     } else if (numInstallments === 2) {
//       // Two installments, first is 60% of the total fee, second is 40%
//       const firstInstallment = Math.round(totalFee * 0.6);
//       const secondInstallment = totalFee - firstInstallment;
//       installments.push(
//         { installment: "1st installment", fee: firstInstallment },
//         { installment: "2nd installment", fee: secondInstallment }
//       );
//     } else if (numInstallments === 3) {
//       // Three installments, first is 60% of the total fee, second and third are 20% each
//       const firstInstallment = Math.round(totalFee * 0.6);
//       const remainingFee = totalFee - firstInstallment;
//       const remainingInstallments = Math.round(remainingFee / 2);
//       installments.push(
//         { installment: "1st installment", fee: firstInstallment },
//         { installment: "2nd installment", fee: remainingInstallments },
//         { installment: "3rd installment", fee: remainingInstallments }
//       );
//     } else {
//       // Unsupported number of installments
//       throw new Error("Unsupported number of installments.");
//     }
//     // Make sure the installments add up to the total fee
//     const sum = installments.reduce((a, b) => a + b.fee, 0);
//     if (sum !== totalFee) {
//       const diff = totalFee - sum;
//       installments[installments.length - 1].fee += diff;
//     }
//     return installments;
//   }
//   function handleNumInstallmentsChange(event) {
//     const newNumInstallments = parseInt(event.target.value, 10);
//     setNumInstallments(newNumInstallments);
//     setInstallments(generateInstallments(data.totalAmount, newNumInstallments));
//   }
//   const handleGenerateChallan = () => {
//     const newArray = installments.map((item) => item.fee);
//     const obj = {
//       regNo: token?.username,
//       installmentAmount: newArray,
//       admissionFee: data.addmissionFee,
//       extraCourseFee: data.extraCourseFee,
//       otherFee: data.otherFee,
//       semesterFee: data.semesterFee,
//     };
//     dispatch(generateChallan(obj, history));
//     setInstallments([]);
//   };
//   useEffect(() => {
//     dispatch(getFeeDetail(token?.username));
//   }, []);
//   return (
//     <>
//       <h4 className="d-block d-md-block m-0 font-weight-bold mx-3">
//       <Link className="text-dark" to="/student/fee_detail">
//             <i class="fas fa-arrow-alt-circle-left"></i>
//           </Link>
//           &nbsp;Generate Challan Form
//       </h4>
//       <Container>
//         <Row className="my-4">
//           <Col>
//             {feeDetail.isChallanGenerated == false ? (
//               <Card className="shadow">
//                 <CardHeader>
//                   Choose your installments and generate your challan form:
//                 </CardHeader>
//                 <CardBody>
//                   <FormControl
//                     sx={{ m: 1, minWidth: 150, display: "block" }}
//                     size="small"
//                   >
//                     <InputLabel id="demo-select-small">
//                       No of Installment
//                     </InputLabel>
//                     <Select
//                       labelId="demo-select-small"
//                       id="demo-select-small"
//                       label="No of Installment"
//                       style={{ width: "200px" }}
//                       required
//                       value={numInstallments}
//                       onChange={handleNumInstallmentsChange}
//                     >
//                       <MenuItem value="1">One Installment</MenuItem>
//                       <MenuItem value="2">Two Installment</MenuItem>
//                       <MenuItem value="3">Three Installment</MenuItem>
//                     </Select>
//                   </FormControl>
//                   {installments ? (
//                     <>
//                       {installments.map((item) => {
//                         return (
//                           <>
//                             <div className="d-flex mx-3">
//                               <FormControl>
//                                 <Label>{item.installment}:</Label>
//                                 <Input
//                                   type="text"
//                                   disabled={true}
//                                   value={item.fee}
//                                 ></Input>
//                               </FormControl>
//                             </div>
//                           </>
//                         );
//                       })}
//                     </>
//                   ) : (
//                     ""
//                   )}
//                   <Button
//                     className="bg-site-primary my-4 mx-3"
//                     type="submit"
//                     disabled={numInstallments === "" ? true : false}
//                     onClick={handleGenerateChallan}
//                   >
//                     {challanloading ? (
//                       <Spinner size="sm" />
//                     ) : (
//                       "Generate Challan"
//                     )}
//                   </Button>
//                 </CardBody>
//               </Card>
//             ) : (
//               <Card>
//                 <CardHeader></CardHeader>
//                 <CardBody>
//                   <p className="text-danger text-center">
//                     Already Challan Generated
//                   </p>
//                 </CardBody>
//                 <CardFooter></CardFooter>
//               </Card>
//             )}
//           </Col>
//         </Row>
//       </Container>
//     </>
//   );
// }
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Container,
  Form,
  Input,
  Label,
  Row,
  Spinner,
} from "reactstrap";
import { generateChallan, getFeeDetail, requestInstallments } from "../../store/actions/feeAction";
import { toast } from "react-toastify";
export default function GenerateChallan() {
  const history = useHistory();
  const location = useLocation();
  let data = location.state;
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.authUser);
  const { challanloading, feeDetail } = useSelector((state) => state.fee);
  const [numInstallments, setNumInstallments] = useState("");
  const [installments, setInstallments] = useState([]);
  const [installmentValues, setInstallmentValues] = useState([]);
  const [pendingFee, setPendingFee] = useState("");
  console.log(pendingFee,'pendingFee')
  function generateInstallments(totalFee, numInstallments) {
    let installments = [];
    if (numInstallments === 1) {
      installments.push({ installment: "1st installment", fee: totalFee });
    } else if (numInstallments === 2) {
      const firstInstallment = Math.round(totalFee * 0.6);
      const secondInstallment = totalFee - firstInstallment;
      installments.push(
        { installment: "1st installment", fee: firstInstallment },
        { installment: "2nd installment", fee: secondInstallment }
      );
    } else if (numInstallments === 3) {
      const firstInstallment = Math.round(totalFee * 0.6);
      const remainingFee = totalFee - firstInstallment;
      const remainingInstallments = Math.round(remainingFee / 2);
      installments.push(
        { installment: "1st installment", fee: firstInstallment },
        { installment: "2nd installment", fee: remainingInstallments },
        { installment: "3rd installment", fee: remainingInstallments }
      );
    } else {
      throw new Error("Unsupported number of installments.");
    }
    const sum = installments.reduce((a, b) => a + b.fee, 0);
    if (sum !== totalFee) {
      const diff = totalFee - sum;
      installments[installments.length - 1].fee += diff;
    }
    return installments;

  }
  const handleNumInstallmentsChange = (event) => {
    const newNumInstallments = parseInt(event.target.value, 10);
    setNumInstallments(newNumInstallments);
    setInstallments(generateInstallments(data.totalAmount, newNumInstallments));
    setInstallmentValues([]);
  };
  function handleInstallmentChange(index, value) {
    const updatedValues = [...installmentValues];
    updatedValues[index] = value;
    console.log(updatedValues,'updatedValues')
    setInstallmentValues(updatedValues);
    const pending = data.totalAmount - updatedValues.reduce((a, b) => Number(a) + Number(b), 0);
    setPendingFee(pending);
  }
  useEffect(() => {
    dispatch(getFeeDetail(token?.username));
  }, []);

  return (
    <>
      <h4 className="d-block d-md-block m-0 font-weight-bold mx-3">
        <Link className="text-dark" to="/student/fee_detail">
          <i className="fas fa-arrow-alt-circle-left"></i>
        </Link>
        &nbsp;Generate Challan Form
      </h4>
      <Container>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            const newArray = installments.map((item) => item.fee);
            const obj = {
              regNo: token?.username,
              installmentAmount: newArray,
              admissionFee: data.addmissionFee,
              extraCourseFee: data.extraCourseFee,
              otherFee: data.otherFee,
              semesterFee: data.semesterFee,
            };
            const updatedValues = [...installmentValues];
            updatedValues[numInstallments - 1] = pendingFee;
            const obj1 = {
              regNo: token?.username,
              installmentAmount: updatedValues,
              admissionFee: data.addmissionFee,
              extraCourseFee: data.extraCourseFee,
              otherFee: data.otherFee,
              semesterFee: data.semesterFee,
            };
            if (numInstallments === 1) {
              dispatch(generateChallan(obj, ()=>{
                history.push({
                  pathname: `/student/fee_detail`
                })
              }));
              setInstallmentValues([]);
            } else {
              if(pendingFee<1||pendingFee==0){
                  toast.error("Please enter the valid installments")
              }else{
                dispatch(requestInstallments(obj1, ()=>{
                  history.push({
                    pathname: `/student/fee_detail`
                  })
                }));
                setInstallmentValues([]);
              }
             
            }
          }}
        >
          <Row className="my-4">
            <Col>
              {feeDetail.status === "pending" ? (
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
                        No of Installments
                      </InputLabel>
                      <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        label="No of Installments"
                        style={{ width: "200px" }}
                        value={numInstallments}
                        onChange={handleNumInstallmentsChange}
                      >
                        <MenuItem value="1">One Installment</MenuItem>
                        <MenuItem value="2">Two Installments</MenuItem>
                        <MenuItem value="3">Three Installments</MenuItem>
                      </Select>
                    </FormControl>
                    {installments.length > 0 && (
                      <>
                        {installments.map((item, index) => (
                          <div className="d-flex mx-3" key={index}>
                            <FormControl>
                              <Label>{item.installment}:</Label>
                              <Input
                                type="number"
                                required
                                disabled={
                                  numInstallments === 1 ||
                                  index === installments.length - 1
                                }
                                value={
                                  numInstallments === 1
                                    ? data.totalAmount
                                    : index === numInstallments - 1
                                    ? data.totalAmount -
                                      installmentValues.reduce(
                                        (a, b) => Number(a) + Number(b),
                                        0
                                      )
                                    : installmentValues[index] || ""
                                }
                                onChange={(e) =>
                                  handleInstallmentChange(index, e.target.value)
                                }
                              />
                            </FormControl>
                          </div>
                        ))}
                      </>
                    )}
                    {numInstallments === 1 ? (
                      <Button
                        className="bg-site-primary my-4 mx-3"
                        type="submit"
                        disabled={numInstallments === ""}
                        
                      >
                        {challanloading ? (
                          <Spinner size="sm" />
                        ) : (
                          "Generate Challan"
                        )}
                      </Button>
                    ) : (
                      numInstallments > 1 && (
                        <>
                          <Button
                            className="bg-site-primary my-4 mx-3"
                            type="submit"
                            disabled={numInstallments === ""}
                           
                          >
                            {challanloading ? (
                              <Spinner size="sm" />
                            ) : (
                              "Request Installments"
                            )}
                          </Button>
                        </>
                      )
                    )}
                  </CardBody>
                  <CardFooter>
                    <span>
                      <i className="fa fa-exclamation-circle mr-1"></i>
                      <strong>Note:</strong> You can only generate/installment
                      the challan once. After the generation/installment of the
                      challan, you will not be able to make any changes.
                    </span>
                  </CardFooter>
                </Card>
              ) : (
                <Card className="shadow">
                  <CardBody>
                    <h5>
                      Your challan form has been generated. Please proceed to
                      the payment process.
                    </h5>
                    <Button
                      className="bg-site-primary my-4 mx-3"
                      type="submit"
                      onClick={() => history.push("/student/challan_form")}
                    >
                      Proceed to Payment
                    </Button>
                  </CardBody>
                </Card>
              )}
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
}

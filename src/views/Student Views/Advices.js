import React, { useEffect } from "react";
import emptyFolder from "../../assets/img/emptyFolder.jpg";
import { useDispatch, useSelector } from "react-redux";
import { getAdvices } from "../../store/actions/courseAdvisorAction";
import { Card, CardBody, CardHeader, Col, Container, Input, Label, Row } from "reactstrap";
import { Image } from "react-bootstrap";
export default function Advices() {
  const dispatch = useDispatch();
  const { loading, advicesList } = useSelector((state) => state.courseAdvisor);
  //console.log(advicesList, "advicesList");
  const { token } = useSelector((state) => state.authUser);
  useEffect(() => {
    dispatch(getAdvices(token?.username));
  }, [token]);
  return (
    <Container fluid>
      <Row>
        {advicesList.length == 0 ? (
          <Col lg={12}>
            <Card className="shadow">
              {/* <CardHeader>Fine Details</CardHeader> */}
              <CardBody>
                <div className=" d-flex justify-content-center align-items-center">
                  <Image
                    src={emptyFolder}
                    alt="Batch"
                    height={140}
                    width={140}
                    className="mx-1 cursor-pointer rounded-circle"
                  />
                </div>
                <h5 className="text-center my-3">Yet Advices folder empty</h5>
              </CardBody>
            </Card>
          </Col>
        ) : (
          <>
            {advicesList.map((item) => {
              return (
                <Col md={4} sm={12}>
                  <Card className="shadow">
                    <CardHeader>Advices from Course advisor</CardHeader>
                    <CardBody>
                      <Label>Advisor</Label>
                      <Input value={item.name} disabled={true} className="bg-light"></Input>
                      <Label className="my-1">Advise</Label>
                      <Input
                        value={item.advise}
                        type="textarea"
                        disabled={true}
                        className="bg-light"
                        rows={Math.ceil(item?.advise.length / 30)}
                      ></Input>
                    </CardBody>
                  </Card>
                </Col>
              );
            })}
          </>
        )}
      </Row>
    </Container>
  );
}

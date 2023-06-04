import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Card, CardBody, Col, Container, Row } from "reactstrap";
import { GetChilds } from "../../store/actions/authAction";
import users from "../../assets/img/user.png";
import LoadingOverlay from "react-loading-overlay";
export default function Dashboard() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { token, childs, loading } = useSelector((state) => state.authUser);
  console.log(childs, "childs");
  const student = [
    {
      username: "2019-Arid-2951",
      name: "Aqib Siddique",
    },
  ];
  useEffect(() => {
    dispatch(GetChilds(token?.username));
  }, [token]);
  return (
    <Container fluid>
      <LoadingOverlay active={loading} spinner text="Children Loading....">
        <Row>
          {childs?.map((item) => {
            return (
              <Col lg={4}>
                <Card className="my-1 shadow">
                  <CardBody className="d-flex align-items-center justify-content-center flex-column">
                    <img
                      className=" d-flex justify-content-center align-items-center border rounded-circle  bg-light"
                      src={
                        item?.profile_photo
                          ? `https://localhost:44374/AttendanceImages/${item?.profile_photo}`
                          : users
                      }
                      style={{
                        fontSize: "50px",
                        width: "130px",
                        height: "130px",
                      }}
                    ></img>
                    <h4 className=" my-2">{item.name}</h4>
                    <p className=" my-2 text-center">
                      View your child academic detail <br /> and manage fee
                    </p>
                    <Button
                      className="bg-site-success px-4"
                      onClick={() =>
                        history.push({
                          pathname: `/parent/view-information/${item.reg_no}`,
                          state: item.reg_no,
                        })
                      }
                    >
                      <i className="fas fa-eye mx-1"></i>View information
                    </Button>
                  </CardBody>
                </Card>
              </Col>
            );
          })}
        </Row>
      </LoadingOverlay>
    </Container>
  );
}

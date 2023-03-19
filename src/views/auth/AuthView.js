import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Input, Button, Spinner } from "reactstrap";
import {
  Link,
  Redirect,
  Route,
  useHistory,
  useLocation,
} from "react-router-dom";
import loginBatch from "../../assets/img/Login-Batch.png";
import Image from "react-bootstrap/Image";
import logo from "../../assets/img/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { getEnrollmentStatus, login } from "../../store/actions/authAction";
import { ToastContainer } from "react-toastify";
const AuthView = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isAuthenticated, token ,loading,status} = useSelector(
    (state) => state.authUser
  );
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(login(username, password));
  };
  useEffect(() => {
    if (isAuthenticated) {
      if (token?.role == "student") {
        dispatch(getEnrollmentStatus(token?.username))
          history.push("/student/dashboard");
      }
       else if (token?.role == "teacher") {
        history.push("/teacher/dashboard");
      } else {
        history.push("/admin/assistantrequest");
      }
    }
  }, [token, isAuthenticated]);
  return (
    <Container fluid className="Auth-container vh-100">
      <Row>
        <Col md="6" lg={6} sm="12" className="side-batch">
          <div className="d-flex justify-content-center">
            <Image
              src={loginBatch}
              alt="Batch"
              className="d-block img-fluid  img-batch"
            />
          </div>
        </Col>
        <Col sm="12" md="6" lg={4} className="form my-4">
          <div className="card-main card shadow-lg login__rounded p-5 h-100">
            <div className="d-flex justify-content-center">
              <Image
                src={logo}
                alt="Batch"
                height={100}
                className="img-fluid logo "
              />
            </div>
            <Form onSubmit={handleSubmit}>
              <div className="my-4">
                <div className="col-auto">
                  <div className="input-group mb-2">
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <i className="fas fa-address-book text-success"></i>
                      </div>
                    </div>
                    <Input
                      required
                      placeholder="Username"
                      id="formControlLg"
                      type="text"
                      size="lg"
                      value={username}
                      onChange={(e) => {
                        handleUsernameChange(e);
                      }}
                    />
                  </div>
                </div>
                <div className="paswordOuter">
                  <div className="col-auto mt-4">
                    <div className="input-group mb-2">
                      <div className="input-group-prepend">
                        <div className="input-group-text">
                          <i className="fa fa-unlock-alt text-success"></i>
                        </div>
                      </div>
                      <Input
                        required
                        placeholder="Password"
                        id="formControlLg"
                        type="password"
                        size="lg"
                        value={password}
                        onChange={(e) => {
                          handlePasswordChange(e);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="text-center text-md-start mt-4 pt-2">
                  {/* <Link to={"/teacher/dashboard"}> */}
                  <Button
                    type="submit"
                    className="btn-success mb-0 px-5"
                    size="lg"
                    disabled={loading}
                  >
                    {loading ? <Spinner size="sm" /> : "Login"}
                    <ToastContainer />
                  </Button>
                  {/* </Link> */}
                </div>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AuthView;

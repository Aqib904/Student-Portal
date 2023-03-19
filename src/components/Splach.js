import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { BookLoader } from "react-awesome-loaders";
import { Redirect } from "react-router-dom";
export default function Splach() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 4000);
  }, []);
  return (
    <>
      {isLoading ? (
        <Container fluid className="splach-main vh-100">
          <Row>
            <Col>
              <BookLoader
                background={"linear-gradient(135deg, #469c4b, #469c4b)"}
                desktopSize={"70px"}
                mobileSize={"80px"}
                textColor={"#469c4b"}
                isLoading={isLoading}
                className="d-flex justify-content-center align-items-center loader"
              />
            </Col>
          </Row>
        </Container>
      ) : (
        <Redirect to="/auth_login/" />
      )}
    </>
  );
}

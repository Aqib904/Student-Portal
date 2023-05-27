import React from "react";
import { useSelector } from "react-redux";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Input,
  Label,
  Row,
} from "reactstrap";
import users from "../../assets/img/user.png";
import { Image } from "react-bootstrap";
export default function ParentSetting() {
  const { user } = useSelector((state) => state.authUser);
  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <CardHeader>Personal information</CardHeader>
            <CardBody className="d-flex justify-content-center align-items-center">
              <Card className="shadow w-50 m-3 p-3">
                <div className="d-flex justify-content-center align-items-center">
                  <Image
                    src={
                      user?.profile_photo
                        ? `https://localhost:44374/AttendanceImages/${user?.profile_photo}`
                        : users
                    }
                    alt="Batch"
                    height={80}
                    width={80}
                    className="img-fluid rounded-circle logo "
                  />
                </div>
                <hr/>
                <Label>Username</Label>
                <Input value={user?.username} type="text" disabled={true} className="bg-light"></Input>
                <Label>First name</Label>
                <Input value={user?.first_name} type="text" ></Input>
                <Label>Last name</Label>
                <Input value={user?.last_name} type="text"></Input>
              </Card>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

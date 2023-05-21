import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNoticeboard } from "../../store/actions/noticeboardAction";
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

export default function ViewNoticeBoard() {
  const dispatch = useDispatch();
  const { noticeboard, loading } = useSelector((state) => state.noticeboard);
  console.log(noticeboard, "noticeboard");
  const { token } = useSelector((state) => state.authUser);
  useEffect(() => {
    dispatch(getNoticeboard(token?.username));
  }, []);
  return (
    <Container fluid>
      <Row>
        {noticeboard.map((item) => {
          return (
            <Col md={4} sm={12}>
              <Card>
                <CardHeader>Date:&nbsp;{item.date}</CardHeader>
                <CardBody>
                  <Label>Notice from:</Label>
                  <Input value={item.author} disabled={true}></Input>
                  <Label className="my-1">Title:</Label>
                  <Input value={item.title} disabled={true}></Input>
                  <Label className="my-1">Description:</Label>
                  <Input
                    value={item.description}
                    type="textarea"
                    disabled={true}
                    rows={Math.ceil(item?.description.length / 30)}
                  ></Input>
                </CardBody>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNoticeboard } from "../../store/actions/noticeboardAction";
import emptyFolder from "../../assets/img/emptyFolder.jpg";
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
import { Image } from "react-bootstrap";

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
      {noticeboard.length == 0 ? (
          <Col lg={12} >
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
                <h5 className="text-center my-3">Yet noticeboard folder empty</h5>
              </CardBody>
            </Card>
          </Col>
        ) : (
          <>
        {noticeboard.map((item) => {
          return (
            <Col md={4} sm={12}>
              <Card className="shadow">
                <CardHeader>Date:&nbsp;{item.date}</CardHeader>
                <CardBody>
                  <Label>Notice from:</Label>
                  <Input value={item.author} disabled={true} className="bg-light"></Input>
                  <Label className="my-1">Title:</Label>
                  <Input value={item.title} disabled={true} className="bg-light"></Input>
                  <Label className="my-1">Description:</Label>
                  <Input
                    value={item.description}
                    type="textarea"
                    disabled={true}
                    className="bg-light"
                    rows={Math.ceil(item?.description.length / 30)}
                  ></Input>
                </CardBody>
              </Card>
            </Col>
          );
        })}
        </>)}
      </Row>
    </Container>
  );
}

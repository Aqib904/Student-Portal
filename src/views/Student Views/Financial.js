import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Container,
  Input,
  Row,
  Spinner,
} from "reactstrap";
import FinancialWall from "../../components/global/FinancialWall";
import { Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { requestFinancialAssistance } from "../../store/actions/financialAssistanceAction";
import { useHistory } from "react-router-dom";

export default function Financial() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { token } = useSelector((state) => state.authUser);
  const { requestloading } = useSelector((state) => state.financial);
  const [fileList, setFileList] = useState([]);
  const [description, setDescription] = useState("");
  return (
    <Container>
      <Row>
        <Col>
          <Card className="shadow">
            <CardHeader>
              <p className="d-inline-block my-2">
                Request For Financial Assistance
              </p>
              <Button
                className="bg-site-primary float-right d-inline-block"
                disabled={fileList.length==0||description==""?true:false}
                onClick={() => {
                  dispatch(
                    requestFinancialAssistance(
                      token?.username,
                      description,
                      fileList,
                      history
                    )
                  );
                }}
              >
                {requestloading ? <Spinner size="sm" /> : "Request now"}
              </Button>
            </CardHeader>
            <CardBody>
              <Stack spacing={1} ml={2}>
                <h5>Upload Photos</h5>
                <Typography variant="p" mr={2} fontWeight={500} fontSize={12}>
                  (Upload a minimum 3 photos )
                </Typography>
                <FinancialWall fileList={fileList} setFileList={setFileList} />
              </Stack>
              <Input
              className="my-3"
                type="textarea"
                required
                placeholder="Add reason..."
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              ></Input>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

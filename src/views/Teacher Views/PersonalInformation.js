import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Input, Label, Row } from "reactstrap";
import { getContestSetting, setContestSetting } from "../../store/actions/contestAction";

export default function PersonalInformation() {
  const dispatch = useDispatch();
  const { contestDay } = useSelector((state) => state.contest);
  const { token } = useSelector((state) => state.authUser);
  const [contestDays, setContestDays] = useState(0);
  const handleContestChange = (e) => {
    if (e.target.value >= 0) {
      setContestDays(e.target.value);
      dispatch(setContestSetting(token?.username,e.target.value))
    }
  };
  useEffect(()=>{
    setContestDays(contestDay)
  },[contestDay])
  useEffect(() => {
    dispatch(getContestSetting(token?.username));
  }, []);
  return (
    <Container>
      <Row>
        <Col>
          <h4>
            <i class="fas fa-cog"></i> Contest Setting
          </h4>
          <Label className="my-3">Allow Days students for contest</Label>
          <Input
            value={contestDays}
            onChange={(e) => {
              handleContestChange(e);
            }}
            type="number"
            min="0"
            className="w-25"
            placeholder="Days"
          ></Input>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          <h4 className="my-3">
            <i class="fas fa-user-cog"></i> Profile Setting
          </h4>
        </Col>
      </Row>
    </Container>
  );
}

import React,{useState} from 'react'
import { Col, Container, Input, Label, Row } from 'reactstrap'

export default function PersonalInformation() {
  const [contestDays,setContestDays] =useState(0)
  return (
  <Container>
    <Row>
      <Col>
      <h4><i class="fas fa-cog"></i>{" "}Contest Setting</h4>
      <Label className='my-3'>Allow students for contest</Label>
      <Input type="number" className='w-25' placeholder='Days'></Input>
      </Col>
    </Row>
    <hr/>
    <Row>
      <Col>
      <h4 className='my-3'><i class="fas fa-user-cog"></i>{" "}Profile Setting</h4>
      </Col>
    </Row>
  </Container>
  )
}

// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getNoticeboard } from "../../store/actions/noticeboardAction";
// import emptyFolder from "../../assets/img/emptyFolder.jpg";
// import {
//   Card,
//   CardBody,
//   CardHeader,
//   Col,
//   Container,
//   Input,
//   Label,
//   Row,
// } from "reactstrap";
// import { Image } from "react-bootstrap";

// export default function ViewNoticeBoard() {
//   const dispatch = useDispatch();
//   const { noticeboard, loading } = useSelector((state) => state.noticeboard);
//   console.log(noticeboard, "noticeboard");
//   const { token } = useSelector((state) => state.authUser);
//   useEffect(() => {
//     dispatch(getNoticeboard(token?.username));
//   }, []);
//   return (
//     <Container fluid>
//       <Row>
//       {noticeboard.length == 0 ? (
//           <Col lg={12} >
//             <Card className="shadow">
//               {/* <CardHeader>Fine Details</CardHeader> */}
//               <CardBody>
//                 <div className=" d-flex justify-content-center align-items-center">
//                 <Image
//                   src={emptyFolder}
//                   alt="Batch"
//                   height={140}
//                   width={140}
//                   className="mx-1 cursor-pointer rounded-circle"
//                 />
//                 </div>
//                 <h5 className="text-center my-3">Yet noticeboard folder empty</h5>
//               </CardBody>
//             </Card>
//           </Col>
//         ) : (
//           <>
//         {noticeboard.map((item) => {
//           return (
//             <Col md={4} sm={12}>
//               <Card className="shadow">
//                 <CardHeader>Date:&nbsp;{item.date}</CardHeader>
//                 <CardBody>
//                   <Label>Notice from:</Label>
//                   <Input value={item.author} disabled={true} className="bg-light"></Input>
//                   <Label className="my-1">Title:</Label>
//                   <Input value={item.title} disabled={true} className="bg-light"></Input>
//                   <Label className="my-1">Description:</Label>
//                   <Input
//                     value={item.description}
//                     type="textarea"
//                     disabled={true}
//                     className="bg-light"
//                     rows={Math.ceil(item?.description.length / 30)}
//                   ></Input>
//                 </CardBody>
//               </Card>
//             </Col>
//           );
//         })}
//         </>)}
//       </Row>
//     </Container>
//   );
// }
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getNoticeboard,
  pinNotice,
} from "../../store/actions/noticeboardAction";
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
import unpinIcon from "../../assets/img/gps.png";
export default function ViewNoticeBoard() {
  const dispatch = useDispatch();
  const { noticeboard, loading } = useSelector((state) => state.noticeboard);
  console.log(noticeboard, "noticeboard");
  const { token } = useSelector((state) => state.authUser);
  useEffect(() => {
    dispatch(getNoticeboard(token?.username));
  }, []);

  // const handlePin = (index) => {
  //   const pinnedNotice = { ...noticeboard[index], pinned: "pin" };
  //   let tempdata = [];
  //   tempdata.push(pinnedNotice);
  //   dispatch(pinNotice(token?.username, index, tempdata));
  // };
  const handlePin = (index) => {
    const pinnedNotice = { ...noticeboard[index], pinned: "pin" };
    const localStorageData = localStorage.getItem(token?.username);
    let tempdata = [];

    if (localStorageData) {
      const storedData = JSON.parse(localStorageData);
      tempdata = [...storedData];
    }
    tempdata.push(pinnedNotice);
    console.log(tempdata, "tempdata");
    dispatch(pinNotice(token?.username, index, tempdata));
  };

  const handleUnpin = (id) => {
    const localStorageData = localStorage.getItem(token?.username);
    let storedData = [];
    if (localStorageData) {
      storedData = JSON.parse(localStorageData);
    }
    const updatedData = storedData.filter((item) => item.id !== id);
    localStorage.setItem(token?.username, JSON.stringify(updatedData));
    dispatch(getNoticeboard(token?.username));
  };

  return (
    <Container fluid>
      <Row>
        {noticeboard?.length === 0 ? (
          <Col lg={12}>
            <Card className="shadow">
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
                <h5 className="text-center my-3">
                  Yet noticeboard folder empty
                </h5>
              </CardBody>
            </Card>
          </Col>
        ) : (
          <>
            {noticeboard?.map((item, index) => (
              <Col md={4} sm={12} key={index}>
                <Card className="shadow">
                  <CardHeader
                    className={`${
                      item?.pinned == "pin"
                        ? "bg-site-table"
                        : "bg-site-table-none"
                    }`}
                  >
                    <span>Date:&nbsp;{item?.date}</span>
                    {item?.pinned == "pin" ? (
                      <span
                        className="float-right "
                        style={{ cursor: "pointer" }}
                        onClick={() => handleUnpin(item.id)}
                      >
                        <Image
                          src={unpinIcon}
                          alt="Batch"
                          height={20}
                          width={20}
                          className="mx-1 cursor-pointer rounded-circle"
                        />
                      </span>
                    ) : (
                      <span
                        className="float-right"
                        style={{ cursor: "pointer" }}
                        onClick={() => handlePin(index)}
                      >
                        <i class="fas fa-thumbtack"></i>
                      </span>
                    )}
                  </CardHeader>
                  <CardBody>
                    <Label>Notice from:</Label>
                    <Input
                      value={item?.author}
                      disabled={true}
                      className="bg-light"
                    ></Input>
                    <Label className="my-1">Title:</Label>
                    <Input
                      value={item?.title}
                      disabled={true}
                      className="bg-light"
                    ></Input>
                    <Label className="my-1">Description:</Label>
                    <Input
                      value={item?.description}
                      type="textarea"
                      disabled={true}
                      className="bg-light"
                      rows={Math.ceil(item?.description?.length / 30)}
                    ></Input>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </>
        )}
      </Row>
    </Container>
  );
}

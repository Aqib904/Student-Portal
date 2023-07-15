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
import React, { useState, useEffect } from "react";
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
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
export default function ViewNoticeBoard() {
  const dispatch = useDispatch();
  const { noticeboard } = useSelector((state) => state.noticeboard);
  const [author, setAuthor] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState("All Notice");
  console.log(noticeboard, author, "noticeboard");
  const { token } = useSelector((state) => state.authUser);
  const [sortedNoticeboard, setSortedNoticeboard] = useState([]);
  console.log(sortedNoticeboard, "sorted");
  useEffect(() => {
    if (selectedAuthor == "All Notice") {
      const sortedArray = [...noticeboard].sort((a, b) => {
        // Sort by pinned status
        if (a.pinned && !b.pinned) {
          return -1;
        }
        if (!a.pinned && b.pinned) {
          return 1;
        }

        // Sort by date
        const dateA = new Date(a.date.split("-").reverse().join("-"));
        const dateB = new Date(b.date.split("-").reverse().join("-"));
        return dateB - dateA;
      });

      setSortedNoticeboard(sortedArray);
    }else if(selectedAuthor == "Pinned"){
      const filteredArray = noticeboard.filter(
        (item) => item?.pinned === selectedAuthor
      );

      const sortedArray = [...filteredArray].sort((a, b) => {
        // Sort by author
        // if (a.author < b.author) {
        //   return -1;
        // }
        // if (a.author > b.author) {
        //   return 1;
        // }

        // // Sort by pinned status
        // if (a.pinned && !b.pinned) {
        //   return -1;
        // }
        // if (!a.pinned && b.pinned) {
        //   return 1;
        // }

        // Sort by date
        const dateA = new Date(a.date.split("-").reverse().join("-"));
        const dateB = new Date(b.date.split("-").reverse().join("-"));
        return dateB - dateA;
      });

      setSortedNoticeboard(sortedArray);
    }
     else {
      const filteredArray = noticeboard.filter(
        (item) => item.author === selectedAuthor
      );

      const sortedArray = [...filteredArray].sort((a, b) => {
        // Sort by author
        if (a.author < b.author) {
          return -1;
        }
        if (a.author > b.author) {
          return 1;
        }

        // Sort by pinned status
        if (a.pinned && !b.pinned) {
          return -1;
        }
        if (!a.pinned && b.pinned) {
          return 1;
        }

        // Sort by date
        const dateA = new Date(a.date.split("-").reverse().join("-"));
        const dateB = new Date(b.date.split("-").reverse().join("-"));
        return dateB - dateA;
      });

      setSortedNoticeboard(sortedArray);
    }
  }, [noticeboard, selectedAuthor]);
  useEffect(() => {
    dispatch(getNoticeboard(token?.username));
  }, []);
  useEffect(() => {
    const authors = [...new Set(noticeboard.map((item) => item.author))];
    const updatedAuthors = ["All Notice","Pinned", ...authors];
    setAuthor(updatedAuthors);
  }, [noticeboard]);
  // const handlePin = (index) => {
  //   const pinnedNotice = { ...noticeboard[index], pinned: "pin" };
  //   let tempdata = [];
  //   tempdata.push(pinnedNotice);
  //   dispatch(pinNotice(token?.username, index, tempdata));
  // };
  // const handlePin = (index) => {
  //   console.log(index,'index>')
  //   const pinnedNotice = { ...noticeboard[index], isSeen: true, pinned: "Pinned" };
  //   const localStorageData = localStorage.getItem(token?.username);
  //   let tempdata = [];

  //   if (localStorageData) {
  //     const storedData = JSON.parse(localStorageData);
  //     tempdata = [...storedData];
  //   }
  //   tempdata.push(pinnedNotice);
  //   console.log(pinnedNotice,'pinned')
  //   //console.log(tempdata, "tempdata");
  //   dispatch(pinNotice(token?.username, index, tempdata));
  // };
  const handlePin = (id) => {
    const pinnedNotice = noticeboard.find((item) => item.id === id);
  
    if (pinnedNotice) {
      pinnedNotice.isSeen = true;
      pinnedNotice.pinned = "Pinned";
  
      const localStorageData = localStorage.getItem(token?.username);
      let tempdata = [];
  
      if (localStorageData) {
        const storedData = JSON.parse(localStorageData);
        tempdata = [...storedData];
      }
  
      tempdata.push(pinnedNotice);
  
      dispatch(pinNotice(token?.username, id, tempdata));
    }
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
        <Col>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small">Select Author</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              style={{ width: "150px" }}
              value={selectedAuthor}
              label="Select Author"
              onChange={(e) => {
                setSelectedAuthor(e.target.value);
              }}
              required
            >
              {author.map((item) => {
                return (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Col>
      </Row>
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
            {sortedNoticeboard?.map((item, index) => (
              <Col md={4} sm={12} key={index}>
                <Card className="shadow mb-2 my-2 h-100">
                  <CardHeader
                    className={`${
                      item?.pinned == "Pinned"
                        ? "bg-site-table"
                        : "bg-site-table-none"
                    }`}
                  >
                    <span>Date:&nbsp;{item?.date}</span>
                    {item?.pinned == "Pinned" ? (
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
                        onClick={() => handlePin(item.id)}
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

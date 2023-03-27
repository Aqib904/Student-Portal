import React, { useState } from "react";
import { PlusOutlined, CameraOutlined  } from "@ant-design/icons";
import { Modal, Radio, Upload } from "antd";
import { useDispatch } from "react-redux";
import { Button, Col, Container, Row } from "reactstrap";
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const PictureWall = ({ fileList, setFileList }) => {
  const [updateState, setUpdateState] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const checkFileType = (file) => {
    if (file && /\.(png|jpe?g|svg)$/i.test(file.name)) {
      return true;
    } else {
      alert("You can only upload PNG/JPG/JPEG/SVG file!");
      return false;
    }
  };
  const handleChange = ({ fileList: newFileList }) => {
    if (checkFileType(newFileList[newFileList.length - 1])) {
        console.log(newFileList[newFileList.length - 1].originFileObj,'newFileList')
      setFileList(newFileList);
    }
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div> 
  );
  const cameraButton = (
    <div className="d-flex align-items-center justify-content-center">
      <CameraOutlined />
      <div
        style={{
          marginTop: -3,
          paddingLeft:"5px"
        }}
      >
        Camera
      </div>
    </div> 
  );
 
  const handleTakePicture = async () => {
    try {
      let facingMode = "user"; // default to front camera
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      let hasBackCamera = false;
      let hasCamera = false;
  
      // Check if there is a camera available
      if (videoDevices.length > 0) {
        hasCamera = true;
        // Check if there is a back camera available
        if (videoDevices.length > 1) {
          hasBackCamera = true;
          facingMode = { exact: "environment" };
        }
      }
  
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode },
        audio: false,
      });
  
      const video = document.createElement("video");
      video.srcObject = stream;
      video.play();
  
      const captureImage = async () => {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext("2d");
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/jpeg");
        const blob = await fetch(dataUrl).then((res) => res.blob());
        const fileName = `photo-${Date.now()}-${Math.floor(Math.random() * 1000)}.jpg`;
  
        const newFile = {
          uid: Date.now(),
          name: fileName,
          status: "done",
          url: dataUrl,
          originFileObj: new File([blob], fileName, {
            type: "image/jpeg",
            lastModified: new Date(),
          }),
        };
  
        // Add the new file to the fileList state
        setFileList([...fileList, newFile]);
  
        // Force a re-render of the component by updating its state
        setUpdateState(updateState + 1);
  
        stream.getTracks()[0].stop();
        modal.destroy();
      };
  
      const switchCamera = async () => {
        if (!hasCamera) {
          // Show a message to the user indicating that there is no camera available
          alert("No camera available");
          return;
        }
  
        if (facingMode === "user") {
          facingMode = { exact: "environment" };
        } else {
          facingMode = "user";
        }
        stream.getTracks()[0].stop();
        handleTakePicture();
      };
  
      const modal = Modal.info({
        title: "Preview",
        content: (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ flex: 1, position: "relative" }}>
              <video
                ref={(ref) => (ref ? (ref.srcObject = stream) : null)}
                autoPlay
                style={{ width: "100%", height: "100%" }}
              ></video>
            </div>
            <div style={{ textAlign: "center" }}>
              <Button className=" mx-1 bg-site-primary" onClick={captureImage}>
                Take Picture
              </Button>
              <Button className=" mx-1 bg-site-primary" onClick={switchCamera} disabled={!hasBackCamera}>
                Switch Camera
              </Button>
            </div>
          </div>
        ),
        onOk() {},
      });
    } catch (error) {
      console.log("Error accessing camera", error);
    }
  };
  
  
  console.log(fileList,'file')
  return (
    <>
    <Container>
      <Row>
        <Col>
        <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        className="gallery"
        onChange={handleChange}
        accept="image/PNG, image/jpeg, image/jpg, image/svg"
      >
        {uploadButton}
      </Upload>
        </Col>
      </Row>
      <Row>
        <Col>
        <Button className="bg-site-primary camera-button"  onClick={handleTakePicture}>{cameraButton}</Button>
        </Col>
      </Row>
    </Container>
      
     
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt="example"
          style={{
            width: "100%",
          }}
          src={previewImage}
        />
      </Modal>
    </>
  );
};
export default PictureWall;

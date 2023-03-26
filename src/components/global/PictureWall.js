import React, { useState } from "react";
import { PlusOutlined, CameraOutlined  } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import { useDispatch } from "react-redux";
import { Button } from "reactstrap";
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const PictureWall = ({ fileList, setFileList }) => {
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
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      });
  
      const video = document.createElement("video");
      video.srcObject = stream;
      video.play();
  
      const captureImage = async () => {
        const track = stream.getTracks()[0];
        const imageCapture = new ImageCapture(track);
        const photoBlob = await imageCapture.takePhoto();
        const fileName = `photo-${Date.now()}.jpg`;
        
        const blob = new Blob([photoBlob.blob], { type: photoBlob.type });
        const file = new File([blob], fileName, {
          lastModified: new Date(),
        });
  
        const newFile = {
          uid: Math.random(),
          name: fileName,
          status: "done",
          url: await getBase64(photoBlob),
          originFileObj: file
        };
        setFileList([...fileList, newFile]);
        track.stop();
        modal.destroy();
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
              <Button
                className="bg-site-primary"
                onClick={captureImage}
              >
                Take Picture
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
      <Button className="bg-site-primary w-25"  onClick={handleTakePicture}>{cameraButton}</Button>
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

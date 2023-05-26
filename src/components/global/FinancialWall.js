import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Radio, Upload } from "antd";
import { Col, Container, Input, Row } from "reactstrap";
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
    const filteredList = newFileList.filter((file) => checkFileType(file));
    setFileList(filteredList);
  };
  console.log(fileList);
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

  return (
    <>
      <Container>
        <Row>
          <Col xs={24} sm={12} md={9}>
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              className="gallery"
              onChange={handleChange}
              accept="image/PNG, image/jpeg, image/jpg, image/svg"
            >
              {fileList.length >= 3 ? null : uploadButton}
            </Upload>
            <Row>
            {fileList.slice(0, 3).map((file, index) => (
              <Col key={file.uid} xs={24} sm={12} md={2}>
                <Input
                  type="text"
                  style={{ width: "100px", marginTop: "8px" }}
                  placeholder="Title"
                />
              </Col>
            ))}
          </Row>
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

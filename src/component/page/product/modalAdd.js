import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { toast } from 'react-toastify';
import { Row } from 'react-bootstrap';
import {add} from "../../../service/funAPI";
import storage from "../../../config/configFirebase";
import { useSelector, useDispatch } from 'react-redux';

function Example() {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [selectedFile, setSelectedFile] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [describe, setDescribe] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const uploadFile = async (file) => {
    const storageRef = ref(storage);
    const name = +new Date() + "-" + file.name;
    const metadata = { contentType: file.type };
    const fileRef = ref(storageRef, name);
    const uploadTask = uploadBytes(fileRef, file, metadata);

    try {
      const snapshot = await uploadTask;
      const url = await getDownloadURL(snapshot.ref);
      return url;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]); // Use the first file in the array
  };

  const handleUpload = async () => {
    if (selectedFile&&name.trim().length>0&&price.trim().length>0&&describe.trim().length>0) {
      try {
        const uploadedURL = await uploadFile(selectedFile);
        const data={
          nameproduct:name,
          img:uploadedURL,
          price:price,
          describe:describe
        }
        console.log(data)
        add(data,handleClose,dispatch);
        setName('');
        setPrice('');
        setDescribe('')
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      toast.error("Bạn chưa up file hoặc bỏ trống ô nhập");
    }
  };
  return (
    <div className='flex_stat pd-20'>
      <button  className='btn-add' onClick={handleShow}>
        Thêm sản phẩm
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <div className='row'>
                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 flex_center'>
                  <img className='img-updaload' src='https://firebasestorage.googleapis.com/v0/b/doan-59ab4.appspot.com/o/t%E1%BA%A3i%20xu%E1%BB%91ng.png?alt=media&token=68923227-c40a-4aa9-bfcc-d1aa5cd0f22d' alt='Preview' />
                </div>
                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12'>
                  <Form.Group as={Col} md="12" controlId="validationCustom01">
                    <Form.Label>Tên sản phẩm</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="12" controlId="validationCustom02">
                    <Form.Label>Giá bán</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="12" controlId="validationCustom02">
                    <Form.Label>Mô tả ngắn</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      value={describe}
                      onChange={(e) => setDescribe(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="position-relative mb-3">
                    <Form.Label>Hình ảnh</Form.Label>
                    <Form.Control
                      type="file"
                      required
                      name="file"
                      onChange={handleFileChange}
                    />
                  </Form.Group>
                </div>
              </div>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleUpload}>
            Thêm sản phẩm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Example;

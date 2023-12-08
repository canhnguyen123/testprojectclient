import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { getListAPI } from "../../../service/funAPI";
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { formatPrice, formatDateTime } from "../../../service/funWeb";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Row } from 'react-bootstrap';
import storage from "../../../config/configFirebase"
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {update,deleteId} from "../../../service/funAPI";
import 'alertifyjs/build/css/alertify.css';
import { confirmAlert } from 'react-confirm-alert';

function List() {
    const dispatch = useDispatch();
    const [selectedFile, setSelectedFile] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [describe, setDescribe] = useState('');
    const [img, setimg] = useState('');
    const listProduct = useSelector((state) => state.reducers.listProduct);
    const user_id= localStorage.getItem('user_id');
    const [show, setShow] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [checkUpdate, setCheckUpdate] = useState(true);
    const handleClose = () => {
        setShow(false);
        setSelectedProduct([]);
    };
    const handleShow = (item) => {
        setShow(true);
        setSelectedProduct(item);
        setCheckUpdate(true)
    };
    const handleShowUpdate = (item) => {
        setShow(true);
        setSelectedProduct(item);
        setCheckUpdate(false);
        setName(item.name);
        setPrice(item.price);
        setDescribe(item.describe);
        setimg(item.img)
    };
    useEffect(() => {
        dispatch(getListAPI())
    }, []);
    const deletProduct = (id) => {
        const result = window.confirm('Bạn có muốn xóa sản phẩm này không?');
      
        if (result) {
          deleteId(id, dispatch);
        } 
      };
      
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
    setSelectedFile(event.target.files[0]); 
  };

  const handleUpload = async (id) => {
    if (selectedFile) {
      try {
        const uploadedURL = await uploadFile(selectedFile);
        const data={
          nameproduct:name,
          img:uploadedURL,
          price:price,
          describe:describe
        }
            update(data,handleClose,id,dispatch);
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
        const data={
            nameproduct:name,
            img:img,
            price:price,
            describe:describe
          }
          update(data,handleClose,id,dispatch);
    }
  };
    return (
        <div>
            <Table >
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên sản phẩm</th>
                        <th>Giá</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {listProduct && listProduct.map((item, index) => {
                        return (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{user_id&&user_id>0&&user_id!==null?formatPrice(item.price):"Liên hệ"}</td>
                                <td>
                                    <div className='flex_center'>
                                        <div className='btn-action backgroup-bink' onClick={() => handleShow(item)}>
                                            <p>Xem chi tiết</p>
                                        </div>
                                        <div className='btn-action btn-update backgroup-yellow' onClick={() => handleShowUpdate(item)}>
                                            <p>Sửa</p>
                                        </div>
                                        <div className='btn-action btn-delete backgroup-violet' onClick={() => deletProduct(item.id)}>
                                            <p>Xóa</p>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}


                </tbody>
            </Table>

            {checkUpdate === true ?
                <Modal show={show} onHide={handleClose}>

                    <Modal.Header closeButton>
                        <Modal.Title>Chi tiết sản phẩm</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            {selectedProduct && (
                                <div className='row'>
                                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12'>
                                        <div className='text-span'><p>Tên sản phẩm: {selectedProduct.name}</p></div>
                                        <div className='text-span'> <p>Giá sản phẩm: {selectedProduct.price}</p></div>
                                        <div className='text-span'> <p>Mô tả sản phẩm: {selectedProduct.describe}</p></div>
                                        <div className='text-span'>  <p>Thời gian thêm: {selectedProduct.create_ad + " (" + formatDateTime(selectedProduct.create_ad) + ")"}</p></div>
                                        <div className='text-span'> <p>Thời gian cập nhật: {selectedProduct.updated_at !== null ? selectedProduct.updated_at + " (" + formatDateTime(selectedProduct.updated_at) + ")" : "Chưa cập nhật"}</p></div>
                                    </div>
                                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12'>
                                        <img className='img-deatil' src={selectedProduct.img} alt="Product Image" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </Modal.Body>



                </Modal> :
                 <Modal show={show} onHide={handleClose}>
                 <Modal.Header closeButton>
                   <Modal.Title>Cập nhật sản phẩm</Modal.Title>
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
                   {selectedProduct && (
                    <Button variant="primary" onClick={()=>handleUpload(selectedProduct.id)}>
                     Cập nhật sản phẩm
                   </Button>
                   )}
                   
                 </Modal.Footer>
               </Modal>}
        </div>
    );
}

export default List;
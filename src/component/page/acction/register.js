import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { ToastContainer, toast } from 'react-toastify';
import { register as registerAPI } from "../../../service/funAPI"; // Rename the import to avoid conflicts
import { useNavigate } from 'react-router-dom';

function FormExample() {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [username, setusername] = useState('');
  const [fullrname, setfullrname] = useState('');
  const [password, setpassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim().length > 0 && password.trim().length > 0 && fullrname.trim().length > 0) {
      const data = {
        username: username,
        fullName: fullrname,
        password: password
      };
      registerAPI(data,navigate); // Use the renamed function
    } else {
      toast.error('Điền đủ thông tin');
    }
  };

  return (
    <div className='flex_center he-500'>
      <div className='form-action'>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="12" className='form-input'>
              <Form.Label>Tên đăng nhập</Form.Label>
              <Form.Control
                required
                type="text"
                value={username}
                onChange={(e) => setusername(e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col} md="12" className='form-input'>
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control
                required
                type="text"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col} md="12" className='form-input'>
              <Form.Label>Họ tên</Form.Label>
              <Form.Control
                required
                type="text"
                value={fullrname}
                onChange={(e) => setfullrname(e.target.value)}
              />
            </Form.Group>
          </Row>
          <Button type="submit">Đăng kí</Button>
        </Form>
      </div>
    </div>
  );
}

export default FormExample;

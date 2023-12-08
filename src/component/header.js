import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {logout} from "../service/funAPI";
import { useNavigate } from 'react-router-dom';
function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const valiBoolen = useSelector((state) => state.reducers.valiBoolen);
   const user_id= localStorage.getItem('user_id');
   const logOut=()=>{
    logout(navigate,dispatch)
   }
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link className='flex_center' to={'/'}>Sản phẩm</Link>
            {user_id>0&&user_id!==null?
            
            <NavDropdown title="Tài khoản" id="basic-nav-dropdown">
              
              <div className='flex_start item-acction'>
                <Link onClick={logOut}>Đăng xuất</Link>
              </div>
            </NavDropdown>:
               <NavDropdown title="Tài khoản" id="basic-nav-dropdown">
            
              <div className='flex_start item-acction'>
                <Link to={'/login'}>Đăng nhập</Link>
              </div>
              <div className='flex_start item-acction'>
              <Link to={'/register'}>Đăng kí</Link>
              </div>
            </NavDropdown>
            }
           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
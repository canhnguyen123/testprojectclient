import APILink from "./APILink";
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {getList,updateAccount} from "../redux/acction/acction";
export const getListAPI=()=>{
  return (dispatch) => {
    APILink.get('product/')
      .then((response) => {
        if(response.data.status==="success"){
            dispatch(getList(response.data.result));
        }
     
      })
      .catch((error) => {
      });
  }
}
export const add=(data,handleClose,dispatch)=>{
    APILink.post(`product/add`,data)
    .then((response) => {
      if (response.data.status === 'success') {
        if (handleClose && typeof handleClose === 'function') {
        toast.success(response.data.mess);
          handleClose();
          dispatch(getListAPI());       
         }
      } else {
        toast.error(response.data.mess);
      }
    })
    .catch((error) => {
      console.error('Error fetching my bills:', error);
    });
  
}
export const update=(data,handleClose,id,dispatch)=>{
  APILink.put(`product/update/${id}`,data)
  .then((response) => {
    if (response.data.status === 'success') {
      if (handleClose && typeof handleClose === 'function') {
      toast.success(response.data.mess);
        handleClose();
        dispatch(getListAPI());
      }
    } else {
      toast.error(response.data.mess);
    }
  })
  .catch((error) => {
    console.error('Error fetching my bills:', error);
  });

}
export const deleteId=(id,dispatch)=>{
  APILink.delete(`product/delete/${id}`)
  .then((response) => {
    if (response.data.status === 'success') {
      dispatch(getListAPI());
      toast.success(response.data.mess);
    } else {
      toast.error(response.data.mess);
    }
  })
  .catch((error) => {
    console.error('Error fetching my bills:', error);
  });
}
export const register=(data,navigate)=>{
  APILink.post(`user/register`,data)
  .then((response) => {
    if (response.data.status === 'success') {
      toast.success(response.data.mess);
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } else {
      toast.error(response.data.mess);
    }
  })
  .catch((error) => {
    console.error('Error fetching my bills:', error);
  });
}
export const login = (data, navigate, dispatch) => {
  APILink.post(`user/login`, data)
      .then((response) => {
          if (response.data.status === 'success') {
              toast.success(response.data.mess);
              const token = response.data.token;

              console.log('Received token from server:', token);

              const user_id = response.data.user_id;
              localStorage.setItem('token', token);
              localStorage.setItem('user_id', user_id);
              dispatch(updateAccount(false));

              setTimeout(() => {
                  navigate('/');
              }, 1000);
          } else {
              toast.error(response.data.mess);
          }
      })
      .catch((error) => {
          console.error('Error fetching my bills:', error);
      });
};

export const logout=(navigate,dispatch)=>{
  localStorage.removeItem('token');
  localStorage.removeItem('user_id');
  dispatch(updateAccount(true))
  setTimeout(() => {
    navigate('/login');
  }, 1000);
  toast.success("đăng xuất thành công");
}
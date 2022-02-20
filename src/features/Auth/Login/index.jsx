import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import LoginForm from '../LoginForm';
import { login } from '../userSlice';

Login.prototype = {
  onCloseDialog: PropTypes.func,
}

Login.defaultProps = {
  onCloseDialog: null,
}

function Login({onCloseDialog}) {

  // Hiển thị thông báo 
  const {enqueueSnackbar} = useSnackbar();

  const dispatch = useDispatch();

  const onHandleSubmit = async (values) => {
      try{
        const action = login(values);

        const resultAction = await dispatch(action);

        // unwrapResult: lấy kết quả trả về của payload. Nếu success thì là fullfilled, ngược lại throw error khi rejected
        const user = unwrapResult(resultAction);

        // Đóng form đăng nhập
        if(onCloseDialog){
          onCloseDialog();
        }

        // Hiển thị thông báo đăng nhập thành công
        enqueueSnackbar('Login successfully', {variant: 'success'});
        
      } catch (error){
        // Xử lý lỗi trả về trong response interceptor ở axiosClient. Ở đây ta chỉ việc lấy lỗi ra và hiển thị
        console.log("Failed to login: ", error);
        // Hiển thị thông báo đăng nhập thành công
        enqueueSnackbar(error.message, {variant: 'error'});
      }
  };

  return (
    <div>
      <LoginForm onSubmitForm={onHandleSubmit} />
    </div>
  );
}

export default Login;

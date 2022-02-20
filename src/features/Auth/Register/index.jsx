import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import RegisterForm from '../RegisterForm';
import { register } from '../userSlice';

Register.prototype = {
  onCloseDialog: PropTypes.func,
}

Register.defaultProps = {
  onCloseDialog: null,
}

function Register({onCloseDialog}) {

  // Hiển thị thông báo 
  const {enqueueSnackbar} = useSnackbar();

  const dispatch = useDispatch();

  const onHandleSubmit = async (values) => {
      try{
        // Auto set username = email (vì ta chỉ có trường email, ko có trường username nên khai báo thêm ở đây)
        values.username = values.email;

        const action = register(values);

        const resultAction = await dispatch(action);

        // unwrapResult: lấy kết quả trả về của payload. Nếu success thì là fullfilled, ngược lại throw error khi rejected
        const user = unwrapResult(resultAction);

        // Đóng form đăng ký
        if(onCloseDialog){
          onCloseDialog();
        }

        // Hiển thị thông báo đăng ký thành công
        enqueueSnackbar('Register successfully', {variant: 'success'});
        
      } catch (error){
        // Xử lý lỗi trả về trong response interceptor ở axiosClient. Ở đây ta chỉ việc lấy lỗi ra và hiển thị
        console.log("Failed to register: ", error);
        // Hiển thị thông báo đăng ký thành công
        enqueueSnackbar(error.message, {variant: 'error'});
      }
  };

  return (
    <div>
      <RegisterForm onSubmitForm={onHandleSubmit} />
    </div>
  );
}

export default Register;

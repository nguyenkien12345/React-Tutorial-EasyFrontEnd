import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Button, LinearProgress, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { LockOutlined } from '@material-ui/icons';
import InputField from 'components/Form-controls/InputField';
import PasswordField from 'components/Form-controls/PasswordField';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(4),
    position: 'relative',
  },
  avartar: {
    margin: '0 auto',
    backgroundColor: theme.palette.secondary.main,
  },
  title: {
    margin: theme.spacing(2,0,3,0),
    textAlign: 'center',
  },
  submit: { 
    margin: theme.spacing(3,0,2,0),
   },
   progress: {
     position: 'absolute',
     left: 0,
     right: 0,
     top: theme.spacing(1),
   }
}))

RegisterForm.propTypes = {
  onSubmitForm: PropTypes.func,
};

RegisterForm.defaultProps = {
  onSubmitForm: null,
};

function RegisterForm({ onSubmitForm }) {

  const classes = useStyles();

  // Validation Form With yup
  const schema = yup.object().shape({
    fullName: yup.string()
    .trim()
    .required('Please Enter Your Full Name')
    // Có tối thiểu 3 từ (dùng custom validate).
    .test('Should has at least three words','Please enter at least three words',value => {
      return value.split(' ').length >= 3
    })
    // Có tối đa 64 từ (dùng validate có sẵn) 
    .max(64, 'Please enter at most sixty-four words'),

    email: yup.string()
    .trim()
    .required('Please Enter Your Email')
    .email('Please Enter Correct Email Format'),

    password: yup.string()
    .trim()
    .required('Please Enter Your Password')
    // .min('Please enter at least six words')
    // .max('Please enter at most sixty-four words')
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      'Password must contain at least 8 characters, one uppercase, one number and one special case character'
    ),

    confirmPassword: yup.string()
    .trim()
    .required('Please Enter Your Confirm Password')
    .oneOf([yup.ref('password'), null], "Passwords don't match. Check Again"),
  });

  // Bắt buộc liệt kê các Field name mà chúng ta sẽ sử dụng ra đây
  const form = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(schema),
  });

  // Vì props onSubmitForm là async await nên ở đây ta cũng phải khai báo async await
  const handleSubmit = async (values) => {
    if (onSubmitForm) {
      await onSubmitForm(values);
    }
    // form.reset(); => Chỉ nên reset form trong trường hợp thành công còn khi thất bại thì không nên reset form 
  };

  // Lấy ra trạng thái đang submit của form
  const {isSubmitting} = form.formState;

  return (
      <div className={classes.root}>
        {/* Hiển thị thanh loading. Nếu mà form isSubmitting thì show ra ngược lại không */}
        {isSubmitting && <LinearProgress className={classes.progress}/>}

          <Avatar className={classes.avartar}>
              <LockOutlined></LockOutlined>
          </Avatar>

          <Typography component='h3' variant='h5' className={classes.title}>
            Create An Account
          </Typography>

          {/* form.handleSubmit là của thằng useForm. handleSubmit truyền trong form.handleSubmit là do ta định nghĩa */}
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <InputField name='fullName' label='Full Name' form={form} />
            <InputField name='email' label='Email' form={form} />
            <PasswordField name='password' label='Password' form={form} />
            <PasswordField name='confirmPassword' label='Confirm Password' form={form} />
            <Button disabled={isSubmitting} type='submit' className={classes.submit} variant='contained' color='primary' fullWidth size="large">
              Create An Account
            </Button>
          </form>
    </div>

  );
}

export default RegisterForm;

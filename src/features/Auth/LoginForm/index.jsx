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

LoginForm.propTypes = {
  onSubmitForm: PropTypes.func,
};

LoginForm.defaultProps = {
  onSubmitForm: null,
};

function LoginForm({ onSubmitForm }) {

  const classes = useStyles();

  // Validation Form With yup
  const schema = yup.object().shape({
    identifier: yup.string()
    .trim()
    .required('Please Enter Your Email')
    .email('Please Enter Correct Email Format'),

    password: yup.string()
    .trim()
    .required('Please Enter Your Password')
  });

  // Bắt buộc liệt kê các Field name mà chúng ta sẽ sử dụng ra đây
  const form = useForm({
    defaultValues: {
      identifier: '',
      password: '',
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
            Login
          </Typography>

          {/* form.handleSubmit là của thằng useForm. handleSubmit truyền trong form.handleSubmit là do ta định nghĩa */}
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <InputField name='identifier' label='Email' form={form} />
            <PasswordField name='password' label='Password' form={form} />
            <Button disabled={isSubmitting} type='submit' className={classes.submit} variant='contained' color='primary' fullWidth size="large">
              Login
            </Button>
          </form>
    </div>

  );
}

export default LoginForm;

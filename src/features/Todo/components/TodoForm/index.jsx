import { yupResolver } from '@hookform/resolvers/yup';
import InputField from 'components/Form-controls/InputField';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

TodoForm.propTypes = {
    onSubmitForm: PropTypes.func,
};

TodoForm.defaultProps = {
    onSubmitForm: null,
}

function TodoForm({onSubmitForm}) {

    // Validation Form
    const schema = yup.object().shape({
        title: yup.string().required('Please Enter Title')
        .min(5, 'Title is too shot')
        .max(64, 'Title is too long'),
    })
    
    // Bắt buộc liệt kê các Field name mà chúng ta sẽ sử dụng ra đây
    const form = useForm({
        defaultValues: {
            title: ''
        },
        resolver: yupResolver(schema),
    })

    const handleSubmit = (values) => {
        if(onSubmitForm){
            onSubmitForm(values);
        }
        form.reset();
    }

    return (
        // form.handleSubmit là của thằng useForm. handleSubmit truyền trong form.handleSubmit là do ta định nghĩa
        <form onSubmit={form.handleSubmit(handleSubmit)}>
            <InputField name='title' label='Todo' form={form}/>
        </form>
    );
}

export default TodoForm;
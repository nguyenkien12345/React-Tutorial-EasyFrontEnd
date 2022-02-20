import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';

InputField.propTypes = {
    name: PropTypes.string.isRequired,
    form: PropTypes.object.isRequired,
    label: PropTypes.string,
};

function InputField(props) {

    const {name,form,label} = props;

    const {formState} = form;

    const {errors} = formState;

    // const hasError = formState.touchedFields[name] && errors[name]; 

    const hasError = errors[name];

    return (
        <Controller 
            name={name}                 
            control={form.control}
            render={({field}) => (
                <TextField
		            {...field}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    label={label}
                    error={!!hasError}      
                    helperText={errors[name]?.message}
                />
            )}
        />

    );
}

export default InputField;

// Lý thuyết 

// Băt buộc 100% phải có props form,name

// Chỉ hiện thị lỗi khi đã touched,click và có lỗi tồn tại trong errors

// Controller: tự động binding vào trong TextField các hàm, sự kiện như là onChange,onBlur,value,name....

// formState.touchedFields[name] nó sẽ trả về giá trị true, false nhưng && errors[name] nó sẽ trả về object mà error chỉ nhận về giá trị true hoặc false do đó ta thêm cặp dấu !! để chuyển hasError về kiểu boolean
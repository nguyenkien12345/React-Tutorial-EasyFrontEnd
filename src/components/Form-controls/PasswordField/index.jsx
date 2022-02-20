import { FormHelperText } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';

PasswordField.propTypes = {
    name: PropTypes.string.isRequired,
    form: PropTypes.object.isRequired,
    label: PropTypes.string,
};

function PasswordField(props) {

    const {name,form,label} = props;

    const {formState} = form;

    const {errors} = formState;

    // const hasError = formState.touchedFields[name] && errors[name]; 

    const hasError = errors[name];

    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    return (
        <FormControl error={!!hasError} variant="outlined" fullWidth margin="normal">
          <InputLabel htmlFor={name}>{label}</InputLabel>
          <Controller
            name={name}                 
            control={form.control}
            render={({field}) => (
                <OutlinedInput
                    {...field}
                    id={name}
                    type={showPassword ? 'text' : 'password'}
                    label={label}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={toggleShowPassword}
                        edge="end"
                        >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                    }
                />
            )}
          />
          <FormHelperText>{errors[name]?.message}</FormHelperText>
        </FormControl>
    );
}

export default PasswordField;

// Lý thuyết 

// Băt buộc 100% phải có props form,name

// Chỉ hiện thị lỗi khi đã touched,click và có lỗi tồn tại trong errors

// Controller: tự động binding vào trong OutlinedInput các hàm, sự kiện như là onChange,onBlur,value,name....

// formState.touchedFields[name] nó sẽ trả về giá trị true, false nhưng && errors[name] nó sẽ trả về object mà error chỉ nhận về giá trị true hoặc false do đó ta thêm cặp dấu !! để chuyển hasError về kiểu boolean
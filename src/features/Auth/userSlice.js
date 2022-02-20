import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import storageKeys from 'constants/storage-key';
import userApi from 'api/userApi';

export const register = createAsyncThunk(
    '/auth/register',
    async (payload) => {  // payload: Nhận về thông tin của user truyền vào
        const data = await userApi.register(payload);
        localStorage.setItem(storageKeys.USER, data.jwt);
        localStorage.setItem(storageKeys.TOKEN, JSON.stringify(data.user));
        return data.user; // Ta trả về gì thì ở register.fulfilled trong extraReducers sẽ nhận về cái đó thông qua action.payload
    }
)

export const login = createAsyncThunk(
    'auth/login',
    async (payload) => {  // payload: Nhận về thông tin của user truyền vào
        const data = await userApi.login(payload);
        localStorage.setItem(storageKeys.USER, data.jwt);
        localStorage.setItem(storageKeys.TOKEN, JSON.stringify(data.user));
        return data.user; // Ta trả về gì thì ở login.fulfilled trong extraReducers sẽ nhận về cái đó thông qua action.payload 
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState: {
        current: JSON.parse(localStorage.getItem(storageKeys.USER)) || {},
        settings: {},
    },
    // Sync => reducers
    reducers: {
        logout(state,action){
            // Clear storage
            localStorage.removeItem(storageKeys.USER);
            localStorage.removeItem(storageKeys.TOKEN);
            // Clear state in redux
            state.current = {}
        }
    },
    // Async => dùng extraReducers
    extraReducers: {
        // [register.fulfilled] chính là user/register/fullfilled => Ưu tiên ghi kiểu [register.fulfilled] hơn
        [register.fulfilled]: (state, action) => {
            state.current = action.payload; 
        },
        // [login.fulfilled] chính là user/login/fullfilled => Ưu tiên ghi kiểu [login.fulfilled] hơn
        [login.fulfilled]: (state,action) => {
            state.current = action.payload;
        }
    },
});

export default userSlice.reducer;
export const { logout } = userSlice.actions;
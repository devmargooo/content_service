import {configureStore, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Login} from "./helpers";

interface UserState {
    login: Login | undefined;
}

const initialState: UserState = {
    login: undefined,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setLogin(state, action: PayloadAction<Login>) {
            state.login = action.payload;
        },
    },
});

export const { setLogin } = userSlice.actions;

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>
export default store;
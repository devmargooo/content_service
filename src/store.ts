import {configureStore, createSlice, PayloadAction} from '@reduxjs/toolkit';


export interface UserState {
    phone: string | undefined;
    email: string | undefined;
}

const initialState: UserState = {
    phone: undefined,
    email: undefined,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setPhone(state, action: PayloadAction<string>) {
            state.phone = action.payload;
        },
        setEmail(state, action: PayloadAction<string>) {
            state.email = action.payload;
        },
    },
});

export const { setPhone, setEmail } = userSlice.actions;

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>
export default store;
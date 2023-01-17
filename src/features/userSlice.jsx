import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    type: "",
    token: "",
};

const user = createSlice({
    name: "user",
    initialState,
    reducers: {
        userLogin: (state, action) => {
            console.log(action.payload);
            const { user, type, token } = action.payload;
            state.user = user;
            state.type = type;
            state.token = token;
        },
    },
});

export const { userLogin } = user.actions;
export default user.reducer;

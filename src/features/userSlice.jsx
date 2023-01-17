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
            const { user, type, token } = action.payload;
            state.user = user;
            state.type = type;
            state.token = token;
        },

        userLogout: (state) => {
            state.user = null;
            state.type = "";
            state.token = "";
        },
    },
});

export const { userLogin, userLogout } = user.actions;
export default user.reducer;

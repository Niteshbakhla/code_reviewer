import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
            name: "userSlice",
            initialState: { isLogin: null },
            reducers: {
                        setIsLogin: (state, action) => {
                                    state.isLogin = action.payload
                        }
            }
});


export const { setIsLogin } = userSlice.actions;

export default userSlice.reducer;



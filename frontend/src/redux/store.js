import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../redux/slices/userSlice.js"

export const store = configureStore({
            reducer: {
                        user: userSlice
            }
})
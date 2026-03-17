import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginThunk = createAsyncThunk(
    "auth/login",
    async (credentials, { rejectWithValue }) => {
        try {
            const res = await axios.get("http://localhost:3001/users");
            const users = res.data;

            const user = users.find(
                (u) =>
                    u.username === credentials.username &&
                    u.password === credentials.password
            );

            if (user) {
                const { password, ...safeUser } = user;
                return safeUser;
            } else {
                return rejectWithValue("Wrong username or password");
            }
        } catch (err) {
            return rejectWithValue("Server connection failed");
        }
    }
);

const authSlice = createSlice({
    name: "auth",

    initialState: {
        isAuthenticated: false,
        user: null,
        loading: false,
        error: null
    },

    reducers: {
        logout(state) {
            state.isAuthenticated = false;
            state.user = null;
        },

        clearError(state) {
            state.error = null;
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(loginThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase(loginThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { logout, clearError } = authSlice.actions;

export default authSlice.reducer;
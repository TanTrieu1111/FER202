import axios from "axios";

export const loginAction = async (dispatch, credentials) => {
    dispatch({ type: "LOGIN_START" });

    try {
        const response = await axios.get("http://localhost:3001/users");

        const users = response.data;

        const user = users.find(
            (u) =>
                u.username === credentials.username &&
                u.password === credentials.password
        );

        if (user) {
            delete user.password;

            dispatch({
                type: "LOGIN_SUCCESS",
                payload: { user }
            });

            return { success: true, user };
        } else {
            const errorMessage = "Username or password incorrect";

            dispatch({
                type: "LOGIN_FAILURE",
                payload: { error: errorMessage }
            });

            return { success: false, message: errorMessage };
        }
    } catch (error) {
        const errorMessage =
            error.response?.data?.message || "Cannot connect to server";

        dispatch({
            type: "LOGIN_FAILURE",
            payload: { error: errorMessage }
        });

        return { success: false, message: errorMessage };
    }
};
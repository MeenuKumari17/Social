import axios from "axios";

export const loginCall = async (userCredential, dispatch) => {
    dispatch({type:"LOGIN_START"});
    try {
        await axios.post("http://localhost:4000/api/auth/login", userCredential).then( (res) => {
            dispatch({type: "LOGIN_SUCCESS", payload: res.data });
        })
       
    } catch (error) {
        dispatch({type: "LOGIN_FAILURE", payload: error });
    }
}
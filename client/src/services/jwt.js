import axios from "axios";
// import { login } from "../../../server/controllers/authController";

// export const check = () => {
//     if(axios.defaults.headers.common["Authorization"]) {

//     }
// };

export const setSession = (token) => {
    if (token) {
        localStorage.setItem("jwt_access_token", token);
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    } else {
        localStorage.removeItem("jwt_access_token");    
        delete axios.defaults.headers.common["Authorization"];
    }
};

export const getSession = () => {
    return axios.defaults.headers.common["Authorization"];
};

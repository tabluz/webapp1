import axios from "./axios";

/**
 * @url POST /users/login
 * @since 1.0
 */
export const sigin = (payload) => axios.post("/login", payload);


/*
export const fetchAttendances = (id) => axios.get(`/attendance/${id}`);
export const putExample = (payload) => axios.put("/payemnt/${}", payload);
*/

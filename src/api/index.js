import axios from "./axios";

/**
 * @url POST /users/login
 * @since 1.0
 */
export const sigin = (payload) => axios.post("/login", payload);

/**
 * @url POST /login/sendcode
 * @since 1.0
 */
export const sendToMeSms = (payload) => axios.post("/login/sendcode", payload);

/**
 * @url POST /sendcode
 * @since 1.0
 */
export const changePassword = (id, payload) =>
  axios.put(`/login/verifycode/${id}`, payload);

/**
 * @url POST /attendance
 * @since 1.0
 */
export const checkAttendance = (payload) => axios.post("/attendance", payload);

/**
 * @url GET /attendance/:id
 * @since 1.0
 */
export const fetchAttendance = (id) => axios.get(`/attendance/${id}`);

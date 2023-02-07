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
 * @url PUT /login/verifycode/:id
 * @since 1.0
 */
export const changePassword = (id, payload) =>
  axios.put(`/login/verifycode/${id}`, payload);

/**
 * @url GET /person
 * @since 1.0
 */
export const fetchUsers = () => axios.get("/person");

/**
 * @url PUT /person/:id
 * @since 1.0
 */
export const updatePerson = (id, payload) =>
  axios.put(`/person/${id}`, payload);
/*

/**
 * @url DELETE /person/:id
 * @since 1.0
 */
export const deletePerson = (id) => axios.delete(`/person/${id}`);

/**
 * @url GET /person/:id
 * @since 1.0
 */
export const ListbyId = (id, payload) => axios.get(`/person/${id}`, payload);

/**
 * @url POST /person
 * @since 1.0
 */
export const createPerson = (payload) => axios.post("/person", payload);

/*
export const fetchAttendances = (id) => axios.get(`/attendance/${id}`);
export const putExample = (payload) => axios.put("/payemnt/${}", payload);
*/

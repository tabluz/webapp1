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
export const getPersonById = (id) => axios.get(`/person/${id}`);

/**
 * @url POST /person
 * @since 1.0
 */

export const createPerson = (payload) => axios.post("/person", payload);

/**
 * @url GET /payment
 * @since 1.0
 */
export const paymentsAll = () => axios.get("/payment");

/**
 * @url POST /payment
 * @since 1.0
 */
export const createPayment = (payload) => axios.post("/payment", payload);

/**
 * @url PUT /payment:id
 * @since 1.0
 */
export const editPayment = (id, payload) =>
  axios.put(`/payment/${id}`, payload);

/**
 * @url PUT /payment:id
 * @since 1.0
 */
export const deletePayment = (id) => axios.delete(`/payment/${id}`);

/*
 * @url POST /attendance
 * @since 1.0
 */
export const checkAttendance = (payload) => axios.post("/attendance", payload);

/**
 * @url GET /attendance/:id
 * @since 1.0
 */
export const fetchAttendance = (id) => axios.get(`/attendance/${id}`);

/**
 * @url GET /attendance/:id
 * @since 1.0
 */
export const paymentById = (id) => axios.get(`/payment/${id}`);

/**
 * @url GET /attendance/:id
 * @since 1.0
 */
export const getCount = (user_type) => axios.get(`/count/${user_type}`);

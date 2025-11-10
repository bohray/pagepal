import axios from "axios";

const api = axios.create({
  baseURL: "/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

const userApi = axios.create({
  baseURL: "",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// Add CSRF token to requests
const token = document.querySelector("[name=csrf-token]");
if (token) {
  api.defaults.headers.common["X-CSRF-TOKEN"] = token.content;
  userApi.defaults.headers.common["X-CSRF-TOKEN"] = token.content;
}

export const booksAPI = {
  getAll: () => api.get("/books"),
  getOne: (id) => api.get(`/books/${id}`),
  create: (bookData) => api.post("/books", { book: bookData }),
};

export const recommendationsAPI = {
  getAll: () => api.get("/recommendations"),
  getOne: (id) => api.get(`/recommendations/${id}`),
  create: (data) => api.post("/recommendations", { recommendation: data }),
  delete: (id) => api.delete(`/recommendations/${id}`),
  vote: (id) => api.post(`/recommendations/${id}/vote`),
  unvote: (id) => api.delete(`/recommendations/${id}/unvote`),
  getTrending: () => api.get("/trending"),
};

export const usersAPI = {
  getProfile: (id) => api.get(`/profile/${id}`),
  login: (userData) => userApi.post("/users/sign_in", { user: userData }),
  signup: (newUserData) => userApi.post("/users", { user: newUserData }),
  logout: () => userApi.delete("/users/sign_out"),
  checkUser: () => api.get("/current_user"),
};

export default api;

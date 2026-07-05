/** Auth service — calls /api/auth/* endpoints */
import api from "../api/axios";

const AuthService = {
  register: (data) => api.post("/auth/register", data),
  login: (data) => api.post("/auth/login", data),
};

export default AuthService;

import { api } from ".";

export const logIn = async (body) => {
  const { data, status } = await api.post("/auth/login", body);
  return { status, data };
};

export const logOut = async (body) => {
  const { data, status } = await api.get("/auth/logout", body);
  return { status, data };
};

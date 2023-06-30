import jwtDecode from "jwt-decode";
import { api } from "./axios";

export const logout = async (reason?: string) => {
  try {
    const decodedToken = jwtDecode(localStorage.getItem("accessToken") || "");

    const id = (decodedToken as { id: string | number }).id;

    const currentUrl = window.location.href;
    const reasonQuery = reason ? `&reason=${reason}` : "";

    if (!id) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      window.location.href = "/login?redirectUrl=" + currentUrl + reasonQuery;
      return;
    }

    await api.post("/users/logout", {
      refreshToken: localStorage.getItem("refreshToken"),
    });

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    window.location.href = "/login?redirectUrl=" + currentUrl + reasonQuery;
  } catch (err) {
    console.error(err);

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    const currentUrl = window.location.href;
    window.location.href = "/login?redirectUrl=" + currentUrl;
  }
};

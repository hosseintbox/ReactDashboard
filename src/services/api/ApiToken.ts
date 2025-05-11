import Cookies from "js-cookie";
import { ACCESS_TOKEN } from "../../setting/CookiesKey";
import { useNavigate } from "react-router-dom";

export const SetUserToken = async (token: string) => {
  return new Promise<void>((resolve) => {
    Cookies.set(ACCESS_TOKEN, token, { secure: true, sameSite: "strict" });
    resolve();
  });
};

export const GetUserToken = () => {
  const token = Cookies.get(ACCESS_TOKEN);
  return token ?? null;
};

export const RemoveUserToken = () => {
  Cookies.remove(ACCESS_TOKEN);
};

export const RemoveUserTokenAndRedirect = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Cookies.remove(ACCESS_TOKEN);
    // navigate("/login");
  };

  return handleLogout;
};

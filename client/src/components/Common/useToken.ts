import { useState } from "react";

const useToken = () => {
  const getToken = () => {
    return sessionStorage.getItem('auth-token')
  };

  const [token, setToken] = useState(getToken());

  //@ts-ignore
  const saveToken = userToken  => {
    sessionStorage.setItem('auth-token', userToken);
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token
  }
}

export default useToken;
